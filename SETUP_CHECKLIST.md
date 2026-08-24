# Gurukul — Setup Checklist (GitHub Pages + Supabase, manual LLM grading)

This supersedes the payment/backend parts of `SETUP.md` (which was written
for the old Google Sheets/Apps Script backend). It walks start to finish
through the lean stack from `ARCHITECTURE.md`: GitHub Pages frontend,
Supabase for auth/database, manual local-LLM grading (no automated
grading service for now), Razorpay automation added at the end as an
optional final phase.

Your Supabase project is already created:

- Project URL: `https://figeyhifboyupgnwjnsp.supabase.co`
- Google OAuth callback you'll need later: `https://figeyhifboyupgnwjnsp.supabase.co/auth/v1/callback`

Work through the phases in order. Each phase ends with a **Check** —
don't move to the next phase until the check passes.

---

## Phase 0 — Accounts needed

| Account                                | For                  | Status            |
| -------------------------------------- | -------------------- | ----------------- |
| GitHub                                 | Hosting the frontend | Set up in Phase 1 |
| Google Cloud Console                   | OAuth login          | Set up in Phase 2 |
| Supabase                               | Database + auth      | Already done      |
| Ollama (local install, not an account) | Manual grading       | Set up in Phase 7 |
| Razorpay                               | Payments             | Optional, Phase 8 |

---

## Phase 1 — Host the frontend on GitHub Pages

1. Create a GitHub account if you don't have one: github.com/signup.
2. Create a new repository — name it `gurukul` (or whatever you like),
   keep it **Public** (required for free GitHub Pages), don't initialize
   with a README (you already have files).
3. From inside your `edusite` folder, push it:
   ```bash
   cd /path/to/edusite
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/gurukul.git
   git push -u origin main
   ```
4. In the repo on GitHub: **Settings → Pages** → under "Build and
   deployment", set Source to **Deploy from a branch**, Branch to
   **main**, folder **/ (root)** → Save.
5. Wait 1–2 minutes. Your site will be live at:
   `https://YOUR_USERNAME.github.io/gurukul`

**Check:** open that URL in a browser. You should see the Gurukul home
page (class picker). It will look and work exactly as it does now —
nothing backend-related is wired up yet.

---

## Phase 2 — Google Sign-In via Supabase Auth

You're switching from the old manual Google Identity Services flow to
Supabase's built-in Google OAuth, which handles the session for you.

1. Go to console.cloud.google.com. Use the same Google project you may
   have started before, or create a new one (top-left project dropdown
   → New Project → name it "Gurukul").
2. **APIs & Services → OAuth consent screen**: User type **External**,
   fill in app name + your email as support/developer contact, save
   through the remaining tabs (defaults are fine), then under
   **Audience** click **Publish App** so any Google account can sign in.
3. **APIs & Services → Credentials → Create Credentials → OAuth Client
   ID**:
   - Application type: **Web application**
   - Authorized JavaScript origins: add both
     `https://YOUR_USERNAME.github.io` and `http://localhost:8000` (for
     local testing)
   - Authorized redirect URIs: add
     `https://figeyhifboyupgnwjnsp.supabase.co/auth/v1/callback`
     — this is the important one, it's Supabase's callback, not your
     site's URL.
   - Click **Create**. Copy the **Client ID** and **Client Secret**.
4. In Supabase dashboard: **Authentication → Providers → Google** →
   toggle it on → paste the Client ID and Client Secret → Save.
5. In Supabase dashboard: **Authentication → URL Configuration** → set
   **Site URL** to `https://YOUR_USERNAME.github.io/gurukul` and add it
   under **Redirect URLs** too (also add `http://localhost:8000/**` for
   local testing).

**Check:** in Supabase dashboard under Authentication → Providers,
Google should show as enabled (green). You can't fully test sign-in
until Phase 4 wires up the frontend — that's fine, come back to this
check after Phase 4.

---

## Phase 3 — Database schema + Row Level Security

Open Supabase dashboard → **SQL Editor → New query**, paste and run each
block below in order.

**3a. Profiles table (extends Supabase's built-in `auth.users`)**

```sql
create table public.profiles (
  id uuid references auth.users(id) primary key,
  email text,
  name text,
  role text default 'student' check (role in ('student','admin')),
  roll_number serial,
  created_at timestamptz default now()
);

create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

This makes a `profiles` row automatically every time someone signs in
for the first time.

**3b. The rest of the schema**

```sql
create table public.access_grants (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  grant_type text check (grant_type in ('class','chapter')),
  target_id text not null,
  granted_via text default 'manual' check (granted_via in ('manual','razorpay')),
  granted_at timestamptz default now()
);

create table public.submissions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  test_id text not null,
  submitted_at timestamptz default now(),
  mcq_score int,
  mcq_total int,
  subjective_status text default 'pending' check (subjective_status in ('pending','graded','n/a')),
  overall_report jsonb
);

