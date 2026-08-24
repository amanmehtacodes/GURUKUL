/**
 * APPS SCRIPT — paste into Extensions > Apps Script on your Google Sheet.
 * See SETUP.md for full step-by-step deployment instructions.
 *
 * This is the entire "backend" for the site — a Google Sheet acting as
 * the database, with this script as the API in front of it. No server,
 * no hosting, no separate database to pay for or maintain.
 *
 * SHEET TABS (created automatically on first use):
 *   - Roster       one row per student: email, roll number, name, first seen
 *   - Access       one row per access grant: email, grantType (class/chapter),
 *                  grantValue (e.g. "class-9" or "class-9-maths-power-play"),
 *                  grantedAt, grantedBy
 *   - Submissions  one row per test attempt with score + full answer detail
 *   - Progress     one row per (student, item) marking a note "read" or a
 *                  test "done"
 *
 * ENDPOINTS (all via the same deployed /exec URL):
 *   POST  action=submitTest      -> record a test submission
 *   POST  action=markProgress    -> mark a note read / test done
 *   GET   action=checkAccess     -> { rollNumber, grants: [...] } for one email
 *   GET   action=getProgress     -> progress + submission history for one email
 *   GET   action=adminList       -> (password-gated) full roster + access + submissions
 *   POST  action=adminGrant      -> (password-gated) add an access grant
 *   POST  action=adminRevoke     -> (password-gated) remove an access grant
 *
 * IMPORTANT: set ADMIN_PASSWORD below to something only you know before
 * deploying. This is a simple shared-secret check, not real
 * authentication — adequate for a small, trust-based admin page, not a
 * substitute for real access control if that ever matters more.
 */

const ADMIN_PASSWORD = "CHANGE_ME_BEFORE_DEPLOYING";

// ---------------------------------------------------------------------------
// Entry points
// ---------------------------------------------------------------------------

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || "submitTest"; // default keeps old callers working

    switch (action) {
      case "submitTest":
        return respond(handleSubmitTest(data));
      case "markProgress":
        return respond(handleMarkProgress(data));
      case "adminGrant":
        requireAdmin(data.password);
        return respond(handleAdminGrant(data));
      case "adminRevoke":
        requireAdmin(data.password);
        return respond(handleAdminRevoke(data));
      default:
        throw new Error("Unknown action: " + action);
    }
  } catch (err) {
    return respond({ status: "error", message: err.message }, true);
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    switch (action) {
      case "checkAccess":
        return respond(handleCheckAccess(e.parameter.email));
      case "getProgress":
        return respond(handleGetProgress(e.parameter.email));
      case "adminList":
        requireAdmin(e.parameter.password);
        return respond(handleAdminList());
      default:
        throw new Error("Unknown action: " + action);
    }
  } catch (err) {
    return respond({ status: "error", message: err.message }, true);
  }
}

function respond(obj, isError) {
  const body = isError ? obj : Object.assign({ status: "ok" }, obj);
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function requireAdmin(password) {
  if (!password || password !== ADMIN_PASSWORD) {
    throw new Error("Not authorized.");
  }
}

// ---------------------------------------------------------------------------
// Roster / roll numbers
// ---------------------------------------------------------------------------

function getOrCreateRollNumber(ss, email, name) {
  const sheet = getOrCreateSheet(ss, "Roster", [
    "Email",
    "Roll Number",
    "Name",
    "First Seen",
  ]);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) return data[i][1];
  }

  // New student — assign the next roll number starting at 101.
  let maxRoll = 100;
  for (let i = 1; i < data.length; i++) {
    const n = Number(data[i][1]);
    if (n > maxRoll) maxRoll = n;
  }
  const rollNumber = maxRoll + 1;
  sheet.appendRow([email, rollNumber, name || "", new Date().toISOString()]);
  return rollNumber;
}

// ---------------------------------------------------------------------------
// Access control
// ---------------------------------------------------------------------------

function handleCheckAccess(email) {
  if (!email) throw new Error("Missing email.");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rollNumber = getOrCreateRollNumber(ss, email, "");
  const grants = getGrantsForEmail(ss, email);
  return { rollNumber: rollNumber, grants: grants };
}

