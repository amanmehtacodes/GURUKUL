/**
 * TESTS MODULE
 * ------------
 * Renders locked-state cards for logged-out users, and the full question
 * form (MCQ + optional theory) for logged-in users.
 *
 * Two kinds of test, set via test.kind:
 *   - "mcq":   every question is multiple choice. Graded entirely in the
 *              browser (we already have the correct answer index) — no
 *              network call. Shows right/wrong per question immediately,
 *              a score summary, and the test's answer-key note if one is
 *              configured.
 *   - "mixed": MCQ + short/theory questions together. MCQ questions are
 *              still graded and revealed instantly, the same as above.
 *              Theory answers are NOT currently sent anywhere — Google
 *              Sheets submission is intentionally disabled for now (see
 *              submitMixedTest below) and will be reconnected later.
 */

const Tests = (() => {
  function renderLocked(container, { section, sub, test }) {
    container.innerHTML = `
      <div class="lock-card">
        <svg class="lock-icon" viewBox="0 0 24 24" fill="none"><rect x="5" y="10.5" width="14" height="10" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M8 10.5V7a4 4 0 018 0v3.5" stroke="currentColor" stroke-width="1.6"/></svg>
        <h2>${escapeHtml(test.title)}</h2>
        <p>This test is part of <strong>${escapeHtml(section.title)} → ${escapeHtml(sub.title)}</strong>.
        Sign in with your Google account to unlock it. Your answers will be recorded against your account.</p>
        <div id="lockedSignIn" style="display:flex; justify-content:center;"></div>
      </div>
    `;
    const btnHost = container.querySelector("#lockedSignIn");
    Auth.renderButton(btnHost);
  }

  function renderNeedsAccess(container, { section, sub, test }) {
    const user = Auth.getUser();
    container.innerHTML = `
      <div class="lock-card needs-access-card">
        <svg class="lock-icon" viewBox="0 0 24 24" fill="none"><rect x="5" y="10.5" width="14" height="10" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M8 10.5V7a4 4 0 018 0v3.5" stroke="currentColor" stroke-width="1.6"/><path d="M12 14.5v2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        <h2>${escapeHtml(test.title)}</h2>
        <p>You're signed in as <strong>${escapeHtml(user.email)}</strong>, but this test isn't unlocked
        for your account yet. It's part of <strong>${escapeHtml(section.title)} → ${escapeHtml(sub.title)}</strong>.</p>
        <p class="needs-access-note">Access is granted per class or per chapter after payment — reach out if you believe this should already be unlocked.</p>
      </div>
    `;
  }

  function renderTest(container, { section, sub, test }) {
    const user = Auth.getUser();
    const isMcqOnly = test.kind !== "mixed";

    const questionsHtml = test.questions
      .map((q, i) => renderQuestion(q, i))
      .join("");

    const kindBadgeText = isMcqOnly ? "MCQ" : "MCQ + Theory";

    container.innerHTML = `
      <div class="test-header">
        <div class="test-badge">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="3.5" y="7" width="9" height="6.5" rx="1" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" stroke-width="1.3"/></svg>
          Unlocked
        </div>
        <div class="test-badge test-badge-kind">${kindBadgeText}</div>
        <div class="test-title">${escapeHtml(test.title)}</div>
        <div class="test-meta">${escapeHtml(section.title)} / ${escapeHtml(sub.title)} · Signed in as ${escapeHtml(user.email)}</div>
      </div>
      <div id="resultBanner"></div>
      <form id="testForm">
        ${questionsHtml}
        <div class="test-footer">
          <div class="submit-status" id="submitStatus"></div>
          <button type="submit" class="btn" id="submitBtn">Submit answers</button>
        </div>
      </form>
      <div id="answerKeyBlock"></div>
      <div id="inlineReport"></div>
    `;

    // MCQ option click highlighting (only while the test is still open —
    // disabled after submission by removing the listeners' effect via a
    // "submitted" flag checked below).
    let submitted = false;
    container.querySelectorAll(".mcq-option").forEach((opt) => {
      opt.addEventListener("click", () => {
        if (submitted) return;
        const radio = opt.querySelector("input[type=radio]");
        radio.checked = true;
        const group = opt.closest(".mcq-options");
        group.querySelectorAll(".mcq-option").forEach((o) => o.classList.remove("selected"));
        opt.classList.add("selected");
      });
    });

    // Notebook-style math in question prompts (e.g. "$x^2 + 3x = 0$")
    // renders after the DOM is built, same as notes.
    if (window.MathTools) MathTools.renderMathIn(container);

    // Live math preview under each theory textarea, so a student typing
    // "$\frac{1}{2}$" sees it rendered as they go, the same way it'll
    // look when you review it later.
    container.querySelectorAll(".question-card[data-qtype='short']").forEach((card) => {
      const textarea = card.querySelector(".short-answer");
      const preview = card.querySelector(".math-preview");
      if (window.MathTools) MathTools.attachLivePreview(textarea, preview);
    });

    const form = container.querySelector("#testForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (submitted) return;
      submitted = true;
      if (isMcqOnly) {
        submitMcqTest(container, { section, sub, test });
      } else {
        submitMixedTest(container, { section, sub, test });
      }
    });
  }

  function renderQuestion(q, i) {
    if (q.type === "mcq") {
      const options = q.options
        .map(
          (opt, idx) => `
          <label class="mcq-option" data-idx="${idx}">
            <input type="radio" name="${q.id}" value="${idx}" style="display:none;">
            <span class="mcq-option-text">${escapeHtml(opt)}</span>
            <span class="mcq-option-mark"></span>
          </label>`
        )
        .join("");
      return `
        <div class="question-card" data-qid="${q.id}" data-qtype="mcq">
          <div class="question-num">Question ${i + 1}${q.topic ? ` · <span class="question-topic">${escapeHtml(q.topic)}</span>` : ""}</div>
          <p class="question-prompt">${escapeHtml(q.prompt)}</p>
          <div class="mcq-options">${options}</div>
          <div class="mcq-feedback" style="display:none;"></div>
          <div class="mcq-correct-line" style="display:none;"></div>
        </div>`;
    }
    // theory / short answer
    return `
      <div class="question-card" data-qid="${q.id}" data-qtype="short">
        <div class="question-num">Question ${i + 1} · Theory${q.topic ? ` · <span class="question-topic">${escapeHtml(q.topic)}</span>` : ""}</div>
        <p class="question-prompt">${escapeHtml(q.prompt)}</p>
        <textarea class="short-answer" name="${q.id}" placeholder="Type your answer… (use $...$ for inline math, e.g. $x^2+1$)"></textarea>
        <div class="math-preview" aria-label="Math preview"></div>
        <div class="reference-answer-block" style="display:none;"></div>
      </div>`;
  }

  /**
   * Grades every MCQ question in the DOM against the test data, marking
   * each option correct/incorrect/missed and disabling further changes.
   * Returns { correctCount, totalMcq, mcqAnswers } for use by both
   * submit paths.
   */
  function gradeMcqInPlace(container, test) {
    let correctCount = 0;
    let totalMcq = 0;
    const mcqAnswers = [];

    test.questions.forEach((q) => {
      if (q.type !== "mcq") return;
      totalMcq++;
      const card = container.querySelector(`.question-card[data-qid="${q.id}"]`);
      const checked = card.querySelector("input[type=radio]:checked");
      const chosenIdx = checked ? parseInt(checked.value, 10) : null;
      const isCorrect = chosenIdx === q.answerIndex;
      if (isCorrect) correctCount++;

      mcqAnswers.push({
        questionId: q.id,
        prompt: q.prompt,
        topic: q.topic || null,
        chosenIdx,
        answerIndex: q.answerIndex,
        chosenText: chosenIdx !== null ? q.options[chosenIdx] : "",
        correctText: q.options[q.answerIndex],
        correct: chosenIdx !== null ? isCorrect : null,
      });

      // Lock the radios so answers can't change post-submit.
      card.querySelectorAll("input[type=radio]").forEach((r) => (r.disabled = true));

      // Mark each option: the correct one always highlighted green; the
      // student's wrong pick (if any) highlighted red.
      card.querySelectorAll(".mcq-option").forEach((opt) => {
        const idx = parseInt(opt.dataset.idx, 10);
        opt.classList.remove("selected");
        if (idx === q.answerIndex) {
          opt.classList.add("correct-answer");
        }
        if (chosenIdx !== null && idx === chosenIdx && !isCorrect) {
          opt.classList.add("wrong-answer");
        }
      });

      const feedback = card.querySelector(".mcq-feedback");
      feedback.style.display = "flex";
      if (chosenIdx === null) {
        feedback.className = "mcq-feedback skipped";
        feedback.innerHTML = `${dashIcon()} Not answered — correct answer highlighted above.`;
      } else if (isCorrect) {
        feedback.className = "mcq-feedback correct";
        feedback.innerHTML = `${checkIcon()} Correct.`;
      } else {
        feedback.className = "mcq-feedback incorrect";
        feedback.innerHTML = `${crossIcon()} Incorrect — correct answer highlighted above.`;
      }

      // Explicit "Correct answer: ..." line under every question, in
      // addition to the green highlight, so it's unambiguous even
      // without color (and easy to scan when reviewing later).
      const correctLine = card.querySelector(".mcq-correct-line");
      if (correctLine) {
        correctLine.style.display = "block";
        correctLine.innerHTML = `<strong>Correct answer:</strong> ${escapeHtml(q.options[q.answerIndex])}`;
      }
    });

    if (window.MathTools) MathTools.renderMathIn(container);

    return { correctCount, totalMcq, mcqAnswers };
  }

  /**
   * After a mixed test is submitted, reveals each theory question's
   * referenceAnswer (if the curriculum data has one set) directly under
   * that question — separate from the whole-test answerKeyFile toggle,
   * which stays available too.
   */
  function revealReferenceAnswers(container, test) {
    test.questions.forEach((q) => {
      if (q.type !== "short" || !q.referenceAnswer) return;
      const card = container.querySelector(`.question-card[data-qid="${q.id}"]`);
      const block = card ? card.querySelector(".reference-answer-block") : null;
      if (!block) return;
      block.style.display = "block";
      block.innerHTML = `<div class="reference-answer-label">Reference answer</div><div class="reference-answer-text">${escapeHtml(q.referenceAnswer)}</div>`;
      if (window.MathTools) MathTools.renderMathIn(block);
    });
  }

  function renderScoreBanner(bannerEl, correctCount, totalMcq) {
    const pct = totalMcq ? Math.round((correctCount / totalMcq) * 100) : 0;
    const tier = pct >= 80 ? "success" : pct >= 50 ? "warn" : "error";
    bannerEl.innerHTML = `
      <div class="result-banner ${tier}">
        ${checkIcon()} Scored ${correctCount} / ${totalMcq} (${pct}%) on the MCQ questions.
      </div>`;
  }

  function renderAnswerKeyBlock(hostEl, test) {
    if (!test.answerKeyFile) return;
    hostEl.innerHTML = `
      <button type="button" class="btn btn-ghost answer-key-toggle" id="answerKeyToggle">
        ${bookIcon()} View answer key
      </button>
      <div class="answer-key-pane" id="answerKeyPane" style="display:none;">
        <div class="answer-key-loading">Loading answer key…</div>
      </div>
    `;
    const toggleBtn = hostEl.querySelector("#answerKeyToggle");
    const pane = hostEl.querySelector("#answerKeyPane");
    let loaded = false;

    toggleBtn.addEventListener("click", async () => {
      const nowOpen = pane.style.display === "none";
      pane.style.display = nowOpen ? "block" : "none";
      toggleBtn.classList.toggle("open", nowOpen);
      if (nowOpen && !loaded) {
        loaded = true;
        try {
          const res = await fetch(test.answerKeyFile);
          if (!res.ok) throw new Error(`Could not load answer key (${res.status})`);
          const md = await res.text();
          pane.innerHTML = `<div class="note-body">${marked.parse(md)}</div>`;
          if (window.MathTools) MathTools.renderMathIn(pane);
        } catch (err) {
          pane.innerHTML = `<p style="color: var(--error);">Failed to load answer key: ${escapeHtml(err.message)}</p>`;
        }
      }
    });
  }

  /**
   * Builds the report right under the test from data already on hand —
   * no need to wait on the database round trip for the MCQ portion,
   * since it's already graded client-side. Only the class-average
   * number needs a network call, and that's best-effort (skipped
   * silently in prototype mode or if it fails). Skips the
   * question-by-question list since those questions are already
   * visible in the form right above this.
   */
  async function showInlineReport(container, { section, sub, test, correctCount, totalMcq, mcqAnswers, theoryAnswers, hasTheory }) {
    const host = container.querySelector("#inlineReport");
    if (!host || !window.ReportView) return;

    const user = Auth.getUser();
    const submission = {
      name: user ? user.name : "",
      email: user ? user.email : "",
      class_name: window.__gurukulActiveClassName || "",
      subject: window.__gurukulActiveSubjectName || "",
      section: section.title,
      subsection: sub.title,
      test: test.title,
      test_kind: test.kind,
      score: correctCount,
      total_mcq: totalMcq,
      subjective_status: hasTheory ? "pending" : "n/a",
      overall_report: null,
      submitted_at: new Date().toISOString(),
    };

    const answers = [
      ...mcqAnswers.map((a) => ({
        question_type: "mcq",
        question_prompt: a.prompt,
        student_answer: a.chosenText,
        correct: a.correct,
        reference_answer: a.correctText,
        topic_tag: a.topic,
      })),
      ...(theoryAnswers || []).map((a) => ({
        question_type: "short",
        question_prompt: a.prompt,
        student_answer: a.answer,
        correct: null,
        reference_answer: a.referenceAnswer,
        topic_tag: a.topic,
        llm_score: null,
        llm_max_score: null,
      })),
    ];

    let stats = null;
    if (!CONFIG.PROTOTYPE_MODE_SKIP_LOGIN && window.Backend && Backend.isConfigured()) {
      const statsResult = await Backend.getTestStats(test.id);
      if (statsResult.status === "ok") stats = statsResult.stats;
    }

    ReportView.render(host, { submission, answers, stats, showQuestions: false, inline: true });
  }

  /**
   * Pure-MCQ test: grade everything client-side, no network call for
   * grading — but we still log the submission (score, roll number) to
   * the backend for the student's progress history and the admin
   * dashboard, best-effort.
   */
  function submitMcqTest(container, { section, sub, test }) {
    const submitBtn = container.querySelector("#submitBtn");
    const statusEl = container.querySelector("#submitStatus");
    const bannerEl = container.querySelector("#resultBanner");
    const answerKeyHost = container.querySelector("#answerKeyBlock");

    const { correctCount, totalMcq, mcqAnswers } = gradeMcqInPlace(container, test);

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitted";
    statusEl.textContent = "";

    renderScoreBanner(bannerEl, correctCount, totalMcq);
    renderAnswerKeyBlock(answerKeyHost, test);
    showInlineReport(container, { section, sub, test, correctCount, totalMcq, mcqAnswers, theoryAnswers: [], hasTheory: false });

    logSubmission({ section, sub, test, correctCount, totalMcq, mcqAnswers, theoryAnswers: [] });
    if (window.Progress) { Progress.markTestDoneLocally(test.id); document.dispatchEvent(new CustomEvent("gurukul:progress-changed")); }
  }

  /**
   * Collects free-text answers for every "short" (theory) question in
   * the DOM, in question order. Used only by submitMixedTest below.
   */
  function collectTheoryAnswers(container, test) {
    const theoryAnswers = [];
    test.questions.forEach((q) => {
      if (q.type === "mcq") return;
      const card = container.querySelector(`.question-card[data-qid="${q.id}"]`);
      const textarea = card ? card.querySelector(".short-answer") : null;
      theoryAnswers.push({
        prompt: q.prompt,
        topic: q.topic || null,
        referenceAnswer: q.referenceAnswer || null,
        answer: textarea ? textarea.value.trim() : "",
      });
    });
    return theoryAnswers;
  }

  /**
   * Mixed MCQ + theory test: MCQ portion is graded and revealed exactly
   * like the pure-MCQ path. Theory answers are collected and sent to the
   * backend as "pending" — you grade them yourself with a local LLM via
   * the admin console (see SETUP_CHECKLIST.md Phase 7), and the
   * resulting topic-by-topic report shows up on the student's progress
   * page once you've saved it.
   */
  function submitMixedTest(container, { section, sub, test }) {
    const submitBtn = container.querySelector("#submitBtn");
    const statusEl = container.querySelector("#submitStatus");
    const bannerEl = container.querySelector("#resultBanner");
    const answerKeyHost = container.querySelector("#answerKeyBlock");

    const { correctCount, totalMcq, mcqAnswers } = gradeMcqInPlace(container, test);
    const theoryAnswers = collectTheoryAnswers(container, test);
    const hasTheory = theoryAnswers.length > 0;

    // Lock theory textareas too, so the "submitted" state is visually final.
    container.querySelectorAll(".short-answer").forEach((ta) => (ta.disabled = true));

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitted";
    statusEl.textContent = "";

    renderScoreBanner(bannerEl, correctCount, totalMcq);

    if (hasTheory) {
      const notice = document.createElement("div");
      notice.className = "result-banner notice";
      notice.innerHTML = `${dashIcon()} Your theory answers were submitted for review. Check your progress page once they've been graded for topic-by-topic feedback.`;
      bannerEl.appendChild(notice);
    }

    renderAnswerKeyBlock(answerKeyHost, test);
    revealReferenceAnswers(container, test);
    showInlineReport(container, { section, sub, test, correctCount, totalMcq, mcqAnswers, theoryAnswers, hasTheory });

    logSubmission({ section, sub, test, correctCount, totalMcq, mcqAnswers, theoryAnswers, hasTheory });
    if (window.Progress) { Progress.markTestDoneLocally(test.id); document.dispatchEvent(new CustomEvent("gurukul:progress-changed")); }
  }

  /**
   * Best-effort log of a test attempt to the backend (Submissions tab).
   * Silently does nothing if the backend isn't configured yet or the
   * user is in prototype mode — this never blocks or delays the UI,
   * since grading already happened synchronously above.
   */
  function logSubmission({ section, sub, test, correctCount, totalMcq, mcqAnswers, theoryAnswers = [], hasTheory = false }) {
    if (CONFIG.PROTOTYPE_MODE_SKIP_LOGIN) return;
    const user = Auth.getUser();
    if (!user) return;

    const combinedAnswers = [
      ...mcqAnswers.map((a) => ({
        type: "mcq",
        prompt: a.prompt,
        topic: a.topic,
        answer: a.chosenText,
        referenceAnswer: a.correctText,
        correct: a.correct,
      })),
      ...theoryAnswers.map((a) => ({
        type: "short",
        prompt: a.prompt,
        topic: a.topic,
        referenceAnswer: a.referenceAnswer,
        answer: a.answer,
        correct: null,
      })),
    ];

    Backend.submitTest({
      email: user.email,
      name: user.name,
      className: window.__gurukulActiveClassName || "",
      subjectTitle: window.__gurukulActiveSubjectName || "",
      sectionTitle: section.title,
      subsectionTitle: sub.title,
      testId: test.id,
      testTitle: test.title,
      testKind: test.kind,
      correctCount,
      totalMcq,
      hasTheory,
      submittedAt: new Date().toISOString(),
      answers: combinedAnswers,
    });
  }

  function checkIcon() {
    return `<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  function crossIcon() {
    return `<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
  }
  function dashIcon() {
    return `<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4"/><path d="M5.5 8h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
  }
  function bookIcon() {
    return `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 3.5A1.5 1.5 0 013.5 2H7v12H3.5A1.5 1.5 0 012 12.5v-9z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M14 3.5A1.5 1.5 0 0012.5 2H9v12h3.5a1.5 1.5 0 001.5-1.5v-9z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  return { renderLocked, renderNeedsAccess, renderTest };
})();

window.Tests = Tests;
