import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const addMeterEvent = async (subscriptionID: string) => {
  console.log(`subID: ` + subscriptionID);
  const subscription = await stripe.subscriptions.retrieve(subscriptionID);

  const meterEvent = await stripe.billing.meterEvents.create({
    event_name: 'fixed_musician',
    payload: {
      value: '1',
      stripe_customer_id: String(subscription.customer),
    },
  });

  return meterEvent;
};
