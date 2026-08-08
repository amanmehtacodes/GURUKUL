# Setup Guide — Gurukul

This site is fully built and works out of the box for browsing notes and
exporting PDFs. The Markdown renderer and PDF library are bundled locally
in `js/vendor/` (no CDN dependency), so notes display reliably even behind
strict firewalls or ad-blockers. Two features need a one-time setup with
your own Google account, because they involve credentials tied to *your*
project:

1. **Google Sign-In** (who can log in)
2. **Google Sheets submission** (where test answers get saved)

Both take about 10 minutes total. Follow the steps below in order.

---

## Part 1 — Deploy the site (do this first)

You need a live URL before Google Sign-In will work, because Google checks
the domain making the request.

### Option A: Netlify (drag and drop, easiest)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the whole `edusite` folder onto the page
3. Netlify gives you a URL like `https://random-name-123.netlify.app`
4. (Optional) Rename the site under **Site settings → Change site name**

### Option B: Vercel
1. Create a free account at [vercel.com](https://vercel.com)
2. Install the CLI: `npm i -g vercel`
3. Run `vercel` inside the `edusite` folder and follow the prompts

### Option C: GitHub Pages
1. Push the `edusite` folder contents to a GitHub repo
2. Go to **Settings → Pages** → set source to your main branch
3. Your site will be live at `https://yourusername.github.io/reponame`

**Write down your live URL — you need it in the next step.**

---

## Part 2 — Google Sign-In (OAuth Client ID)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (top-left project dropdown → **New Project**) —
   name it anything, e.g. "Gurukul"
3. Go to **APIs & Services → OAuth consent screen**
   - User Type: **External**
   - Fill in app name, your email as support contact, and your email again
     under developer contact
   - Save through the remaining steps (Scopes, Test users) — defaults are fine
   - Under **Audience**, if you want it usable by anyone, click **Publish App**
     (otherwise only "test users" you explicitly add can log in)
4. Go to **APIs & Services → Credentials**
5. Click **Create Credentials → OAuth client ID**
   - Application type: **Web application**
   - Name: anything, e.g. "Gurukul Web"
   - Under **Authorized JavaScript origins**, click **Add URI** and paste
     your live site URL from Part 1 (no trailing slash), e.g.:
     ```
     https://random-name-123.netlify.app
     ```
   - If you're also testing locally, also add:
     ```
     http://localhost:8000
     ```
   - Click **Create**
6. Copy the **Client ID** shown (ends in `.apps.googleusercontent.com`)
7. Open `js/config.js` in the site files and paste it in:
   ```js
   GOOGLE_CLIENT_ID: "123456789-abcxyz.apps.googleusercontent.com",
   ```
8. Re-deploy (drag the folder into Netlify again, or `vercel --prod`, or
   `git push`)

**Restricting to a school domain (optional):** if all your students have
Google Workspace accounts under one domain (e.g. `@yourschool.edu`), set:
```js
RESTRICT_DOMAIN: "yourschool.edu",
```
in `js/config.js`. Leave it as `null` to allow any Google account.

---

## Part 3 — Google Sheet as the site's database

This is the entire "backend" — one Google Sheet plus the Apps Script in
front of it, handling test answers, roll numbers, per-student access
control, and progress tracking. No separate server or database to pay
for or maintain.

1. Create a new Google Sheet at [sheets.google.com](https://sheets.google.com) —
   name it something like "Gurukul Data"
2. Go to **Extensions → Apps Script**
3. Delete any starter code in the editor, and paste in the entire contents
   of `apps-script.gs` (included in this project folder)
4. Near the top of the script, find this line:
   ```js
   const ADMIN_PASSWORD = "CHANGE_ME_BEFORE_DEPLOYING";
   ```
   Replace `"CHANGE_ME_BEFORE_DEPLOYING"` with a password only you know —
   this gates the `/admin.html` page. It's a simple shared-secret check
   done inside the script, not real authentication, so treat it like a
   door lock for a low-stakes room, not a bank vault.
5. Click **Save** (the disk icon), name the project anything
6. Click **Deploy → New deployment**
7. Click the gear icon next to "Select type" → choose **Web app**
8. Configure:
   - Description: anything, e.g. "Gurukul backend"
   - Execute as: **Me**
   - Who has access: **Anyone**
     *(This does not make your Sheet public — it only allows the web app
     endpoint to receive requests. Only your script code decides what
     happens with them, and your Sheet itself stays private.)*
9. Click **Deploy**
10. The first time, Google will ask you to authorize the script:
    - Click **Authorize access**
    - Choose your Google account
    - You'll see an "unverified app" warning — this is expected for your
      own script. Click **Advanced → Go to [project name] (unsafe)** → **Allow**
11. Copy the **Web app URL** shown (ends in `/exec`)
12. Open `js/config.js` and paste it in:
    ```js
    APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycb.../exec",
    ```
13. Re-deploy your site (same as Part 2, step 8)
14. **Turn off prototype mode** — in the same `js/config.js`, set:
    ```js
    PROTOTYPE_MODE_SKIP_LOGIN: false,
    ```
    While this is `true`, every test is unlocked for everyone without
    signing in (useful while building content) and no access-control or
    progress data is read or written. Leave it `true` while you're still
    adding notes/tests; set it `false` before real students use the site.

### What ends up in the Sheet
Four tabs, created automatically the first time each is needed:
- **Roster** — every student who's signed in, with an auto-assigned roll
  number starting at 101
- **Access** — access grants: which class or chapter each email can open
- **Submissions** — one row per test attempt, with score and roll number
- **Progress** — which notes each student has marked read, which tests
  they've completed
- Plus one tab per test (e.g. `squares-cubes-mcq-test`) with full
  question-by-question detail for every submission to that test

### Updating the script later
If you edit `apps-script.gs` logic in the future, you must click
**Deploy → Manage deployments → edit (pencil) → New version → Deploy**
for changes to take effect. The `/exec` URL stays the same.

### Troubleshooting: "Sorry, unable to open the file" / admin page says "Incorrect password or the backend is unreachable"

This almost always means the deployment you're pointing at is a
**Library** deployment, not a **Web app** deployment — they look similar
in the Apps Script UI but only a Web app responds to the site's requests.
You can tell them apart by the URL: a working one looks like
`.../macros/s/AKfycb.../exec`; a Library one looks like
`.../macros/library/d/.../N` — if your `APPS_SCRIPT_URL` in `config.js`
has `/library/` in it, that's the bug.

**Fix:** in the Apps Script editor, click **Deploy → New deployment →**
(gear icon) **→ Web app** specifically — not Library — set *Execute as: Me*
and *Who has access: Anyone*, deploy, and copy the resulting `/exec` URL
into `config.js`. If you're using `clasp`, use `gs-deploy/deploy.sh`
included here — it deploys, then automatically checks the resulting URL
actually works before touching `config.js`, refusing to overwrite a good
URL with a broken Library one.

To sanity-check any URL yourself, paste this into a browser tab with your
real URL and password filled in:
```
YOUR_EXEC_URL?action=adminList&password=YOUR_PASSWORD
```
A working deployment returns JSON starting with `{"status":"ok"`. A
Library deployment or a Google Drive-style "unable to open the file"
page means it's the wrong deployment type.

---

## Part 4 — Granting access & the admin dashboard

Once Part 3 is done, open `/admin.html` on your deployed site (e.g.
`https://yoursite.netlify.app/admin.html`). Enter the admin password you
set above.

**Granting access after a payment:** you monitor Razorpay (or however
you're taking payment) yourself — there's no automatic connection
between payment and access. When a payment comes in, open the admin
page, enter the student's Gmail, and grant either:
- **Whole class** — unlocks every chapter across every subject in that
  class/year (e.g. granting "Class 9" unlocks all of Class 9 Maths,
  Science, English, etc. as they're added)
- **Single chapter** — unlocks just one chapter, useful for a JEE/NEET
  student who wants one old board chapter for revision without getting
  full access to that whole class

A student can have multiple grants — e.g. a JEE student might get
"Class 11" + "Class 12" (full board access) as two separate class
grants, alongside nothing extra needed for JEE-track content itself
(that's under the `jee` track's own class-shaped access using the
`jee-xi` / `jee-xii` ids in the grant dropdown).

**Viewing submissions:** the Submissions tab on the admin page shows
every test attempt across all students, most recent first, with roll
number and score.

### Payment gateway (Razorpay)

This site does not integrate Razorpay directly — that would require a
server to verify payment webhooks, which is outside what a static site
can do safely. The intended flow is: set up a Razorpay Payment Link or
Payment Page (no code needed, configurable entirely from the Razorpay
dashboard) and share that link with students who want premium access.
When Razorpay notifies you of a successful payment, grant access via
the admin page above.

---

## Editing content


Content is organized as: **Class → Subject → Section → Subsection → Notes/Tests.**
The person picks a class (roman numeral cards, plus JEE/NEET exam-track
cards), then — for JEE/NEET — a year (XI or XII), then a subject (icon
cards — Maths, Physics, Chemistry, etc.), then browses the sidebar tree.

- **Adding/editing classes and subjects**: edit `data/curriculum.js`. Each
  class has a `label` (roman numeral shown on the picker), a `name`, and a
  list of `subjects`. A subject needs `ready: true` and a `sections` array
  to show real content — otherwise it automatically displays a
  "Coming Soon" placeholder, so you can list a subject before its content
  exists.
- **JEE / NEET tracks**: these are entries in `CLASSES` with
  `type: "exam"` and a `years` array instead of `subjects` directly — each
  year (`jee-xi`, `jee-xii`, etc.) has its own `subjects` list, since JEE
  and NEET have different subjects (JEE: Maths/Physics/Chemistry; NEET:
  Physics/Chemistry/Biology). Add or edit content the same way as a
  regular class, just nested one level deeper under the right year.
- **Subject icons**: set `icon` on a subject to one of `"maths"`,
  `"physics"`, `"chemistry"`, `"biology"`, `"english"`, or
  `"social-science"` to control which icon shows on the subject picker.
  If omitted, the icon is guessed from the subject's `id`/`title`, falling
  back to a generic book icon. New icons can be added in
  `js/subject-picker.js` (the `ICONS` object).
- **Notes**: add `.md` files under `notes/<class>-<subject>/<chapter>/`
  (e.g. `notes/class-8-maths/power-play/`) — plain Markdown, no special
  syntax needed — then reference the file path in that note's entry in
  `curriculum.js`.
- **Sections & tests**: still edit `data/curriculum.js` — it's commented
  with the exact shape expected. Add new sections, subsections, notes, or
  test questions there.
- **Test kinds**: each test needs a `kind`, either `"mcq"` (pure multiple
  choice, graded instantly in the browser — no network call) or `"mixed"`
  (MCQ + theory questions together; the MCQ portion is graded the same
  way, and theory answers are held for manual review — Google Sheets
  submission for theory answers is currently disabled, see below).
- **Answer keys**: set `answerKeyFile` on a test to a `.md` file path, and
  a "View answer key" toggle appears after the student submits.
- **Question types**: `"mcq"` (needs `options` + `answerIndex`) and
  `"short"` (theory/free text, no auto-grading).

### Prototype mode

`js/config.js` has `PROTOTYPE_MODE_SKIP_LOGIN: true` by default, which
unlocks every test without signing in — useful for building and testing
content. An amber "Prototype mode" badge shows in the header the whole
time so it's never mistaken for a real deployment. **Set this to `false`
before any real deployment** to restore the normal Google Sign-In gate.

### Theory answer submission (currently disabled)

Mixed tests no longer send theory answers to Google Sheets — that
integration is disabled for now while it's being reworked. Students see
an explicit notice after submitting a mixed test saying theory answers
aren't being collected yet. The Apps Script (`apps-script.gs`) and setup
steps in Part 3 above are still valid for when this is reconnected.

## Local testing before deploying

From inside the `edusite` folder, run a simple local server:
```
python3 -m http.server 8000
```
Then open `http://localhost:8000`. Note: Google Sign-In will only work
locally if you added `http://localhost:8000` as an authorized origin in
Part 2.

## Troubleshooting

- **Sign-in button doesn't appear**: check the browser console — usually
  means `GOOGLE_CLIENT_ID` is still the placeholder, or your live URL
  isn't in "Authorized JavaScript origins" yet.
- **"Access blocked" on sign-in**: your OAuth consent screen is still in
  "Testing" mode and your Google account isn't in the test users list.
  Either add yourself as a test user or click "Publish App".
- **Answers not appearing in the Sheet**: open the Apps Script editor,
  go to **Executions** (left sidebar) to see error logs from recent
  requests. Most common cause: `APPS_SCRIPT_URL` in `config.js` is still
  the placeholder, or the deployment's "Who has access" isn't set to
  "Anyone".
