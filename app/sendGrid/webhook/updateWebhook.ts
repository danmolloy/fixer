require('dotenv').config();
const axios = require('axios');

const NGROK_API_URL = 'http://localhost:4040/api/tunnels';
const SENDGRID_API_KEY = process.env.AUTH_SENDGRID_KEY; 
const WEBHOOK_PATH = '/sendGrid/webhook'; 

async function updateSendGridWebhook() {
    try {
        const { data } = await axios.get(NGROK_API_URL);
        const ngrokUrl = data.tunnels[0]?.public_url;

        if (!ngrokUrl) {
            console.error('Ngrok URL not found. Make sure ngrok is running.');
            return;
        }

        const fullWebhookUrl = `${ngrokUrl}${WEBHOOK_PATH}`;

        await axios.patch(
            'https://api.sendgrid.com/v3/user/webhooks/event/settings',
            { url: fullWebhookUrl, enabled: true },
            { headers: { Authorization: `Bearer ${SENDGRID_API_KEY}`, 'Content-Type': 'application/json' } }
        );

        console.log(`✅ SendGrid webhook updated to: ${fullWebhookUrl}`);
    } catch (error) {
        console.error('❌ Failed to update SendGrid webhook:', error.response?.data || error.message);
    }
}

updateSendGridWebhook();