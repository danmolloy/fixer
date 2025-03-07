import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../client';
import { EmailStatus } from '@prisma/client';

const eventStatusArr: EmailStatus[] = [
  'PROCESSED',
  'DROPPED',
  'DELIVERED',
  'DEFERRED',
  'BOUNCE',
  'OPENED',
  'CLICKED',
  'OPEN',
  'CLICK',
];

export async function POST(req: NextRequest) {
  try {
    let events;
    try {
      events = await req.json();
    } catch (e) {
      console.error('Invalid or empty JSON in webhook request');
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    for (const webhook of events) {
      const { contactMessageID, event, timestamp, app, environment } = webhook;
      if (
        app !== 'GigFix' ||
        environment !== process.env.ENVIRONMENT ||
        !contactMessageID ||
        !eventStatusArr.includes(event.toUpperCase() as EmailStatus)
      ) {
        continue;
      }

      await prisma.emailEvent.create({
        data: {
          status: event.toUpperCase() as EmailStatus,
          timestamp: new Date(timestamp),
          contactMessage: {
            connect: {
              id: Number(contactMessageID),
            },
          },
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing SendGrid webhook: ', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
