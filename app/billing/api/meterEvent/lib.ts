import Stripe from 'stripe';
import prisma from '../../../../client';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const addMeterEvent = async (data: {
  subscriptionId: string;
  contactMessageId: number;
}) => {
  try {

  const subscription = await stripe.subscriptions.retrieve(data.subscriptionId);
  
  const meterEvent = await stripe.billing.meterEvents.create({
    event_name: 'fixed_musician',
    payload: {
      value: '1',
      stripe_customer_id: String(subscription.customer),
    },
  });
  await createMeterEventLog({
    meterEvent: meterEvent,
    subscriptionId: data.subscriptionId,
    contactMessageId: data.contactMessageId
  });

  return meterEvent;
} catch (err) {
    // Optionally: notify admin/dev (e.g. Sentry, logging system)
    console.error('Failed to log meter event:', err);
    throw new Error('Meter event creation failed — please try again.');
  }
};

export const createMeterEventLog = async (data: {
  meterEvent: Stripe.Billing.MeterEvent;
  subscriptionId: string;
  contactMessageId: number;
}) => {
  return await prisma.meterEvent.create({
    data: {
      id: data.meterEvent.identifier,
      timestamp: data.meterEvent.timestamp,
      contactMessageId: data.contactMessageId,
      value: data.meterEvent.payload.value,
      subscriptionId: data.subscriptionId
    }
  })
 
};
