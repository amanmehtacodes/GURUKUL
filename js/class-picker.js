/**
 * CLASS PICKER MODULE
 * --------------------
 * Renders the landing view: large roman-numeral blocks for each class
 * (VIII through XII), plus exam-track cards (JEE, NEET). Selecting a
 * regular class hands off to its subject picker; selecting an exam track
 * hands off to a year picker (XI/XII) scoped to that track.
 */

const ClassPicker = (() => {
  let onPick = null; // (entry) => void

  const bookIconSvg = `<svg viewBox="0 0 24 24" fill="none"><path d="M4 5.5C4 4.67 4.67 4 5.5 4H11v16H5.5A1.5 1.5 0 014 18.5v-13z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M20 5.5c0-.83-.67-1.5-1.5-1.5H13v16h5.5a1.5 1.5 0 001.5-1.5v-13z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`;

  const TRACK_ICON_SRC = {
    jee: "assets/icons/track-jee.svg",
    neet: "assets/icons/track-neet.svg",
  };

  function readyCountFor(entry) {
    if (entry.type === "exam") {
      // Count how many years (XI/XII) have at least one ready subject.
      return (entry.years || []).filter((y) => (y.subjects || []).some((s) => s.ready)).length;
    }
    return (entry.subjects || []).filter((s) => s.ready).length;
  }

  function examIconSrcFor(entry) {
    return TRACK_ICON_SRC[entry.id] || TRACK_ICON_SRC.jee;
  }

  function metaTextFor(readyCount, isExam) {
    if (readyCount === 0) return "Coming soon";
    const noun = isExam ? "class" : "subject";
    const plural = readyCount > 1 ? (isExam ? "es" : "s") : "";
    return `${readyCount} ${noun}${plural} available`;
  }

  function render(container) {
    container.innerHTML = "";
    container.classList.add("picker-mode");

    const wrap = document.createElement("div");
    wrap.className = "class-picker";

    wrap.innerHTML = `
      <div class="class-picker-intro">
        <div class="class-picker-eyebrow">${bookIconSvg}<span>Choose your class</span></div>
        <h1>Select a class to begin</h1>
        <p>Notes, practice, and tests are organized by class. Pick yours to see what's available.</p>
      </div>
      <div class="class-grid" id="classGrid"></div>
    `;
    container.appendChild(wrap);

    const grid = wrap.querySelector("#classGrid");
    CLASSES.forEach((entry, i) => {
      const isExam = entry.type === "exam";
      const readyCount = readyCountFor(entry);
      const card = document.createElement("button");
      card.className = "class-card" + (isExam ? " exam-card" : "");
      card.style.setProperty("--card-index", i);
      card.innerHTML = `
        ${isExam ? `<span class="exam-card-icon"><img src="${examIconSrcFor(entry)}" alt="" width="26" height="26"></span>` : ""}
        <span class="class-card-numeral${isExam ? " exam-numeral" : ""}">${escapeHtml(entry.label)}</span>
        <span class="class-card-name">${escapeHtml(entry.name)}</span>
        <span class="class-card-meta">${metaTextFor(readyCount, isExam)}</span>
      `;
      card.addEventListener("click", () => onPick && onPick(entry));
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
  };
})();

window.ClassPicker = ClassPicker;
