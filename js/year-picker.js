/**
 * YEAR PICKER MODULE
 * -------------------
 * For an exam track (JEE or NEET), renders a picker scoped to just its
 * two years (XI and XII) — visually identical to the class picker.
 * Selecting a year hands off to that year's subject picker.
 */

const YearPicker = (() => {
  let onPick = null; // (yearObj) => void
  let onChangeTrack = null; // () => void

  const backIconSvg = `<svg viewBox="0 0 16 16" fill="none"><path d="M10 3.5L5.5 8l4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function render(container, { track }) {
    container.innerHTML = "";
    container.classList.add("picker-mode");

    const wrap = document.createElement("div");
    wrap.className = "class-picker year-picker";

    wrap.innerHTML = `
      <button class="picker-back" id="yearPickerBack">${backIconSvg}<span>All classes</span></button>
      <div class="class-picker-intro">
        <div class="class-picker-eyebrow"><span>${escapeHtml(track.name)}</span></div>
        <h1>Select your year</h1>
        <p>Choose your year to see available subjects.</p>
      </div>
      <div class="class-grid year-grid" id="yearGrid"></div>
    `;
    container.appendChild(wrap);

    wrap.querySelector("#yearPickerBack").addEventListener("click", () => onChangeTrack && onChangeTrack());

    const grid = wrap.querySelector("#yearGrid");
    (track.years || []).forEach((year, i) => {
      const readyCount = (year.subjects || []).filter((s) => s.ready).length;
      const card = document.createElement("button");
      card.className = "class-card";
      card.style.setProperty("--card-index", i);
      card.innerHTML = `
        <span class="class-card-numeral">${escapeHtml(year.label)}</span>
        <span class="class-card-name">${escapeHtml(year.name)}</span>
        <span class="class-card-meta">${readyCount > 0 ? `${readyCount} subject${readyCount > 1 ? "s" : ""} available` : "Coming soon"}</span>
      `;
      card.addEventListener("click", () => onPick && onPick(year));
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
    setOnChangeTrack: (fn) => (onChangeTrack = fn),
  };
})();

window.YearPicker = YearPicker;
