const fs = require('fs');
const { google } = require('googleapis');
const axios = require('axios');
const path = require('path');

// Determine the absolute path to the credentials file
const credentialsPath = path.resolve(__dirname, './mainDrive.json');

// Check if the credentials file exists
if (!fs.existsSync(credentialsPath)) {
  console.error('Credentials file not found:', credentialsPath);
  process.exit(1); // Exit the process with an error code
}

// Load client secrets from the credentials file
const CREDENTIALS = JSON.parse(fs.readFileSync(credentialsPath));

// Scopes for Google Drive API
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// Create an OAuth2 client with the given credentials
const auth = new google.auth.GoogleAuth({
  credentials: CREDENTIALS,
  scopes: SCOPES,
});

// Get the authenticated client
const drive = google.drive({ version: 'v3', auth });

/**
 * Upload base64 image to Google Drive
 * @param {string} base64Image - Base64 encoded image string
 * @param {string} fileName - Name of the file to be uploaded
 * @returns {Promise<string>} - URL of the uploaded file
 */
async function uploadBase64Image(base64Image, fileName) {
  try {
    // Remove data URL prefix if present
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

    // Decode base64 string to a buffer
    const buffer = Buffer.from(base64Data, 'base64');

    // Create a readable stream from the buffer
    const stream = require('stream');
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    // Upload the file to Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: 'image/png', // Adjust the mime type based on your image format
      },
      media: {
        mimeType: 'image/png',
        body: bufferStream,
      },
      fields: 'id',
    });

    const fileId = response.data.id;

    // Make the file publicly accessible
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Log the direct Google Drive file URL
    const fileUrl = `https://drive.google.com/file/d/${fileId}/view`;
    console.log('File URL:', fileUrl);

    // Also log the viewable image URL
    const viewableUrl = `https://drive.google.com/uc?id=${fileId}&export=view`;
    console.log('Viewable Image URL:', viewableUrl);

    return viewableUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

module.exports = uploadBase64Image;
// const fs = require('fs');
// const { google } = require('googleapis');
// const axios = require('axios');
// const path = require('path');

// // Determine the absolute path to the credentials file
// const credentialsPath = path.resolve(__dirname, './mainDrive.json');

// // Check if the credentials file exists
// if (!fs.existsSync(credentialsPath)) {
//   console.error('Credentials file not found:', credentialsPath);
//   process.exit(1); // Exit the process with an error code
// }

// // Load client secrets from the credentials file
// const CREDENTIALS = JSON.parse(fs.readFileSync(credentialsPath));

// // Scopes for Google Drive API
// const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// // Create an OAuth2 client with the given credentials
// const auth = new google.auth.GoogleAuth({
//   credentials: CREDENTIALS,
//   scopes: SCOPES,
// });

// // Get the authenticated client
// const drive = google.drive({ version: 'v3', auth });

// /**
//  * Upload base64 image to Google Drive
//  * @param {string} base64Image - Base64 encoded image string
//  * @param {string} fileName - Name of the file to be uploaded
//  * @returns {Promise<string>} - URL of the uploaded file
//  */
// async function uploadBase64Image(base64Image, fileName) {
//   try {
//     // Remove data URL prefix if present
//     const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

//     // Decode base64 string to a buffer
//     const buffer = Buffer.from(base64Data, 'base64');

//     // Create a readable stream from the buffer
//     const stream = require('stream');
//     const bufferStream = new stream.PassThrough();
//     bufferStream.end(buffer);

//     // Upload the file to Google Drive
//     const response = await drive.files.create({
//       requestBody: {
//         name: fileName,
//         mimeType: 'image/png', // Adjust the mime type based on your image format
//       },
//       media: {
//         mimeType: 'image/png',
//         body: bufferStream,
//       },
//       fields: 'id',
//     });

//     const fileId = response.data.id;

//     // Make the file publicly accessible
//     await drive.permissions.create({
//       fileId,
//       requestBody: {
//         role: 'reader',
//         type: 'anyone',
//       },
//     });

//     // Log the direct Google Drive file URL
//     const fileUrl = `https://drive.google.com/file/d/${fileId}/view`;
//     console.log('File URL:', fileUrl);

//     // Also log the viewable image URL
//     const viewableUrl = `https://drive.google.com/uc?id=${fileId}&export=view`;
//     console.log('Viewable Image URL:', viewableUrl);

//     return viewableUrl;
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     throw error;
//   }
// }

// async function deleteFile(fileUrl) {
//   try {
//     // Extract file ID from the URL
//     const fileId = fileUrl.match(/id=([^&]+)/)[1];

//     // Delete the file
//     await drive.files.delete({
//       fileId: fileId,
//     });

//     console.log(`File with ID ${fileId} has been deleted.`);
//     return true;
//   } catch (error) {
//     console.error('Error deleting file:', error);
//     throw error;
//   }
// }

// module.exports = { uploadBase64Image, deleteFile };
