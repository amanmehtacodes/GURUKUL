/**
 * TRACK PICKER MODULE
 * ---------------------
 * For a subject that splits into multiple tracks (currently just English:
 * Language vs Literature), renders an icon-card picker — visually
 * identical to the class/subject pickers. Selecting a track hands off to
 * the sidebar/curriculum view scoped to that track's sections.
 */

const TrackPicker = (() => {
  let onPick = null; // (track) => void
  let onChangeSubject = null; // () => void

  function backIconSvg() {
    return (window.Icons && Icons.get("back")) || "";
  }

  const ICONS = {
    language: `<svg viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="1.6"/>
      <path d="M6 24h36M24 6c4.5 4.8 6.8 11.2 6.8 18S28.5 37.2 24 42c-4.5-4.8-6.8-11.2-6.8-18S19.5 10.8 24 6z" stroke="currentColor" stroke-width="1.4"/>
    </svg>`,
    literature: `<svg viewBox="0 0 48 48" fill="none">
      <path d="M8 12.5A2.5 2.5 0 0110.5 10H23v28H10.5A2.5 2.5 0 018 35.5v-23z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M40 12.5A2.5 2.5 0 0037.5 10H25v28h12.5a2.5 2.5 0 002.5-2.5v-23z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M13 17h6M13 22h6M13 27h6M29 17h6M29 22h6M29 27h6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    </svg>`,
    default: `<svg viewBox="0 0 48 48" fill="none">
      <path d="M8 9.5A2.5 2.5 0 0110.5 7H22v34H10.5A2.5 2.5 0 018 38.5v-29z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M40 9.5A2.5 2.5 0 0037.5 7H26v34h11.5a2.5 2.5 0 002.5-2.5v-29z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
    </svg>`,
  };

  function iconFor(track) {
    const key = (track.icon || track.id || track.title || "").toLowerCase();
    if (ICONS[key]) return ICONS[key];
    for (const name of Object.keys(ICONS)) {
      if (key.includes(name)) return ICONS[name];
    }
    return ICONS.default;
  }

  function chapterCountFor(track) {
    return (track.sections || []).length;
  }

  function render(container, { cls, subject }) {
    container.innerHTML = "";
    container.classList.add("picker-mode");

    const wrap = document.createElement("div");
    wrap.className = "class-picker subject-picker";

    wrap.innerHTML = `
      <button class="picker-back" id="trackPickerBack">${backIconSvg()}<span>${escapeHtml(cls.label)} subjects</span></button>
      <div class="class-picker-intro">
        <div class="class-picker-eyebrow"><span>${escapeHtml(cls.label)} · ${escapeHtml(subject.title)}</span></div>
        <h1>Choose a track</h1>
        <p>Pick a track to see its chapters.</p>
      </div>
      <div class="class-grid subject-grid" id="trackGrid"></div>
    `;
    container.appendChild(wrap);

    wrap.querySelector("#trackPickerBack").addEventListener("click", () => onChangeSubject && onChangeSubject());

    const grid = wrap.querySelector("#trackGrid");
    (subject.tracks || []).forEach((track, i) => {
      const count = chapterCountFor(track);
      const card = document.createElement("button");
      card.className = "class-card subject-card";
      card.style.setProperty("--card-index", i);
      card.innerHTML = `
        <span class="subject-card-icon">${iconFor(track)}</span>
        <span class="class-card-name">${escapeHtml(track.title)}</span>
        <span class="class-card-meta">${count} chapter${count === 1 ? "" : "s"} available</span>
      `;
      card.addEventListener("click", () => onPick && onPick(track));
      grid.appendChild(card);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  return {
    render,
    setOnPick: (fn) => (onPick = fn),
    setOnChangeSubject: (fn) => (onChangeSubject = fn),
  };
})();

window.TrackPicker = TrackPicker;
