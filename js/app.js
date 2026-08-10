/**
 * APP MODULE
 * ----------
 * Boots the site and handles routing between:
 *   1. Class picker (landing view — VIII through XII, plus JEE/NEET tracks)
 *   2. Year picker (JEE/NEET only — choose XI or XII)
 *   3. Subject picker (icon cards — Maths, Physics, Chemistry, ...)
 *   4. Subject + curriculum tree (sidebar) for the chosen subject
 *   5. Note view / Test view / Coming Soon, in the main pane
 */

(function () {
  const sidebarEl = document.getElementById("sidebar");
  const mainEl = document.getElementById("mainContent");
  const authAreaEl = document.getElementById("authArea");
  const progressLinkEl = document.getElementById("progressLink");
  const sidebarToggleBtn = document.getElementById("sidebarToggle");
  const appShellEl = document.querySelector(".app-shell");
  const pickerRootEl = document.getElementById("pickerRoot");
  const yearRootEl = document.getElementById("yearRoot");
  const subjectRootEl = document.getElementById("subjectRoot");
  const trackRootEl = document.getElementById("trackRoot");
  const progressRootEl = document.getElementById("progressRoot");

  let view = "picker"; // "picker" | "years" | "subjects" | "tracks" | "books" | "class" | "progress"
  let previousView = null; // where to return to when leaving the progress page
  let activeTrack = null; // the JEE/NEET entry, if on that path
  let activeClass = null; // the class/year object (has .subjects)
  let activeSubject = null;
  let activeSubjectTrack = null; // the Language/Literature track within a subject, if any
  let activeBook = null; // a book track nested inside activeSubjectTrack (e.g. Hornbill inside Literature), if any
  let current = null; // { type, section, sub, item } within a subject

  function renderAuthArea() {
    const user = Auth.getUser();
    authAreaEl.innerHTML = "";
    progressLinkEl.innerHTML = "";

    if (user) {
      const link = document.createElement("button");
      link.className = "btn btn-ghost btn-sm progress-link-btn";
      link.innerHTML = `<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 13.5V9M6 13.5V5M10 13.5V7.5M14 13.5V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg> My progress`;
      link.addEventListener("click", () => showProgress());
      progressLinkEl.appendChild(link);
    }

    if (user && CONFIG.PROTOTYPE_MODE_SKIP_LOGIN) {
      const chip = document.createElement("div");
      chip.className = "user-chip prototype-chip";
      chip.innerHTML = `
        <span class="prototype-dot"></span>
        <span class="name">Prototype mode — login skipped</span>
      `;
      authAreaEl.appendChild(chip);
    } else if (user) {
      const chip = document.createElement("div");
      chip.className = "user-chip";
      chip.innerHTML = `
        <img src="${user.picture}" alt="${escapeHtml(user.name)}" referrerpolicy="no-referrer">
        <span class="name">${escapeHtml(user.name)}</span>
      `;
      const signOutBtn = document.createElement("button");
      signOutBtn.className = "btn btn-ghost btn-sm";
      signOutBtn.textContent = "Sign out";
      signOutBtn.addEventListener("click", () => Auth.signOut());

      authAreaEl.appendChild(chip);
      authAreaEl.appendChild(signOutBtn);
    } else {
      const host = document.createElement("div");
      authAreaEl.appendChild(host);
      Auth.renderButton(host);
    }
  }

  // Tints the fixed site header with the active subject's color — same
  // vars Sidebar uses for its own panel, applied directly to .site-header
  // since it's a sibling of the sidebar, not an ancestor (so CSS
  // inheritance alone can't carry the color across). Cleared (null) on
  // every picker/back screen where no single subject is "open".
  function setHeaderAccent(subjectKey) {
    const headerEl = document.querySelector(".site-header");
    if (!headerEl) return;
    headerEl.classList.remove("subject-tinted");
    headerEl.style.removeProperty("--header-accent");
    headerEl.style.removeProperty("--header-accent-panel");
    if (subjectKey && window.SubjectColors) {
      const vars = SubjectColors.varsFor(subjectKey);
      headerEl.style.setProperty("--header-accent", vars.bold);
      headerEl.style.setProperty("--header-accent-panel", vars.panel);
      headerEl.classList.add("subject-tinted");
    }
  }

  function renderEmptyState() {
    mainEl.innerHTML = `
      <div class="empty-state">
        <svg class="glyph" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" stroke="currentColor" stroke-width="1.2"/><path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        <h2>Select a topic to begin</h2>
        <p>Choose a section from the left to open its notes, or start a test once you're signed in.</p>
      </div>
    `;
  }

  function hideAllViews() {
    pickerRootEl.classList.add("hidden");
    yearRootEl.classList.add("hidden");
    subjectRootEl.classList.add("hidden");
    trackRootEl.classList.add("hidden");
    progressRootEl.classList.add("hidden");
    appShellEl.classList.add("hidden");
  }

  function showProgress() {
    previousView = view;
    view = "progress";
    hideAllViews();
    progressRootEl.classList.remove("hidden");
    document.querySelector(".site-header").classList.add("header-picker");
    setHeaderAccent(null);
    ProgressPage.render(progressRootEl, { onBack: backFromProgress });
    window.scrollTo(0, 0);
  }

  function backFromProgress() {
    if (previousView === "class" && activeSubject) {
      enterSidebar();
    } else if (previousView === "books" && activeSubjectTrack) {
      showBooks(activeSubjectTrack);
    } else if (previousView === "tracks" && activeSubject) {
      showTracks(activeSubject);
    } else if (previousView === "subjects" && activeClass) {
      showSubjects(activeClass);
    } else if (previousView === "years" && activeTrack) {
      showYears(activeTrack);
    } else {
      showPicker();
    }
  }

  function showPicker() {
    view = "picker";
    activeTrack = null;
    activeClass = null;
    activeSubject = null;
    activeSubjectTrack = null;
    activeBook = null;
    current = null;
    hideAllViews();
    pickerRootEl.classList.remove("hidden");
    document.querySelector(".site-header").classList.add("header-picker");
    setHeaderAccent(null);
    ClassPicker.render(pickerRootEl);
    window.scrollTo(0, 0);
  }

  function handleClassPick(entry) {
    if (entry.type === "exam") {
      showYears(entry);
    } else {
      showSubjects(entry);
    }
  }

  function showYears(track) {
    view = "years";
    activeTrack = track;
    activeClass = null;
    activeSubject = null;
    activeSubjectTrack = null;
    activeBook = null;
    current = null;
    hideAllViews();
    yearRootEl.classList.remove("hidden");
    document.querySelector(".site-header").classList.add("header-picker");
    setHeaderAccent(null);
    YearPicker.render(yearRootEl, { track });
    window.scrollTo(0, 0);
  }

  function showSubjects(cls) {
    view = "subjects";
    activeClass = cls;
    activeSubject = null;
    activeSubjectTrack = null;
    activeBook = null;
    current = null;
    hideAllViews();
    subjectRootEl.classList.remove("hidden");
    document.querySelector(".site-header").classList.add("header-picker");
    setHeaderAccent(null);
    SubjectPicker.render(subjectRootEl, { cls, track: activeTrack });
    window.scrollTo(0, 0);
  }

  function handleSubjectPick(subject) {
    activeSubject = subject;
    activeSubjectTrack = null;
    activeBook = null;
    if (subject.tracks && subject.tracks.length) {
      showTracks(subject);
    } else {
      enterSidebar();
    }
  }

  function showTracks(subject) {
    view = "tracks";
    activeSubjectTrack = null;
    activeBook = null;
    current = null;
    hideAllViews();
    trackRootEl.classList.remove("hidden");
    document.querySelector(".site-header").classList.add("header-picker");
    setHeaderAccent(null);
    TrackPicker.setOnPick(handleTopTrackPick);
    TrackPicker.setOnChangeSubject(backToSubjects);
    TrackPicker.render(trackRootEl, { cls: activeClass, subject });
    window.scrollTo(0, 0);
  }

  // A picked track can itself split further into books (e.g. Literature ->
  // Hornbill / Snapshots / Woven Words) — in that case, show a second
  // icon-card picker scoped to those books instead of entering the sidebar.
  function handleTopTrackPick(track) {
    activeSubjectTrack = track;
    activeBook = null;
    if (track.tracks && track.tracks.length) {
      showBooks(track);
    } else {
      enterSidebar();
    }
  }

  function showBooks(track) {
    view = "books";
    activeBook = null;
    current = null;
    hideAllViews();
    trackRootEl.classList.remove("hidden");
    document.querySelector(".site-header").classList.add("header-picker");
    setHeaderAccent(null);
    TrackPicker.setOnPick(handleBookPick);
    TrackPicker.setOnChangeSubject(() => showTracks(activeSubject));
    // TrackPicker just needs something shaped like { title, tracks }, so
    // the parent track (Literature) doubles as the "subject" here.
    TrackPicker.render(trackRootEl, {
      cls: activeClass,
      subject: track,
      backLabel: `${activeSubject.title} tracks`,
      heading: "Choose a book",
      subheading: "Pick a book to see its chapters.",
    });
    window.scrollTo(0, 0);
  }

  function handleBookPick(book) {
    activeBook = book;
    enterSidebar();
  }

  function enterSidebar() {
    view = "class";
    current = null;
    hideAllViews();
    appShellEl.classList.remove("hidden");
    document.querySelector(".site-header").classList.remove("header-picker");
    setHeaderAccent(activeSubject && (activeSubject.icon || activeSubject.id));
    // Small bridge so Tests.js can attach class/subject names to a
    // submission payload without threading them through every call.
    window.__gurukulActiveClassName = activeClass ? activeClass.name : "";
    window.__gurukulActiveSubjectName = activeSubject ? activeSubject.title : "";
    renderSidebar();
    renderMain();
    window.scrollTo(0, 0);
  }

  function backToSubjects() {
    if (activeClass) showSubjects(activeClass);
    else showPicker();
  }

  function backToTracksOrSubjects() {
    if (activeBook && activeSubjectTrack) {
      showBooks(activeSubjectTrack);
    } else if (activeSubject && activeSubject.tracks && activeSubject.tracks.length) {
      showTracks(activeSubject);
    } else {
      backToSubjects();
    }
  }

  function backFromSubjects() {
    if (activeTrack) showYears(activeTrack);
    else showPicker();
  }

  function renderSidebar() {
    const sectionsSource = activeBook || activeSubjectTrack || activeSubject;
    Sidebar.render(sidebarEl, {
      loggedIn: Auth.isLoggedIn(),
      cls: activeClass,
      subject: activeSubject,
      subjectTrack: activeBook || activeSubjectTrack,
      sectionsSource,
    });
    if (window.Progress) Sidebar.refreshProgressMarks(Progress.doneItemIds());
  }

  function renderMain() {
    const sectionsSource = activeBook || activeSubjectTrack || activeSubject;

    if (!sectionsSource || !sectionsSource.ready || !sectionsSource.sections) {
      mainEl.style.removeProperty("--section-accent");
      mainEl.style.removeProperty("--section-accent-soft");
      ComingSoon.render(mainEl, {
        className: activeClass.name,
        subjectTitle: sectionsSource ? sectionsSource.title : "This subject",
      });
      return;
    }

    if (!current) {
      mainEl.style.removeProperty("--section-accent");
      mainEl.style.removeProperty("--section-accent-soft");
      renderEmptyState();
      return;
    }

    const colors = Sidebar.colorVarsFor(current.section.id);
    mainEl.style.setProperty("--section-accent", colors.accent);
    mainEl.style.setProperty("--section-accent-soft", colors.soft);

    if (current.type === "note") {
      Notes.renderNote(mainEl, current);
    } else if (current.type === "test") {
      if (!Auth.isLoggedIn()) {
        Tests.renderLocked(mainEl, current);
      } else if (!AccessControl.hasChapterAccess(activeClass.id, current.section.id)) {
        Tests.renderNeedsAccess(mainEl, current);
      } else {
        Tests.renderTest(mainEl, current);
      }
    }
  }

  function handleSelect(type, section, sub, item) {
    current = { type, section, sub, item, [type === "note" ? "note" : "test"]: item };
    renderMain();
    if (window.innerWidth <= 860) sidebarEl.classList.remove("open");
  }

  /**
   * Copy protection: prevents right-click, copy/cut, and text selection
   * via keyboard shortcuts on note/test content. PDF export still works
   * because it renders the DOM directly (html2pdf) rather than relying
   * on the clipboard.
   */
  function initCopyProtection() {
    mainEl.classList.add("no-copy");

    mainEl.addEventListener("contextmenu", (e) => e.preventDefault());
    mainEl.addEventListener("copy", (e) => e.preventDefault());
    mainEl.addEventListener("cut", (e) => e.preventDefault());
    mainEl.addEventListener("dragstart", (e) => e.preventDefault());

    mainEl.addEventListener("keydown", (e) => {
      const key = e.key.toLowerCase();
      const isModifier = e.ctrlKey || e.metaKey;
      const isFormField = e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT";

      // Always block copy/cut/select-all, even in form fields, to prevent
      // lifting question text out via a focused input.
      if (isModifier && (key === "c" || key === "x" || key === "a" || key === "s")) {
        if (key === "a" && isFormField) return; // allow select-all within an answer box itself
        e.preventDefault();
      }
    });
  }

  async function boot() {
    if (window.Icons) await Icons.ensureLoaded(); // fetch the shared icon set before anything renders
    await Auth.init(); // Supabase session restore is async (reads localStorage + may verify with the server)

    ClassPicker.setOnPick(handleClassPick);
    YearPicker.setOnPick(showSubjects);
    YearPicker.setOnChangeTrack(showPicker);
    SubjectPicker.setOnPick(handleSubjectPick);
    SubjectPicker.setOnChangeClass(backFromSubjects);
    // TrackPicker's onPick/onChangeSubject are reassigned dynamically in
    // showTracks()/showBooks() since the same picker component is reused
    // for both the top-level (Language/Literature) and nested (books)
    // screens, each needing different handlers.
    Sidebar.setOnSelect(handleSelect);
    Sidebar.setOnChangeSubject(backToTracksOrSubjects);

    renderAuthArea();
    initCopyProtection();
    showPicker();

    // If a session was already restored synchronously above (prototype
    // mode, or a saved Google session), load access data now — Auth's
    // onChange event only fires on actual sign-in/sign-out transitions,
    // not for this initial already-logged-in state.
    if (Auth.isLoggedIn()) {
      await AccessControl.ensureLoaded();
      await Progress.ensureLoaded();
    }

    Auth.onChange(async () => {
      renderAuthArea();
      if (Auth.isLoggedIn()) {
        await AccessControl.ensureLoaded();
        await Progress.ensureLoaded();
      } else {
        AccessControl.reset();
        Progress.reset();
      }
      if (view === "class") {
        renderSidebar();
        renderMain();
      }
    });

    sidebarToggleBtn.addEventListener("click", () => {
      sidebarEl.classList.toggle("open");
    });

    if (window.Theme) Theme.attachToggleButton(document.getElementById("themeToggle"));

    document.addEventListener("gurukul:home", () => showPicker());
    document.addEventListener("gurukul:progress-changed", () => {
      // Update progress bars/checkmarks in place — never call
      // renderSidebar() here, since that rebuilds the whole tree and
      // would collapse any chapter/topic the student currently has
      // open. Also never touch mainEl, or a just-submitted test's
      // results would be wiped out from under the student.
      if (view === "class" && window.Sidebar) Sidebar.refreshProgressMarks(Progress.doneItemIds());
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  document.addEventListener("DOMContentLoaded", () => {
    boot();
  });
})();