create table public.submission_answers (
  id uuid default gen_random_uuid() primary key,
  submission_id uuid references public.submissions(id) not null,
  question_id text not null,
  question_type text,
  student_answer text,
  reference_answer text,
  llm_score numeric,
  llm_max_score numeric,
  topic_tag text,
  feedback_text text
);

create table public.progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  item_type text check (item_type in ('note','test')),
  item_id text not null,
  completed_at timestamptz default now()
);

create table public.payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  razorpay_order_id text,
  razorpay_payment_id text,
  amount numeric,
  status text,
  created_at timestamptz default now()
);
```

**3c. Row Level Security — lock every table down, then open specific
holes**

```sql
alter table public.profiles enable row level security;
alter table public.access_grants enable row level security;
alter table public.submissions enable row level security;
alter table public.submission_answers enable row level security;
alter table public.progress enable row level security;
alter table public.payments enable row level security;

create function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer;

-- profiles
create policy "read own profile" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
create policy "admin update profiles" on public.profiles
  for update using (public.is_admin());

-- access_grants
create policy "read own grants" on public.access_grants
  for select using (user_id = auth.uid() or public.is_admin());
create policy "admin manage grants" on public.access_grants
  for all using (public.is_admin());

-- submissions
create policy "read own submissions" on public.submissions
  for select using (user_id = auth.uid() or public.is_admin());
create policy "insert own submissions" on public.submissions
  for insert with check (user_id = auth.uid());
create policy "admin manage submissions" on public.submissions
  for all using (public.is_admin());

-- submission_answers
create policy "read own answers" on public.submission_answers
  for select using (
    exists (select 1 from public.submissions s
      where s.id = submission_id and (s.user_id = auth.uid() or public.is_admin()))
  );
create policy "insert own answers" on public.submission_answers
  for insert with check (
    exists (select 1 from public.submissions s
      where s.id = submission_id and s.user_id = auth.uid())
  );
create policy "admin manage answers" on public.submission_answers
  for all using (public.is_admin());

-- progress
create policy "read own progress" on public.progress
  for select using (user_id = auth.uid() or public.is_admin());
create policy "insert own progress" on public.progress
  for insert with check (user_id = auth.uid());
create policy "admin manage progress" on public.progress
  for all using (public.is_admin());

-- payments (admin-only read; writes come from the Edge Function later, which bypasses RLS)
create policy "admin read payments" on public.payments
  for select using (public.is_admin());
```

**3d. Make yourself admin**
You need at least one admin. Sign in once via the site first (after
Phase 4) so your `profiles` row exists, then in SQL Editor:

```sql
update public.profiles set role = 'admin' where email = 'your-email@gmail.com';
```

**Check:** in Supabase dashboard → **Table Editor**, you should see all
six tables listed (`profiles`, `access_grants`, `submissions`,
`submission_answers`, `progress`, `payments`), each with a shield icon
indicating RLS is on.

---

## Phase 4 — Wire the frontend to Supabase

1. Get your keys: Supabase dashboard → **Connect → API Keys** → copy
   the **Project URL** and the **anon public** key (not the
   service_role key — that one never goes in frontend code).
2. In `index.html`, add the Supabase client library before your other
   scripts:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
   ```
3. In `js/config.js`, replace the old Google/Apps-Script config with:
   ```js
   const CONFIG = {
     SUPABASE_URL: "https://figeyhifboyupgnwjnsp.supabase.co",
     SUPABASE_ANON_KEY: "PASTE_YOUR_ANON_KEY_HERE",
     PROTOTYPE_MODE_SKIP_LOGIN: false,
   };
   window.CONFIG = CONFIG;
   ```
4. Rewrite `js/auth.js` to use Supabase Auth instead of raw Google
   Identity Services:

   ```js
   const supabase = window.supabase.createClient(
     CONFIG.SUPABASE_URL,
     CONFIG.SUPABASE_ANON_KEY
   );

   function signInWithGoogle() {
     supabase.auth.signInWithOAuth({ provider: "google" });
   }

   function signOut() {
     supabase.auth.signOut();
   }

   supabase.auth.onAuthStateChange((event, session) => {
     // update your header's auth area, store session.user for later use
   });
   ```

5. Rewrite `js/backend.js` to read/write Supabase tables directly, e.g.:

   ```js
   async function getMyAccess() {
     const { data } = await supabase
       .from("access_grants")
       .select("*")
       .eq("user_id", supabase.auth.getUser().data.user.id);
     return data;
   }

   async function submitTest(testId, mcqScore, mcqTotal) {
     const { data } = await supabase
       .from("submissions")
       .insert({
         test_id: testId,
         mcq_score: mcqScore,
         mcq_total: mcqTotal,
       })
       .select()
       .single();
     return data;
   }
   ```

