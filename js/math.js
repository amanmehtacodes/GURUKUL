/**
 * MATH MODULE
 * -----------
 * Thin wrapper around KaTeX (loaded via CDN in index.html/admin.html/
 * report.html) for rendering notebook-style math notation anywhere in
 * the site: notes, question prompts, answer keys, reference answers,
 * and a live preview under theory-answer textareas.
 *
 * Content authors (in .md notes and curriculum.js prompts/answers) and
 * students (typing theory answers) write math using standard LaTeX
 * delimiters:
 *   Inline:  $x^2 + y^2 = z^2$
 *   Block:   $$\frac{-b \pm \sqrt{b^2-4ac}}{2a}$$
 * KaTeX supports the common subset: fractions (\frac{}{}), exponents
 * (^), subscripts (_), roots (\sqrt{}), Greek letters (\alpha, \pi...),
 * sums/integrals (\sum, \int), and most standard notation used up
 * through JEE/NEET-level math and physics.
 */

const MathTools = (() => {
  function isReady() {
    return !!(window.katex && window.renderMathInElement);
  }

  const DELIMITERS = [
    { left: "$$", right: "$$", display: true },
    { left: "$", right: "$", display: false },
    { left: "\\(", right: "\\)", display: false },
    { left: "\\[", right: "\\]", display: true },
  ];

  /** Scans an element's text nodes for math delimiters and renders them in place. */
  function renderMathIn(el) {
    if (!isReady() || !el) return;
    try {
      window.renderMathInElement(el, { delimiters: DELIMITERS, throwOnError: false });
    } catch (e) {
      console.warn("Math render failed:", e);
    }
  }

  /** Renders raw text (e.g. a textarea's current value) into a preview element. */
  function renderPreviewText(rawText, targetEl) {
    if (!targetEl) return;
    if (!rawText || !rawText.trim()) {
      targetEl.innerHTML = `<span class="math-preview-empty">Preview of your answer (with math rendered) appears here as you type.</span>`;
      return;
    }
    targetEl.textContent = rawText;
    renderMathIn(targetEl);
  }

  /** Wires a textarea to a preview element that updates as the student types. */
  function attachLivePreview(textarea, previewEl) {
    if (!textarea || !previewEl) return;
    const update = () => renderPreviewText(textarea.value, previewEl);
    textarea.addEventListener("input", debounce(update, 200));
    update();
  }

  function debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  return { isReady, renderMathIn, renderPreviewText, attachLivePreview };
})();

window.MathTools = MathTools;
