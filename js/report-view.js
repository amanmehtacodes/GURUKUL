/**
 * REPORT VIEW — shared rendering module
 * ---------------------------------------
 * Pure rendering: takes already-fetched data and draws the detailed
 * topic-by-topic report. Used in three places:
 *   1. report.html (js/report.js) — the standalone page, full detail
 *      including the question-by-question review, opened from admin.
 *   2. tests.js — right under a just-submitted test, with
 *      showQuestions:false since the graded questions are already
 *      visible on the page above it.
 *   3. progress-page.js — expanded inline under a submission row, full
 *      detail (showQuestions:true) since the original test form isn't
 *      on that page.
 *
 * Data shapes expected:
 *   submission: { class_name, subject, section, subsection, test,
 *                 test_kind, score, total_mcq, subjective_status,
 *                 overall_report, submitted_at, name, email }
 *   answers: [{ question_type, question_prompt, student_answer,
 *               correct, reference_answer, llm_score, llm_max_score,
 *               topic_tag, feedback_text }, ...]
 *   stats: { avgScore, avgTotalMcq, count } | null
 */

const ReportView = (() => {
  function render(container, { submission: s, answers, stats, showQuestions = true, inline = false }) {
    container.classList.toggle("report-inline", inline);

    const submittedDate = formatDate(s.submitted_at);
    const mcqPct = s.total_mcq ? Math.round((s.score / s.total_mcq) * 100) : null;

    const hasTheory = s.subjective_status && s.subjective_status !== "n/a";
    const theoryGraded = s.subjective_status === "graded";
    const overallReport = s.overall_report || null;

    const topics = groupByTopic(answers);
    const weakTopics = topics.filter((t) => t.pct !== null && t.pct < 60);

    const classAvgHtml =
      stats && stats.count > 0
        ? `<div class="report-classavg">
             <span class="report-classavg-label">Class average (MCQ)</span>
             <span class="report-classavg-value">${fmt(stats.avgScore)} / ${fmt(stats.avgTotalMcq)}</span>
             <span class="report-classavg-count">${stats.count} attempt${stats.count === 1 ? "" : "s"}</span>
           </div>`
        : "";

    container.innerHTML = `
      <div class="report-page">
        <div class="report-eyebrow">${escapeHtml(s.class_name || "")} · ${escapeHtml(s.subject || "")} · ${escapeHtml(s.section || "")}${s.subsection ? " / " + escapeHtml(s.subsection) : ""}</div>
        <h1 class="report-title">${escapeHtml(s.test || "")}</h1>
        <div class="report-meta">${escapeHtml(s.name || s.email || "")}${s.email ? ` (${escapeHtml(s.email)})` : ""} · Submitted ${escapeHtml(submittedDate)}</div>

        <div class="report-hero">
          <div class="report-hero-stat">
            <div class="report-hero-ring ${tierFor(mcqPct)}" style="--pct:${mcqPct ?? 0}">
              <span>${mcqPct !== null ? mcqPct + "%" : "—"}</span>
            </div>
            <div class="report-hero-label">MCQ score</div>
            <div class="report-hero-value">${s.score ?? 0} / ${s.total_mcq ?? 0}</div>
          </div>

          ${hasTheory ? `
          <div class="report-hero-stat">
            <div class="report-hero-ring ${theoryGraded ? tierFor(theoryPct(overallReport)) : "unknown"}" style="--pct:${theoryGraded ? theoryPct(overallReport) : 0}">
              <span>${theoryGraded ? theoryPct(overallReport) + "%" : "…"}</span>
            </div>
            <div class="report-hero-label">Theory score</div>
            <div class="report-hero-value">${theoryGraded ? escapeHtml(overallReport.overall || "") : "Pending review"}</div>
          </div>` : ""}

          ${classAvgHtml}
        </div>

        ${weakTopics.length ? `
        <div class="report-revision">
          <div class="report-section-label">Revise</div>
          <div class="report-revision-chips">
            ${weakTopics.map((t) => `<span class="report-chip weak">${escapeHtml(t.topic)}</span>`).join("")}
          </div>
        </div>` : ""}

        <div class="report-section-label">Topic breakdown</div>
        <div class="report-topics">
          ${topics.map(renderTopicCard).join("")}
        </div>

        ${showQuestions ? `
        <div class="report-section-label">Question review</div>
        <div class="report-questions">
          ${answers.map(renderAnswerCard).join("")}
        </div>` : ""}
      </div>
    `;

    if (window.MathTools) MathTools.renderMathIn(container);
  }

  // -----------------------------------------------------------------
  // Topic aggregation — merges MCQ correctness and graded theory scores.
  // -----------------------------------------------------------------
  function groupByTopic(answers) {
    const map = new Map();
    (answers || []).forEach((a) => {
      const topic = a.topic_tag || "Untagged";
      if (!map.has(topic)) {
        map.set(topic, { topic, mcqCorrect: 0, mcqTotal: 0, theoryScore: 0, theoryMax: 0, theoryPending: false });
      }
      const t = map.get(topic);
      if (a.question_type === "mcq") {
        t.mcqTotal += 1;
        if (a.correct) t.mcqCorrect += 1;
      } else if (a.llm_score != null && a.llm_max_score != null) {
        t.theoryScore += Number(a.llm_score);
        t.theoryMax += Number(a.llm_max_score);
      } else {
        t.theoryPending = true;
      }
    });

    return Array.from(map.values())
      .map((t) => {
        const combinedScore = t.mcqCorrect + t.theoryScore;
        const combinedMax = t.mcqTotal + t.theoryMax;
        const pct = combinedMax > 0 ? Math.round((combinedScore / combinedMax) * 100) : null;
        return { ...t, combinedScore, combinedMax, pct };
      })
      .sort((a, b) => (a.pct ?? 100) - (b.pct ?? 100)); // weakest first
  }

  function tierFor(pct) {
    if (pct === null) return "unknown";
    if (pct >= 80) return "strong";
    if (pct >= 60) return "mid";
    return "weak";
  }

  function theoryPct(overallReport) {
    if (!overallReport || !overallReport.overall) return 0;
    const [score, max] = String(overallReport.overall).split("/").map(Number);
    if (!max) return 0;
    return Math.round((score / max) * 100);
  }

  function renderTopicCard(t) {
    const tier = tierFor(t.pct);
    const scoreText = t.combinedMax > 0 ? `${round1(t.combinedScore)} / ${round1(t.combinedMax)}` : t.theoryPending ? "Pending" : "—";
    return `
      <div class="report-topic-card ${tier}">
        <div class="report-topic-name">${escapeHtml(t.topic)}</div>
        <div class="report-topic-bar-track"><div class="report-topic-bar-fill" style="width:${t.pct ?? 0}%"></div></div>
        <div class="report-topic-footer">
          <span class="report-topic-score">${scoreText}</span>
          <span class="report-topic-pct">${t.pct !== null ? t.pct + "%" : t.theoryPending ? "Pending" : "—"}</span>
        </div>
      </div>`;
  }

  function renderAnswerCard(a) {
    if (a.question_type === "mcq") {
      const tier = a.correct === true ? "correct" : a.correct === false ? "incorrect" : "skipped";
      return `
        <div class="report-qcard ${tier}">
          <div class="report-qcard-head">
            <span class="report-qtype-badge mcq">MCQ</span>
            ${a.topic_tag ? `<span class="report-qtopic">${escapeHtml(a.topic_tag)}</span>` : ""}
          </div>
          <div class="report-qprompt">${escapeHtml(a.question_prompt || "")}</div>
          <div class="report-qanswer-row">
            <span class="report-qanswer-label">Your answer</span>
            <span class="report-qanswer-value">${a.student_answer ? escapeHtml(a.student_answer) : "<em>Not answered</em>"}</span>
          </div>
          ${a.correct !== true ? `
          <div class="report-qanswer-row">
            <span class="report-qanswer-label">Correct answer</span>
            <span class="report-qanswer-value correct">${escapeHtml(a.reference_answer || "")}</span>
          </div>` : ""}
        </div>`;
    }

    // theory / short
    const graded = a.llm_score != null && a.llm_max_score != null;
    return `
      <div class="report-qcard theory">
        <div class="report-qcard-head">
          <span class="report-qtype-badge theory">Theory</span>
          ${a.topic_tag ? `<span class="report-qtopic">${escapeHtml(a.topic_tag)}</span>` : ""}
          ${graded ? `<span class="report-qscore">${round1(a.llm_score)} / ${round1(a.llm_max_score)}</span>` : `<span class="report-qscore pending">Pending review</span>`}
        </div>
        <div class="report-qprompt">${escapeHtml(a.question_prompt || "")}</div>
        <div class="report-qanswer-row block">
          <span class="report-qanswer-label">Your answer</span>
          <div class="report-qanswer-value block">${a.student_answer ? escapeHtml(a.student_answer) : "<em>Not answered</em>"}</div>
        </div>
        ${a.reference_answer ? `
        <div class="report-qanswer-row block">
          <span class="report-qanswer-label">Reference answer</span>
          <div class="report-qanswer-value block reference">${escapeHtml(a.reference_answer)}</div>
        </div>` : ""}
        ${a.feedback_text ? `
        <div class="report-qanswer-row block">
          <span class="report-qanswer-label">Feedback</span>
          <div class="report-qanswer-value block feedback">${escapeHtml(a.feedback_text)}</div>
        </div>` : ""}
      </div>`;
  }

  function fmt(n) {
    if (n == null) return "—";
    return round1(n);
  }

  function round1(n) {
    const num = Number(n);
    if (isNaN(num)) return n;
    return Math.round(num * 10) / 10;
  }

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

  return { render, groupByTopic };
})();

window.ReportView = ReportView;
