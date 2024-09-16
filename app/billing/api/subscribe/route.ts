import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      billing_address_collection: 'auto',
      mode: 'subscription',
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: process.env.SUBSCRIPTION_PRODUCT_ID as string,
          quantity: 1,
        },
      ],
      cancel_url: `${process.env.ORIGIN_URL}/billing/?canceled=true`,
      success_url: `${process.env.ORIGIN_URL}/?success=true`,
    };

    // Create a checkout session
    const session = await stripe.checkout.sessions.create(params);
    console.log(`session: ${JSON.stringify(session)}`);

    // Redirect the user to the Stripe checkout session URL
    return NextResponse.json({ url: session.url }); // `session.url` will never be null
  } catch (err) {
    console.error('Error creating checkout session:', err);

    // Return error response in case of failure
    return new NextResponse(
      JSON.stringify({ error: 'Unable to create checkout session' }),
      { status: 500 }
    );
  }
}
