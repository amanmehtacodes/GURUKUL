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
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ2V5aGlmYm95dXBnbndqbnNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxODU1NDEsImV4cCI6MjEwMTc2MTU0MX0.CxmjJiAp5jphoQrAgw__omty0U5Q6D4VYjV8kWzJ91Q",

  // Optional: restrict logins to a specific email domain (e.g. a school
  // domain). Leave as null to allow any Google account.
  RESTRICT_DOMAIN: null, // e.g. "yourschool.edu"

  // PROTOTYPE MODE — off now that Supabase is configured. While true,
  // every test is unlocked without signing in and nothing is sent to
  // Supabase — flip back to true only if you want to browse/build
  // content without touching real login or data.
  PROTOTYPE_MODE_SKIP_LOGIN: false,
};

window.CONFIG = CONFIG;
