/**
 * TRACK PICKER MODULE
 * ---------------------
 * For a subject that splits into multiple tracks (currently just English:
 * Language vs Literature), renders an icon-card picker — visually
 * identical to the class/subject pickers. Selecting a track hands off to
 * the sidebar/curriculum view scoped to that track's sections.
 *
 * Reused for a second, nested level too: a track can itself have `tracks`
 * instead of `sections` (Literature -> Hornbill / Snapshots / Woven Words),
 * in which case app.js calls render() again with that track standing in
 * for "subject" — same component, one level deeper.
 */

const TrackPicker = (() => {
  let onPick = null; // (track) => void
  let onChangeSubject = null; // () => void

  function backIconSvg() {
    return (window.Icons && Icons.get("back")) || "";
  }

  // Literature (and every book nested inside it — Hornbill, Snapshots,
  // ...) all share one illustrated "book" icon, tinted jet-black in light
  // mode / bright white in dark mode via the same filter every other
  // subject icon uses (see .subject-card-icon img in style.css).
  const BOOK_ICON_SRC = "assets/icons/subject-literaturebooks.svg";

  // Language gets its own dedicated artwork instead of a filter-based
  // tint — two ready-made variants, swapped purely with CSS based on
  // data-theme (same show/hide pattern as the header's sun/moon toggle),
  // so no re-render is needed when the theme flips.
  const LANGUAGE_ICON_LIGHT = "assets/icons/subject-englishlanguagelight.svg";
  const LANGUAGE_ICON_DARK = "assets/icons/subject-englishlanguagedark.svg";

  function iconFor(track) {
    const key = (track && (track.icon || track.id || track.title) || "").toLowerCase();
    if (key.includes("language")) {
      return (
        `<img class="icon-theme-light" src="${LANGUAGE_ICON_LIGHT}" alt="" width="74" height="74">` +
        `<img class="icon-theme-dark" src="${LANGUAGE_ICON_DARK}" alt="" width="74" height="74">`
      );
    }
    return `<img src="${BOOK_ICON_SRC}" alt="" width="74" height="74">`;
  }

  // A track's own chapter count either comes straight from `.sections`, or
  // — for a track that splits further into books — from summing each
  // book's sections, same as SubjectPicker does for a tracked subject.
  function chapterCountFor(track) {
    if (track.tracks && track.tracks.length) {
      return track.tracks.reduce((sum, book) => sum + (book.sections || []).length, 0);
    }
    return (track.sections || []).length;
  }

  function metaTextFor(track) {
    if (!track.ready) return "Coming soon";
    const count = chapterCountFor(track);
    return `${count} chapter${count === 1 ? "" : "s"} available`;
  }

  function render(container, { cls, subject, backLabel, heading, subheading }) {
    container.innerHTML = "";
    container.classList.add("picker-mode");

    const wrap = document.createElement("div");
    wrap.className = "class-picker subject-picker";

    wrap.innerHTML = `
      <button class="picker-back" id="trackPickerBack">${backIconSvg()}<span>${escapeHtml(backLabel || `${cls.label} subjects`)}</span></button>
      <div class="class-picker-intro">
        <div class="class-picker-eyebrow"><span>${escapeHtml(cls.label)} · ${escapeHtml(subject.title)}</span></div>
        <h1>${escapeHtml(heading || "Choose a track")}</h1>
        <p>${escapeHtml(subheading || "Pick a track to see its chapters.")}</p>
      </div>
      <div class="class-grid subject-grid" id="trackGrid"></div>
    `;
    container.appendChild(wrap);

    wrap.querySelector("#trackPickerBack").addEventListener("click", () => onChangeSubject && onChangeSubject());

    const grid = wrap.querySelector("#trackGrid");
    (subject.tracks || []).forEach((track, i) => {
      const card = document.createElement("button");
      card.className = "class-card subject-card" + (!track.ready ? " unready" : "");
      card.style.setProperty("--card-index", i);
      card.innerHTML = `
        <span class="subject-card-icon">${iconFor(track)}</span>
        <span class="class-card-name">${escapeHtml(track.title)}</span>
        <span class="class-card-meta">${metaTextFor(track)}</span>
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
