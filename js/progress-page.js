/**
 * PROGRESS PAGE MODULE
 * ----------------------
 * A dedicated full-screen view showing everything Progress.js knows
 * about the current student: submission/score history grouped by
 * subject, and overall notes-read / tests-done progress.
 *
 * Reachable via a header link once signed in (wired in app.js).
 */

const ProgressPage = (() => {
  function render(container, { onBack } = {}) {
    const user = Auth.getUser();
    container.innerHTML = "";
    container.classList.add("picker-mode");

    const backIconSvg = (window.Icons && Icons.get("back")) || "";
    const backBtnHtml = onBack
      ? `<button class="picker-back" id="progressBack">${backIconSvg}<span>Back</span></button>`
      : "";

    if (!user) {
      container.innerHTML = `
        <div class="class-picker">
          ${backBtnHtml}
          <div class="class-picker-intro">
            <h1>Sign in to see your progress</h1>
            <p>Your scores and progress are tied to your Google account.</p>
          </div>
        </div>`;
      if (onBack) container.querySelector("#progressBack").addEventListener("click", onBack);
      return;
    }

    const wrap = document.createElement("div");
    wrap.className = "class-picker progress-page";
    wrap.innerHTML = `
      ${backBtnHtml}
      <div class="class-picker-intro">
        <div class="class-picker-eyebrow"><span>${escapeHtml(user.email)}</span></div>
        <h1>My progress</h1>
        <p>${AccessControl.getRollNumber() ? `Roll number ${AccessControl.getRollNumber()} · ` : ""}Every test you've submitted and what's left to do.</p>
      </div>
      <div class="progress-page-body" id="progressPageBody">
        <div class="progress-loading">Loading your progress…</div>
      </div>
    `;
    container.appendChild(wrap);

    if (onBack) wrap.querySelector("#progressBack").addEventListener("click", onBack);

    renderBody(wrap.querySelector("#progressPageBody"));
  }

  async function renderBody(bodyEl) {
    if (!Progress.isLoaded()) {
      await Progress.ensureLoaded();
    }
    if (!AccessControl.isLoaded()) {
      await AccessControl.ensureLoaded();
    }
    const submissions = Progress.getSubmissions();

    if (!Backend.isConfigured()) {
      bodyEl.innerHTML = `
        <div class="progress-empty">
          <p>Progress tracking isn't connected yet — once Supabase is configured (see SETUP_CHECKLIST.md), your scores and progress will show up here.</p>
        </div>`;
      return;
    }

    const chapterProgressHtml = buildChapterProgressHtml();

    if (!submissions.length && !chapterProgressHtml) {
      bodyEl.innerHTML = `
        <div class="progress-empty">
          <p>No test attempts yet. Once you submit a test, your score will show up here.</p>
        </div>`;
      return;
    }

    if (!submissions.length) {
      bodyEl.innerHTML = chapterProgressHtml;
      wireChapterProgress(bodyEl);
      return;
    }

    // Group submissions by subject, most recent first within each group.
    const bySubject = new Map();
    submissions
      .slice()
      .reverse()
      .forEach((s) => {
        const key = `${s.className} · ${s.subject}`;
        if (!bySubject.has(key)) bySubject.set(key, []);
        bySubject.get(key).push(s);
      });

    let html = "";
    bySubject.forEach((rows, subjectKey) => {
      html += `<div class="progress-subject-group">
        <div class="progress-subject-title">${escapeHtml(subjectKey)}</div>
        <div class="progress-rows">`;
      rows.forEach((s) => {
        const hasScore = s.totalMcq !== "" && s.totalMcq != null && s.totalMcq !== 0;
        const pct = hasScore ? Math.round((Number(s.score) / Number(s.totalMcq)) * 100) : null;
        const tier = pct === null ? "" : pct >= 80 ? "success" : pct >= 50 ? "warn" : "error";
        const theoryBadge =
          s.subjectiveStatus === "graded" ? `<span class="progress-theory-badge graded">Theory graded</span>` :
          s.subjectiveStatus === "pending" ? `<span class="progress-theory-badge pending">Theory pending</span>` : "";
        html += `
          <button type="button" class="progress-test-row" data-id="${escapeHtml(s.id)}" data-test-id="${escapeHtml(s.testId || "")}">
            <div class="progress-test-info">
              <div class="progress-test-name">${escapeHtml(s.test)} ${theoryBadge}</div>
              <div class="progress-test-meta">${escapeHtml(s.section)} / ${escapeHtml(s.subsection)} · ${escapeHtml(formatDate(s.submittedAt))}</div>
            </div>
            <div class="progress-test-score ${tier}">${hasScore ? `${s.score}/${s.totalMcq}` : "—"}</div>
          </button>
          <div class="progress-report-panel hidden" id="progress-report-${escapeHtml(s.id)}"></div>`;
      });
      html += `</div></div>`;
    });

    bodyEl.innerHTML = chapterProgressHtml + html;

    wireChapterProgress(bodyEl);
    bodyEl.querySelectorAll(".progress-test-row").forEach((row) => {
      row.addEventListener("click", () => toggleInlineReport(row));
    });
  }

  /**
   * Chapter-level progress bars for every class the student currently
   * has access to (whole-class grants or individual chapter grants),
   * not just whatever subject they happen to have open right now.
   */
  function buildChapterProgressHtml() {
    if (!window.CLASSES || !window.AccessControl || !window.Progress) return "";
    const grants = AccessControl.getGrants();
    if (!grants.length) return "";

    const classGrantIds = new Set(grants.filter((g) => g.type === "class").map((g) => g.value));
    const chapterGrantIds = new Set(grants.filter((g) => g.type === "chapter").map((g) => g.value));
    if (!classGrantIds.size && !chapterGrantIds.size) return "";

    let html = "";
    CLASSES.forEach((cls) => {
      if (cls.type === "exam" || !cls.subjects) return; // exam tracks aren't live yet

      const hasClassGrant = classGrantIds.has(cls.id);
      const subjectBlocks = [];

      cls.subjects.forEach((subject) => {
        if (!subject.ready || !subject.sections) return;
        const chapterRows = [];

        subject.sections.forEach((section) => {
          const hasAccess = hasClassGrant || chapterGrantIds.has(section.id);
          if (!hasAccess) return;
          const stats = Progress.statsForSection(section);
          const pct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
          chapterRows.push(`
            <div class="chapter-progress-row">
              <div class="chapter-progress-label">
                <span>${escapeHtml(section.title)}</span>
                <span class="chapter-progress-count">${stats.done}/${stats.total}</span>
              </div>
              <div class="progress-bar-track">
                <div class="progress-bar-fill" style="width:${pct}%"></div>
              </div>
            </div>`);
        });

        if (chapterRows.length) {
          subjectBlocks.push(`
            <div class="chapter-progress-subject">
              <div class="chapter-progress-subject-title">${escapeHtml(subject.title)}</div>
              ${chapterRows.join("")}
            </div>`);
        }
      });

      if (subjectBlocks.length) {
        html += `
          <div class="chapter-progress-class">
            <div class="chapter-progress-class-title">${escapeHtml(cls.name)}</div>
            ${subjectBlocks.join("")}
          </div>`;
      }
    });

    if (!html) return "";
    return `
      <div class="progress-subject-group chapter-progress-group">
        <div class="progress-subject-title">Chapter progress</div>
        <div class="chapter-progress-body">${html}</div>
      </div>`;
  }

  function wireChapterProgress() {
    // Placeholder hook — chapter rows are static bars for now (no
    // click interaction yet), kept as a function so behavior can be
    // added later without touching the render call sites.
  }

  /**
   * Expands the full report (topic breakdown, class average, every
   * question) directly under the clicked row — no separate page.
   * Lazy-loaded on first click, cached after that.
   */
  async function toggleInlineReport(row) {
    const id = row.dataset.id;
    const testId = row.dataset.testId;
    const panel = document.getElementById(`progress-report-${id}`);
    if (!panel) return;

    const nowHidden = panel.classList.toggle("hidden");
    row.classList.toggle("expanded", !nowHidden);
    if (nowHidden || panel.dataset.loaded) return;

    panel.innerHTML = `<div class="progress-loading">Loading report…</div>`;

    const result = await Backend.getSubmissionDetail(id);
    if (result.status !== "ok") {
      panel.innerHTML = `<p style="color:var(--error);">Couldn't load this report: ${escapeHtml(result.message || "")}</p>`;
      return;
    }

    let stats = null;
    if (testId) {
      const statsResult = await Backend.getTestStats(testId);
      if (statsResult.status === "ok") stats = statsResult.stats;
    }

    panel.dataset.loaded = "1";
    if (window.ReportView) {
      ReportView.render(panel, {
        submission: result.submission,
        answers: result.answers,
        stats,
        showQuestions: true,
        inline: true,
      });
    }
  }

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) return iso;
      return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch (e) {
      return iso;
    }
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  return { render };
})();

window.ProgressPage = ProgressPage;
