import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const addMeterEvent = async (subscriptionID: string) => {
  console.log("Adding meter event.");
  const subscription = await stripe.subscriptions.retrieve(subscriptionID);

  const meterEvent = await stripe.billing.meterEvents.create({
    event_name: 'fixed_musician',
    payload: {
      value: '1',
      stripe_customer_id: String(subscription.customer),
    },
  });
  //await addInvoiceItem(subscriptionID);

  return meterEvent;
};

export const addInvoiceItem =  async (subscriptionID: string) => {
  console.log("Adding invoice item.");
  const subscription = await stripe.subscriptions.retrieve(subscriptionID);

  const invoiceItem = await stripe.invoiceItems.create({
    customer: String(subscription.customer),
    price: process.env.FIXING_BILL_PRICE_ID,
    metadata: {
      event: "Mock Event",
      musician: "Tony Hawk"
    }
  })

  return invoiceItem;
}
