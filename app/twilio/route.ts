import { NextResponse } from 'next/server';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export async function POST(
  request: Request & {
    body: {
      phoneNumber: string;
      message: string;
    };
  }
) {
  const req = await request.json();
  console.log(`Twilio req: ${JSON.stringify(req)}`);

  if (process.env.TWILIO_ACTIVE === 'false') {
    console.log(`Recieved at Twilio: ${JSON.stringify(req.message)}`);
    return NextResponse.json({ success: true }, { status: 201 });
  }

  try {
    const message = await client.messages.create({
      body: req.body.message,
      from: process.env.TWILIO_FROM_NUMBER,
      to:
        process.env.TWILIO_ACTIVE === 'preview'
          ? '+447479016386'
          : req.body.phoneNumber,
    });

    return NextResponse.json({ ...message, success: true }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'An unexpected error occurred', success: false },
      { status: 500 }
    );
  }
}
