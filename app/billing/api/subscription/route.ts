import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  const { subscriptionID } = await req.json();

  const subscription = await stripe.subscriptions.retrieve(subscriptionID);
  const invoices = await stripe.invoices.list({
    customer: String(subscription.customer),
  });

  try {
    return NextResponse.json({ subscription, invoices });
  } catch (err) {
    console.error(err);
    throw new Error('Unable to retrieve data.');
  }
}
