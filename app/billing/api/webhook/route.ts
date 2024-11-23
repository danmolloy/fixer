const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { headers } from 'next/headers';
import Stripe from 'stripe';
import prisma from '../../../../client';
import { createSubscription, updateSubscription } from './lib';

// Update sub
// Delete sub

/* 
To listen to local events:
stripe listen --forward-to localhost:3000/billing/api/webhook
*/

export async function POST(request: Request): Promise<any> {
  /* console.log('Welcome to WebHook API!');
  let event: any = request.body;
  

  // Replace this endpoint secret with your endpoint's unique secret
  // If you are testing with the CLI, find the secret by running 'stripe listen'
  // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
  // at https://dashboard.stripe.com/webhooks
  
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse */
  const endpointSecret = process.env.ENDPOINT_SECRET;
  const body = await request.text();
  const headersObject = await headers();
  const signature = headersObject.get('Stripe-Signature') as string;

  let event: Stripe.Event;

  console.log(`signature: ${signature}`);
  try {
    event = stripe.webhooks.constructEvent(
      body,
      //request.body,
      signature,
      endpointSecret
    );
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return new Response();
  }

  let subscription;
  let status;
  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
      const customerSubscriptionCreated = event.data.object;
      console.log(`customer.subscription.created`);
      await createSubscription({
        ensembleID: customerSubscriptionCreated.metadata.ensembleID,
        subscriptionId: customerSubscriptionCreated.id,
        subscriptionStatus: customerSubscriptionCreated.status,
      });
      // Then define and call a function to handle the event customer.subscription.created
      break;
    case 'customer.subscription.updated':
      const subscriptionUpdated = event.data.object;
      console.log(`customer.subscription.updated`);
      await updateSubscription({
        subscriptionId: subscriptionUpdated.id,
        subscriptionStatus: subscriptionUpdated.status,
      });
    case 'customer.subscription.deleted':
      const subscriptionDeleted = event.data.object;
      console.log(`customer.subscription.updated`);
      await updateSubscription({
        subscriptionId: subscriptionDeleted.id,
        subscriptionStatus: subscriptionDeleted.status,
      });
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
  // Return a 200 response to acknowledge receipt of the event

  return new Response();
}
