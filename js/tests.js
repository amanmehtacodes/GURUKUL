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
          <div class="question-num">Question ${i + 1}</div>
          <p class="question-prompt">${escapeHtml(q.prompt)}</p>
          <div class="mcq-options">${options}</div>
          <div class="mcq-feedback" style="display:none;"></div>
        </div>`;
    }
    // theory / short answer
    return `
      <div class="question-card" data-qid="${q.id}" data-qtype="short">
        <div class="question-num">Question ${i + 1} · Theory</div>
        <p class="question-prompt">${escapeHtml(q.prompt)}</p>
        <textarea class="short-answer" name="${q.id}" placeholder="Type your answer…"></textarea>
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
        chosenIdx,
        answerIndex: q.answerIndex,
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
    });

    return { correctCount, totalMcq, mcqAnswers };
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
        } catch (err) {
          pane.innerHTML = `<p style="color: var(--error);">Failed to load answer key: ${escapeHtml(err.message)}</p>`;
        }
      }
    });
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

    logSubmission({ section, sub, test, correctCount, totalMcq, mcqAnswers, theoryAnswers: [] });
    if (window.Progress) { Progress.markTestDoneLocally(test.id); document.dispatchEvent(new CustomEvent("gurukul:progress-changed")); }
  }

  /**
   * Mixed MCQ + theory test: MCQ portion is graded and revealed exactly
   * like the pure-MCQ path, and logged the same way. Theory answers are
   * currently NOT sent anywhere — Google Sheets submission for theory
   * content is disabled for now and will be reconnected later, so we say
   * so plainly instead of pretending to send data.
   */
  function submitMixedTest(container, { section, sub, test }) {
    const submitBtn = container.querySelector("#submitBtn");
    const statusEl = container.querySelector("#submitStatus");
    const bannerEl = container.querySelector("#resultBanner");
    const answerKeyHost = container.querySelector("#answerKeyBlock");

    const { correctCount, totalMcq, mcqAnswers } = gradeMcqInPlace(container, test);
    const hasTheory = test.questions.some((q) => q.type !== "mcq");

    // Lock theory textareas too, so the "submitted" state is visually final.
    container.querySelectorAll(".short-answer").forEach((ta) => (ta.disabled = true));

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitted";
    statusEl.textContent = "";

    renderScoreBanner(bannerEl, correctCount, totalMcq);

    if (hasTheory) {
      const notice = document.createElement("div");
      notice.className = "result-banner notice";
      notice.innerHTML = `${dashIcon()} Theory answers aren't being collected yet — this will be connected soon. Only the MCQ portion above was scored.`;
      bannerEl.appendChild(notice);
    }

    renderAnswerKeyBlock(answerKeyHost, test);

    // Only the MCQ portion + score is logged — theory text is
    // intentionally left out of the payload while that pipeline is off.
    logSubmission({ section, sub, test, correctCount, totalMcq, mcqAnswers, theoryAnswers: [] });
    if (window.Progress) { Progress.markTestDoneLocally(test.id); document.dispatchEvent(new CustomEvent("gurukul:progress-changed")); }
  }

  /**
   * Best-effort log of a test attempt to the backend (Submissions tab).
   * Silently does nothing if the backend isn't configured yet or the
   * user is in prototype mode — this never blocks or delays the UI,
   * since grading already happened synchronously above.
   */
  function logSubmission({ section, sub, test, correctCount, totalMcq, mcqAnswers }) {
    if (CONFIG.PROTOTYPE_MODE_SKIP_LOGIN) return;
    const user = Auth.getUser();
    if (!user) return;

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
      submittedAt: new Date().toISOString(),
      answers: mcqAnswers.map((a) => ({
        prompt: a.prompt,
        answer: a.chosenIdx !== null ? String(a.chosenIdx) : "",
        correct: a.correct,
      })),
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
