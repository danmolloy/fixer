import { NextResponse } from 'next/server';
import { SentEmailData } from './playerLib';
const sgMail = require('@sendgrid/mail');

export async function POST(
  request: Request & {
    body: {
      emailData: SentEmailData;
      templateID: string;
      emailAddress: string | string[];
    };
  }
) {
  const req = await request.json();

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
            : req.body.emailAddress,
        dynamic_template_data: req.body.emailData,
      },
    ],
    template_id: req.body.templateID,
  };
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const data = await sgMail.send(emailData);
    return NextResponse.json({ ...data, success: true }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'An unexpected error occurred', success: false },
      { status: 500 }
    );
  }
}
