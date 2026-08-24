/**
 * COMING SOON MODULE
 * --------------------
 * Renders a clean placeholder for subjects or classes that don't have
 * content yet, instead of showing an empty tree.
 */

const ComingSoon = (() => {
  const clockIconSvg = `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.4"/><path d="M12 7.5V12l3 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function render(container, { className, subjectTitle }) {
    container.innerHTML = `
      <div class="coming-soon">
        <div class="coming-soon-icon">${clockIconSvg}</div>
        <h2>Coming soon</h2>
        <p><strong>${escapeHtml(
          subjectTitle
        )}</strong> for <strong>${escapeHtml(
      className
    )}</strong> hasn't been added yet.
        Notes and tests for this subject are on the way — check back soon.</p>
      </div>
    `;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  return { render };
})();

window.ComingSoon = ComingSoon;
