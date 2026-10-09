RIFA BIRTHDAY WEBSITE — QUICK SETUP
====================================

FILES
- index.html: the website
- Code.gs: Google Apps Script that emails the answers to Athif and attaches a PDF
- 1.jpg, 2.jpg, 3.jpg, 4.jpg: your optional photos (you add these)

1) PERSONALIZE THE WEBSITE
Open index.html and check:
  const SISTER_NAME = "Rifa";
  const NICKNAME = "Itha";
  const YOUR_NAME = "Athif";
Add any photos in the same folder as index.html, named exactly:
  1.jpg
  2.jpg
  3.jpg
  4.jpg
You can use fewer than four. Missing photos automatically hide.

2) SET UP EMAIL + PDF
A. Open https://script.google.com/ and create a New project.
B. Replace the starter code with everything in Code.gs.
C. In Code.gs, change RECIPIENT_EMAIL to your Gmail address.
D. Create a long random secret, and replace CHANGE_THIS_SECRET_TO_A_LONG_RANDOM_VALUE in BOTH Code.gs and index.html with exactly the same value.
E. Click Deploy > New deployment > select type "Web app".
   - Execute as: Me
   - Who has access: Anyone
F. Click Deploy, authorize the requested permissions, and copy the Web app URL.
G. In index.html, replace PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE with that URL.
H. Save the file and redeploy/update your GitHub Pages website.

IMPORTANT: Email is sent only when Rifa taps “Send answers to Athif's Gmail”.
The website uses a browser POST to the Apps Script web app. Because no-cors mode is used, the page cannot verify delivery; test it yourself before the birthday. If automatic email doesn't arrive, she can tap “Save answers as a text file” and send the file manually.

3) PUBLISH ON GITHUB PAGES
- Create a public repository, e.g. rifa-birthday.
- Upload index.html and any photos (1.jpg etc.) into the repository root.
- Enable Settings > Pages > Deploy from a branch > main > /(root).
- The website URL will look like https://YOUR-USERNAME.github.io/rifa-birthday/

MUSIC
The website generates a soft, original little melody in the browser using Web Audio; no audio file is needed. She must tap “Open your little surprise” or “Turn music on” because phones usually block sound before a user interaction.

PRIVACY
The email script sends answers to the Gmail address you set. Avoid putting private secrets in a public repository. The shared secret in client-side JavaScript is not truly private because website visitors can inspect the code; it is only a basic spam barrier. For stronger protection, use a form service with server-side spam controls or require a sign-in. Do not collect sensitive information you do not need.
