/**
 * AUTH MODULE
 * -----------
 * Wraps Google Identity Services (GIS) for sign-in, and exposes
 * a simple event so the rest of the app can react to login state.
 *
 * Stores the decoded profile + raw credential in sessionStorage so a
 * page refresh doesn't force a re-login within the same tab session.
 */

const Auth = (() => {
  let currentUser = null; // { name, email, picture, sub, credential }
  let ready = false; // true once google.accounts.id has been initialized
  const listeners = [];
  const readyListeners = [];

  function onChange(fn) {
    listeners.push(fn);
  }

  function onReady(fn) {
    readyListeners.push(fn);
  }

  function notify() {
    listeners.forEach((fn) => fn(currentUser));
  }

  function notifyReady() {
    readyListeners.forEach((fn) => fn());
  }

  function decodeJwt(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Failed to decode JWT", e);
      return null;
    }
  }

  function handleCredentialResponse(response) {
    const payload = decodeJwt(response.credential);
    if (!payload) return;

    if (CONFIG.RESTRICT_DOMAIN && payload.hd !== CONFIG.RESTRICT_DOMAIN) {
      alert(
        `Access is restricted to @${CONFIG.RESTRICT_DOMAIN} accounts. ` +
        `You signed in with ${payload.email}.`
      );
      return;
    }

    currentUser = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      sub: payload.sub, // stable Google account ID — used as "account number"
      credential: response.credential,
    };

    sessionStorage.setItem("edu_user", JSON.stringify(currentUser));
    notify();
  }

  // Placeholder identity used only when CONFIG.PROTOTYPE_MODE_SKIP_LOGIN
  // is true. Clearly labeled so it's never mistaken for a real account —
  // any test submissions made in this mode should be treated as scratch
  // data, not real student records.
  const PROTOTYPE_USER = {
    name: "Prototype Tester",
    email: "prototype-tester@local.test",
    picture: "",
    sub: "prototype-local",
    credential: null,
  };

  function init() {
    if (CONFIG.PROTOTYPE_MODE_SKIP_LOGIN) {
      currentUser = PROTOTYPE_USER;
      return;
    }

    // Restore session if present — this works regardless of whether
    // Google's script has loaded, since it only reads our own storage.
    const saved = sessionStorage.getItem("edu_user");
    if (saved) {
      try {
        currentUser = JSON.parse(saved);
      } catch (e) {
        sessionStorage.removeItem("edu_user");
      }
    }
  }

  function attachGoogle() {
    if (!window.google || !window.google.accounts) {
      console.warn("Google Identity Services script not loaded yet.");
      return false;
    }

    google.accounts.id.initialize({
      client_id: CONFIG.GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
    });

    return true;
  }

  function renderButton(container) {
    if (!window.google || !window.google.accounts) return;
    google.accounts.id.renderButton(container, {
      theme: "outline",
      size: "medium",
      shape: "rectangular",
      text: "signin_with",
    });
  }

  function promptSignIn() {
    if (!window.google || !window.google.accounts) {
      alert(
        "Google Sign-In isn't configured yet. Add your Client ID in js/config.js — see SETUP.md."
      );
      return;
    }
    google.accounts.id.prompt();
  }

  function signOut() {
    currentUser = null;
    sessionStorage.removeItem("edu_user");
    if (window.google && window.google.accounts) {
      google.accounts.id.disableAutoSelect();
    }
    notify();
  }

  function getUser() {
    return currentUser;
  }

  function isLoggedIn() {
    return !!currentUser;
  }

  return { init, attachGoogle, renderButton, promptSignIn, signOut, getUser, isLoggedIn, onChange };
})();

window.Auth = Auth;
