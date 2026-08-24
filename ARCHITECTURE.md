# Gurukul — Target Architecture

This document lays out the stack to move Gurukul from its current static
site + Google Sheets prototype to a full backend with real accounts,
progress tracking, automatic payment-to-access, an admin console, and
local-LLM grading of subjective answers. It's written to be built in
phases, not all at once — each phase works standalone and unblocks the
next.

Written: August 2026.

---

## 1. Where things stand today

- **Frontend**: static HTML/CSS/JS, deployed on Netlify/Vercel/GitHub
  Pages. Markdown notes, MCQ tests graded client-side.
- **Auth**: Google Sign-In (Google Identity Services), client-side only.
- **"Backend"**: a Google Sheet + Apps Script web app (`apps-script.gs`),
  storing Roster / Access / Submissions / Progress as sheet tabs.
- **Payments**: manual — a Razorpay Payment Link shared with students,
  you watch for payment notifications yourself, then open `/admin.html`
  and grant access by hand.
- **Grading**: MCQ only, done in-browser. Subjective/theory answers are
  currently not collected at all (disabled while being reworked).

This works for a small number of students but has three hard ceilings:
Apps Script can't verify payment webhooks safely, can't run an LLM, and
the Sheet-as-database approach doesn't scale past casual use.

---

## 2. Target architecture (overview)

```
┌─────────────┐      HTTPS       ┌──────────────────┐      SQL      ┌─────────────┐
│  Frontend   │ ───────────────▶ │   Backend API     │ ─────────────▶│  Database   │
│ (static site,│                 │ (FastAPI, Python) │                │ (Postgres,  │
│  Netlify)   │ ◀─────────────── │                    │ ◀───────────── │  Supabase)  │
└─────────────┘                  └──────────────────┘                └─────────────┘
      │                                   │  │
      │ Google Sign-In                    │  │ internal call
      │ (ID token)                        │  ▼
      │                          ┌──────────────────┐
      │                          │  Grading service   │
      │                          │  (Ollama + Qwen3)  │
      │                          │  local LLM         │
      │                          └──────────────────┘
      │
      ▼
┌─────────────┐    webhook (signed)   ┌──────────────────┐
│  Razorpay   │ ────────────────────▶ │  Backend API       │
│  Checkout   │                       │  /webhooks/razorpay │
└─────────────┘                       └──────────────────┘
```

One backend service (FastAPI) is the hub: it serves the frontend's API
calls, receives Razorpay webhooks, and calls the local LLM for grading.
Everything writes to one Postgres database (Supabase-hosted).

---

## 3. Frontend

**Keep the current static HTML/CSS/JS site.** It already works, is fast,
and has no build step. No need to rewrite in React/Next.js unless you
later want a richer admin dashboard with live-updating tables — that can
be a separate small React app if/when you want it, without touching the
student-facing site.

Changes needed:

- `js/backend.js` — replace Apps Script `fetch()` calls with calls to
  the new FastAPI endpoints.
- `js/auth.js` — keep Google Identity Services for login; the ID token
  now gets sent to your own backend for verification instead of Apps
  Script.
- `js/config.js` — replace `APPS_SCRIPT_URL` with `API_BASE_URL`
  pointing at your FastAPI deployment.

Deployment stays on Netlify (or Vercel/GitHub Pages) — no change.

---

## 4. Backend API

**Framework: FastAPI (Python).**

Why FastAPI over Node/Express: the LLM grading pipeline is Python-native
(Ollama's client libraries, prompt templating, JSON-schema validation
all have the best tooling in Python), so keeping the API and the grading
logic in one language and one process avoids a second service and a
second deployment to maintain. FastAPI also gives you automatic request
validation and an interactive API docs page (`/docs`) for free, which
matters when you're the only developer and want to test endpoints
quickly.

If you're more comfortable in JavaScript, Node + Fastify is a fine
alternative — you'd just call out to a small separate Python grading
service over HTTP instead of importing it directly. Slightly more moving
parts, otherwise equivalent.

**Core endpoints:**

| Endpoint                   | Purpose                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| `POST /auth/verify`        | Verify Google ID token, create/fetch user record, return session token                    |
| `GET /access/me`           | Return the logged-in student's granted classes/chapters                                   |
| `POST /submissions`        | Submit a completed test (MCQ auto-graded here; subjective answers queued for LLM grading) |
| `GET /submissions/{id}`    | Fetch a submission's status/result, including LLM report once ready                       |
| `GET /progress/me`         | Notes read + tests completed, for the student's own progress page                         |
| `POST /webhooks/razorpay`  | Signed webhook receiver — verifies payment, grants access automatically                   |
| `POST /admin/access`       | Admin: grant/revoke access for a student (class-level or chapter-level)                   |
| `GET /admin/students`      | Admin: list all students, their grants, and submission history                            |
| `GET /admin/submissions`   | Admin: all test attempts, scores, and LLM reports across all students                     |
| `POST /admin/regrade/{id}` | Admin: re-run LLM grading against an updated answer key                                   |

