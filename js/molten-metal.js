/**
 * MOLTEN METAL BACKGROUND
 * -------------------------
 * Animated WebGL shader background for the landing hero. Adapted from the
 * react-bits "Molten Metal" component (a React + `ogl` component) into
 * plain JS against a container element — this site has no build step, so
 * there's no React/JSX/npm-install pipeline to run that component through.
 * The shader and rendering logic are unchanged from the original; only the
 * React wrapper (useEffect/props) was rewritten as a plain mount function.
 *
 * `ogl` (the tiny WebGL micro-library the original component uses) is
 * bundled locally under js/vendor/ogl/ (same "no CDN dependency" approach
 * as js/vendor/marked.min.js and js/vendor/html2pdf.bundle.min.js) and
 * loaded as an ES module via dynamic import() — that works fine from a
 * regular <script> (no type="module" needed on the tag itself). This used
 * to import from a jsdelivr CDN URL at runtime, but that's a single point
 * of failure: an ad blocker, privacy extension, or offline dev server can
 * silently block it, which would make this background quietly never
 * appear with no visible error. Self-hosting removes that risk entirely.
 *
 * The vendor file itself is a pre-bundled, minified single file (built
 * with esbuild from just the 4 ogl exports this component actually uses —
 * Renderer/Program/Mesh/Triangle — and their real transitive dependencies,
 * about 17 small source files total), not the full ogl package's ~65
 * separate ES module files. Importing ogl's own index.js directly would
 * technically work, but that file re-exports the *entire* library (every
 * loader, helper, and extra ogl ships), so the browser would have to fetch
 * and parse ~57 files just to use 4 of them — a classic "barrel file" tax
 * that was previously most of this site's slow first paint. Rebuild with:
 *   npx esbuild entry.js --bundle --format=esm --minify --target=es2020
 *     --outfile=molten-metal-ogl.min.js
 * where entry.js re-exports Renderer/Program/Mesh/Triangle from ogl's src.
 *
 * If WebGL2 isn't available, or the import fails, mount() just no-ops and
 * whatever's already behind the container (the wallpaper color) stays
 * visible.
 */

