const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  console.log(`req: ${JSON.stringify(req)}`);
  //const { session_id } = await req.json();
  const session_id =
    'cs_test_a1IL5tWiJWyUl3lADbAXWTyeu66gUl80kmcSpTqyW1kTXLWy54RyGgPdbQ';
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = `${process.env.ORIGIN_URL}/`;
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });

    return Response.redirect(portalSession.url);
  } catch (err) {
    console.error(err);
    throw new Error('Unable to create checkout session.');
  }
}
