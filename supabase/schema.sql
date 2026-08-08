-- =============================================================
-- Gurukul — Supabase schema + Row Level Security
-- =============================================================
-- Run this entire file once in Supabase Dashboard -> SQL Editor -> New query.
-- It's safe to run top to bottom in a single paste.
--
-- Design note: unlike a typical Supabase schema keyed on auth.users(id),
-- every table here is keyed on the student's EMAIL. This matches the old
-- Google Sheets system's behavior on purpose: an admin can grant a
-- student access, or that access can be referenced, before that student
-- has ever signed in for the first time. auth.jwt() ->> 'email' is used
-- in every RLS policy to check "is this row mine?" without requiring a
-- join back to auth.users.
-- =============================================================

-- ---------------------------------------------------------------
-- 1. Admin allowlist — who can use /admin.html
-- ---------------------------------------------------------------
create table public.admin_emails (
  email text primary key
);

-- Add yourself as the first admin. Add more rows here later (via this
-- SQL editor, or Table Editor) for any co-admins.
insert into public.admin_emails (email) values ('amanmehtacodes@gmail.com');

-- SECURITY DEFINER so it can read admin_emails (which has RLS enabled
-- with zero policies below, meaning no one can read it directly) while
-- still being safely callable by any logged-in user to check themselves.
create function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_emails
    where email = auth.jwt() ->> 'email'
  );
$$;

grant execute on function public.is_admin() to authenticated, anon;

-- ---------------------------------------------------------------
-- 2. Profiles — auto-created on first sign-in, gives each student a
--    stable roll number (matches the old "starts at 101" behavior)
-- ---------------------------------------------------------------
create sequence public.roll_number_seq start 101;

create table public.profiles (
  id uuid references auth.users(id) primary key,
  email text unique not null,
  name text,
  roll_number int default nextval('public.roll_number_seq'),
  created_at timestamptz default now()
);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', new.email)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------
-- 3. Access grants — class-level or chapter-level, same shape as the
--    old Access sheet tab
-- ---------------------------------------------------------------
create table public.access_grants (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  grant_type text not null check (grant_type in ('class', 'chapter')),
  target_id text not null,
  granted_via text default 'manual' check (granted_via in ('manual', 'razorpay')),
  granted_at timestamptz default now(),
  unique (email, grant_type, target_id)
);

-- ---------------------------------------------------------------
-- 4. Submissions — one row per test attempt (mirrors the old
--    Submissions sheet tab, plus subjective-grading fields)
-- ---------------------------------------------------------------
create table public.submissions (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  name text,
  class_name text,
  subject text,
  section text,
  subsection text,
  test_id text,
  test text,
  test_kind text,
  score int,
  total_mcq int,
  subjective_status text default 'n/a' check (subjective_status in ('n/a', 'pending', 'graded')),
  overall_report jsonb,
  submitted_at timestamptz default now()
);

-- 5. Submission answers — question-by-question detail. For MCQ rows,
--    correct is true/false and the LLM/grading fields stay null. For
--    theory ("short") rows, correct stays null until you grade it
--    manually via the admin console.
create table public.submission_answers (
  id uuid default gen_random_uuid() primary key,
  submission_id uuid references public.submissions(id) on delete cascade not null,
  question_type text default 'mcq' check (question_type in ('mcq', 'short')),
  question_prompt text,
  student_answer text,
  correct boolean,
  reference_answer text,
  llm_score numeric,
  llm_max_score numeric,
  topic_tag text,
  feedback_text text,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------
-- 6. Progress — notes read / tests done
-- ---------------------------------------------------------------
create table public.progress (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  item_id text not null,
  item_type text not null check (item_type in ('note', 'test')),
  status text not null,
  updated_at timestamptz default now(),
  unique (email, item_id)
);

-- ---------------------------------------------------------------
-- 7. Payments — not used yet (Razorpay automation is a later phase),
--    created now so the table exists and RLS is ready when you add it
-- ---------------------------------------------------------------
create table public.payments (
  id uuid default gen_random_uuid() primary key,
  email text,
  razorpay_order_id text,
  razorpay_payment_id text,
  amount numeric,
  status text,
  created_at timestamptz default now()
);

-- =============================================================
-- Row Level Security — lock every table down by default, then open
-- specific holes: a student can read/write their own rows (matched by
-- email in their JWT), an admin can read/write everything.
-- =============================================================

alter table public.admin_emails enable row level security;
-- Intentionally zero policies on admin_emails: nobody using the anon or
-- authenticated key can read or write it directly, from the frontend or
-- the admin console. Manage it only from this SQL editor / Table Editor.

alter table public.profiles enable row level security;
alter table public.access_grants enable row level security;
alter table public.submissions enable row level security;
alter table public.submission_answers enable row level security;
alter table public.progress enable row level security;
alter table public.payments enable row level security;

-- profiles
create policy "read own or admin" on public.profiles
  for select using (email = auth.jwt() ->> 'email' or public.is_admin());

-- access_grants
create policy "read own or admin" on public.access_grants
  for select using (email = auth.jwt() ->> 'email' or public.is_admin());
create policy "admin insert" on public.access_grants
  for insert with check (public.is_admin());
create policy "admin update" on public.access_grants
  for update using (public.is_admin());
create policy "admin delete" on public.access_grants
  for delete using (public.is_admin());

-- submissions
create policy "read own or admin" on public.submissions
  for select using (email = auth.jwt() ->> 'email' or public.is_admin());
create policy "insert own" on public.submissions
  for insert with check (email = auth.jwt() ->> 'email');
create policy "admin update" on public.submissions
  for update using (public.is_admin());

-- submission_answers (ownership follows the parent submission's email)
create policy "read own or admin" on public.submission_answers
  for select using (
    exists (
      select 1 from public.submissions s
      where s.id = submission_id
        and (s.email = auth.jwt() ->> 'email' or public.is_admin())
    )
  );
create policy "insert own" on public.submission_answers
  for insert with check (
    exists (
      select 1 from public.submissions s
      where s.id = submission_id and s.email = auth.jwt() ->> 'email'
    )
  );
create policy "admin update" on public.submission_answers
  for update using (public.is_admin());

-- progress
create policy "read own or admin" on public.progress
  for select using (email = auth.jwt() ->> 'email' or public.is_admin());
create policy "insert own" on public.progress
  for insert with check (email = auth.jwt() ->> 'email');
create policy "update own or admin" on public.progress
  for update using (email = auth.jwt() ->> 'email' or public.is_admin());

-- payments (admin-read only for now; writes will come later from a
-- service-role Edge Function, which bypasses RLS entirely)
create policy "admin read" on public.payments
  for select using (public.is_admin());

-- =============================================================
-- Done. Check: Table Editor should now show 7 tables, each with a
-- shield icon (RLS on). Sign in on the live site once, then in the SQL
-- Editor run:
--   select * from public.profiles;
-- to confirm your own row appeared with a roll_number of 101.
-- =============================================================
