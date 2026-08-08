/**
 * ============================================================
 * SITE CONFIGURATION — EDIT THIS FILE
 * ============================================================
 * Two values below must be filled in before login, database reads/
 * writes, and the admin console will work. See SETUP_CHECKLIST.md for
 * full step-by-step instructions.
 */

const CONFIG = {
  // 1. Supabase project URL — already set to your project.
  SUPABASE_URL: "https://figeyhifboyupgnwjnsp.supabase.co",

  // 2. Supabase anon (public) key.
  //    Get this from Supabase Dashboard -> Connect -> API Keys -> "anon public".
  //    This key is safe to ship in frontend code — it has no power on its
  //    own beyond what your Row Level Security policies (schema.sql) allow.
  SUPABASE_ANON_KEY: "YOUR_SUPABASE_ANON_KEY",

  // Optional: restrict logins to a specific email domain (e.g. a school
  // domain). Leave as null to allow any Google account.
  RESTRICT_DOMAIN: null, // e.g. "yourschool.edu"

  // PROTOTYPE MODE — set to false once SUPABASE_ANON_KEY above is filled
  // in and supabase/schema.sql has been run in the SQL Editor.
  // While true, every test is unlocked without signing in, so you can
  // build and click through content freely. Submissions in this mode are
  // NOT tied to a real identity and are never sent to Supabase — a
  // placeholder "Prototype Tester" account is used instead.
  PROTOTYPE_MODE_SKIP_LOGIN: true,
};

window.CONFIG = CONFIG;
