/**
 * DOT FIELD BACKGROUND
 * ---------------------
 * Cursor-reactive dot-grid background, adapted from the react-bits
 * "Dot Field" component (a React + Canvas2D/SVG component) into plain JS
 * against a container element — same reasoning as js/molten-metal.js: this
 * site has no build step, so there's no React/JSX pipeline to run the
 * original component through. The per-frame drawing logic is unchanged
 * from the original; only the React wrapper (useEffect/props/refs) was
 * rewritten as a plain mount function. No external library needed here
 * (Canvas2D + inline SVG only), unlike Molten Metal's WebGL/`ogl`
 * dependency.
 */

const DotField = (() => {
  const TWO_PI = Math.PI * 2;

  const DEFAULT_SETTINGS = {
    dotRadius: 1.5,
    dotSpacing: 14,
    bulgeStrength: 67,
    glowRadius: 160,
    sparkle: true,
    waveAmplitude: 0,
    cursorRadius: 600,
    cursorForce: 0.1,
    bulgeOnly: true,
    gradientFrom: "#A855F7",
    gradientTo: "#B497CF",
    glowColor: "#120F17",
  };

  function mount(container, settings) {
    if (!container) return null;

    const opts = Object.assign({}, DEFAULT_SETTINGS, settings || {});
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d", { alpha: true });

    // SVG glow overlay that follows the cursor — a separate layer (rather
    // than drawn into the canvas) so its opacity can transition smoothly
    // via CSS without redrawing the dot grid every frame just for the glow.
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.style.position = "absolute";
    svg.style.inset = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.pointerEvents = "none";
    const defs = document.createElementNS(svgNS, "defs");
    const gradId = `dot-field-glow-${Math.random().toString(36).slice(2, 9)}`;
    const radialGradient = document.createElementNS(svgNS, "radialGradient");
    radialGradient.setAttribute("id", gradId);
    const stop0 = document.createElementNS(svgNS, "stop");
    stop0.setAttribute("offset", "0%");
    stop0.setAttribute("stop-color", opts.glowColor);
    const stop1 = document.createElementNS(svgNS, "stop");
    stop1.setAttribute("offset", "100%");
    stop1.setAttribute("stop-color", "transparent");
    radialGradient.appendChild(stop0);
    radialGradient.appendChild(stop1);
    defs.appendChild(radialGradient);
    svg.appendChild(defs);
    const glowCircle = document.createElementNS(svgNS, "circle");
    glowCircle.setAttribute("cx", "-9999");
    glowCircle.setAttribute("cy", "-9999");
    glowCircle.setAttribute("r", String(opts.glowRadius));
    glowCircle.setAttribute("fill", `url(#${gradId})`);
    glowCircle.style.opacity = "0";
    glowCircle.style.willChange = "opacity";
    svg.appendChild(glowCircle);
    container.appendChild(svg);

    let dots = [];
    const size = { w: 0, h: 0, offsetX: 0, offsetY: 0 };
    const mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
    let engagement = 0;
    let glowOpacity = 0;
    let resizeTimer = null;

    function buildDots(w, h) {
      const step = opts.dotRadius + opts.dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const next = new Array(Math.max(0, rows * cols));
      let idx = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          next[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
      dots = next;
    }

    function doResize() {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      size.w = w;
      size.h = h;
      size.offsetX = rect.left + window.scrollX;
      size.offsetY = rect.top + window.scrollY;
      buildDots(w, h);
    }

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    }

    function onMouseMove(e) {
      mouse.x = e.pageX - size.offsetX;
      mouse.y = e.pageY - size.offsetY;
    }

    const speedInterval = setInterval(() => {
      const dx = mouse.prevX - mouse.x;
      const dy = mouse.prevY - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      mouse.speed += (dist - mouse.speed) * 0.5;
      if (mouse.speed < 0.001) mouse.speed = 0;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    }, 20);

    const reducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frameCount = 0;
    let raf = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;

    function drawFrame() {
      frameCount++;
      const { w, h } = size;
      const len = dots.length;
      const t = frameCount * 0.02;

      const targetEngagement = Math.min(mouse.speed / 5, 1);
      engagement += (targetEngagement - engagement) * 0.06;
      if (engagement < 0.001) engagement = 0;

      glowOpacity += (engagement - glowOpacity) * 0.08;
      glowCircle.setAttribute("cx", String(mouse.x));
      glowCircle.setAttribute("cy", String(mouse.y));
      glowCircle.style.opacity = String(glowOpacity);

      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, opts.gradientFrom);
      grad.addColorStop(1, opts.gradientTo);
      ctx.fillStyle = grad;

      const cr = opts.cursorRadius;
      const crSq = cr * cr;
      // dotRadius IS the rendered radius (not a diameter to be halved) —
      // at dotRadius: 1.5 each dot is genuinely ~1.5px, visible as a
      // distinct dot grid rather than fading into the wallpaper color.
      const rad = opts.dotRadius;
      const isBulge = opts.bulgeOnly;

      ctx.beginPath();

      for (let i = 0; i < len; i++) {
        const d = dots[i];
        const dx = mouse.x - d.ax;
        const dy = mouse.y - d.ay;
        const distSq = dx * dx + dy * dy;

        if (distSq < crSq && engagement > 0.01) {
          const dist = Math.sqrt(distSq);
          if (isBulge) {
            const tt = 1 - dist / cr;
            const push = tt * tt * opts.bulgeStrength * engagement;
            const angle = Math.atan2(dy, dx);
            d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
            d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
          } else {
            const angle = Math.atan2(dy, dx);
            const move = (500 / dist) * (mouse.speed * opts.cursorForce);
            d.vx += Math.cos(angle) * -move;
            d.vy += Math.sin(angle) * -move;
          }
        } else if (isBulge) {
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }

        if (!isBulge) {
          d.vx *= 0.9;
          d.vy *= 0.9;
          d.x = d.ax + d.vx;
          d.y = d.ay + d.vy;
          d.sx += (d.x - d.sx) * 0.1;
          d.sy += (d.y - d.sy) * 0.1;
        }

        let drawX = d.sx;
        let drawY = d.sy;
        if (opts.waveAmplitude > 0) {
          drawY += Math.sin(d.ax * 0.03 + t) * opts.waveAmplitude;
          drawX += Math.cos(d.ay * 0.03 + t * 0.7) * opts.waveAmplitude * 0.5;
        }

        if (opts.sparkle) {
          const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
          if (hash % 100 < 3) {
            ctx.moveTo(drawX + rad * 1.8, drawY);
            ctx.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
          } else {
            ctx.moveTo(drawX + rad, drawY);
            ctx.arc(drawX, drawY, rad, 0, TWO_PI);
          }
        } else {
          ctx.moveTo(drawX + rad, drawY);
          ctx.arc(drawX, drawY, rad, 0, TWO_PI);
        }
      }

      ctx.fill();
    }

    function loop() {
      drawFrame();
      raf = requestAnimationFrame(loop);
    }

    const tryStart = () => {
      if (reducedMotion) {
        drawFrame(); // single static frame
        return;
      }
      if (isVisible && isPageVisible && raf === 0)
        raf = requestAnimationFrame(loop);
    };
    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    doResize();

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        isVisible ? tryStart() : tryStop();
      },
      { threshold: 0 }
    );
    io.observe(container);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      isPageVisible ? tryStart() : tryStop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    tryStart();

    return {
      destroy() {
        tryStop();
        ro.disconnect();
        io.disconnect();
        clearInterval(speedInterval);
        clearTimeout(resizeTimer);
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouseMove);
        try {
          container.removeChild(canvas);
          container.removeChild(svg);
        } catch (e) {}
      },
    };
  }

  return { mount, DEFAULT_SETTINGS };
})();

window.DotField = DotField;