function getGrantsForEmail(ss, email) {
  const sheet = getOrCreateSheet(ss, "Access", [
    "Email",
    "Grant Type",
    "Grant Value",
    "Granted At",
    "Granted By",
  ]);
  const data = sheet.getDataRange().getValues();
  const grants = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      grants.push({ type: data[i][1], value: data[i][2] });
    }
  }
  return grants;
}

function handleAdminGrant(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, "Access", [
    "Email",
    "Grant Type",
    "Grant Value",
    "Granted At",
    "Granted By",
  ]);
  sheet.appendRow([
    data.email,
    data.grantType,
    data.grantValue,
    new Date().toISOString(),
    data.grantedBy || "admin",
  ]);
  return { grants: getGrantsForEmail(ss, data.email) };
}

function handleAdminRevoke(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, "Access", [
    "Email",
    "Grant Type",
    "Grant Value",
    "Granted At",
    "Granted By",
  ]);
  const values = sheet.getDataRange().getValues();
  // Walk bottom-up so row deletion doesn't shift indices we haven't visited yet.
  for (let i = values.length - 1; i >= 1; i--) {
    if (
      values[i][0] === data.email &&
      values[i][1] === data.grantType &&
      values[i][2] === data.grantValue
    ) {
      sheet.deleteRow(i + 1);
    }
  }
  return { grants: getGrantsForEmail(ss, data.email) };
}

// ---------------------------------------------------------------------------
// Test submissions
// ---------------------------------------------------------------------------

function handleSubmitTest(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rollNumber = getOrCreateRollNumber(ss, data.email, data.name);

  writeSubmissionRow(ss, data, rollNumber);
  writeDetailRows(ss, data, rollNumber);

  return { rollNumber: rollNumber };
}

function writeSubmissionRow(ss, data, rollNumber) {
  const sheet = getOrCreateSheet(ss, "Submissions", [
    "Submitted At",
    "Roll Number",
    "Email",
    "Name",
    "Class",
    "Subject",
    "Section",
    "Subsection",
    "Test",
    "Test Kind",
    "Score",
    "Total MCQ",
  ]);
  sheet.appendRow([
    data.submittedAt,
    rollNumber,
    data.email,
    data.name,
    data.className || "",
    data.subjectTitle || "",
    data.sectionTitle,
    data.subsectionTitle,
    data.testTitle,
    data.testKind || "",
    data.correctCount != null ? data.correctCount : "",
    data.totalMcq != null ? data.totalMcq : "",
  ]);
}

function writeDetailRows(ss, data, rollNumber) {
  const sheetName = sanitizeSheetName(data.testId || "Test");
  const sheet = getOrCreateSheet(ss, sheetName, [
    "Submitted At",
    "Roll Number",
    "Email",
    "Name",
    "Section",
    "Subsection",
    "Test",
    "Question",
    "Answer",
    "Correct?",
  ]);
  (data.answers || []).forEach((a) => {
    sheet.appendRow([
      data.submittedAt,
      rollNumber,
      data.email,
      data.name,
      data.sectionTitle,
      data.subsectionTitle,
      data.testTitle,
      a.prompt,
      a.answer,
      a.correct === null || a.correct === undefined
        ? ""
        : a.correct
        ? "Yes"
        : "No",
    ]);
  });
}

// ---------------------------------------------------------------------------
// Progress (notes read / tests done) + per-student progress view
// ---------------------------------------------------------------------------

function handleMarkProgress(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, "Progress", [
    "Email",
    "Item Id",
    "Item Type",
    "Status",
    "Updated At",
  ]);
  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === data.email && values[i][1] === data.itemId) {
      sheet.getRange(i + 1, 4).setValue(data.status);
      sheet.getRange(i + 1, 5).setValue(new Date().toISOString());
      return { updated: true };
    }
  }
  sheet.appendRow([
    data.email,
    data.itemId,
    data.itemType,
    data.status,
    new Date().toISOString(),
  ]);
  return { updated: true };
}

