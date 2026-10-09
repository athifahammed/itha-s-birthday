// Rifa birthday answers mailer — Google Apps Script
// 1) Replace RECIPIENT_EMAIL with Athif's Gmail address.
// 2) Set the same long random secret in index.html and below.
// 3) Deploy > New deployment > Web app > Execute as: Me > Who has access: Anyone.
// Keep the Web App URL private; do not publish it elsewhere.
const RECIPIENT_EMAIL = "PUT_ATHIFS_GMAIL_ADDRESS_HERE";
const SHARED_SECRET = "CHANGE_THIS_SECRET_TO_A_LONG_RANDOM_VALUE";

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (data.secret !== SHARED_SECRET) {
      return ContentService.createTextOutput("Unauthorized");
    }
    const sister = clean(data.sisterName || "Rifa");
    const nickname = clean(data.nickname || "Itha");
    const sender = clean(data.senderName || "Athif");
    const completedAt = clean(data.completedAt || new Date().toLocaleString());
    const answers = Array.isArray(data.answers) ? data.answers : [];
    const plain = [
      "A LITTLE LETTER FROM " + sister + " (" + nickname + ")",
      "Birthday surprise answers",
      "Completed: " + completedAt,
      "",
      ...answers.flatMap((item, i) => [(i + 1) + ". " + clean(item.question || "Question"), clean(item.answer || "No answer"), ""])
    ].join("\n");

    const safeAnswers = answers.map((item, i) =>
      "<section><h3>" + (i + 1) + ". " + escapeHtml(item.question || "Question") +
      "</h3><p>" + escapeHtml(item.answer || "No answer").replace(/\n/g, "<br>") + "</p></section>"
    ).join("");
    const html = '<html><head><meta charset="utf-8"><style>' +
      'body{font-family:Arial,sans-serif;color:#493743;padding:28px;line-height:1.6}' +
      'h1{color:#b96783}h3{font-size:15px;color:#80516e;margin-bottom:5px}' +
      'section{border-bottom:1px solid #efdfe6;padding:8px 0}p{white-space:normal}' +
      '</style></head><body><h1>Rifa’s Birthday Answers 💗</h1>' +
      '<p>From the birthday surprise website · ' + escapeHtml(completedAt) + '</p>' +
      safeAnswers + '<p>Made with love by ' + escapeHtml(sender) + ' ♡</p></body></html>';
    const pdf = Utilities.newBlob(html, "text/html", "rifa-answers.html")
      .getAs("application/pdf").setName("Rifa-birthday-answers.pdf");
    GmailApp.sendEmail(RECIPIENT_EMAIL,
      "💌 Rifa's birthday website answers",
      plain + "\n\nA formatted PDF of the answers is attached.",
      {htmlBody: html, attachments: [pdf], name: "Rifa's Birthday Surprise"});
    return ContentService.createTextOutput("OK");
  } catch (err) {
    console.error(err);
    return ContentService.createTextOutput("Error");
  }
}

function clean(value) {
  return String(value == null ? "" : value).slice(0, 5000);
}
function escapeHtml(value) {
  return clean(value).replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
