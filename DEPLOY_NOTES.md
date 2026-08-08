# What changed — and what you still need to do

All the code for the Supabase + Google Auth backend is now written. This
is the short version of what's left, since most of `SETUP_CHECKLIST.md`
is now already done in code — only the manual dashboard steps remain.

## Files that changed

- `supabase/schema.sql` — new. The full database schema + Row Level
  Security policies. Run this once in Supabase's SQL Editor.
- `js/config.js` — now holds `SUPABASE_URL`/`SUPABASE_ANON_KEY` instead
  of the old Apps Script URL.
- `js/auth.js` — now uses Supabase Auth's Google sign-in instead of
  Google Identity Services directly. Same external API, so nothing else
  had to change.
- `js/backend.js` — now queries Supabase tables directly instead of
  calling Apps Script.
- `js/tests.js` — mixed tests now actually collect and submit theory
  answers (previously disabled) so they're ready for manual grading.
- `js/progress-page.js` — now shows the theory-grading report (per-topic
  scores + what to revise) once you've graded a submission.
- `index.html` / `admin.html` — swapped the Google Identity Services
  script tag for the Supabase JS client.
- `admin.html` / `js/admin.js` — the admin console now gates on real
  Google sign-in + an admin allowlist (`admin_emails` table) instead of
  a shared password, and has a new manual-grading panel for theory
  answers.
- `css/style.css` / `css/admin.css` — small additions for the new
  sign-in button and grading panel.

## What you still need to do (dashboard steps, not code)

1. **Run the schema.** Supabase Dashboard → SQL Editor → New query →
   paste all of `supabase/schema.sql` → Run. It already inserts
   `amanmehtacodes@gmail.com` as the first admin — edit that line first
   if you want a different email.
2. **Get your anon key.** Supabase Dashboard → Connect → API Keys →
   copy the "anon public" key → paste it into `SUPABASE_ANON_KEY` in
   `js/config.js`.
3. **Flip prototype mode off.** In the same file, set
   `PROTOTYPE_MODE_SKIP_LOGIN: false`.
4. **Confirm Google OAuth + Supabase URL config are done** — you already
   completed this earlier: Google Cloud OAuth client created, Client
   ID/Secret pasted into Supabase's Google provider, and Site
   URL/Redirect URLs set in Supabase → Authentication → URL
   Configuration.
5. **Commit and push.** GitHub Pages redeploys automatically.

## How manual grading actually works now

1. A student submits a mixed test — theory answers land in Supabase with
   `subjective_status = 'pending'`.
2. On `admin.html` → Submissions tab, that row gets a **Grade** button.
3. Clicking it shows every theory answer. Copy each question + student
   answer + your own answer key into your local LLM (`ollama run
   qwen3:8b` or similar), ask it to score against your rubric and name
   the topic.
4. Type the score, topic, and feedback into the form for each question,
   click **Save & mark graded**.
5. The student's progress page immediately shows the per-topic
   breakdown and what to revise.

## End-to-end test once the 5 steps above are done

1. Visit your live GitHub Pages URL, sign in with Google.
2. Check Supabase Table Editor → `profiles` — your row should appear
   with roll number 101.
3. On `admin.html`, sign in with the same admin email — dashboard should
   load.
4. Grant yourself access to a chapter from the admin console, confirm it
   unlocks on the student side.
5. Submit a mixed test with a theory question, confirm it shows up
   pending in the admin Submissions tab, grade it, confirm the report
   shows on your progress page.

---

## Round 2 additions — admin overhaul, math, detailed reports

New files: `report.html`, `js/report.js`, `css/report.css`, `js/math.js`.
Changed: `js/tests.js` (correct-answer lines, reference answers, live
math preview, topic tagging), `js/backend.js` (class-mean stats,
submission detail, multi-submission answer fetch), `js/admin.js` /
`admin.html` (new **Students** tab), `js/progress-page.js` (submissions
now link to the full report), `supabase/schema.sql` (new
`get_test_stats` aggregate function), `data/curriculum.js` (added
`topic` and `referenceAnswer` fields, demoed on the Squares & Cubes
mixed test as a working example).

**One more SQL statement to run** — your schema.sql already ran once,
so just add this new piece in the SQL Editor (safe to run standalone):

```sql
create function public.get_test_stats(p_test_id text)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'avgScore', avg(score),
    'avgTotalMcq', avg(total_mcq),
    'count', count(*)
  )
  from public.submissions
  where test_id = p_test_id;
$$;

grant execute on function public.get_test_stats(text) to authenticated;
```

**What's new to try:**
- **Math**: write `$x^2+1$` (inline) or `$$\frac{a}{b}$$` (block) in any
  note, question prompt, or theory answer — renders live via KaTeX. Two
  demo questions in the Squares & Cubes mixed test already use it.
- **Topic tags**: add `topic: "Some Topic"` to any question in
  `curriculum.js` (optional, backward compatible) — powers the topic
  breakdowns everywhere below. Untagged questions show up as "Untagged."
- **Reference answers**: add `referenceAnswer: "..."` to a `short`
  question — shown to the student right under their answer once they
  submit, separate from the whole-test answer key file.
- **Correct-answer line**: every MCQ now shows an explicit "Correct
  answer: …" line after submission, not just the color highlight.
- **Report page**: every submission (student's own progress page, or
  any submission row / student lookup in the admin console) now links
  to `report.html?id=...` — a dark, topic-by-topic breakdown with class
  average, question-by-question review, and correct answers, shared
  between student and admin views (RLS decides what each can see).
- **Admin → Students tab**: pick a class, then a subject, then search a
  student by roll number or email — see two Chart.js charts (MCQ
  accuracy, score-by-topic) and a list of every submission in that
  subject, each linking to its full report.

Commit and push as usual — GitHub Pages picks it up automatically.
