function doPost(e) {
  var SPREADSHEET_ID = "13li-e7Q-SEGSXLPHt6abpe5tJJLWl7hI4GF1HuVQ7Ig";
  var ANDROID_GID = 0;
  var IOS_GID = 699530367;

  try {
    var params = e.parameter || {};
    var email = (params.email || "").trim();
    var platform = (params.platform || "").toLowerCase();
    var source = params.source || "";
    var page = params.page || "";
    var submittedAt = params.submittedAt || new Date().toISOString();

    if (!email) {
      return jsonResponse({ ok: false, error: "Missing email" });
    }

    var gid = platform === "ios" ? IOS_GID : ANDROID_GID;
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = getSheetByGid(ss, gid);

    if (!sheet) {
      return jsonResponse({ ok: false, error: "Target sheet not found for gid " + gid });
    }

    sheet.appendRow([new Date(), email, platform, source, page, submittedAt]);

    return jsonResponse({ ok: true, message: "Saved" });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function getSheetByGid(ss, gid) {
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === gid) {
      return sheets[i];
    }
  }
  return null;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
