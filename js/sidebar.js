/**
 * SIDEBAR MODULE
 * --------------
 * Renders, for a chosen class + subject: a small header showing where you
 * are, then the collapsible section > subsection > (notes / questions)
 * tree for that subject. Fires a callback for leaf-item selection.
 *
 * Every chapter and topic within a subject now shares ONE bold accent
 * color tied to the subject itself (via SubjectColors), instead of each
 * chapter cycling through a different color — that made the tree feel
 * noisy rather than showing "what subject am I in". Chapters, topics,
 * and tests each show an explicit done/pending status icon so progress
 * is scannable at every level, not just on individual notes/tests.
 */

const Sidebar = (() => {
  let onSelect = null;        // (type, section, subsection, item) => void
  let onChangeSubject = null; // () => void  (back to subject picker)
  let activeKey = null;
  let currentSubjectKey = null; // drives colorVarsFor for the main-content accent too
  let currentSectionsSource = null; // lets refreshProgressMarks update the top summary bars in place

  function icon(name) {
    return (window.Icons && Icons.get(name)) || "";
  }

  // Kept for app.js, which asks "what color is the current chapter" to
  // tint the note/test content view — now just the subject's one bold
  // accent rather than a per-chapter rotation.
  function colorVarsFor() {
    if (currentSubjectKey && window.SubjectColors) {
      const vars = SubjectColors.varsFor(currentSubjectKey);
      return { accent: vars.bold, soft: vars.soft };
    }
    return { accent: "var(--accent)", soft: "var(--accent-soft)" };
  }

  function render(container, { loggedIn, cls, subject, subjectTrack, sectionsSource }) {
    container.innerHTML = "";
    const displaySource = sectionsSource || subjectTrack || subject;
    const headerTitle = subjectTrack ? `${subject.title} · ${subjectTrack.title}` : subject.title;
    const backLabel = subjectTrack ? `${subject.title} tracks` : `${cls.name} subjects`;

    // Tint the whole panel with the active subject's color so it's obvious
    // at a glance which subject (and, via the numeral, which class) is
    // currently open — a stable identity-based color, not a rotating one.
    container.classList.remove("subject-tinted");
    container.style.removeProperty("--sidebar-panel");
    container.style.removeProperty("--section-accent");
    container.style.removeProperty("--section-accent-soft");
    currentSubjectKey = subject && (subject.icon || subject.id);
    if (currentSubjectKey && window.SubjectColors) {
      const vars = SubjectColors.varsFor(currentSubjectKey);
      container.style.setProperty("--sidebar-panel", vars.panel);
      // Same variable names the tree/status-icon CSS already reads —
      // setting them once here means every chapter and topic inherits
      // the SAME bold accent instead of each one picking its own color.
      container.style.setProperty("--section-accent", vars.bold);
      container.style.setProperty("--section-accent-soft", vars.soft);
      container.classList.add("subject-tinted");
    }

    // Back to track picker (if a track is active) or subject picker
    const backBtn = document.createElement("button");
    backBtn.className = "sidebar-back";
    backBtn.innerHTML = `${icon("back")}<span>${escapeHtml(backLabel)}</span>`;
    backBtn.addEventListener("click", () => onChangeSubject && onChangeSubject());
    container.appendChild(backBtn);

    const iconSrc = currentSubjectKey && window.SubjectPicker ? SubjectPicker.iconFor(currentSubjectKey) : null;

    const classHeader = document.createElement("div");
    classHeader.className = "sidebar-class-header";
    classHeader.innerHTML = `
      ${iconSrc ? `<span class="sidebar-subject-icon"><img src="${iconSrc}" alt="" width="22" height="22"></span>` : ""}
      <span class="sidebar-class-heading">
        <span class="sidebar-class-numeral">${escapeHtml(cls.label)}</span>
        <span class="sidebar-class-name">${escapeHtml(headerTitle)}</span>
      </span>
    `;
    container.appendChild(classHeader);

    currentSectionsSource = displaySource && displaySource.ready && displaySource.sections ? displaySource : null;

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

    const doneIds = window.Progress ? Progress.doneItemIds() : new Set();

    displaySource.sections.forEach((section) => {
      container.appendChild(renderSection(section, loggedIn, cls.id, doneIds));
    });
  }

  function renderProgressBars(sectionsSource) {
    const stats = Progress.statsFor(sectionsSource);
    const wrap = document.createElement("div");
    wrap.className = "sidebar-progress";

    wrap.appendChild(progressBarRow("Notes read", stats.notesRead, stats.notesTotal, "notes"));
    wrap.appendChild(progressBarRow("Tests done", stats.testsDone, stats.testsTotal, "tests"));
    return wrap;
  }

  function progressBarRow(label, done, total, kind) {
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const row = document.createElement("div");
    row.className = "progress-row";
    if (kind) row.dataset.kind = kind;
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

  // Every note + test id nested under a section (chapter) or a single
  // subsection (topic) — used both to render the aggregate status icon
  // and, later, to recompute it live via refreshProgressMarks.
  function leafIdsForSection(section) {
    const ids = [];
    section.subsections.forEach((sub) => {
      (sub.notes || []).forEach((n) => ids.push(n.id));
      (sub.tests || []).forEach((t) => ids.push(t.id));
    });
    return ids;
  }
  function leafIdsForSubsection(sub) {
    const ids = [];
    (sub.notes || []).forEach((n) => ids.push(n.id));
    (sub.tests || []).forEach((t) => ids.push(t.id));
    return ids;
  }

  function statusIconHtml(ids, doneIds) {
    const allDone = ids.length > 0 && ids.every((id) => doneIds.has(id));
    return `<span class="status-check${allDone ? " done" : ""}" data-ids="${ids.join(",")}">
      <span class="sc-done">${icon("check")}</span>
      <span class="sc-pending">${icon("pending")}</span>
    </span>`;
  }

  function renderSection(section, loggedIn, classId, doneIds) {
    const wrap = document.createElement("div");
    wrap.className = "tree-section";
    wrap.dataset.id = section.id;

    const ids = leafIdsForSection(section);
    const allDone = ids.length > 0 && ids.every((id) => doneIds.has(id));

    const head = document.createElement("div");
    head.className = "tree-section-head";
    head.innerHTML = `
      <span class="chevron">${icon("chevron")}</span>
      <span class="tree-title${allDone ? " done" : ""}">${escapeHtml(section.title)}</span>
      ${statusIconHtml(ids, doneIds)}
    `;
    head.addEventListener("click", () => wrap.classList.toggle("open"));
    wrap.appendChild(head);

    const subWrap = document.createElement("div");
    subWrap.className = "tree-subsections";

    section.subsections.forEach((sub) => {
      subWrap.appendChild(renderSubsection(section, sub, loggedIn, classId, doneIds));
    });

    wrap.appendChild(subWrap);
    return wrap;
  }

  function renderSubsection(section, sub, loggedIn, classId, doneIds) {
    const wrap = document.createElement("div");
    wrap.className = "tree-subsection";
    wrap.dataset.id = sub.id;

    const ids = leafIdsForSubsection(sub);
    const allDone = ids.length > 0 && ids.every((id) => doneIds.has(id));

    const head = document.createElement("div");
    head.className = "tree-subsection-head";
    head.innerHTML = `
      <span class="chevron">${icon("chevron")}</span>
      <span class="tree-title${allDone ? " done" : ""}">${escapeHtml(sub.title)}</span>
      ${statusIconHtml(ids, doneIds)}
    `;
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
        const done = doneIds.has(note.id);
        el.className = "tree-item" + (done ? " done" : "");
        el.dataset.key = key;
        el.innerHTML = `<span class="icon">${icon("note")}</span><span class="tree-title${done ? " done" : ""}">${escapeHtml(note.title)}</span>${statusIconHtml([note.id], doneIds)}`;
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
        const done = doneIds.has(test.id);
        el.className = "tree-item" + (hasAccess ? "" : " locked") + (done ? " done" : "");
        el.dataset.key = key;
        el.innerHTML = `<span class="icon">${hasAccess ? icon("unlock") : icon("lock")}</span><span class="tree-title${done ? " done" : ""}">${escapeHtml(test.title)}</span>${statusIconHtml([test.id], doneIds)}`;
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
   * in the done/pending mark next to each note/test the student has
   * already marked read/done, and to recompute the aggregate chapter and
   * topic status icons (built from the same doneItemIds set at render
   * time, refreshed here without re-rendering the whole tree). Cheap
   * no-op if the sidebar isn't showing any matching items right now.
   */
  function refreshProgressMarks(doneItemIds) {
    document.querySelectorAll(".tree-item[data-key]").forEach((el) => {
      const id = el.dataset.key.split(":").slice(1).join(":");
      const done = doneItemIds.has(id);
      el.classList.toggle("done", done);
      const title = el.querySelector(".tree-title");
      if (title) title.classList.toggle("done", done);
    });
    document.querySelectorAll(".status-check[data-ids]").forEach((el) => {
      const ids = el.dataset.ids ? el.dataset.ids.split(",") : [];
      const allDone = ids.length > 0 && ids.every((id) => doneItemIds.has(id));
      el.classList.toggle("done", allDone);
      const title = el.parentElement && el.parentElement.querySelector(".tree-title");
      if (title) title.classList.toggle("done", allDone);
    });

    // Update the "Notes read" / "Tests done" summary bars in place too —
    // this used to require a full Sidebar.render() call, which rebuilt
    // the whole tree from scratch and collapsed any chapter/topic the
    // student had open. Updating existing DOM here instead means marking
    // something as read never touches the open/closed state of the tree.
    if (currentSectionsSource) {
      const stats = Progress.statsFor(currentSectionsSource);
      updateProgressRow("notes", stats.notesRead, stats.notesTotal);
      updateProgressRow("tests", stats.testsDone, stats.testsTotal);
    }
  }

  function updateProgressRow(kind, done, total) {
    const row = document.querySelector(`.progress-row[data-kind="${kind}"]`);
    if (!row) return;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const countEl = row.querySelector(".progress-row-count");
    if (countEl) countEl.textContent = `${done}/${total}`;
    const fillEl = row.querySelector(".progress-bar-fill");
    if (fillEl) fillEl.style.width = `${pct}%`;
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
