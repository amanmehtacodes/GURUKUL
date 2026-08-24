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

  const studentClassSelect = document.getElementById("studentClassSelect");
  const studentSubjectSelect = document.getElementById("studentSubjectSelect");
  const studentSearchInput = document.getElementById("studentSearchInput");
  const studentSearchBtn = document.getElementById("studentSearchBtn");
  const studentSearchStatus = document.getElementById("studentSearchStatus");
  const studentDetail = document.getElementById("studentDetail");

  let latestData = { roster: [], access: [], submissions: [] };
  let studentCharts = []; // Chart.js instances, destroyed before each re-render

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

    initStudentLookup();

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
    latestData = {
      roster: result.roster || [],
      access: result.access || [],
      submissions: result.submissions || [],
    };
    renderRoster();
    renderSubmissions();
  }

  // ---------------------------------------------------------------------
  // Tabs
  // ---------------------------------------------------------------------

  function switchTab(name) {
    document
      .querySelectorAll(".admin-tab")
      .forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
    document
      .getElementById("tabAccess")
      .classList.toggle("hidden", name !== "access");
    document
      .getElementById("tabSubmissions")
      .classList.toggle("hidden", name !== "submissions");
    document
      .getElementById("tabStudents")
      .classList.toggle("hidden", name !== "students");
  }

  // ---------------------------------------------------------------------
  // Grant form — populate chapter/class options from curriculum.js
  // ---------------------------------------------------------------------

  function populateGrantValueOptions() {
    grantValue.innerHTML = "";
    if (grantType.value === "class") {
      CLASSES.forEach((entry) => {
        if (entry.type === "exam") {
          entry.years.forEach((y) =>
            addOption(
              grantValue,
              y.id,
              `${entry.label} — ${y.label} (${y.name})`
            )
          );
        } else {
          addOption(grantValue, entry.id, `${entry.label} — ${entry.name}`);
        }
      });
    } else {
      CLASSES.forEach((entry) => {
        const subjectSets =
          entry.type === "exam"
            ? entry.years.map((y) => ({
                label: `${entry.label} ${y.label}`,
                subjects: y.subjects,
              }))
            : [{ label: entry.label, subjects: entry.subjects }];

        subjectSets.forEach(({ label, subjects }) => {
          (subjects || []).forEach((subject) => {
            const sectionLists = subject.tracks
              ? subject.tracks.flatMap((t) => t.sections || [])
              : subject.sections || [];
            sectionLists.forEach((section) => {
              addOption(
                grantValue,
                section.id,
                `${label} — ${subject.title} — ${section.title}`
              );
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

    const result = await Backend.adminGrant({
      email,
      grantType: grantType.value,
      grantValue: grantValue.value,
    });

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
    const result = await Backend.adminRevoke({
      email,
      grantType: gType,
      grantValue: gValue,
    });
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
        const grants = latestData.access.filter(
          (g) => g.email === student.email
        );
        const tr = document.createElement("tr");

        const grantChips =
          grants
            .map(
              (g) => `<span class="grant-chip">${escapeHtml(
                g.grantType
              )}: ${escapeHtml(g.grantValue)}${
                g.grantedVia === "razorpay" ? " (auto)" : ""
              }
              <button type="button" class="grant-revoke" data-email="${escapeHtml(
                g.email
              )}" data-type="${escapeHtml(
                g.grantType
              )}" data-value="${escapeHtml(g.grantValue)}">Revoke</button>
            </span>`
            )
            .join("") ||
          `<span class="admin-empty-cell">No access granted</span>`;

        tr.innerHTML = `
          <td>${escapeHtml(String(student.rollNumber))}</td>
          <td>${escapeHtml(student.email)}</td>
          <td>${escapeHtml(formatDate(student.firstSeen))}</td>
          <td class="grant-chip-cell">${grantChips}</td>
        `;
        rosterBody.appendChild(tr);
      });

    rosterBody.querySelectorAll(".grant-revoke").forEach((btn) => {
      btn.addEventListener("click", () =>
        handleRevoke(
          btn.dataset.email,
          btn.dataset.type,
          btn.dataset.value,
          btn
        )
      );
    });
  }

  // ---------------------------------------------------------------------
  // Submissions table + manual grading panel
  // ---------------------------------------------------------------------

  function renderSubmissions() {
    submissionsBody.innerHTML = "";
    if (!latestData.submissions.length) {
      submissionsBody.innerHTML = `<tr><td colspan="10" class="admin-empty-cell">No test submissions yet.</td></tr>`;
      return;
    }

    latestData.submissions.forEach((s) => {
      const tr = document.createElement("tr");
      const scoreText = s.totalMcq != null ? `${s.score}/${s.totalMcq}` : "—";
      const theoryText =
        s.subjectiveStatus === "graded"
          ? "Graded"
          : s.subjectiveStatus === "pending"
          ? "Pending"
          : "—";

      tr.innerHTML = `
        <td>${escapeHtml(formatDate(s.submittedAt))}</td>
        <td>${escapeHtml(s.email)}</td>
        <td>${escapeHtml(s.className)}</td>
        <td>${escapeHtml(s.subject)}</td>
        <td>${escapeHtml(s.test)}</td>
        <td>${escapeHtml(s.testKind)}</td>
        <td>${escapeHtml(scoreText)}</td>
        <td>${escapeHtml(theoryText)}</td>
        <td>${
          s.subjectiveStatus === "pending"
            ? `<button type="button" class="btn btn-sm grade-btn" data-id="${s.id}">Grade</button>`
            : ""
        }</td>
        <td><a href="report.html?id=${encodeURIComponent(
          s.id
        )}" target="_blank" class="btn btn-ghost btn-sm">Report</a></td>
      `;
      submissionsBody.appendChild(tr);

      if (s.subjectiveStatus === "pending") {
        const detailTr = document.createElement("tr");
        detailTr.className = "grade-detail-row hidden";
        detailTr.id = `grade-row-${s.id}`;
        detailTr.innerHTML = `<td colspan="10"><div class="grade-panel" id="grade-panel-${s.id}"></div></td>`;
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
      panel.innerHTML = `<p style="color:var(--error);">Failed to load: ${escapeHtml(
        result.message || ""
      )}</p>`;
      return;
    }

    const theoryAnswers = result.answers.filter(
      (a) => a.question_type === "short"
    );
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
          <div class="grade-question-prompt"><strong>Q${
            i + 1
          }.</strong> ${escapeHtml(a.question_prompt || "")}</div>
          <div class="grade-student-answer">${escapeHtml(
            a.student_answer || "(blank)"
          )}</div>
          <div class="grade-fields">
            <input type="text" class="grade-topic" placeholder="Topic (e.g. Newton's Second Law)" value="${escapeHtml(
              a.topic_tag || ""
            )}">
            <input type="number" class="grade-score" placeholder="Score" value="${
              a.llm_score != null ? a.llm_score : ""
            }" step="0.5">
            <span>/</span>
            <input type="number" class="grade-max" placeholder="Max" value="${
              a.llm_max_score != null ? a.llm_max_score : ""
            }" step="0.5">
          </div>
          <textarea class="grade-feedback" placeholder="Feedback / what to revise…">${escapeHtml(
            a.feedback_text || ""
          )}</textarea>
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
    panel
      .querySelector(".save-grades-btn")
      .addEventListener("click", () => saveGrades(submissionId, panel));
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
        statusEl.textContent =
          saveResult.message || "Failed to save one of the answers.";
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

    const finalizeResult = await Backend.adminFinalizeGrading({
      submissionId,
      overallReport,
    });
    if (finalizeResult.status === "ok") {
      statusEl.textContent = "Saved.";
      await tryLoad();
    } else {
      statusEl.textContent = finalizeResult.message || "Failed to finalize.";
      saveBtn.disabled = false;
    }
  }

  // ---------------------------------------------------------------------
  // Students tab — class -> subject -> roll number/email search, with
  // Chart.js pie/doughnut charts summarizing that student's performance
  // in the chosen subject, and a list of every submission linking to
  // the full report page.
  // ---------------------------------------------------------------------

  function initStudentLookup() {
    getClassOptions().forEach((c) =>
      addOption(studentClassSelect, c.id, c.label)
    );

    studentClassSelect.addEventListener("change", () => {
      const cls = getClassOptions().find(
        (c) => c.id === studentClassSelect.value
      );
      studentSubjectSelect.innerHTML = `<option value="">Choose a subject…</option>`;
      studentSearchInput.disabled = true;
      studentSearchBtn.disabled = true;
      studentDetail.classList.add("hidden");
      if (!cls) {
        studentSubjectSelect.disabled = true;
        return;
      }
      (cls.subjects || []).forEach((subj) =>
        addOption(studentSubjectSelect, subj.title, subj.title)
      );
      studentSubjectSelect.disabled = false;
    });

    studentSubjectSelect.addEventListener("change", () => {
      const has = !!studentSubjectSelect.value;
      studentSearchInput.disabled = !has;
      studentSearchBtn.disabled = !has;
    });

    studentSearchBtn.addEventListener("click", runStudentSearch);
    studentSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        runStudentSearch();
      }
    });
  }

  /** Flattens CLASSES (including JEE/NEET year tracks) into { id, label, name, subjects }. */
  function getClassOptions() {
    const opts = [];
    CLASSES.forEach((entry) => {
      if (entry.type === "exam") {
        entry.years.forEach((y) =>
          opts.push({
            id: y.id,
            label: `${entry.label} — ${y.label} (${y.name})`,
            name: y.name,
            subjects: y.subjects,
          })
        );
      } else {
        opts.push({
          id: entry.id,
          label: `${entry.label} — ${entry.name}`,
          name: entry.name,
          subjects: entry.subjects,
        });
      }
    });
    return opts;
  }

  async function runStudentSearch() {
    const query = studentSearchInput.value.trim().toLowerCase();
    studentSearchStatus.textContent = "";
    studentDetail.classList.add("hidden");
    if (!query) return;

    const student = latestData.roster.find(
      (r) => r.email.toLowerCase() === query || String(r.rollNumber) === query
    );
    if (!student) {
      studentSearchStatus.textContent =
        "No student found with that roll number or email.";
      studentSearchStatus.className = "admin-grant-status error";
      return;
    }
    studentSearchStatus.textContent = "";

    const cls = getClassOptions().find(
      (c) => c.id === studentClassSelect.value
    );
    const subjectTitle = studentSubjectSelect.value;

    const submissions = latestData.submissions.filter(
      (s) =>
        s.email === student.email &&
        s.className === cls.name &&
        s.subject === subjectTitle
    );

    await renderStudentDetail(student, cls, subjectTitle, submissions);
  }

  async function renderStudentDetail(student, cls, subjectTitle, submissions) {
    studentDetail.classList.remove("hidden");

    if (!submissions.length) {
      studentDetail.innerHTML = `
        <div class="student-detail-head">
          <h3>${escapeHtml(student.email)} — Roll #${escapeHtml(
        String(student.rollNumber)
      )}</h3>
          <p>${escapeHtml(cls.label)} · ${escapeHtml(subjectTitle)}</p>
        </div>
        <p class="admin-empty-cell">No submissions yet for this subject.</p>`;
      return;
    }

    studentDetail.innerHTML = `
      <div class="student-detail-head">
        <h3>${escapeHtml(student.email)} — Roll #${escapeHtml(
      String(student.rollNumber)
    )}</h3>
        <p>${escapeHtml(cls.label)} · ${escapeHtml(subjectTitle)} · ${
      submissions.length
    } submission${submissions.length === 1 ? "" : "s"}</p>
      </div>
      <div class="student-charts">
        <div class="student-chart-card">
          <div class="student-chart-label">MCQ accuracy</div>
          <canvas id="chartAccuracy"></canvas>
        </div>
        <div class="student-chart-card">
          <div class="student-chart-label">Score by topic</div>
          <canvas id="chartTopics"></canvas>
        </div>
      </div>
      <div class="student-submission-list" id="studentSubmissionList"></div>
    `;

    const answersResult = await Backend.adminGetAnswersForSubmissions(
      submissions.map((s) => s.id)
    );
    const answers = answersResult.status === "ok" ? answersResult.answers : [];

    renderCharts(answers);
    renderStudentSubmissionList(submissions);
  }

  function renderCharts(answers) {
    studentCharts.forEach((c) => c.destroy());
    studentCharts = [];
    if (!window.Chart) return;

    // Chart 1 — overall MCQ correct / incorrect / unanswered
    const mcq = answers.filter((a) => a.question_type === "mcq");
    const correct = mcq.filter((a) => a.correct === true).length;
    const incorrect = mcq.filter((a) => a.correct === false).length;
    const unanswered = mcq.filter((a) => a.correct === null).length;

    const accCanvas = document.getElementById("chartAccuracy");
    if (accCanvas && mcq.length) {
      studentCharts.push(
        new Chart(accCanvas, {
          type: "doughnut",
          data: {
            labels: [
              `Correct (${correct})`,
              `Incorrect (${incorrect})`,
              `Unanswered (${unanswered})`,
            ],
            datasets: [
              {
                data: [correct, incorrect, unanswered],
                backgroundColor: ["#2F5233", "#A6402F", "#C9CBC2"],
                borderWidth: 0,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                position: "bottom",
                labels: { boxWidth: 12, font: { size: 11 } },
              },
            },
          },
        })
      );
    } else if (accCanvas) {
      accCanvas.replaceWith(document.createTextNode("No MCQ data yet."));
    }

    // Chart 2 — combined (MCQ + graded theory) score per topic
    const topicMap = new Map();
    answers.forEach((a) => {
      const topic = a.topic_tag || "Untagged";
      if (!topicMap.has(topic)) topicMap.set(topic, { score: 0, max: 0 });
      const t = topicMap.get(topic);
      if (a.question_type === "mcq") {
        t.max += 1;
        if (a.correct) t.score += 1;
      } else if (a.llm_score != null && a.llm_max_score != null) {
        t.score += Number(a.llm_score);
        t.max += Number(a.llm_max_score);
      }
    });

    const topicCanvas = document.getElementById("chartTopics");
    const topicEntries = Array.from(topicMap.entries()).filter(
      ([, t]) => t.max > 0
    );
    if (topicCanvas && topicEntries.length) {
      const palette = [
        "#2F5233",
        "#29577D",
        "#A6472F",
        "#7A5C9E",
        "#B8863B",
        "#3F7A6B",
        "#A6402F",
        "#565C57",
      ];
      studentCharts.push(
        new Chart(topicCanvas, {
          type: "pie",
          data: {
            labels: topicEntries.map(
              ([topic, t]) =>
                `${topic} (${Math.round((t.score / t.max) * 100)}%)`
            ),
            datasets: [
              {
                data: topicEntries.map(([, t]) => t.max),
                backgroundColor: topicEntries.map(
                  (_, i) => palette[i % palette.length]
                ),
                borderWidth: 0,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                position: "bottom",
                labels: { boxWidth: 12, font: { size: 11 } },
              },
            },
          },
        })
      );
    } else if (topicCanvas) {
      topicCanvas.replaceWith(
        document.createTextNode("No topic-tagged questions yet.")
      );
    }
  }

  function renderStudentSubmissionList(submissions) {
    const host = document.getElementById("studentSubmissionList");
    if (!host) return;
    host.innerHTML = submissions
      .slice()
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
      .map((s) => {
        const scoreText = s.totalMcq != null ? `${s.score}/${s.totalMcq}` : "—";
        const theoryText =
          s.subjectiveStatus === "graded"
            ? "Theory graded"
            : s.subjectiveStatus === "pending"
            ? "Theory pending"
            : "";
        return `
          <a href="report.html?id=${encodeURIComponent(
            s.id
          )}" target="_blank" class="student-submission-row">
            <span class="student-submission-test">${escapeHtml(s.test)}</span>
            <span class="student-submission-meta">${escapeHtml(
              formatDate(s.submittedAt)
            )} · MCQ ${escapeHtml(scoreText)}${
          theoryText ? " · " + escapeHtml(theoryText) : ""
        }</span>
          </a>`;
      })
      .join("");
  }

  // ---------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) return iso || "";
      return d.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
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
