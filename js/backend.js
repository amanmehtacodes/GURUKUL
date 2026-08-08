/**
 * BACKEND MODULE
 * ---------------
 * Thin wrapper around Supabase table queries, replacing the old
 * Apps-Script fetch() calls. Centralizes data shapes so every other
 * module (access control, progress, tests, admin) talks to the
 * database the same way, and keeps the exact same return shapes the
 * rest of the app already expects — so access-control.js, progress.js
 * and progress-page.js needed no changes.
 *
 * All calls are best-effort: if Supabase isn't configured yet (see
 * js/config.js), calls resolve to a clear "unavailable" result rather
 * than throwing.
 */

const Backend = (() => {
  function client() {
    return Auth.getClient();
  }

  function isConfigured() {
    return !!(
      CONFIG.SUPABASE_URL &&
      CONFIG.SUPABASE_ANON_KEY &&
      !CONFIG.SUPABASE_ANON_KEY.includes("YOUR_") &&
      client()
    );
  }

  // -----------------------------------------------------------------
  // Student-facing
  // -----------------------------------------------------------------

  async function checkAccess(email) {
    if (!isConfigured()) return { status: "unavailable" };
    const sb = client();

    const [{ data: profile }, { data: grants, error }] = await Promise.all([
      sb.from("profiles").select("roll_number").eq("email", email).maybeSingle(),
      sb.from("access_grants").select("grant_type, target_id").eq("email", email),
    ]);

    if (error) return { status: "error", message: error.message };

    return {
      status: "ok",
      rollNumber: profile ? profile.roll_number : null,
      grants: (grants || []).map((g) => ({ type: g.grant_type, value: g.target_id })),
    };
  }

  async function getProgress(email) {
    if (!isConfigured()) return { status: "unavailable" };
    const sb = client();

    const [{ data: progress, error: pErr }, { data: submissions, error: sErr }] = await Promise.all([
      sb.from("progress").select("item_id, item_type, status").eq("email", email),
      sb
        .from("submissions")
        .select("id, submitted_at, class_name, subject, section, subsection, test, test_kind, score, total_mcq, subjective_status, overall_report")
        .eq("email", email)
        .order("submitted_at", { ascending: true }),
    ]);

    if (pErr || sErr) return { status: "error", message: (pErr || sErr).message };

    return {
      status: "ok",
      progress: (progress || []).map((p) => ({ itemId: p.item_id, itemType: p.item_type, status: p.status })),
      submissions: (submissions || []).map((s) => ({
        id: s.id,
        submittedAt: s.submitted_at,
        className: s.class_name,
        subject: s.subject,
        section: s.section,
        subsection: s.subsection,
        test: s.test,
        testKind: s.test_kind,
        score: s.score,
        totalMcq: s.total_mcq,
        subjectiveStatus: s.subjective_status,
        overallReport: s.overall_report,
      })),
    };
  }

  /**
   * Records a test submission plus its question-by-question detail.
   * MCQ answers are graded already (correct: true/false); theory
   * ("short") answers come in ungraded (correct: null) and, if present,
   * flip the submission's subjective_status to "pending" so it shows up
   * in the admin console's manual-grading queue.
   */
  async function submitTest(payload) {
    if (!isConfigured()) return { status: "unavailable" };
    const sb = client();

    const { data: sub, error } = await sb
      .from("submissions")
      .insert({
        email: payload.email,
        name: payload.name,
        class_name: payload.className,
        subject: payload.subjectTitle,
        section: payload.sectionTitle,
        subsection: payload.subsectionTitle,
        test_id: payload.testId,
        test: payload.testTitle,
        test_kind: payload.testKind,
        score: payload.correctCount,
        total_mcq: payload.totalMcq,
        submitted_at: payload.submittedAt,
        subjective_status: payload.hasTheory ? "pending" : "n/a",
      })
      .select()
      .single();

    if (error) {
      console.warn("submitTest failed:", error.message);
      return { status: "error", message: error.message };
    }

    if (payload.answers && payload.answers.length) {
      const rows = payload.answers.map((a) => ({
        submission_id: sub.id,
        question_type: a.type || "mcq",
        question_prompt: a.prompt,
        student_answer: a.answer,
        correct: a.correct,
      }));
      const { error: aErr } = await sb.from("submission_answers").insert(rows);
      if (aErr) console.warn("Failed to save answer detail:", aErr.message);
    }

    return { status: "ok", submissionId: sub.id };
  }

  async function markProgress(payload) {
    if (!isConfigured()) return { status: "unavailable" };
    const sb = client();
    const { error } = await sb
      .from("progress")
      .upsert(
        {
          email: payload.email,
          item_id: payload.itemId,
          item_type: payload.itemType,
          status: payload.status,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email,item_id" }
      );
    if (error) return { status: "error", message: error.message };
    return { status: "ok" };
  }

  // -----------------------------------------------------------------
  // Admin — authorization is enforced by Row Level Security (see
  // supabase/schema.sql's is_admin() checks), not by a password param
  // like the old Apps Script version. The caller must already be signed
  // in as an email listed in the admin_emails table.
  // -----------------------------------------------------------------

  async function adminList() {
    if (!isConfigured()) return { status: "unavailable" };
    const sb = client();

    const [
      { data: roster, error: rErr },
      { data: access, error: aErr },
      { data: submissions, error: sErr },
    ] = await Promise.all([
      sb.from("profiles").select("email, name, roll_number, created_at").order("roll_number"),
      sb.from("access_grants").select("email, grant_type, target_id, granted_at, granted_via"),
      sb
        .from("submissions")
        .select("id, submitted_at, email, name, class_name, subject, test, test_kind, score, total_mcq, subjective_status")
        .order("submitted_at", { ascending: false }),
    ]);

    if (rErr || aErr || sErr) {
      const err = rErr || aErr || sErr;
      return { status: "error", message: err.message };
    }

    return {
      status: "ok",
      roster: (roster || []).map((r) => ({ email: r.email, name: r.name, rollNumber: r.roll_number, firstSeen: r.created_at })),
      access: (access || []).map((g) => ({
        email: g.email,
        grantType: g.grant_type,
        grantValue: g.target_id,
        grantedAt: g.granted_at,
        grantedVia: g.granted_via,
      })),
      submissions: (submissions || []).map((s) => ({
        id: s.id,
        submittedAt: s.submitted_at,
        email: s.email,
        name: s.name,
        className: s.class_name,
        subject: s.subject,
        test: s.test,
        testKind: s.test_kind,
        score: s.score,
        totalMcq: s.total_mcq,
        subjectiveStatus: s.subjective_status,
      })),
    };
  }

  async function adminGrant({ email, grantType, grantValue }) {
    const sb = client();
    const { error } = await sb
      .from("access_grants")
      .insert({ email, grant_type: grantType, target_id: grantValue, granted_via: "manual" });
    if (error) return { status: "error", message: error.message };
    return { status: "ok" };
  }

  async function adminRevoke({ email, grantType, grantValue }) {
    const sb = client();
    const { error } = await sb
      .from("access_grants")
      .delete()
      .eq("email", email)
      .eq("grant_type", grantType)
      .eq("target_id", grantValue);
    if (error) return { status: "error", message: error.message };
    return { status: "ok" };
  }

  /** Full answer detail for one submission — used by the manual grading panel. */
  async function adminGetSubmissionAnswers(submissionId) {
    const sb = client();
    const { data, error } = await sb
      .from("submission_answers")
      .select("*")
      .eq("submission_id", submissionId)
      .order("created_at");
    if (error) return { status: "error", message: error.message };
    return { status: "ok", answers: data || [] };
  }

  /** Saves the score/topic/feedback you entered after grading one answer with your own local LLM. */
  async function adminSaveGrade({ answerId, llmScore, llmMaxScore, topicTag, feedbackText }) {
    const sb = client();
    const { error } = await sb
      .from("submission_answers")
      .update({
        llm_score: llmScore,
        llm_max_score: llmMaxScore,
        topic_tag: topicTag,
        feedback_text: feedbackText,
      })
      .eq("id", answerId);
    if (error) return { status: "error", message: error.message };
    return { status: "ok" };
  }

  /** Marks a submission's subjective portion as graded and stores the aggregated per-topic report. */
  async function adminFinalizeGrading({ submissionId, overallReport }) {
    const sb = client();
    const { error } = await sb
      .from("submissions")
      .update({ subjective_status: "graded", overall_report: overallReport })
      .eq("id", submissionId);
    if (error) return { status: "error", message: error.message };
    return { status: "ok" };
  }

  return {
    isConfigured,
    checkAccess,
    getProgress,
    submitTest,
    markProgress,
    adminList,
    adminGrant,
    adminRevoke,
    adminGetSubmissionAnswers,
    adminSaveGrade,
    adminFinalizeGrading,
  };
})();

window.Backend = Backend;
