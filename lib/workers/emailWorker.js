import { Worker } from 'bullmq';
import { redis } from '../redis.js';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

export const emailWorker = new Worker(
  'emailQueue',
  async (job) => {
    try {
      if (process.env.TWILIO_ACTIVE === 'false') {
        console.log('Email preview is not active.');
        return NextResponse.json({});
      }
      const emailData = {
        from: process.env.FROM_EMAIL,
        personalizations: [
          {
            to:
              process.env.TWILIO_ACTIVE === 'preview'
                ? 'danmolloy91@gmail.com'
                : job.data.emailAddress,
            dynamic_template_data: job.data.emailData,
          },
        ],
        template_id: job.data.templateID,
        customArgs: {
          contactMessageID: job.data.emailData.contactMessageID,
          environment: process.env.ENVIRONMENT,
          app: 'GigFix',
        },
      };
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      return await sgMail.send(emailData);
    } catch (e) {
      console.error(`Error sending email: ${e.message}`);
      throw e;
    }
  },
  { connection: redis }
);
