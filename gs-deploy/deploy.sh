#!/bin/bash
# deploy.sh — run from inside the gurukul/gs-deploy folder
# Usage: bash deploy.sh
set -e

GURUKUL_ROOT="/Users/amanmehta/downloads/gurukul"
CONFIG_FILE="$GURUKUL_ROOT/js/config.js"

echo "== Checking clasp login =="
if ! clasp login --status &>/dev/null; then
  echo "Not logged in — opening browser for Google login..."
  clasp login
fi

echo "== Checking for ADMIN_PASSWORD placeholder =="
if grep -q "CHANGE_ME_BEFORE_DEPLOYING" Code.gs; then
  echo ""
  echo "STOP: Code.gs still has the placeholder ADMIN_PASSWORD."
  echo "   Open Code.gs, change this line:"
  echo '     const ADMIN_PASSWORD = "CHANGE_ME_BEFORE_DEPLOYING";'
  echo "   to your real password, save, then re-run this script."
  exit 1
fi

# Read the real password out of Code.gs so this script can self-test the
# deployment below, instead of just hoping it worked.
ADMIN_PW=$(grep "const ADMIN_PASSWORD" Code.gs | sed -E 's/.*"([^"]*)".*/\1/')

echo "== Creating Sheet + Apps Script project (skips if already created) =="
if [ ! -f ".clasp.json" ]; then
  clasp create --title "Gurukul Data" --type sheets
else
  echo "Already created — using existing project (.clasp.json found)."
fi

echo "== Pushing script =="
clasp push -f

# ---------------------------------------------------------------------------
# IMPORTANT: clasp's plain `clasp deploy` does not reliably create a
# **Web app** deployment — depending on version/manifest state it can
# instead create a Library deployment (a /macros/library/... URL), which
# looks similar but does NOT respond to HTTP GET/POST the way this site
# needs. This has bitten this exact project before. To avoid it silently
# happening again, this script deploys, then IMMEDIATELY makes a real
# HTTP request to the resulting URL and checks for {"status":"ok"} before
# ever writing anything into config.js. If that check fails, it stops and
# tells you to create the Web app deployment by hand in the Apps Script
# UI (Deploy > New deployment > Web app) instead of trusting clasp's
# default.
# ---------------------------------------------------------------------------

echo "== Deploying =="
clasp deploy --description "Gurukul backend $(date +%Y-%m-%d)"

echo "== Finding the newest deployment =="
# `clasp deployments` lists oldest first with @HEAD last; the newest
# *versioned* (non-HEAD) deployment is what we want — that's the second
# to last line, not the last line.
DEPLOY_LINE=$(clasp deployments | grep -v '@HEAD' | tail -1)
DEPLOY_ID=$(echo "$DEPLOY_LINE" | awk '{print $2}')
EXEC_URL="https://script.google.com/macros/s/${DEPLOY_ID}/exec"

echo "   Candidate deployment: $DEPLOY_ID"
echo "   Candidate URL: $EXEC_URL"

echo ""
echo "== Verifying this URL is a real, working Web app (not a Library) =="
RESPONSE=$(curl -s -L --max-time 15 "${EXEC_URL}?action=adminList&password=${ADMIN_PW}" || echo "CURL_FAILED")

if echo "$RESPONSE" | grep -q '"status":"ok"'; then
  echo "   Verified — this deployment responds correctly."
else
  echo ""
  echo "COULD NOT VERIFY THIS DEPLOYMENT AUTOMATICALLY."
  echo "Response received:"
  echo "$RESPONSE" | head -c 300
  echo ""
  echo ""
  echo "This usually means clasp created a Library deployment instead of a"
  echo "Web app deployment (a known clasp quirk). Fix it manually instead:"
  echo ""
  echo "  1. Run: clasp open-script    (or open script.google.com and find"
  echo "     the 'Gurukul Data' project by hand)"
  echo "  2. Click Deploy (top right) -> New deployment"
  echo "  3. Click the gear icon next to 'Select type' -> choose 'Web app'"
  echo "     specifically (not Library)"
  echo "  4. Execute as: Me   |   Who has access: Anyone"
  echo "  5. Click Deploy, authorize if asked"
  echo "  6. Copy the URL shown (it must end in /exec, not /library/...)"
  echo "  7. Paste it into: $CONFIG_FILE"
  echo ""
  echo "Not writing anything into config.js — leaving it as-is so you don't"
  echo "end up with a broken URL in place of a working one."
  exit 1
fi

echo ""
echo "== Updating $CONFIG_FILE =="
if [ -f "$CONFIG_FILE" ]; then
  # macOS sed needs an empty string after -i for in-place editing
  sed -i '' "s#APPS_SCRIPT_URL: \".*\"#APPS_SCRIPT_URL: \"$EXEC_URL\"#" "$CONFIG_FILE"
  echo "config.js updated automatically with a VERIFIED working URL."
  grep "APPS_SCRIPT_URL" "$CONFIG_FILE"
else
  echo "Could not find $CONFIG_FILE — paste this URL in manually:"
  echo "  $EXEC_URL"
fi

echo ""
echo "Done and verified. Refresh admin.html locally — the password gate"
echo "should now work with the password set in Code.gs."
