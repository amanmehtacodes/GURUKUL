/**
 * ADMIN DASHBOARD
 * -----------------
 * Gated by real Supabase Auth (Google sign-in) plus the admin_emails
 * allowlist in supabase/schema.sql, checked via the is_admin() RPC —
 * not a shared password like the old Apps Script version. Row Level
 * Security enforces the same check server-side regardless of what this
 * page renders, so this UI gating is a convenience, not the real
 * security boundary.
 */

(function () {
  const gateScreen = document.getElementById("gateScreen");
  const notAuthorizedScreen = document.getElementById("notAuthorizedScreen");
  const notAuthEmail = document.getElementById("notAuthEmail");
  const notAuthSignOutBtn = document.getElementById("notAuthSignOut");
  const dashboard = document.getElementById("dashboard");
  const loadingState = document.getElementById("loadingState");
  const unavailableState = document.getElementById("unavailableState");
  const adminSignInHost = document.getElementById("adminSignInHost");
  const gateError = document.getElementById("gateError");

  const grantForm = document.getElementById("grantForm");
  const grantEmail = document.getElementById("grantEmail");
  const grantType = document.getElementById("grantType");
  const grantValue = document.getElementById("grantValue");
  const grantStatus = document.getElementById("grantStatus");

  const rosterBody = document.getElementById("rosterBody");
  const submissionsBody = document.getElementById("submissionsBody");

  let latestData = { roster: [], access: [], submissions: [] };

  // ---------------------------------------------------------------------
  // Boot + auth gate
  // ---------------------------------------------------------------------

  async function init() {
    if (!CONFIG.SUPABASE_URL || CONFIG.SUPABASE_ANON_KEY.includes("YOUR_")) {
      gateScreen.classList.add("hidden");
      unavailableState.classList.remove("hidden");
      return;
    }

    await Auth.init();
    Auth.renderButton(adminSignInHost);
    Auth.onChange(handleAuthChange);

    populateGrantValueOptions();
    grantType.addEventListener("change", populateGrantValueOptions);
    grantForm.addEventListener("submit", handleGrantSubmit);
    notAuthSignOutBtn.addEventListener("click", () => Auth.signOut());

    document.querySelectorAll(".admin-tab").forEach((tab) => {
      tab.addEventListener("click", () => switchTab(tab.dataset.tab));
    });

    await handleAuthChange(Auth.getUser());
  }

  async function handleAuthChange(user) {
    hideAllGates();

    if (!user) {
      gateScreen.classList.remove("hidden");
      return;
    }

    loadingState.classList.remove("hidden");
    const sb = Auth.getClient();
    const { data: isAdmin, error } = await sb.rpc("is_admin");
    loadingState.classList.add("hidden");

    if (error || !isAdmin) {
      notAuthEmail.textContent = user.email;
      notAuthorizedScreen.classList.remove("hidden");
      return;
    }

    dashboard.classList.remove("hidden");
    await tryLoad();
  }

  function hideAllGates() {
    gateScreen.classList.add("hidden");
    notAuthorizedScreen.classList.add("hidden");
    dashboard.classList.add("hidden");
    loadingState.classList.add("hidden");
  }

  async function tryLoad() {
    const result = await Backend.adminList();
    if (result.status !== "ok") {
      gateError.textContent = result.message || "Failed to load admin data.";
      return;
    }
    latestData = { roster: result.roster || [], access: result.access || [], submissions: result.submissions || [] };
    renderRoster();
    renderSubmissions();
  }

  // ---------------------------------------------------------------------
  // Tabs
  // ---------------------------------------------------------------------

  function switchTab(name) {
    document.querySelectorAll(".admin-tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
    document.getElementById("tabAccess").classList.toggle("hidden", name !== "access");
    document.getElementById("tabSubmissions").classList.toggle("hidden", name !== "submissions");
  }

  // ---------------------------------------------------------------------
  // Grant form — populate chapter/class options from curriculum.js
  // ---------------------------------------------------------------------

  function populateGrantValueOptions() {
    grantValue.innerHTML = "";
    if (grantType.value === "class") {
      CLASSES.forEach((entry) => {
        if (entry.type === "exam") {
          entry.years.forEach((y) => addOption(grantValue, y.id, `${entry.label} — ${y.label} (${y.name})`));
        } else {
          addOption(grantValue, entry.id, `${entry.label} — ${entry.name}`);
        }
      });
    } else {
      CLASSES.forEach((entry) => {
        const subjectSets = entry.type === "exam"
          ? entry.years.map((y) => ({ label: `${entry.label} ${y.label}`, subjects: y.subjects }))
          : [{ label: entry.label, subjects: entry.subjects }];

        subjectSets.forEach(({ label, subjects }) => {
          (subjects || []).forEach((subject) => {
            const sectionLists = subject.tracks ? subject.tracks.flatMap((t) => t.sections || []) : subject.sections || [];
            sectionLists.forEach((section) => {
              addOption(grantValue, section.id, `${label} — ${subject.title} — ${section.title}`);
            });
          });
        });
      });
    }
  }

  function addOption(select, value, label) {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = label;
    select.appendChild(opt);
  }

  async function handleGrantSubmit(e) {
    e.preventDefault();
    const email = grantEmail.value.trim().toLowerCase();
    if (!email) return;

    grantStatus.textContent = "Granting…";
    grantStatus.className = "admin-grant-status";

    const result = await Backend.adminGrant({ email, grantType: grantType.value, grantValue: grantValue.value });

    if (result.status === "ok") {
      grantStatus.textContent = `Granted ${grantType.value} access to ${email}.`;
      grantStatus.className = "admin-grant-status success";
      grantEmail.value = "";
      await tryLoad();
    } else {
      grantStatus.textContent = result.message || "Failed to grant access.";
      grantStatus.className = "admin-grant-status error";
    }
  }

  async function handleRevoke(email, gType, gValue, btn) {
    btn.disabled = true;
    btn.textContent = "…";
    const result = await Backend.adminRevoke({ email, grantType: gType, grantValue: gValue });
    if (result.status === "ok") {
      await tryLoad();
    } else {
      btn.disabled = false;
      btn.textContent = "Revoke";
      alert(result.message || "Failed to revoke access.");
    }
  }

  // ---------------------------------------------------------------------
  // Roster table
  // ---------------------------------------------------------------------

  function renderRoster() {
    rosterBody.innerHTML = "";
    if (!latestData.roster.length) {
      rosterBody.innerHTML = `<tr><td colspan="4" class="admin-empty-cell">No students have signed in yet.</td></tr>`;
      return;
    }

    latestData.roster
      .slice()
      .sort((a, b) => Number(a.rollNumber) - Number(b.rollNumber))
      .forEach((student) => {
        const grants = latestData.access.filter((g) => g.email === student.email);
        const tr = document.createElement("tr");

        const grantChips = grants
          .map(
            (g) => `<span class="grant-chip">${escapeHtml(g.grantType)}: ${escapeHtml(g.grantValue)}${g.grantedVia === "razorpay" ? " (auto)" : ""}
              <button type="button" class="grant-revoke" data-email="${escapeHtml(g.email)}" data-type="${escapeHtml(g.grantType)}" data-value="${escapeHtml(g.grantValue)}">Revoke</button>
            </span>`
          )
          .join("") || `<span class="admin-empty-cell">No access granted</span>`;

        tr.innerHTML = `
          <td>${escapeHtml(String(student.rollNumber))}</td>
          <td>${escapeHtml(student.email)}</td>
          <td>${escapeHtml(formatDate(student.firstSeen))}</td>
          <td class="grant-chip-cell">${grantChips}</td>
        `;
        rosterBody.appendChild(tr);
      });

    rosterBody.querySelectorAll(".grant-revoke").forEach((btn) => {
      btn.addEventListener("click", () => handleRevoke(btn.dataset.email, btn.dataset.type, btn.dataset.value, btn));
    });
  }

  // ---------------------------------------------------------------------
  // Submissions table + manual grading panel
  // ---------------------------------------------------------------------

  function renderSubmissions() {
    submissionsBody.innerHTML = "";
    if (!latestData.submissions.length) {
      submissionsBody.innerHTML = `<tr><td colspan="9" class="admin-empty-cell">No test submissions yet.</td></tr>`;
      return;
    }

    latestData.submissions.forEach((s) => {
      const tr = document.createElement("tr");
      const scoreText = s.totalMcq != null ? `${s.score}/${s.totalMcq}` : "—";
      const theoryText =
        s.subjectiveStatus === "graded" ? "Graded" : s.subjectiveStatus === "pending" ? "Pending" : "—";

      tr.innerHTML = `
        <td>${escapeHtml(formatDate(s.submittedAt))}</td>
        <td>${escapeHtml(s.email)}</td>
        <td>${escapeHtml(s.className)}</td>
        <td>${escapeHtml(s.subject)}</td>
        <td>${escapeHtml(s.test)}</td>
        <td>${escapeHtml(s.testKind)}</td>
        <td>${escapeHtml(scoreText)}</td>
        <td>${escapeHtml(theoryText)}</td>
        <td>${s.subjectiveStatus === "pending" ? `<button type="button" class="btn btn-sm grade-btn" data-id="${s.id}">Grade</button>` : ""}</td>
      `;
      submissionsBody.appendChild(tr);

      if (s.subjectiveStatus === "pending") {
        const detailTr = document.createElement("tr");
        detailTr.className = "grade-detail-row hidden";
        detailTr.id = `grade-row-${s.id}`;
        detailTr.innerHTML = `<td colspan="9"><div class="grade-panel" id="grade-panel-${s.id}"></div></td>`;
        submissionsBody.appendChild(detailTr);
      }
    });

    submissionsBody.querySelectorAll(".grade-btn").forEach((btn) => {
      btn.addEventListener("click", () => toggleGradePanel(btn.dataset.id));
    });
  }

  async function toggleGradePanel(submissionId) {
    const row = document.getElementById(`grade-row-${submissionId}`);
    const panel = document.getElementById(`grade-panel-${submissionId}`);
    const nowHidden = row.classList.toggle("hidden");
    if (nowHidden || panel.dataset.loaded) return;

    panel.innerHTML = `<p class="grade-panel-loading">Loading answers…</p>`;
    const result = await Backend.adminGetSubmissionAnswers(submissionId);

    if (result.status !== "ok") {
      panel.innerHTML = `<p style="color:var(--error);">Failed to load: ${escapeHtml(result.message || "")}</p>`;
      return;
    }

    const theoryAnswers = result.answers.filter((a) => a.question_type === "short");
    if (!theoryAnswers.length) {
      panel.innerHTML = `<p class="admin-empty-cell">No theory answers on this submission.</p>`;
      panel.dataset.loaded = "1";
      return;
    }

    panel.innerHTML = `
      <p class="grade-panel-intro">Run each answer through your local LLM (e.g. <code>ollama run qwen3:8b</code>) against your own answer key, then enter the result below.</p>
      ${theoryAnswers
        .map(
          (a, i) => `
        <div class="grade-question-block" data-answer-id="${a.id}">
          <div class="grade-question-prompt"><strong>Q${i + 1}.</strong> ${escapeHtml(a.question_prompt || "")}</div>
          <div class="grade-student-answer">${escapeHtml(a.student_answer || "(blank)")}</div>
          <div class="grade-fields">
            <input type="text" class="grade-topic" placeholder="Topic (e.g. Newton's Second Law)" value="${escapeHtml(a.topic_tag || "")}">
            <input type="number" class="grade-score" placeholder="Score" value="${a.llm_score != null ? a.llm_score : ""}" step="0.5">
            <span>/</span>
            <input type="number" class="grade-max" placeholder="Max" value="${a.llm_max_score != null ? a.llm_max_score : ""}" step="0.5">
          </div>
          <textarea class="grade-feedback" placeholder="Feedback / what to revise…">${escapeHtml(a.feedback_text || "")}</textarea>
        </div>
      `
        )
        .join("")}
      <div class="grade-panel-actions">
        <button type="button" class="btn btn-sm save-grades-btn" data-submission-id="${submissionId}">Save & mark graded</button>
        <span class="grade-save-status"></span>
      </div>
    `;
    panel.dataset.loaded = "1";
    panel.querySelector(".save-grades-btn").addEventListener("click", () => saveGrades(submissionId, panel));
  }

  async function saveGrades(submissionId, panel) {
    const statusEl = panel.querySelector(".grade-save-status");
    const saveBtn = panel.querySelector(".save-grades-btn");
    statusEl.textContent = "Saving…";
    saveBtn.disabled = true;

    const blocks = panel.querySelectorAll(".grade-question-block");
    const topicTotals = new Map();
    let overallScore = 0;
    let overallMax = 0;

    for (const block of blocks) {
      const answerId = block.dataset.answerId;
      const topic = block.querySelector(".grade-topic").value.trim();
      const score = parseFloat(block.querySelector(".grade-score").value) || 0;
      const max = parseFloat(block.querySelector(".grade-max").value) || 0;
      const feedback = block.querySelector(".grade-feedback").value.trim();

      const saveResult = await Backend.adminSaveGrade({
        answerId,
        llmScore: score,
        llmMaxScore: max,
        topicTag: topic,
        feedbackText: feedback,
      });
      if (saveResult.status !== "ok") {
        statusEl.textContent = saveResult.message || "Failed to save one of the answers.";
        saveBtn.disabled = false;
        return;
      }

      overallScore += score;
      overallMax += max;
      if (topic) {
        const cur = topicTotals.get(topic) || { score: 0, max: 0 };
        cur.score += score;
        cur.max += max;
        topicTotals.set(topic, cur);
      }
    }

    const topics = Array.from(topicTotals.entries()).map(([topic, t]) => ({
      topic,
      scored: `${t.score}/${t.max}`,
      revise: t.max > 0 && t.score / t.max < 0.6,
    }));

    const overallReport = {
      overall: `${overallScore}/${overallMax}`,
      topics,
      revisionFocus: topics.filter((t) => t.revise).map((t) => t.topic),
    };

    const finalizeResult = await Backend.adminFinalizeGrading({ submissionId, overallReport });
    if (finalizeResult.status === "ok") {
      statusEl.textContent = "Saved.";
      await tryLoad();
    } else {
      statusEl.textContent = finalizeResult.message || "Failed to finalize.";
      saveBtn.disabled = false;
    }
  }

  // ---------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) return iso || "";
      return d.toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return iso || "";
    }
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
