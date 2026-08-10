/**
 * ACCESS CONTROL MODULE
 * -----------------------
 * Once a student is signed in, fetches their access grants from the
 * backend (Google Sheet via Apps Script) and answers "can this student
 * open this chapter?" for the rest of the app.
 *
 * Grants come in two forms (see apps-script.gs "Access" tab):
 *   - { type: "class", value: "class-9" }                    -> unlocks
 *     every chapter across every subject in that class/year.
 *   - { type: "chapter", value: "class-9-maths-power-play" }  -> unlocks
 *     just that one chapter.
 *
 * This lets a JEE/NEET student get a class-level grant for "class-11"
 * and "class-12" (full board access) alongside their JEE-specific
 * access, or a Class 11 student get a single old chapter's access for
 * revision (e.g. "class-9-maths-power-play") without unlocking all of
 * Class 9.
 *
 * Chapter ids match the section `id` values already used in
 * curriculum.js (e.g. "c8-ch5-number-play", "squares-and-cubes").
 */

const AccessControl = (() => {
  let grants = [];
  let rollNumber = null;
  let loaded = false;
  let loadPromise = null;

  async function loadForCurrentUser() {
    const user = Auth.getUser();
    if (!user || !user.email) {
      grants = [];
      rollNumber = null;
      loaded = true;
      return;
    }

    if (CONFIG.PROTOTYPE_MODE_SKIP_LOGIN) {
      // Prototype mode already unlocks every test at the Tests module
      // level; access grants aren't meaningful here, so skip the call.
      grants = [];
      rollNumber = null;
      loaded = true;
      return;
    }

    const result = await Backend.checkAccess(user.email);
    if (result.status === "ok") {
      grants = result.grants || [];
      rollNumber = result.rollNumber || null;
    } else {
      grants = [];
      rollNumber = null;
    }
    loaded = true;
  }

  function ensureLoaded() {
    if (!loadPromise) loadPromise = loadForCurrentUser();
    return loadPromise;
  }

  function reset() {
    grants = [];
    rollNumber = null;
    loaded = false;
    loadPromise = null;
  }

  function hasChapterAccess(classId, chapterSectionId) {
    if (CONFIG.PROTOTYPE_MODE_SKIP_LOGIN) return true;
    if (!Backend.isConfigured()) return true; // no backend configured yet — don't block testing
    return grants.some(
      (g) =>
        (g.type === "class" && g.value === classId) ||
        (g.type === "chapter" && g.value === chapterSectionId)
    );
  }

  function getRollNumber() {
    return rollNumber;
  }

  function isLoaded() {
    return loaded;
  }

  // Raw grant list, for views (like the progress page) that need to
  // enumerate every class/chapter the student is subscribed to, not just
  // answer yes/no for one chapter at a time.
  function getGrants() {
    return grants.slice();
  }

  return { ensureLoaded, reset, hasChapterAccess, getRollNumber, isLoaded, getGrants };
})();

window.AccessControl = AccessControl;
