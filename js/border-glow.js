/**
 * BORDER GLOW MODULE
 * -----------------------
 * Cursor-tracking edge-glow hover effect for picker cards (.class-card),
 * ported from a React "Border Glow" component into plain DOM + CSS custom
 * properties. The colored mesh-gradient border/fill layers and the outer
 * glow ring's palette are fixed values baked directly into css/style.css
 * (--gradient-one..seven, --glow-color*) since this site only ever uses
 * one fixed color set — the only things that need to move with the
 * pointer are --edge-proximity (how close the cursor is to this card's
 * edge, 0-100) and --cursor-angle (the direction from the card's center
 * to the cursor), both set here on pointermove.
 *
 * Usage: BorderGlow.enhance(cardEl) — call once per card right after it's
 * added to the DOM. Safe to call more than once on the same element (a
 * flag guards against double-enhancement, e.g. if a picker re-renders).
 */

const BorderGlow = (() => {
  function getCenter(el) {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      rect,
    };
  }

  // 0 at the card's center, ramping up to 100 right at its edge — mirrors
  // the original component's min(cx/|dx|, cy/|dy|) edge-distance math.
  function getEdgeProximity(el, pointerX, pointerY) {
    const { x: cx, y: cy, rect } = getCenter(el);
    const dx = pointerX - cx;
    const dy = pointerY - cy;
    const halfW = rect.width / 2 || 1;
    const halfH = rect.height / 2 || 1;
    const distX = Math.abs(dx) / halfW;
    const distY = Math.abs(dy) / halfH;
    const proximity = Math.max(distX, distY);
    return Math.min(100, Math.max(0, proximity * 100));
  }

  // Angle (in degrees, CSS-conic-gradient convention) from the card's
  // center to the pointer, matching the original atan2 + 90deg offset.
  function getCursorAngle(el, pointerX, pointerY) {
    const { x: cx, y: cy } = getCenter(el);
    const dx = pointerX - cx;
    const dy = pointerY - cy;
    const rad = Math.atan2(dy, dx);
    let deg = (rad * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;
    return deg;
  }

  function enhance(card) {
    if (!card || card.__borderGlowEnhanced) return;
    card.__borderGlowEnhanced = true;

    const light = document.createElement("span");
    light.className = "edge-light";
    light.setAttribute("aria-hidden", "true");
    card.insertBefore(light, card.firstChild);

    card.addEventListener("pointermove", (e) => {
      const proximity = getEdgeProximity(card, e.clientX, e.clientY);
      const angle = getCursorAngle(card, e.clientX, e.clientY);
      card.style.setProperty("--edge-proximity", String(proximity));
      card.style.setProperty("--cursor-angle", angle + "deg");
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--edge-proximity", "0");
    });
  }

  return { enhance };
})();

window.BorderGlow = BorderGlow;