6. Commit and push — GitHub Pages redeploys automatically on push to
   `main`.

**Check:** open your live GitHub Pages URL, click sign in, complete the
Google OAuth flow. You should land back on the site logged in. Then in
Supabase **Table Editor → profiles**, confirm a new row appeared with
your email. This also completes the Phase 2 check.

---

## Phase 5 — Progress & access on the student side

1. On test submission, MCQ portion still grades client-side as before;
   `submitTest()` from Phase 4 saves the result.
2. For each note a student opens, call a small `markNoteRead(itemId)`
   function that inserts into `progress`.
3. On the progress page, query `progress` and `submissions` for the
   logged-in user's own ID and render as before — the display logic in
   `js/progress-page.js` barely changes, only the data-fetching calls do.
4. Gate locked content: before showing a chapter/test, query
   `access_grants` for the student's `user_id` and check if the
   chapter's class or chapter ID is present.

**Check:** as a test student account, open a note, complete an MCQ test,
then visit the progress page — both should show up. Then in Supabase
Table Editor, confirm matching rows exist in `progress` and
`submissions`.

---

## Phase 6 — Admin console

1. In `admin.html`, replace the shared-password gate with a Supabase
   sign-in check: after login, query your own `profiles` row and only
   render the admin UI if `role === 'admin'`. (RLS still enforces this
   server-side regardless of what the page shows — this is just UI
   gating, the real security is the policies from Phase 3c.)
2. Build these views, each backed by a direct Supabase query:
   - **Student list** — `select * from profiles`
   - **Grant access** — a small form that inserts into `access_grants`
     (pick student, grant_type, target_id)
   - **Submissions** — `select * from submissions` joined with
     `profiles` for names, most recent first
   - **Manual grade entry** — for a selected submission, a form listing
     its `submission_answers` rows with editable score/feedback fields,
     saving back with an `update`

**Check:** log in as your admin account, grant yourself (or a test
student) access to a chapter, confirm the grant appears in the
`access_grants` table and the student can now see that content.

---

## Phase 7 — Manual LLM grading workflow

No automated pipeline yet — this is the process you run yourself:

1. In the admin console, open a submission with `subjective_status = 'pending'`.
2. For each subjective answer, copy the question, the student's answer,
   and your reference answer key into your local Ollama chat (`ollama run qwen3:8b` in a terminal, or any chat UI in front of it).
3. Ask it to score against your rubric and name which topic the
   question covers.
4. Type the resulting score, max score, topic tag, and feedback into
   the admin's manual grade entry form from Phase 6 — this writes to
   `submission_answers`.
5. Once all questions in a submission are graded, update the
   submission's `subjective_status` to `'graded'` and fill in
   `overall_report` (a JSON summary of per-topic performance) so the
   student's results page can render it.

**Check:** as the test student, revisit that submission's result page —
the subjective score and topic-by-topic feedback should now display.

---

## Phase 8 — Razorpay automation (optional, add when ready)

Not required to launch — access grants can stay fully manual (Phase 6)
until you want this.

1. Sign up at razorpay.com, generate API keys (Dashboard → API Keys).
2. Install the Supabase CLI locally, then from your project folder:
   ```bash
   supabase functions new razorpay-webhook
   ```
3. Write the function to verify the Razorpay signature (using your
   webhook secret) and, on `payment.captured`, insert a row into
   `access_grants` using the service_role key (only used inside this
   function, never in frontend code).
4. Deploy: `supabase functions deploy razorpay-webhook`.
5. Copy the deployed function's URL, add it as a webhook endpoint in
   Razorpay Dashboard → Webhooks, selecting the `payment.captured`
   event.

**Check:** trigger a test payment in Razorpay's test mode, confirm a row
appears in `access_grants` with `granted_via = 'razorpay'` without you
touching the admin console.

---

## End-to-end verification (run through once everything above is done)

1. Open the live GitHub Pages URL in a private/incognito window.
2. Sign in with a test Google account.
3. Confirm a locked chapter shows as locked.
4. As admin, grant that chapter to the test account.
5. Confirm the chapter unlocks for the student without a page reload
   issue (re-login if needed).
6. Complete an MCQ test — confirm the score shows immediately and a row
   lands in `submissions`.
7. Complete a mixed test with subjective questions — confirm it shows
   "pending grading" to the student.
8. Grade it manually via Phase 7's workflow.
9. Confirm the student's results page updates with the topic-by-topic
   report.
10. Check the progress page reflects the completed test and any notes
    opened along the way.

If all ten pass, the full stack is running end to end.
