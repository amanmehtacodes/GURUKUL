/**
 * REPORT PAGE (controller)
 * ------------------------
 * Fetches one submission by id from the URL and hands it to
 * ReportView.render (js/report-view.js) for the actual drawing. Row
 * Level Security decides what comes back — a student can only ever
 * load their own submissions this way, an admin can load any.
 *
 * URL: report.html?id=<submission uuid>
 */

(function () {
  const root = document.getElementById("reportRoot");

  function getSubmissionId() {
    return new URLSearchParams(window.location.search).get("id");
  }

  async function init() {
    const id = getSubmissionId();
    if (!id) {
      root.innerHTML = errorBlock("No submission specified.", "Open this page via a link from your progress page or the admin console.");
      return;
    }

    await Auth.init();
    if (window.Theme) Theme.attachToggleButton(document.getElementById("themeToggle"));

    if (!Auth.isLoggedIn()) {
      root.innerHTML = `
        <div class="report-gate">
          <h1>Sign in to view this report</h1>
          <div id="reportSignIn" style="display:flex; justify-content:center; margin-top:10px;"></div>
        </div>`;
      Auth.renderButton(document.getElementById("reportSignIn"));
      Auth.onChange((user) => { if (user) init(); });
      return;
    }

    const result = await Backend.getSubmissionDetail(id);
    if (result.status !== "ok") {
      root.innerHTML = errorBlock(
        "Couldn't load this report.",
        result.message || "It may not exist, or you don't have access to it."
      );
      return;
    }

    const { submission, answers } = result;
    const statsResult = await Backend.getTestStats(submission.test_id);
    const stats = statsResult.status === "ok" ? statsResult.stats : null;

    root.innerHTML = `<div class="report-page-host"></div>`;
    ReportView.render(root.querySelector(".report-page-host"), {
      submission,
      answers,
      stats,
      showQuestions: true,
      inline: false,
    });
  }

  function errorBlock(title, detail) {
    return `<div class="report-gate"><h1>${escapeHtml(title)}</h1><p class="report-gate-detail">${escapeHtml(detail)}</p></div>`;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
