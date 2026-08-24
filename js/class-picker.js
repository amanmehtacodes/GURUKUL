/**
 * CLASS PICKER MODULE
 * --------------------
 * Renders the landing view: large roman-numeral blocks for each class
 * (VIII through XII), plus premium track cards (currently just IELTS).
 * Selecting a regular class hands off to its subject picker; a premium
 * track (type: "exam") is rendered disabled with a "Coming soon" badge
 * until it has real content — see the IELTS entry in data/curriculum.js.
 */

const ClassPicker = (() => {
  let onPick = null; // (entry) => void

  // Small sparkle glyph used on the premium "Coming soon" badge for the
  // locked IELTS track.
  const sparkleIconSvg = `<svg viewBox="0 0 16 16" fill="none"><path d="M8 1.5l1.35 3.9L13.25 6.8l-3.9 1.35L8 12.1l-1.35-3.95L2.75 6.8l3.9-1.4L8 1.5z" fill="currentColor"/></svg>`;

  function bookIconSvg() {
    return (window.Icons && Icons.get("book")) || "";
  }

  const TRACK_ICON_SRC = {
    ielts: "assets/icons/track-ielts.svg",
  };

  function readyCountFor(entry) {
    if (entry.type === "exam") {
      // Count how many years (XI/XII) have at least one ready subject.
      return (entry.years || []).filter((y) =>
        (y.subjects || []).some((s) => s.ready)
      ).length;
    }
    return (entry.subjects || []).filter((s) => s.ready).length;
  }

  function examIconSrcFor(entry) {
    return TRACK_ICON_SRC[entry.id] || TRACK_ICON_SRC.ielts;
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
        <div class="class-picker-eyebrow">${bookIconSvg()}<span>Choose your class</span></div>
        <h1>Select a class to begin</h1>
        <p>Notes, practice, and tests are organized by class. Pick yours to see what's available.</p>
      </div>
      <div class="class-grid" id="classGrid"></div>
    `;
    container.appendChild(wrap);

    const grid = wrap.querySelector("#classGrid");
    CLASSES.forEach((entry, i) => {
      const isExam = entry.type === "exam";
      // Premium tracks (currently just IELTS) are disabled for now
      // regardless of what content happens to be marked ready underneath —
      // there's no IELTS content built yet, so the track isn't usable
      // end to end.
      const isDisabled = isExam;
      const readyCount = readyCountFor(entry);
      const card = document.createElement("button");
      card.className =
        "class-card" +
        (isExam ? " exam-card" : "") +
        (isDisabled ? " disabled" : "");
      card.style.setProperty("--card-index", i);
      if (isDisabled) card.disabled = true;
      card.innerHTML = `
        ${
          isExam
            ? `<span class="exam-card-icon"><img src="${examIconSrcFor(
                entry
              )}" alt="" width="26" height="26"></span>`
            : ""
        }
        <span class="class-card-numeral${
          isExam ? " exam-numeral" : ""
        }">${escapeHtml(entry.label)}</span>
        <span class="class-card-name">${escapeHtml(entry.name)}</span>
        ${
          isDisabled
            ? `<span class="class-card-meta premium-meta">${sparkleIconSvg}<span>Premium · Coming soon</span></span>`
            : `<span class="class-card-meta">${metaTextFor(
                readyCount,
                isExam
              )}</span>`
        }
      `;
      if (!isDisabled)
        card.addEventListener("click", () => onPick && onPick(entry));
      if (window.BorderGlow) BorderGlow.enhance(card);
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