function handleGetProgress(email) {
  if (!email) throw new Error("Missing email.");
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const progressSheet = getOrCreateSheet(ss, "Progress", [
    "Email",
    "Item Id",
    "Item Type",
    "Status",
    "Updated At",
  ]);
  const progressValues = progressSheet.getDataRange().getValues();
  const progress = [];
  for (let i = 1; i < progressValues.length; i++) {
    if (progressValues[i][0] === email) {
      progress.push({
        itemId: progressValues[i][1],
        itemType: progressValues[i][2],
        status: progressValues[i][3],
      });
    }
  }

  const subsSheet = getOrCreateSheet(ss, "Submissions", [
    "Submitted At",
    "Roll Number",
    "Email",
    "Name",
    "Class",
    "Subject",
    "Section",
    "Subsection",
    "Test",
    "Test Kind",
    "Score",
    "Total MCQ",
  ]);
  const subsValues = subsSheet.getDataRange().getValues();
  const submissions = [];
  for (let i = 1; i < subsValues.length; i++) {
    if (subsValues[i][2] === email) {
      submissions.push({
        submittedAt: subsValues[i][0],
        className: subsValues[i][4],
        subject: subsValues[i][5],
        section: subsValues[i][6],
        subsection: subsValues[i][7],
        test: subsValues[i][8],
        testKind: subsValues[i][9],
        score: subsValues[i][10],
        totalMcq: subsValues[i][11],
      });
    }
  }

  return { progress: progress, submissions: submissions };
}

// ---------------------------------------------------------------------------
// Admin dashboard data
// ---------------------------------------------------------------------------

function handleAdminList() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const rosterSheet = getOrCreateSheet(ss, "Roster", [
    "Email",
    "Roll Number",
    "Name",
    "First Seen",
  ]);
  const rosterValues = rosterSheet.getDataRange().getValues();
  const roster = [];
  for (let i = 1; i < rosterValues.length; i++) {
    roster.push({
      email: rosterValues[i][0],
      rollNumber: rosterValues[i][1],
      name: rosterValues[i][2],
      firstSeen: rosterValues[i][3],
    });
  }

  const accessSheet = getOrCreateSheet(ss, "Access", [
    "Email",
    "Grant Type",
    "Grant Value",
    "Granted At",
    "Granted By",
  ]);
  const accessValues = accessSheet.getDataRange().getValues();
  const access = [];
  for (let i = 1; i < accessValues.length; i++) {
    access.push({
      email: accessValues[i][0],
      grantType: accessValues[i][1],
      grantValue: accessValues[i][2],
      grantedAt: accessValues[i][3],
    });
  }

  const subsSheet = getOrCreateSheet(ss, "Submissions", [
    "Submitted At",
    "Roll Number",
    "Email",
    "Name",
    "Class",
    "Subject",
    "Section",
    "Subsection",
    "Test",
    "Test Kind",
    "Score",
    "Total MCQ",
  ]);
  const subsValues = subsSheet.getDataRange().getValues();
  const submissions = [];
  for (let i = 1; i < subsValues.length; i++) {
    submissions.push({
      submittedAt: subsValues[i][0],
      rollNumber: subsValues[i][1],
      email: subsValues[i][2],
      name: subsValues[i][3],
      className: subsValues[i][4],
      subject: subsValues[i][5],
      section: subsValues[i][6],
      subsection: subsValues[i][7],
      test: subsValues[i][8],
      testKind: subsValues[i][9],
      score: subsValues[i][10],
      totalMcq: subsValues[i][11],
    });
  }

  return { roster: roster, access: access, submissions: submissions };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getOrCreateSheet(ss, name, headerRow) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headerRow);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sanitizeSheetName(name) {
  return name.replace(/[\/\\?*\[\]]/g, "-").substring(0, 90);
}

/**
 * Run manually from the Apps Script editor (Run > testSetup) to verify
 * permissions are set up correctly and all tabs get created.
 */
function testSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  getOrCreateSheet(ss, "Roster", [
    "Email",
    "Roll Number",
    "Name",
    "First Seen",
  ]);
  getOrCreateSheet(ss, "Access", [
    "Email",
    "Grant Type",
    "Grant Value",
    "Granted At",
    "Granted By",
  ]);
  getOrCreateSheet(ss, "Submissions", [
    "Submitted At",
    "Roll Number",
    "Email",
    "Name",
    "Class",
    "Subject",
    "Section",
    "Subsection",
    "Test",
    "Test Kind",
    "Score",
    "Total MCQ",
  ]);
  getOrCreateSheet(ss, "Progress", [
    "Email",
    "Item Id",
    "Item Type",
    "Status",
    "Updated At",
  ]);
  Logger.log("All tabs ready on: " + ss.getName());
}
