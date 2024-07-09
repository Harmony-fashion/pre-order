const { google } = require('googleapis');
const sheets = google.sheets('v4');
const { GoogleAuth } = require('google-auth-library');
const auth = new GoogleAuth({
  keyFile: 'path/to/your/service-account-file.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

exports.handler = async (event, context) => {
  const { email, imageId } = JSON.parse(event.body);
  const authClient = await auth.getClient();
  const spreadsheetId = '15Gs1QYUTiHQDJP2f0ztKOd7vw-kA0tcG00cE1rQY-yI';
  const range = 'Sheet1!A1:D1'; // Adjust according to your sheet structure

  const request = {
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [[email, imageId]],
    },
    auth: authClient,
  };

  try {
    await sheets.spreadsheets.values.append(request);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Preorder successful!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error appending to Google Sheets.' }),
    };
  }
};
