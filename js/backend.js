/**
 * BACKEND MODULE
 * ---------------
 * Thin wrapper around fetch() calls to the Apps Script backend (see
 * apps-script.gs). Centralizes the URL, error handling, and response
 * shape so every other module (access control, progress, admin) talks
 * to the backend the same way.
 *
 * All calls are best-effort: if APPS_SCRIPT_URL isn't configured yet,
 * or the network fails, calls resolve to a clear "unavailable" result
 * rather than throwing — the rest of the app should degrade gracefully
 * (e.g. treat "no access data" as "nothing unlocked yet" rather than
 * crashing).
 */

const Backend = (() => {
  function isConfigured() {
    return !!(CONFIG.APPS_SCRIPT_URL && !CONFIG.APPS_SCRIPT_URL.includes("YOUR_DEPLOYMENT_ID"));
  }

  async function get(action, params) {
    if (!isConfigured()) return { status: "unavailable", message: "APPS_SCRIPT_URL is not configured in js/config.js." };
    const url = new URL(CONFIG.APPS_SCRIPT_URL);
    url.searchParams.set("action", action);
    Object.entries(params || {}).forEach(([k, v]) => url.searchParams.set(k, v));

    try {
      const res = await fetch(url.toString());
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.warn("Backend GET non-OK:", action, res.status, text);
        return { status: "unavailable", message: `Backend responded ${res.status}. Check the deployment is live and set to "Anyone" access.` };
      }
      const json = await res.json();
      return json;
    } catch (err) {
      console.warn("Backend GET failed:", action, err);
      return { status: "unavailable", message: `Request failed: ${err.message}. Open the browser console for details.` };
    }
  }

  /**
   * POST is fire-and-forget friendly (no-cors) for write-only calls like
   * submitTest, matching the existing pattern — but admin/progress calls
   * need the actual JSON response, so those use a CORS-mode request and
   * accept that it may fail silently on some deployments until the Apps
   * Script's CORS headers are confirmed working (see SETUP.md).
   */
  async function post(action, payload, { expectResponse } = {}) {
    if (!isConfigured()) return { status: "unavailable" };
    const body = JSON.stringify(Object.assign({ action }, payload));

    try {
      if (expectResponse) {
        const res = await fetch(CONFIG.APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body,
        });
        return await res.json();
      }
      await fetch(CONFIG.APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body,
      });
      return { status: "ok" };
    } catch (err) {
      console.warn("Backend POST failed:", action, err.message);
      return { status: "unavailable" };
    }
  }

  return {
    isConfigured,
    checkAccess: (email) => get("checkAccess", { email }),
    getProgress: (email) => get("getProgress", { email }),
    submitTest: (payload) => post("submitTest", payload, { expectResponse: false }),
    markProgress: (payload) => post("markProgress", payload, { expectResponse: true }),
    adminList: (password) => get("adminList", { password }),
    adminGrant: (payload) => post("adminGrant", payload, { expectResponse: true }),
    adminRevoke: (payload) => post("adminRevoke", payload, { expectResponse: true }),
  };
})();

window.Backend = Backend;
