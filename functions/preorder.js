require('dotenv').config();
const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

exports.handler = async (event, context) => {
  try {
    const { email, imageId } = JSON.parse(event.body);
    // Handle email and imageId data
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data parsed successfully' }),
    };
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON data' }),
    };
  }
};


  const { email, imageId } = JSON.parse(event.body);

  const auth = new GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:B', // Adjust range as needed
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[email, imageId]],
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Preorder successful!' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error processing your preorder' }),
    };
  }
};
