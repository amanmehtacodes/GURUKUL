/**
 * SUBJECT COLORS MODULE
 * ----------------------
 * A single, stable mapping from subject identity (icon/id key) to one of
 * the site's 6 accent-color slots (--c1..--c6 in style.css). Previously
 * subject cards picked up their color from their position in the grid
 * (nth-child), which meant the same subject could render in a different
 * color depending on which class's subject list it appeared in. Anything
 * that needs to show "this is Maths" consistently (subject cards, the
 * course sidebar) should read its color through this module instead.
 */

const SubjectColors = (() => {
  const SLOT = {
    maths: 1,
    science: 2,
    english: 3,
    physics: 4,
    chemistry: 5,
    biology: 6,
  };

  function slotFor(key) {
    const k = (key || "").toLowerCase();
    return SLOT[k] || 1;
  }

  function varsFor(key) {
    const n = slotFor(key);
    return {
      accent: `var(--c${n})`,
      soft: `var(--c${n}-soft)`,
      panel: `var(--c${n}-panel)`,
      bold: `var(--c${n}-bold)`,
    };
  }

  return { slotFor, varsFor };
})();

window.SubjectColors = SubjectColors;
