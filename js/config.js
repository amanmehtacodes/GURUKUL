/**
 * ============================================================
 * SITE CONFIGURATION — EDIT THIS FILE
 * ============================================================
 * You must fill in the two values below before login and
 * test-submission will work. See SETUP.md for full instructions.
 */

const CONFIG = {
  // 1. Google OAuth Client ID
  //    Get this from https://console.cloud.google.com/apis/credentials
  //    Create an "OAuth client ID" of type "Web application" and add
  //    your site's URL (e.g. https://yoursite.netlify.app) under
  //    "Authorized JavaScript origins".
  GOOGLE_CLIENT_ID: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",

  // 2. Google Apps Script Web App URL
  //    This receives test answers and writes them into your Google Sheet.
  //    Follow SETUP.md to deploy the included Apps Script and paste the
  //    resulting /exec URL here.
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwTk9_oA7gseG0xc--sLLeaEiqWxSFCvalvYNNDjh7bMo-FHjVvvUsRDmY6V3r5MCw/exec",

  // Optional: restrict logins to a specific email domain (e.g. a school
  // domain). Leave as null to allow any Google account.
  RESTRICT_DOMAIN: null, // e.g. "yourschool.edu"

  // PROTOTYPE MODE — set to false before any real deployment.
  // While true, every test is unlocked without signing in, so you can
  // build and click through content freely. Submissions in this mode are
  // NOT tied to a real identity — a placeholder "Prototype Tester"
  // account is used. Set to false to restore the normal Google Sign-In
  // gate on tests.
  PROTOTYPE_MODE_SKIP_LOGIN: true,
};

window.CONFIG = CONFIG;
