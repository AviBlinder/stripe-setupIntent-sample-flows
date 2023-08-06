import Stripe from 'stripe';

// @ts-ignore
const handler = async (event, context) => {
  // @ts-ignore
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  // @ts-ignore
  const stripe = new Stripe(STRIPE_SECRET_KEY);

  try {
    
    const customers = await stripe.customers.list({
      
      limit: 100,
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ customers }),

      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
        // "Access-Control-Allow-Methods": "GET, POST, OPTION",
      },
    };
  } catch (error) {
    console.log('/stripe/customers error', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};

export { handler };