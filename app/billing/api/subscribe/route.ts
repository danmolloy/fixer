import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const { ensembleID } = await req.json();

  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      billing_address_collection: 'auto',
      mode: 'subscription',
      line_items: [
        {
          price: process.env.FIXING_BILL_PRICE_ID as string,
        },
      ],
      cancel_url: `${process.env.ORIGIN_URL}/ensembles/${ensembleID}/?canceled=true`,
      success_url: `${process.env.ORIGIN_URL}/ensembles/${ensembleID}/?success=true`,
      subscription_data: {
        metadata: {
          ensembleID: ensembleID
        }
      }
    };

    // Create a checkout session
    const session = await stripe.checkout.sessions.create(params);

   return NextResponse.json({ url: session.url }); 
  } catch (err) {
    console.error('Error creating checkout session:', err);

    // Return error response in case of failure
    return new NextResponse(
      JSON.stringify({ error: 'Unable to create checkout session' }),
      { status: 500 }
    );
  }
}
