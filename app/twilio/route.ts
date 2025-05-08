import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();
  console.log(`Twilio req: ${JSON.stringify(req)}`);

  if (process.env.TWILIO_ACTIVE === 'false') {
    console.log(`Received at Twilio: ${JSON.stringify(req.message)}`);
    return NextResponse.json({ success: true }, { status: 200 });
  }

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          Body: req.body.message,
          From: process.env.TWILIO_FROM_NUMBER!,
          To:
            process.env.TWILIO_ACTIVE === 'preview'
              ? '+447479016386'
              : req.body.phoneNumber,
        }),
      }
    );

    const data = await response.json();
    return NextResponse.json({ ...data, success: true }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'An unexpected error occurred', success: false },
      { status: 500 }
    );
  }
}