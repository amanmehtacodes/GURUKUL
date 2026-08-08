/**
 * SUBJECT PICKER MODULE
 * -----------------------
 * Renders the subject-selection view for a chosen class: icon cards for
 * Mathematics, Physics, Chemistry, Biology, etc. Selecting one hands off
 * to the sidebar/curriculum view for that subject.
 *
 * Icons are illustrated SVG assets (not simple currentColor strokes), so
 * they're rendered as <img> tags. JEE/NEET tracks get their own subject
 * icon variants where provided; regular classes use the general set.
 */

const SubjectPicker = (() => {
  let onPick = null; // (subject) => void
  let onChangeClass = null; // () => void

  const backIconSvg = `<svg viewBox="0 0 16 16" fill="none"><path d="M10 3.5L5.5 8l4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  // General subject icon set (used for regular classes VIII-XII).
  const GENERAL_ICONS = {
    maths: "assets/icons/subject-maths.svg",
    physics: "assets/icons/subject-physics.svg",
    chemistry: "assets/icons/subject-chemistry.svg",
    biology: "assets/icons/subject-biology.svg",
    science: "assets/icons/subject-science.svg",
    english: "assets/icons/subject-english.svg",
  };

  // Track-specific icon overrides for JEE/NEET subject cards, where a
  // dedicated variant was provided. Falls back to GENERAL_ICONS for any
  // subject not listed here (e.g. if a track ever adds English).
  const TRACK_ICONS = {
    jee: {
      maths: "assets/icons/jee-maths.svg",
      physics: "assets/icons/jee-neet-physics.svg",
      chemistry: "assets/icons/jee-neet-chemistry.svg",
    },
    neet: {
      physics: "assets/icons/jee-neet-physics.svg",
      chemistry: "assets/icons/jee-neet-chemistry.svg",
      biology: "assets/icons/neet-biology.svg",
    },
  };

  function iconSrcFor(subject, track) {
    const key = (subject.icon || subject.id || subject.title || "").toLowerCase();
    const trackKey = track && (track.id || "").toLowerCase();

    if (trackKey && TRACK_ICONS[trackKey] && TRACK_ICONS[trackKey][key]) {
      return TRACK_ICONS[trackKey][key];
    }
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
      <button class="picker-back" id="subjectPickerBack">${backIconSvg}<span>All classes</span></button>
      <div class="class-picker-intro">
        <div class="class-picker-eyebrow"><span>${escapeHtml(cls.label)} · ${escapeHtml(cls.name)}</span></div>
        <h1>Choose a subject</h1>
        <p>Pick a subject to see its notes and tests.</p>
      </div>
      <div class="class-grid subject-grid" id="subjectGrid"></div>
    `;
    container.appendChild(wrap);

    wrap.querySelector("#subjectPickerBack").addEventListener("click", () => onChangeClass && onChangeClass());

    const grid = wrap.querySelector("#subjectGrid");
    (cls.subjects || []).forEach((subject, i) => {
      const iconSrc = iconSrcFor(subject, track);
      const isSparse = iconSrc === "assets/icons/jee-maths.svg";
      const card = document.createElement("button");
      card.className = "class-card subject-card" + (!subject.ready ? " unready" : "");
      card.style.setProperty("--card-index", i);
      card.innerHTML = `
        <span class="subject-card-icon${isSparse ? " icon-sparse" : ""}">${iconSrc ? `<img src="${iconSrc}" alt="" width="74" height="74">` : ""}</span>
        <span class="class-card-name">${escapeHtml(subject.title)}</span>
        <span class="class-card-meta">${metaTextFor(subject)}</span>
      `;
      card.addEventListener("click", () => onPick && onPick(subject));
      grid.appendChild(card);
    });
  }

  function chapterCountFor(subject) {
    if (subject.tracks && subject.tracks.length) {
      return subject.tracks.reduce((sum, t) => sum + (t.sections || []).length, 0);
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
  };
})();

window.SubjectPicker = SubjectPicker;
