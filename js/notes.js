/**
 * NOTES MODULE
 * ------------
 * Fetches a .md file, renders it to HTML via marked.js, and provides
 * a "Save as PDF" action via html2pdf.js.
 */

const Notes = (() => {
  /**
   * Slugify a raw heading string the same way the Table of Contents links
   * inside each notes.md file were authored (GitHub-style slugs): lowercase,
   * strip punctuation/symbols (keep letters, numbers, marks, hyphens, spaces),
   * then turn every individual space into a hyphen (without collapsing runs,
   * so removed punctuation between words still yields the expected "--").
   */
  function slugify(raw) {
    return String(raw || "")
      .toLowerCase()
      .replace(/<[^>]*>/g, "")
      .replace(/[^\p{L}\p{N}\p{M}\- ]+/gu, "")
      .trim()
      .split(" ")
      .join("-");
  }

  // marked strips heading ids by default ("ignore IDs"), which breaks every
  // in-note Table of Contents / cross-heading link. This renderer restores
  // matching ids, with GitHub-style de-duplication (repeat slug -> -1, -2...)
  // scoped per note render so counts don't leak between notes.
  function makeSlugRenderer() {
    const renderer = new marked.Renderer();
    const seen = new Map();
    renderer.heading = (text, level, raw) => {
      let slug = slugify(raw);
      if (!slug) slug = "section";
      const count = seen.get(slug) || 0;
      seen.set(slug, count + 1);
      const id = count === 0 ? slug : `${slug}-${count}`;
      return `<h${level} id="${id}">${text}</h${level}>\n`;
    };
    return renderer;
  }

  // A note whose file is a standalone .html/.htm document (a fully
  // self-contained lesson page — its own <style>/<script>, not a markdown
  // fragment) renders differently from the .md pipeline below: it's loaded
  // into a sandboxed iframe instead of being parsed by marked and injected
  // into the page, so its own CSS/JS never collides with the site's.
  function isHtmlNote(note) {
    return /\.html?(\?|#|$)/i.test(note.file);
  }

  async function renderNote(container, { section, sub, note }) {
    const isRead = window.Progress && Progress.isNoteRead(note.id);
    const isHtml = isHtmlNote(note);

    // A standalone-HTML lesson is a full page, not prose — the usual
    // 760px reading column just wastes the room next to the sidebar, so
    // it gets a wide variant of the shared content wrapper instead (reset
    // back to normal by app.js's renderMain() on every other navigation).
    container.classList.toggle("content-wrap-wide", isHtml);

    container.innerHTML = `
      <div class="note-toolbar">
        <div class="breadcrumb">
          ${escapeHtml(section.title)} <span class="sep">/</span> ${escapeHtml(
      sub.title
    )} <span class="sep">/</span> ${escapeHtml(note.title)}
        </div>
        <div class="actions">
          <button class="btn btn-ghost btn-sm" id="markReadBtn" ${
            isRead ? "disabled" : ""
          }>
            ${
              isRead
                ? `<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Read`
                : `<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.3" stroke="currentColor" stroke-width="1.4"/></svg> Mark as read`
            }
          </button>
          ${
            isHtml
              ? ""
              : `<button class="btn btn-ghost btn-sm" id="pdfBtn">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 2v8m0 0l-3-3m3 3l3-3M3 12v1.5A1.5 1.5 0 004.5 15h7a1.5 1.5 0 001.5-1.5V12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Save as PDF
          </button>`
          }
        </div>
      </div>
      <div class="note-pane${isHtml ? " note-pane-html" : ""}">
        <div class="note-body" id="noteBody">
          <div style="font-family: var(--font-mono); font-size: 12px; color: var(--ink-faint);">Loading…</div>
        </div>
      </div>
    `;

    const bodyEl = container.querySelector("#noteBody");

    try {
      const res = await fetch(note.file);
      if (!res.ok)
        throw new Error(`Could not load ${note.file} (${res.status})`);

      if (isHtml) {
        const html = await res.text();
        bodyEl.innerHTML = "";
        const iframe = document.createElement("iframe");
        iframe.setAttribute(
          "sandbox",
          "allow-scripts allow-same-origin allow-popups"
        );
        iframe.style.cssText =
          "width:100%; border:0; display:block; background:transparent;";
        iframe.addEventListener("load", () => {
          try {
            const doc = iframe.contentDocument;
            const resize = () =>
              (iframe.style.height =
                doc.documentElement.scrollHeight + "px");
            resize();
            // Interactive answer reveals change layout height after load,
            // so keep resizing briefly as the lesson's own JS runs/settles.
            new ResizeObserver(resize).observe(doc.body);
          } catch (e) {
            iframe.style.height = "1400px";
          }
        });
        iframe.srcdoc = html;
        bodyEl.appendChild(iframe);
      } else {
        const md = await res.text();
        bodyEl.innerHTML = marked.parse(md, { renderer: makeSlugRenderer() });
        if (window.MathTools) MathTools.renderMathIn(bodyEl);
      }
    } catch (err) {
      bodyEl.innerHTML = `<p style="color: var(--error);">Failed to load note: ${escapeHtml(
        err.message
      )}</p>`;
    }

    const pdfBtn = container.querySelector("#pdfBtn");
    if (pdfBtn) {
      pdfBtn.addEventListener("click", () => {
        exportPdf(container.querySelector(".note-pane"), note.title);
      });
    }

    const markReadBtn = container.querySelector("#markReadBtn");
    markReadBtn.addEventListener("click", async () => {
      if (!window.Progress) return;
      markReadBtn.disabled = true;
      markReadBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Read`;
      await Progress.markNoteRead(note.id);
      document.dispatchEvent(new CustomEvent("gurukul:progress-changed"));
    });
  }

  function exportPdf(noteEl, title) {
    const filename =
      (title || "note").toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".pdf";
    const opt = {
      margin: [12, 12, 12, 12],
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    // Clone so the on-screen graph-paper background doesn't get baked into the PDF
    const clone = noteEl.cloneNode(true);
    clone.style.backgroundImage = "none";
    clone.style.border = "none";
    html2pdf().set(opt).from(clone).save();
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  return { renderNote };
})();

window.Notes = Notes;
