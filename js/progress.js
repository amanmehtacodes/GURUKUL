/**
 * PROGRESS MODULE
 * -----------------
 * Tracks which notes a student has marked "read" and which tests they've
 * completed, backed by the Progress tab in the Google Sheet (via
 * Apps Script). Also computes simple progress-bar stats per subject.
 *
 * Test completion is marked automatically on submit (see Tests module);
 * note "read" status is marked by a button the student clicks.
 */

const Progress = (() => {
  let items = new Map(); // itemId -> { itemType, status }
  let submissions = [];
  let loaded = false;
  let loadPromise = null;

  async function loadForCurrentUser() {
    const user = Auth.getUser();
    if (!user || !user.email || CONFIG.PROTOTYPE_MODE_SKIP_LOGIN) {
      items = new Map();
      submissions = [];
      loaded = true;
      return;
    }

    const result = await Backend.getProgress(user.email);
    if (result.status === "ok") {
      items = new Map(
        (result.progress || []).map((p) => [
          p.itemId,
          { itemType: p.itemType, status: p.status },
        ])
      );
      submissions = result.submissions || [];
    } else {
      items = new Map();
      submissions = [];
    }
    loaded = true;
  }

  function ensureLoaded() {
    if (!loadPromise) loadPromise = loadForCurrentUser();
    return loadPromise;
  }

  function reset() {
    items = new Map();
    submissions = [];
    loaded = false;
    loadPromise = null;
  }

  async function markNoteRead(noteId) {
    items.set(noteId, { itemType: "note", status: "read" });
    const user = Auth.getUser();
    if (user && !CONFIG.PROTOTYPE_MODE_SKIP_LOGIN) {
      await Backend.markProgress({
        email: user.email,
        itemId: noteId,
        itemType: "note",
        status: "read",
      });
    }
    if (window.Sidebar) Sidebar.refreshProgressMarks(doneItemIds());
  }

  function isNoteRead(noteId) {
    const entry = items.get(noteId);
    return !!entry && entry.status === "read";
  }

  /**
   * Called automatically after a test submission (from Tests module) —
   * marks the test done locally so the sidebar checkmark updates right
   * away, without waiting on a round trip.
   */
  function markTestDoneLocally(testId) {
    items.set(testId, { itemType: "test", status: "done" });
    if (window.Sidebar) Sidebar.refreshProgressMarks(doneItemIds());
  }

  function doneItemIds() {
    const ids = new Set();
    items.forEach((v, k) => {
      if (v.status === "read" || v.status === "done") ids.add(k);
    });
    return ids;
  }

  function getSubmissions() {
    return submissions;
  }

  /**
   * Walks the curriculum tree for one class/subject (or subject track)
   * and returns { notesTotal, notesRead, testsTotal, testsDone } for a
   * simple progress bar.
   */
  function statsFor(sectionsSource) {
    let notesTotal = 0,
      notesRead = 0,
      testsTotal = 0,
      testsDone = 0;
    (sectionsSource.sections || []).forEach((section) => {
      section.subsections.forEach((sub) => {
        (sub.notes || []).forEach((note) => {
          notesTotal++;
          if (isNoteRead(note.id)) notesRead++;
        });
        (sub.tests || []).forEach((test) => {
          testsTotal++;
          if (items.has(test.id)) testsDone++;
        });
      });
    });
    return { notesTotal, notesRead, testsTotal, testsDone };
  }

  /**
   * Same idea as statsFor, but scoped to a single chapter (section)
   * rather than a whole subject — used to show one progress bar per
   * chapter on the progress page.
   */
  function statsForSection(section) {
    let total = 0,
      done = 0;
    (section.subsections || []).forEach((sub) => {
      (sub.notes || []).forEach((note) => {
        total++;
        if (isNoteRead(note.id)) done++;
      });
      (sub.tests || []).forEach((test) => {
        total++;
        if (items.has(test.id)) done++;
      });
    });
    return { total, done };
  }

  return {
    ensureLoaded,
    reset,
    markNoteRead,
    isNoteRead,
    markTestDoneLocally,
    doneItemIds,
    getSubmissions,
    statsFor,
    statsForSection,
    isLoaded: () => loaded,
  };
})();

window.Progress = Progress;
