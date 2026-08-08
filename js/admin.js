/**
 * ADMIN DASHBOARD
 * -----------------
 * Password-gated page for managing student access and viewing
 * submissions. The "password" is a simple shared secret checked
 * server-side by apps-script.gs (see ADMIN_PASSWORD there) — this is
 * intentionally lightweight, matching the trust level of the rest of
 * this system (a Google Sheet as the database). It is not real
 * authentication.
 *
 * The entered password is kept only in memory for this tab (sessionStorage)
 * so the admin doesn't have to retype it while navigating between tabs.
 */

(function () {
  const gateScreen = document.getElementById("gateScreen");
  const dashboard = document.getElementById("dashboard");
  const loadingState = document.getElementById("loadingState");
  const unavailableState = document.getElementById("unavailableState");
  const gateForm = document.getElementById("gateForm");
  const passwordInput = document.getElementById("passwordInput");
  const gateError = document.getElementById("gateError");

  const grantForm = document.getElementById("grantForm");
  const grantEmail = document.getElementById("grantEmail");
  const grantType = document.getElementById("grantType");
  const grantValue = document.getElementById("grantValue");
  const grantStatus = document.getElementById("grantStatus");

  const rosterBody = document.getElementById("rosterBody");
  const submissionsBody = document.getElementById("submissionsBody");

  let adminPassword = null;
  let latestData = { roster: [], access: [], submissions: [] };

  // ---------------------------------------------------------------------
  // Password gate
  // ---------------------------------------------------------------------

  function init() {
    if (!Backend.isConfigured()) {
      gateScreen.classList.add("hidden");
      unavailableState.classList.remove("hidden");
      return;
    }

    const saved = sessionStorage.getItem("gurukul_admin_pw");
    if (saved) {
      adminPassword = saved;
      tryLoad();
    }

    gateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const pw = passwordInput.value.trim();
      if (!pw) return;
      adminPassword = pw;
      tryLoad();
    });

    populateGrantValueOptions();
    grantType.addEventListener("change", populateGrantValueOptions);
    grantForm.addEventListener("submit", handleGrantSubmit);

    document.querySelectorAll(".admin-tab").forEach((tab) => {
      tab.addEventListener("click", () => switchTab(tab.dataset.tab));
    });
  }

  async function tryLoad() {
    gateError.textContent = "";
    gateScreen.classList.add("hidden");
    loadingState.classList.remove("hidden");

    const result = await Backend.adminList(adminPassword);

    loadingState.classList.add("hidden");

    if (result.status !== "ok") {
      gateScreen.classList.remove("hidden");
      gateError.textContent = result.message || "Incorrect password or the backend is unreachable.";
      adminPassword = null;
      sessionStorage.removeItem("gurukul_admin_pw");
      return;
    }

    sessionStorage.setItem("gurukul_admin_pw", adminPassword);
    latestData = { roster: result.roster || [], access: result.access || [], submissions: result.submissions || [] };
    dashboard.classList.remove("hidden");
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
        const classLabel = entry.type === "exam" ? entry.label : entry.label;
        const subjectSets = entry.type === "exam" ? entry.years.map((y) => ({ label: `${entry.label} ${y.label}`, subjects: y.subjects })) : [{ label: entry.label, subjects: entry.subjects }];

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

    const result = await Backend.adminGrant({
      password: adminPassword,
      email,
      grantType: grantType.value,
      grantValue: grantValue.value,
    });

    if (result.status === "ok") {
      grantStatus.textContent = `Granted ${grantType.value} access to ${email}.`;
      grantStatus.className = "admin-grant-status success";
      grantEmail.value = "";
      await tryLoad(); // refresh roster to show the new grant
    } else {
      grantStatus.textContent = result.message || "Failed to grant access.";
      grantStatus.className = "admin-grant-status error";
    }
  }

  async function handleRevoke(email, gType, gValue, btn) {
    btn.disabled = true;
    btn.textContent = "…";
    const result = await Backend.adminRevoke({ password: adminPassword, email, grantType: gType, grantValue: gValue });
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
            (g) => `<span class="grant-chip">${escapeHtml(g.grantType)}: ${escapeHtml(g.grantValue)}
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
  // Submissions table
  // ---------------------------------------------------------------------

  function renderSubmissions() {
    submissionsBody.innerHTML = "";
    if (!latestData.submissions.length) {
      submissionsBody.innerHTML = `<tr><td colspan="8" class="admin-empty-cell">No test submissions yet.</td></tr>`;
      return;
    }

    latestData.submissions
      .slice()
      .reverse()
      .forEach((s) => {
        const tr = document.createElement("tr");
        const scoreText = s.totalMcq !== "" && s.totalMcq != null ? `${s.score}/${s.totalMcq}` : "—";
        tr.innerHTML = `
          <td>${escapeHtml(formatDate(s.submittedAt))}</td>
          <td>${escapeHtml(String(s.rollNumber))}</td>
          <td>${escapeHtml(s.email)}</td>
          <td>${escapeHtml(s.className)}</td>
          <td>${escapeHtml(s.subject)}</td>
          <td>${escapeHtml(s.test)}</td>
          <td>${escapeHtml(s.testKind)}</td>
          <td>${escapeHtml(scoreText)}</td>
        `;
        submissionsBody.appendChild(tr);
      });
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
