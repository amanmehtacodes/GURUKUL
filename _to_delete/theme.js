/**
 * THEME MODULE
 * ------------
 * Light/dark toggle. The initial theme is already applied by a tiny
 * inline script at the very top of <head> in every page (before any
 * stylesheet loads) to avoid a flash of the wrong theme on load — this
 * file only wires up the toggle button afterwards and keeps
 * localStorage in sync when it's clicked.
 */
const Theme = (() => {
  const KEY = "gurukul_theme";

  function get() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }

  function set(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);
  }

  function toggle() {
    set(get() === "dark" ? "light" : "dark");
  }

  function attachToggleButton(btn) {
    if (!btn) return;
    btn.addEventListener("click", toggle);
  }

  return { get, set, toggle, attachToggleButton };
})();

window.Theme = Theme;