const MoltenMetal = (() => {
  // Resolved relative to this script's own URL (js/molten-metal.js), so it
  // works the same from every page regardless of the page's own path.
  const OGL_MODULE_URL = "./vendor/ogl/molten-metal-ogl.min.js";

  // Fixed look for the landing hero — same values as the component's
  // configured "Usage (with your settings)" preset.
  const DEFAULT_SETTINGS = {
    color1: "#ff27df",
    color2: "#FF9FFC",
    color3: "#FFFFFF",
    speed: 0.7,
    scale: 6.5,
    detail: 6,
    glow: 1.5,
    coreSize: 0.1,
    swirl: 2,
    fold: -0.2,
    blackPoint: 0.1,
    brightness: 1.2,
    colorMode: "molten",
    grain: false,
    grainIntensity: 0.05,
    mouseInteraction: false,
    mouseStrength: 0.3,
    opacity: 1,
  };

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return [1, 1, 1];
    return [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255,
    ];
  }

  function colorModeToFloat(mode) {
    return mode === "ember" ? 1 : mode === "frost" ? 2 : 0;
  }

  const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

  const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uScale;
uniform float uDetail;
uniform float uGlow;
uniform float uCoreSize;
uniform float uSwirl;
uniform float uFold;
uniform float uBlackPoint;
uniform float uBrightness;
uniform float uColorMode;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform bool uEnableMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float time = iTime * uSpeed;
  vec2 p = uScale * ((gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y) - 0.5;

  vec2 drift = vec2(0.0);
  if (uEnableMouse) {
    drift = (uMouse - 0.5) * uMouseStrength * 2.0;
  }
  p += drift;

  vec2 i = p;
  float c = 0.0;
  float r = length(p + vec2(sin(time), sin(time * 0.3 + 5.0)) * 0.5);
  float d = length(p);
  float rot = d + time + p.x * uSwirl;

  float cosRot = cos(rot);
  mat2 warp = mat2(cos(rot - sin(time / 5.0)), sin(rot), -sin(cosRot - time), cosRot) * uFold;
  float glowCore = uGlow * uCoreSize;

  for (float n = 0.0; n < 8.0; n++) {
    if (n >= uDetail) break;
    p *= warp;
    float t = r - time / (n + 3.0);
    i -= p + vec2(cos(t - i.x - r) + sin(t + i.y), sin(t - i.y) + cos(t + i.x) + r);
    c += glowCore / length(vec2(sin(i.x + t), cos(i.y + t)));
  }

  c /= 6.0;

  float intensity = max(c - uBlackPoint, 0.0) * uBrightness;
  float g = clamp(intensity, 0.0, 1.0);

  float mid = 0.5;
  if (uColorMode > 1.5) {
    mid = 0.65;
  } else if (uColorMode > 0.5) {
    mid = 0.35;
  }

  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, mid, g));
  col = mix(col, uColor3, smoothstep(mid, 1.0, g));

  float a = g;
  if (uGrain > 0.5) {
    float gr = hash(gl_FragCoord.xy + iTime);
    a += (gr - 0.5) * uGrainIntensity;
  }
  a = clamp(a, 0.0, 1.0) * uOpacity;
  fragColor = vec4(col * a, a);
}
`;

  async function mount(container, settings) {
    if (!container) return null;
    if (!window.WebGL2RenderingContext) return null; // no WebGL2 — leave the CSS gradient fallback showing

    const opts = Object.assign({}, DEFAULT_SETTINGS, settings || {});

    let ogl;
    try {
      ogl = await import(/* webpackIgnore: true */ OGL_MODULE_URL);
    } catch (e) {
      console.warn(
        "MoltenMetal: could not load the `ogl` WebGL library, skipping animated background.",
        e
      );
      return null;
    }
    const { Renderer, Program, Mesh, Triangle } = ogl;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const c1 = hexToRgb(opts.color1);
    const c2 = hexToRgb(opts.color2);
    const c3 = hexToRgb(opts.color3);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uSpeed: { value: opts.speed },
        uScale: { value: opts.scale },
        uDetail: { value: opts.detail },
        uGlow: { value: opts.glow },
        uCoreSize: { value: Math.max(opts.coreSize, 0.001) },
        uSwirl: { value: opts.swirl },
        uFold: { value: opts.fold },
        uBlackPoint: { value: opts.blackPoint },
        uBrightness: { value: opts.brightness },
        uColorMode: { value: colorModeToFloat(opts.colorMode) },
        uGrain: { value: opts.grain ? 1 : 0 },
        uGrainIntensity: { value: opts.grainIntensity },
        uOpacity: { value: opts.opacity },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseStrength: { value: opts.mouseStrength },
        uEnableMouse: { value: !!opts.mouseInteraction },
        uColor1: { value: new Float32Array(c1) },
        uColor2: { value: new Float32Array(c2) },
        uColor3: { value: new Float32Array(c3) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h);
      const res = program.uniforms.iResolution.value;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    const targetMouse = [0.5, 0.5];
    const currentMouse = [0.5, 0.5];
    let handleMouseMove = null;
    let handleMouseLeave = null;

    if (opts.mouseInteraction) {
      handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        targetMouse[0] = (e.clientX - rect.left) / rect.width;
        targetMouse[1] = 1.0 - (e.clientY - rect.top) / rect.height;
      };
      handleMouseLeave = () => {
        targetMouse[0] = 0.5;
        targetMouse[1] = 0.5;
      };
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    // Respect reduced-motion: paint one static frame instead of animating.
    const reducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const t0 = performance.now();

    const loop = (t) => {
      program.uniforms.iTime.value = (t - t0) * 0.001;
      if (opts.mouseInteraction) {
        currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
        program.uniforms.uMouse.value[0] = currentMouse[0];
        program.uniforms.uMouse.value[1] = currentMouse[1];
      }
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };

    const tryStart = () => {
      if (reducedMotion) return;
      if (isVisible && isPageVisible && raf === 0)
        raf = requestAnimationFrame(loop);
    };
    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

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

    tryStart();

    return {
      destroy() {
        tryStop();
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        if (handleMouseMove)
          canvas.removeEventListener("mousemove", handleMouseMove);
        if (handleMouseLeave)
          canvas.removeEventListener("mouseleave", handleMouseLeave);
        try {
          container.removeChild(canvas);
        } catch (e) {}
        const ext = gl.getExtension("WEBGL_lose_context");
        if (ext) ext.loseContext();
      },
    };
  }

  return { mount, DEFAULT_SETTINGS };
})();

window.MoltenMetal = MoltenMetal;
