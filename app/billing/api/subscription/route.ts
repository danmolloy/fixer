import { NextResponse } from 'next/server';
import prisma from '../../../../client';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  try {
  const { subscriptionID } = await req.json();

  const subscription = await stripe.subscriptions.retrieve(subscriptionID);
  const invoices = await stripe.invoices.list({
    customer: String(subscription.customer),
  });

  const meterEvents = await prisma.meterEvent.findMany({
    where: { subscriptionId: subscriptionID },
    include: {
      contactMessage: {
        include: {
          contact: {
            select: {
              firstName: true,
              lastName: true
            }
          },
          eventSection: {
            select: {
              event: {
                select: {
                  eventTitle: true,
                  calls: {
                    select: {
                      startTime: true
                    }
                  }
                }
              },
              ensembleSection: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      },
    },
    orderBy: { timestamp: 'desc' },
  });

  return NextResponse.json({
    subscription,
    invoices,
    meterEvents,
  });

} catch (err) {
  console.error('API error:', err);
  return new NextResponse(
    JSON.stringify({ error: 'Unable to retrieve data.' }),
    { status: 500 }
  );
}
}
