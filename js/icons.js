/**
 * ICONS MODULE
 * -------------
 * Single source of truth for the small UI icons (chevron, back arrow,
 * note, lock/unlock, book, done/pending) that used to be duplicated as
 * inline SVG strings across several modules. The actual markup now
 * lives in real .svg files under assets/icons/ui/ — if a redesign here
 * doesn't land well, those files (and only those files) are what need
 * reverting.
 *
 * These are fetched once at boot and cached as strings rather than
 * referenced via <img src="...">, because the icons rely on
 * `currentColor` to pick up hover/active/dark-mode colors — an <img>
 * renders the SVG in an isolated context where currentColor can't see
 * the surrounding CSS, so the markup has to be inlined into the DOM.
 */

const Icons = (() => {
  const FILES = {
    chevron: "assets/icons/ui/icon-chevron.svg",
    back: "assets/icons/ui/icon-back.svg",
    note: "assets/icons/ui/icon-note.svg",
    lock: "assets/icons/ui/icon-lock.svg",
    unlock: "assets/icons/ui/icon-unlock.svg",
    book: "assets/icons/ui/icon-book.svg",
    check: "assets/icons/ui/icon-check.svg",
    pending: "assets/icons/ui/icon-pending.svg",
  };

  const cache = {};
  let loadPromise = null;

  async function load() {
    await Promise.all(
      Object.entries(FILES).map(async ([key, path]) => {
        try {
          const res = await fetch(path);
          cache[key] = res.ok ? await res.text() : "";
        } catch (e) {
          cache[key] = "";
        }
      })
    );
    return cache;
  }

  function ensureLoaded() {
    if (!loadPromise) loadPromise = load();
    return loadPromise;
  }

  function get(name) {
    return cache[name] || "";
  }

  return { ensureLoaded, get };
})();

window.Icons = Icons;