All `/admin/*` routes sit behind a proper admin auth check (a role flag
on your own user record, not a shared password like the current
`ADMIN_PASSWORD` scheme — same idea, just enforced server-side with a
real session instead of a query-string password).

---

## 5. Database

**Postgres, hosted on Supabase.**

Why Supabase specifically: it's a hosted Postgres with a free tier
(500MB storage, 50k monthly active users, unlimited API requests), a
built-in table editor in the browser that works as an ad-hoc admin view
without you writing any UI for it, and optional built-in auth if you
ever want to drop Google Sign-In for something else. The one caveat is
that a free-tier project pauses after 7 days without any API traffic —
irrelevant once real students are using the site daily, worth knowing
during early testing.

**Schema (replaces the four Sheet tabs):**

```sql
users
  id, google_sub, email, name, role ('student' | 'admin'),
  roll_number, created_at

access_grants
  id, user_id, grant_type ('class' | 'chapter'),
  target_id (e.g. 'class-9' or 'class-8-maths/power-play'),
  granted_via ('manual' | 'razorpay'), granted_at

submissions
  id, user_id, test_id, submitted_at,
  mcq_score, mcq_total,
  subjective_status ('pending' | 'graded'),
  overall_report_json

submission_answers
  id, submission_id, question_id, question_type,
  student_answer, reference_answer,
  llm_score, llm_max_score, topic_tag, feedback_text

progress
  id, user_id, item_type ('note' | 'test'), item_id, completed_at

payments
  id, user_id, razorpay_order_id, razorpay_payment_id,
  amount, status, created_at
```

This is a straightforward relational model — nothing exotic needed.
Row-level security (a Supabase/Postgres feature) can enforce "students
can only read their own rows" directly in the database as a second line
of defense beyond your API's own checks.

---

## 6. Auth

Keep **Google Sign-In** — it already works and students don't need a new
account system to learn. The only change is where verification happens:
right now the frontend trusts the token itself; going forward, every
sensitive API call sends the Google ID token to `POST /auth/verify`,
which checks it against Google's servers, looks up (or creates) the
`users` row, and returns your own short-lived session token for
subsequent requests.

Optional, not required: restrict sign-in to a school Google Workspace
domain via the `RESTRICT_DOMAIN` config you already have.

---

## 7. Payments — automatic

**Razorpay Orders API + Webhooks**, replacing the manual link-and-grant
flow.

Flow:

1. Student clicks "Buy" on a locked chapter/class → frontend calls
   `POST /payments/create-order` on your backend.
2. Backend calls Razorpay's Orders API to create an order, returns the
   order ID to the frontend.
3. Frontend opens Razorpay's checkout widget with that order ID.
4. On successful payment, Razorpay sends a **signed webhook**
   (`payment.captured`) to `POST /webhooks/razorpay`.
5. Backend verifies the signature (using your Razorpay webhook secret),
   looks up which student/product the order was for, and writes a row
   to `access_grants` with `granted_via = 'razorpay'` — access unlocks
   immediately, no manual step.
6. As a fallback for the rare case a webhook is delayed or missed, also
   verify the payment via Razorpay's Orders API when the frontend
   returns from checkout, so the student sees "unlocked" instantly
   rather than waiting on the webhook.

This is the one piece that genuinely requires a real backend — Apps
Script can't safely verify a webhook signature and write to a database
in the same trusted request the way a proper server can.

Set up webhooks from the Razorpay Dashboard → Account & Settings →
Webhooks, pointing at your deployed `/webhooks/razorpay` URL.

---

## 8. Admin console

Extend the existing `admin.html` rather than rebuilding it, now backed
by real endpoints instead of a shared password:

- **Student list** — every student, their access grants, roll number,
  submission history. (`GET /admin/students`)
- **Access management** — grant/revoke class-level or chapter-level
  access manually (still useful for freebies, corrections, or trials
  alongside the now-automatic Razorpay grants).
- **Submissions & reports** — every test attempt, MCQ + subjective
  scores, and the full LLM-generated topic report per student per test.
- **Payments log** — read-only view of `payments` table for
  reconciliation.
- **Re-grade button** — if you edit an answer key after students have
  already submitted, trigger `POST /admin/regrade/{id}` to re-run the
  LLM against the updated key.

If this grows past a few screens, it's a good candidate to become a
small separate React/Vite app later — but plain HTML/JS calling the same
API is enough to start.

---

## 9. Local LLM grading pipeline

**Model: Ollama running Qwen3 8B** (Qwen2.5 7B is a solid fallback).
Both run acceptably on CPU with 8GB+ RAM, no GPU required, and are
currently among the strongest small open-weight models for structured
reasoning tasks like this. Running locally (vs. calling an external LLM
API) matters here for two reasons: no per-request cost as volume grows,
and student answers never leave your own infrastructure.

**Grading flow, per subjective question:**

