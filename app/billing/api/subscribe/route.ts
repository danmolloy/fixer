import { redirect } from 'next/dist/server/api-utils';
import Stripe from 'stripe';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request, res: Response) {
  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: process.env.SUBSCRIPTION_PRODUCT_ID,
          quantity: 1,
        },
      ],
      cancel_url: `${process.env.ORIGIN_URL}/?canceled=true`,
      success_url: `${process.env.ORIGIN_URL}/?success=true`,
    };
    const session = await stripe.checkout.sessions.create(params);
    console.log(`session: ${JSON.stringify(session)}`);
    return Response.redirect(session.url);
  } catch (err) {
    console.error(err);
    throw new Error('Unable to create checkout session.');
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: process.env.DONTATION_PRODUCT_ID,
          quantity: 1,
        },
      ],
      cancel_url: `${process.env.ORIGIN_URL}/?canceled=true`,
      success_url: `${process.env.ORIGIN_URL}/?success=true`,
    };
    const session = await stripe.checkout.sessions.create(params);
    console.log(`session: ${JSON.stringify(session)}`);
    return Response.redirect(session.url);
  } catch (err) {
    console.error(err);
    throw new Error('Unable to create checkout session.');
  }
}
