/**
 * AUTH MODULE
 * -----------
 * Wraps Supabase Auth's Google OAuth sign-in, and exposes the same
 * small event-driven API the rest of the app already relies on
 * (getUser, isLoggedIn, onChange, renderButton, signOut) so app.js,
 * tests.js, notes.js etc. didn't need to change.
 *
 * Session state itself is handled entirely by Supabase (stored in
 * localStorage under the hood) — this module just mirrors it into a
 * simple { name, email, picture, sub } shape the rest of the app
 * already expects.
 */

const Auth = (() => {
  let supabase = null;
  let currentUser = null; // { name, email, picture, sub, credential }
  const listeners = [];

  function onChange(fn) {
    listeners.push(fn);
  }

  function notify() {
    listeners.forEach((fn) => fn(currentUser));
  }

  function mapUser(sbUser) {
    if (!sbUser) return null;
    const meta = sbUser.user_metadata || {};
    return {
      name: meta.full_name || meta.name || sbUser.email,
      email: sbUser.email,
      picture: meta.avatar_url || meta.picture || "",
      sub: sbUser.id, // Supabase auth user UUID — stable per-account id
      credential: null, // no raw JWT surfaced to the rest of the app anymore
    };
  }

  // Placeholder identity used only when CONFIG.PROTOTYPE_MODE_SKIP_LOGIN
  // is true. Clearly labeled so it's never mistaken for a real account —
  // any test submissions made in this mode are scratch data and are never
  // sent to Supabase (see Backend/Progress/AccessControl's own checks).
  const PROTOTYPE_USER = {
    name: "Prototype Tester",
    email: "prototype-tester@local.test",
    picture: "",
    sub: "prototype-local",
    credential: null,
  };

  async function init() {
    if (CONFIG.PROTOTYPE_MODE_SKIP_LOGIN) {
      currentUser = PROTOTYPE_USER;
      return;
    }

    if (!window.supabase || !window.supabase.createClient) {
      console.error("Supabase client library failed to load — check the script tag in index.html/admin.html.");
      return;
    }

    supabase = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

    const { data } = await supabase.auth.getSession();
    currentUser = mapUser(data.session ? data.session.user : null);
    enforceDomainRestriction();

    supabase.auth.onAuthStateChange((_event, session) => {
      currentUser = mapUser(session ? session.user : null);
      enforceDomainRestriction();
      notify();
    });
  }

  function enforceDomainRestriction() {
    if (!currentUser || !CONFIG.RESTRICT_DOMAIN) return;
    const domain = currentUser.email.split("@")[1];
    if (domain !== CONFIG.RESTRICT_DOMAIN) {
      alert(
        `Access is restricted to @${CONFIG.RESTRICT_DOMAIN} accounts. ` +
        `You signed in with ${currentUser.email}.`
      );
      signOut();
    }
  }

  function signInWithGoogle() {
    if (!supabase) {
      alert("Supabase isn't configured yet — add SUPABASE_ANON_KEY in js/config.js. See SETUP_CHECKLIST.md.");
      return;
    }
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.href.split("#")[0] },
    });
  }

  // Kept for compatibility with app.js's boot sequence, which calls this
  // after DOMContentLoaded expecting a Google SDK attach step. There's
  // nothing to attach anymore — Supabase handles the OAuth flow via
  // redirect rather than an embedded widget — so this is a no-op that
  // always reports success.
  function attachGoogle() {
    return true;
  }

  function renderButton(container) {
    if (!container) return;
    container.innerHTML = "";
    if (CONFIG.PROTOTYPE_MODE_SKIP_LOGIN) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn google-signin-btn";
    btn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.95v2.33A9 9 0 009 18z"/><path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 013.68 9c0-.6.1-1.18.29-1.72V4.95H.95A9 9 0 000 9c0 1.45.35 2.83.95 4.05l3.02-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0A9 9 0 00.95 4.95l3.02 2.33C4.68 5.16 6.66 3.58 9 3.58z"/></svg>
      Sign in with Google
    `;
    btn.addEventListener("click", () => signInWithGoogle());
    container.appendChild(btn);
  }

  function promptSignIn() {
    signInWithGoogle();
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    currentUser = null;
    notify();
  }

  function getUser() {
    return currentUser;
  }

  function isLoggedIn() {
    return !!currentUser;
  }

  function getClient() {
    return supabase;
  }

  return {
    init,
    attachGoogle,
    renderButton,
    promptSignIn,
    signOut,
    getUser,
    isLoggedIn,
    onChange,
    getClient,
  };
})();

window.Auth = Auth;
