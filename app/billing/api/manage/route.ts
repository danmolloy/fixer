import { NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  const { subscriptionID, ensembleID } = await req.json();
  console.log(JSON.stringify(subscriptionID));
  const subscription = await stripe.subscriptions.retrieve(subscriptionID);

  const returnUrl = process.env.ORIGIN_URL;

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.customer,
      return_url: returnUrl,
      
    });

    return NextResponse.json({ url: portalSession.url }); 

  } catch (err) {
    console.error(err);
    throw new Error('Unable to create checkout session.');
  }
}
