/**
 * SIDEBAR MODULE
 * --------------
 * Renders, for a chosen class + subject: a small header showing where you
 * are, then the collapsible section > subsection > (notes / questions)
 * tree for that subject. Fires a callback for leaf-item selection.
 */

const Sidebar = (() => {
  let onSelect = null;        // (type, section, subsection, item) => void
  let onChangeSubject = null; // () => void  (back to subject picker)
  let activeKey = null;

  // Cycles through the 6-color palette defined in CSS custom properties
  // so each top-level section gets a distinct, consistent accent color.
  const PALETTE_SIZE = 6;
  const sectionColorIndex = {};

  function colorVarsFor(sectionId) {
    if (!(sectionId in sectionColorIndex)) {
      sectionColorIndex[sectionId] = Object.keys(sectionColorIndex).length % PALETTE_SIZE;
    }
    const n = sectionColorIndex[sectionId] + 1;
    return { accent: `var(--c${n})`, soft: `var(--c${n}-soft)` };
  }

  const chevronSvg = `<svg class="chevron" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const noteIconSvg = `<svg class="icon" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l3 3v9a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.3"/><path d="M6 8h4M6 10.5h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`;

  const lockIconSvg = `<svg class="icon" viewBox="0 0 16 16" fill="none"><rect x="3.5" y="7" width="9" height="6.5" rx="1" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" stroke-width="1.3"/></svg>`;

  const unlockIconSvg = `<svg class="icon" viewBox="0 0 16 16" fill="none"><rect x="3.5" y="7" width="9" height="6.5" rx="1" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 7V5a2.5 2.5 0 014.9-.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`;

  const backIconSvg = `<svg viewBox="0 0 16 16" fill="none"><path d="M10 3.5L5.5 8l4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function render(container, { loggedIn, cls, subject, subjectTrack, sectionsSource }) {
    container.innerHTML = "";
    const displaySource = sectionsSource || subjectTrack || subject;
    const headerTitle = subjectTrack ? `${subject.title} · ${subjectTrack.title}` : subject.title;
    const backLabel = subjectTrack ? `${subject.title} tracks` : `${cls.name} subjects`;

    // Back to track picker (if a track is active) or subject picker
    const backBtn = document.createElement("button");
    backBtn.className = "sidebar-back";
    backBtn.innerHTML = `${backIconSvg}<span>${escapeHtml(backLabel)}</span>`;
    backBtn.addEventListener("click", () => onChangeSubject && onChangeSubject());
    container.appendChild(backBtn);

    const classHeader = document.createElement("div");
    classHeader.className = "sidebar-class-header";
    classHeader.innerHTML = `
      <span class="sidebar-class-numeral">${escapeHtml(cls.label)}</span>
      <span class="sidebar-class-name">${escapeHtml(headerTitle)}</span>
    `;
    container.appendChild(classHeader);

    if (!displaySource || !displaySource.ready || !displaySource.sections) {
      return; // Coming Soon state — no tree to render
    }

    if (loggedIn && window.Progress) {
      container.appendChild(renderProgressBars(displaySource));
    }

    const label = document.createElement("div");
    label.className = "sidebar-label";
    label.textContent = "Curriculum";
    container.appendChild(label);

    displaySource.sections.forEach((section) => {
      container.appendChild(renderSection(section, loggedIn, cls.id));
    });
  }

  function renderProgressBars(sectionsSource) {
    const stats = Progress.statsFor(sectionsSource);
    const wrap = document.createElement("div");
    wrap.className = "sidebar-progress";

    wrap.appendChild(progressBarRow("Notes read", stats.notesRead, stats.notesTotal));
    wrap.appendChild(progressBarRow("Tests done", stats.testsDone, stats.testsTotal));
    return wrap;
  }

  function progressBarRow(label, done, total) {
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const row = document.createElement("div");
    row.className = "progress-row";
    row.innerHTML = `
      <div class="progress-row-label">
        <span>${escapeHtml(label)}</span>
        <span class="progress-row-count">${done}/${total}</span>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="width:${pct}%"></div>
      </div>
    `;
    return row;
  }

  function renderSection(section, loggedIn, classId) {
    const wrap = document.createElement("div");
    wrap.className = "tree-section";
    wrap.dataset.id = section.id;

    const colors = colorVarsFor(section.id);
    wrap.style.setProperty("--section-accent", colors.accent);
    wrap.style.setProperty("--section-accent-soft", colors.soft);

    const head = document.createElement("div");
    head.className = "tree-section-head";
    head.innerHTML = `
      <span class="section-dot" style="background:${colors.accent}"></span>
      ${chevronSvg}<span>${escapeHtml(section.title)}</span>`;
    head.addEventListener("click", () => wrap.classList.toggle("open"));
    wrap.appendChild(head);

    const subWrap = document.createElement("div");
    subWrap.className = "tree-subsections";

    section.subsections.forEach((sub) => {
      subWrap.appendChild(renderSubsection(section, sub, loggedIn, classId));
    });

    wrap.appendChild(subWrap);
    return wrap;
  }

  function renderSubsection(section, sub, loggedIn, classId) {
    const wrap = document.createElement("div");
    wrap.className = "tree-subsection";
    wrap.dataset.id = sub.id;

    const head = document.createElement("div");
    head.className = "tree-subsection-head";
    head.innerHTML = `${chevronSvg}<span>${escapeHtml(sub.title)}</span>`;
    head.addEventListener("click", () => wrap.classList.toggle("open"));
    wrap.appendChild(head);

    const itemsWrap = document.createElement("div");
    itemsWrap.className = "tree-items";

    if (sub.notes && sub.notes.length) {
      const gl = document.createElement("div");
      gl.className = "item-group-label";
      gl.textContent = "Notes";
      itemsWrap.appendChild(gl);

      sub.notes.forEach((note) => {
        const el = document.createElement("div");
        const key = `note:${note.id}`;
        el.className = "tree-item";
        el.dataset.key = key;
        el.innerHTML = `${noteIconSvg}<span>${escapeHtml(note.title)}</span><span class="progress-check" data-note-id="${note.id}"></span>`;
        el.addEventListener("click", () => {
          setActive(key);
          onSelect && onSelect("note", section, sub, note);
        });
        itemsWrap.appendChild(el);
      });
    }

    if (sub.tests && sub.tests.length) {
      const gl = document.createElement("div");
      gl.className = "item-group-label";
      gl.textContent = "Test";
      itemsWrap.appendChild(gl);

      sub.tests.forEach((test) => {
        const el = document.createElement("div");
        const key = `test:${test.id}`;
        const hasAccess = loggedIn && (typeof AccessControl === "undefined" || AccessControl.hasChapterAccess(classId, section.id));
        el.className = "tree-item" + (hasAccess ? "" : " locked");
        el.dataset.key = key;
        el.innerHTML = `${hasAccess ? unlockIconSvg : lockIconSvg}<span>${escapeHtml(test.title)}</span><span class="progress-check" data-note-id="${test.id}"></span>`;
        el.addEventListener("click", () => {
          setActive(key);
          onSelect && onSelect("test", section, sub, test);
        });
        itemsWrap.appendChild(el);
      });
    }

    wrap.appendChild(itemsWrap);
    return wrap;
  }

  function setActive(key) {
    activeKey = key;
    document.querySelectorAll(".tree-item").forEach((el) => {
      el.classList.toggle("active", el.dataset.key === key);
    });
  }

  function expandTo(sectionId, subId) {
    const sectionEl = document.querySelector(`.tree-section[data-id="${sectionId}"]`);
    if (sectionEl) sectionEl.classList.add("open");
    const subEl = document.querySelector(`.tree-subsection[data-id="${subId}"]`);
    if (subEl) subEl.classList.add("open");
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Called by the Progress module once progress data has loaded, to fill
   * in the small checkmark next to each note/test the student has
   * already marked read/done. Cheap no-op if the sidebar isn't showing
   * any matching items right now.
   */
  function refreshProgressMarks(doneItemIds) {
    document.querySelectorAll(".progress-check[data-note-id]").forEach((el) => {
      const id = el.dataset.noteId;
      el.classList.toggle("done", doneItemIds.has(id));
    });
  }

  return {
    render,
    setOnSelect: (fn) => (onSelect = fn),
    setOnChangeSubject: (fn) => (onChangeSubject = fn),
    setActive,
    expandTo,
    colorVarsFor,
    refreshProgressMarks,
  };
})();

window.Sidebar = Sidebar;
