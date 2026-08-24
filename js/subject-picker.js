/**
 * SUBJECT PICKER MODULE
 * -----------------------
 * Renders the subject-selection view for a chosen class. Currently only
 * ever shows one card (English — the site's only subject now), but stays
 * generic since app.js falls back to it if a class ever has more than
 * one subject, or zero. Selecting a subject hands off to the sidebar/
 * curriculum view for it.
 *
 * Icons are illustrated SVG assets (not simple currentColor strokes), so
 * they're rendered as <img> tags.
 */

const SubjectPicker = (() => {
  let onPick = null; // (subject) => void
  let onChangeClass = null; // () => void

  function backIconSvg() {
    return (window.Icons && Icons.get("back")) || "";
  }

  // Subject icon set. Used to be Maths/Physics/Chemistry/Biology/Science/
  // Computer too (from before the site narrowed to English-only), each
  // with its own JEE/NEET variant — all of that was dead weight (never
  // matched by any subject curriculum.js actually defines anymore), so
  // it's trimmed down to just what's reachable.
  const GENERAL_ICONS = {
    english: "assets/icons/subject-english.svg",
  };

  function iconSrcFor(subject) {
    const key = (
      subject.icon ||
      subject.id ||
      subject.title ||
      ""
    ).toLowerCase();
    if (GENERAL_ICONS[key]) return GENERAL_ICONS[key];

    for (const name of Object.keys(GENERAL_ICONS)) {
      if (key.includes(name)) return GENERAL_ICONS[name];
    }
    return null; // no icon match — card renders without one
  }

  function render(container, { cls, track }) {
    container.innerHTML = "";
    container.classList.add("picker-mode");

    const wrap = document.createElement("div");
    wrap.className = "class-picker subject-picker";

    wrap.innerHTML = `
      <button class="picker-back" id="subjectPickerBack">${backIconSvg()}<span>All classes</span></button>
      <div class="class-picker-intro">
        <div class="class-picker-eyebrow"><span>${escapeHtml(
          cls.label
        )} · ${escapeHtml(cls.name)}</span></div>
        <h1>Choose a subject</h1>
        <p>Pick a subject to see its notes and tests.</p>
      </div>
      <div class="class-grid subject-grid" id="subjectGrid"></div>
    `;
    container.appendChild(wrap);

    wrap
      .querySelector("#subjectPickerBack")
      .addEventListener("click", () => onChangeClass && onChangeClass());

    const grid = wrap.querySelector("#subjectGrid");
    (cls.subjects || []).forEach((subject, i) => {
      const iconSrc = iconSrcFor(subject);
      const card = document.createElement("button");
      card.className =
        "class-card subject-card" + (!subject.ready ? " unready" : "");
      card.style.setProperty("--card-index", i);
      card.innerHTML = `
        <span class="subject-card-icon">${
          iconSrc ? `<img src="${iconSrc}" alt="" width="74" height="74">` : ""
        }</span>
        <span class="class-card-name">${escapeHtml(subject.title)}</span>
        <span class="class-card-meta">${metaTextFor(subject)}</span>
      `;
      card.addEventListener("click", () => onPick && onPick(subject));
      if (window.BorderGlow) BorderGlow.enhance(card);
      grid.appendChild(card);
    });
  }

  // A track can itself split further into books (Literature -> Hornbill /
  // Snapshots / ...) instead of having `sections` directly, so this counts
  // recursively rather than assuming tracks are always one level deep.
  function chapterCountFor(subject) {
    if (subject.tracks && subject.tracks.length) {
      return subject.tracks.reduce((sum, t) => sum + chapterCountFor(t), 0);
    }
    return (subject.sections || []).length;
  }

  function metaTextFor(subject) {
    if (!subject.ready) return "Coming soon";
    const count = chapterCountFor(subject);
    return `${count} chapter${count === 1 ? "" : "s"} available`;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  return {
    render,
    setOnPick: (fn) => (onPick = fn),
    setOnChangeClass: (fn) => (onChangeClass = fn),
    // Exposed so other modules (the course sidebar) can show the same
    // subject icon without duplicating this lookup table.
    iconFor: (key) => GENERAL_ICONS[(key || "").toLowerCase()] || null,
  };
})();

window.SubjectPicker = SubjectPicker;
