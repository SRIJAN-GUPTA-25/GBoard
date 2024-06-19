const { google } = require('googleapis');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const key = JSON.parse(process.env.GOOGLE_CLOUD_KEY);

const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/indexing']
);

const indexer = google.indexing('v3');

async function updateUrl(url) {
    await jwtClient.authorize();

    const request = {
        auth: jwtClient,
        resource: {
            "url": url,
            "type": "URL_UPDATED"
        }
    };

    try {
        const response = await indexer.urlNotifications.publish(request);
        console.log('URL Updated:', response.data);
    } catch (error) {
        console.error('Error updating URL:', error);
    }
}

async function deleteUrl(url) {
    await jwtClient.authorize();

    const request = {
        auth: jwtClient,
        resource: {
            "url": url,
            "type": "URL_DELETED"
        }
    };

    try {
        const response = await indexer.urlNotifications.publish(request);
        console.log('URL Deleted:', response.data);
    } catch (error) {
        console.error('Error deleting URL:', error);
    }
}

module.exports = { updateUrl, deleteUrl };

