/**
 * TOPIC OVERVIEW MODULE
 * -----------------------
 * Shown in the main pane the moment a class/subject opens, before any
 * specific note or test has been picked. Lists every chapter and topic
 * right there in the main content area — the same tree data the sidebar
 * shows — so a first-time visitor can jump straight into a note without
 * first discovering (or, on mobile, opening) the sidebar.
 *
 * Clicking a note or test here fires the exact same onSelect callback
 * the sidebar's own tree items use, so app.js's handleSelect() doesn't
 * need to know which one was used — either path lands on the same note
 * reader / test view, with the sidebar (already populated) available
 * for navigating around from there.
 */

const TopicOverview = (() => {
  function icon(name) {
    return (window.Icons && Icons.get(name)) || "";
  }

  function render(
    container,
    { sectionsSource, subjectTitle, loggedIn, classId, doneIds, onSelect }
  ) {
    container.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "topic-overview";

    const intro = document.createElement("div");
    intro.className = "topic-overview-intro";
    intro.innerHTML = `
      <h2>Choose a topic</h2>
      <p>Every chapter in ${escapeHtml(
        subjectTitle || "this subject"
      )} — pick a topic below to start reading, or a test once it's unlocked.</p>
    `;
    wrap.appendChild(intro);

    const list = document.createElement("div");
    list.className = "topic-overview-sections";

    const ctx = { loggedIn, classId, doneIds: doneIds || new Set(), onSelect };
    (sectionsSource.sections || []).forEach((section) => {
      list.appendChild(renderSection(section, ctx));
    });

    wrap.appendChild(list);
    container.appendChild(wrap);
  }

  function renderSection(section, ctx) {
    const card = document.createElement("div");
    card.className = "topic-overview-section";

    const head = document.createElement("div");
    head.className = "topic-overview-section-head";
    head.innerHTML = `<span class="topic-overview-section-title">${escapeHtml(
      section.title
    )}</span>`;
    card.appendChild(head);

    const subList = document.createElement("div");
    subList.className = "topic-overview-subsections";
    (section.subsections || []).forEach((sub) => {
      subList.appendChild(renderSubsection(section, sub, ctx));
    });
    card.appendChild(subList);

    return card;
  }

  function renderSubsection(section, sub, ctx) {
    const wrap = document.createElement("div");
    wrap.className = "topic-overview-subsection";

    const title = document.createElement("div");
    title.className = "topic-overview-subsection-title";
    title.textContent = sub.title;
    wrap.appendChild(title);

    const items = document.createElement("div");
    items.className = "topic-overview-items";

    (sub.notes || []).forEach((note) => {
      const done = ctx.doneIds.has(note.id);
      const el = document.createElement("button");
      el.type = "button";
      el.className = "topic-overview-item" + (done ? " done" : "");
      el.innerHTML = `<span class="icon">${icon(
        "note"
      )}</span><span class="topic-overview-item-title">${escapeHtml(
        note.title
      )}</span>`;
      el.addEventListener(
        "click",
        () => ctx.onSelect && ctx.onSelect("note", section, sub, note)
      );
      items.appendChild(el);
    });

    (sub.tests || []).forEach((test) => {
      const hasAccess =
        ctx.loggedIn &&
        (typeof AccessControl === "undefined" ||
          AccessControl.hasChapterAccess(ctx.classId, section.id));
      const done = ctx.doneIds.has(test.id);
      const el = document.createElement("button");
      el.type = "button";
      el.className =
        "topic-overview-item" +
        (hasAccess ? "" : " locked") +
        (done ? " done" : "");
      el.innerHTML = `<span class="icon">${
        hasAccess ? icon("unlock") : icon("lock")
      }</span><span class="topic-overview-item-title">${escapeHtml(
        test.title
      )}</span>`;
      el.addEventListener(
        "click",
        () => ctx.onSelect && ctx.onSelect("test", section, sub, test)
      );
      items.appendChild(el);
    });

    wrap.appendChild(items);
    return wrap;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  return { render };
})();

window.TopicOverview = TopicOverview;
