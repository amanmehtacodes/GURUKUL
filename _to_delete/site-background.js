/**
 * SITE BACKGROUND
 * -----------------
 * Mounts the site-wide animated background into #siteBg — a fixed,
 * full-viewport layer behind everything (see .site-bg in style.css),
 * shared by every page (landing, class picker, sidebar/notes, report,
 * admin) rather than scoped to just the hero. Desktop-width viewports get
 * the Dot Field cursor-reactive grid; phone-width viewports keep the
 * Molten Metal shader (same "no build step" plain-JS approach as those
 * two modules — see js/dot-field.js and js/molten-metal.js).
 *
 * Re-checks on resize and swaps modules if the viewport crosses the
 * breakpoint (rotating a tablet, resizing a desktop window down), rather
 * than deciding once at load and never revisiting it.
 */
(function () {
  const PHONE_QUERY = "(max-width: 640px)"; // same breakpoint style.css already uses for the hero

  function boot() {
    const container = document.getElementById("siteBg");
    if (!container) return;

    let mode = null; // "phone" | "desktop" — whichever is currently mounted
    let instance = null;
    let generation = 0;

    function desiredMode() {
      return window.matchMedia && window.matchMedia(PHONE_QUERY).matches
        ? "phone"
        : "desktop";
    }

    async function mountFor(nextMode) {
      const myGeneration = ++generation;
      container.innerHTML = "";

      let nextInstance = null;
      if (nextMode === "phone" && window.MoltenMetal) {
        nextInstance = await MoltenMetal.mount(container);
      } else if (nextMode === "desktop" && window.DotField) {
        nextInstance = DotField.mount(container);
      }

      // If another sync() ran while this mount was in flight (e.g. an
      // async CDN import for Molten Metal), this result is stale — tear
      // it down instead of clobbering whatever mounted after it.
      if (myGeneration !== generation) {
        if (nextInstance && nextInstance.destroy) nextInstance.destroy();
        return;
      }
      mode = nextMode;
      instance = nextInstance;
    }

    function sync() {
      const next = desiredMode();
      if (mode === next) return;
      if (instance && instance.destroy) instance.destroy();
      instance = null;
      mountFor(next);
    }

    sync();

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(sync, 200);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
