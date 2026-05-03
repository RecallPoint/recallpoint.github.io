# RecallPoint Website Work Log

Last updated: 2026-05-04

## What Was Completed

1. Replaced homepage with new waitlist landing page design.
- Main page is now `index.html` using your provided copy and layout.
- Uses `vault-logo.png` in header.

2. Preserved previous testing information page.
- Existing test/build/join details were moved to `testing.html`.
- Added navigation from testing page back to waitlist.

3. Fixed logo loading issue.
- Root cause: `vault-logo.png` existed locally but was not tracked in git.
- File was committed and pushed.
- Logo path updated to absolute (`/vault-logo.png`).

4. Updated visual polish on landing page.
- Increased hero logo size (desktop and mobile tuned).
- Removed bottom testing link from landing page on request.
- Removed policy/terms links from landing page.
- Added tab icon (favicon) to match vault logo.

5. Added waitlist form submission handling in frontend.
- Android and iOS forms now submit via JavaScript.
- Success indicator text displays after submit:
  - "Thank you for your submission. We look forward to sharing RecallPoint with you soon."

6. Added Google Apps Script backend reference.
- Added `waitlist_apps_script.gs` in repo for future reference.
- Script supports appending to two sheet tabs by `platform`:
  - Android tab: `gid=0`
  - iOS tab: `gid=699530367`

7. Wired deployed Apps Script endpoint into landing page.
- Both form endpoints point to:
  - `https://script.google.com/macros/s/AKfycbxLaH7P82IvkRX183LBoEJk-diXPwRyJXevAL_y7jD5hnsjmNkMzaaNlqBRtDotWQ_a/exec`

## Important Operational Notes

1. `GET` health check vs `POST` form submit.
- Opening `/exec` in browser uses `GET`.
- Form submissions use `POST`.
- If browser says `Script function not found: doGet`, deployment is missing `doGet` even if `doPost` may still work.

2. Current Apps Script issue observed in testing.
- Live endpoint returned runtime error:
  - `ReferenceError: jsonResponse is not defined`
- This indicates deployed script version mismatch/incomplete function set.
- Fix by redeploying full script including `jsonResponse`.

3. Frontend currently uses `fetch(..., { mode: "no-cors" })`.
- Browser cannot reliably inspect backend error responses in this mode.
- User-facing success text can appear even when backend fails.
- Direct endpoint tests are recommended after script changes.

## What Is Ready To Use

1. Website structure and branding are live.
2. Waitlist forms are connected to Apps Script endpoint URL.
3. Backend script template for dual-tab append logic is in repo.

## What Still Requires Verification

1. Confirm Apps Script deployment includes all functions (`doGet`, `doPost`, `handleRequest`, `getSheetByGid`, `jsonResponse`).
2. Confirm both Android and iOS submissions append correctly in the target spreadsheet tabs.

## Fast Verification Checklist

1. Open endpoint URL in browser.
- Expected: JSON health response, not function error page.

2. Submit one Android test email from landing page.
- Confirm new row in sheet tab `gid=0`.

3. Submit one iOS test email from landing page.
- Confirm new row in sheet tab `gid=699530367`.

4. If either fails, redeploy Apps Script with a new version and retest.

## Files Most Relevant

- `index.html`
- `testing.html`
- `waitlist_apps_script.gs`
- `vault-logo.png`
