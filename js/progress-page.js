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

    const backIconSvg = `<svg viewBox="0 0 16 16" fill="none"><path d="M10 3.5L5.5 8l4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
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
    const submissions = Progress.getSubmissions();

    if (!Backend.isConfigured()) {
      bodyEl.innerHTML = `
        <div class="progress-empty">
          <p>Progress tracking isn't connected yet — once Supabase is configured (see SETUP_CHECKLIST.md), your scores and progress will show up here.</p>
        </div>`;
      return;
    }

    if (!submissions.length) {
      bodyEl.innerHTML = `
        <div class="progress-empty">
          <p>No test attempts yet. Once you submit a test, your score will show up here.</p>
        </div>`;
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
        html += `
          <div class="progress-test-row">
            <div class="progress-test-info">
              <div class="progress-test-name">${escapeHtml(s.test)}</div>
              <div class="progress-test-meta">${escapeHtml(s.section)} / ${escapeHtml(s.subsection)} · ${escapeHtml(formatDate(s.submittedAt))}</div>
            </div>
            <div class="progress-test-score ${tier}">${hasScore ? `${s.score}/${s.totalMcq}` : "—"}</div>
          </div>`;
        html += renderSubjectiveReport(s);
      });
      html += `</div></div>`;
    });

    bodyEl.innerHTML = html;
  }

  /**
   * Shows the theory/subjective grading state for one submission:
   * "pending review" if you haven't graded it yet in the admin console,
   * or the full per-topic breakdown once you have (see
   * Backend.adminFinalizeGrading / SETUP_CHECKLIST.md Phase 7).
   */
  function renderSubjectiveReport(s) {
    if (!s.subjectiveStatus || s.subjectiveStatus === "n/a") return "";

    if (s.subjectiveStatus === "pending") {
      return `<div class="progress-subjective pending">Theory answers submitted — awaiting review.</div>`;
    }

    const report = s.overallReport;
    if (!report) return "";

    const topicsHtml = (report.topics || [])
      .map(
        (t) => `
        <div class="progress-topic-row ${t.revise ? "revise" : ""}">
          <span class="progress-topic-name">${escapeHtml(t.topic)}</span>
          <span class="progress-topic-score">${escapeHtml(t.scored)}</span>
        </div>`
      )
      .join("");

    const revisionHtml = report.revisionFocus && report.revisionFocus.length
      ? `<div class="progress-revision-focus">Revise: ${escapeHtml(report.revisionFocus.join(", "))}</div>`
      : "";

    return `
      <div class="progress-subjective graded">
        <div class="progress-subjective-head">Theory portion — ${escapeHtml(report.overall || "")}</div>
        ${topicsHtml}
        ${revisionHtml}
      </div>`;
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
