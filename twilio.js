import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNTSID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 

const twilioClient = new twilio(
  accountSid,
  authToken
);

export { twilioClient };