1. Student submits a test with `short` (free-text) answers alongside
   MCQs.
2. Backend stores the raw answers, marks the submission
   `subjective_status = 'pending'`.
3. For each subjective answer, backend builds a prompt combining:
   - the question text
   - your reference answer key for that question
   - a scoring rubric (e.g. "score out of 5: 5 = fully correct with
     correct reasoning, 3 = correct conclusion but incomplete
     reasoning, 0 = incorrect or blank")
   - the chapter's topic taxonomy (e.g. for a Physics chapter:
     "Newton's First Law", "Newton's Second Law", "Free-body diagrams")
     so the model tags which topic the question belongs to
4. Ollama returns a structured JSON response:
   ```json
   {
     "score": 3,
     "max_score": 5,
     "topic": "Newton's Second Law",
     "feedback": "Correct final answer but the force calculation
       skipped the mass term — revise F=ma application."
   }
   ```
5. Backend validates the JSON shape, stores it in
   `submission_answers`, and once all questions in a submission are
   graded, aggregates into a per-topic report:
   ```json
   {
     "chapter": "Laws of Motion",
     "topics": [
       { "topic": "Newton's First Law", "scored": "4/5" },
       { "topic": "Newton's Second Law", "scored": "3/10", "revise": true },
       { "topic": "Free-body diagrams", "scored": "5/5" }
     ],
     "overall": "12/20",
     "revision_focus": ["Newton's Second Law — F=ma application"]
   }
   ```
6. Submission flips to `subjective_status = 'graded'`; student sees the
   report on their results page, admin sees it in the admin console.

**Practical note on speed:** CPU inference on an 8B model takes roughly
5–20 seconds per question depending on hardware. For a test with 5–10
subjective questions, expect a report to finish well within a minute —
fine for "grade after submission" rather than instant feedback. If you
want instant grading later, that's when a small GPU instance becomes
worth the extra cost.

---

## 10. Hosting & cost

| Component    | Where                            | Cost to start                                             |
| ------------ | -------------------------------- | --------------------------------------------------------- |
| Frontend     | Netlify                          | Free                                                      |
| Database     | Supabase                         | Free tier (pauses after 7 days idle — fine pre-launch)    |
| Backend API  | Railway or Render                | Free/hobby tier                                           |
| LLM (Ollama) | Your own machine, or a small VPS | $0 (own machine) or ~$20–24/mo (Hetzner CPX31, 4vCPU/8GB) |
| Payments     | Razorpay                         | No fixed cost — per-transaction fee only                  |

**Cheapest possible start ($0 beyond what you already pay):** run Ollama
on your own laptop, treat grading as a manual "process now" batch you
trigger from the admin console when convenient, and use free tiers
everywhere else. This is a reasonable way to launch and validate the
whole flow with real students before paying for always-on LLM hosting.

**Once you have steady traffic:** move the backend and Ollama to an
always-on VPS (~$20–45/mo total), upgrade Supabase only if you exceed
the free tier's 500MB/50k MAU limits.

---

## 11. Migration plan

Suggested order — each phase is independently useful, nothing here needs
a big-bang rewrite:

**Phase 1 — Backend + database.** Stand up FastAPI and Supabase, migrate
`users`, `access_grants`, `submissions`, `progress` out of the Google
Sheet. Point the frontend at the new API. This alone unblocks automatic
payments (Phase 2 can't happen without a real database to write grants
to).

**Phase 2 — Automatic payments.** Add Razorpay Orders API + webhook
verification. Retire the manual "watch for payment, open admin, grant
by hand" flow.

**Phase 3 — Admin console.** Wire the existing `admin.html` to the new
`/admin/*` endpoints, replacing the shared-password gate with real admin
auth.

**Phase 4 — Local LLM grading.** Stand up Ollama, build the grading
prompt + JSON schema, re-enable subjective question submission (currently
disabled per `SETUP.md`), wire the per-topic report into both the
student results page and the admin console.

Each phase can be tested against the current live site without breaking
it — the Apps Script backend can keep running in parallel until you're
confident the new API is solid, then you cut over and decommission the
Sheet.

---

## 12. Alternatives considered, briefly

- **Node/Express instead of FastAPI** — equally valid; only real
  downside is a second Python service needed for LLM grading instead of
  one unified codebase.
- **Firebase instead of Supabase** — comparable free tier and built-in
  auth, but NoSQL (Firestore) is a worse fit for the relational
  reporting you want (per-topic aggregation across submissions is more
  natural in SQL).
- **Hosted LLM API (OpenAI/Anthropic/etc.) instead of local Ollama** —
  faster to set up (no server to manage) and higher quality grading, but
  costs scale per-request and student answers leave your
  infrastructure. Worth reconsidering if local grading quality or speed
  becomes a bottleneck.
- **Next.js frontend instead of static HTML** — only worth it if the
  admin console grows complex enough to need real component state
  management; not needed for the student-facing site as it exists today.
