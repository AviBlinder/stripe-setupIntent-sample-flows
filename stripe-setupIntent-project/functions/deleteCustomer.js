import Stripe from 'stripe';

// @ts-ignore
const handler = async (event, context) => {
  // @ts-ignore
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  // @ts-ignore
  const stripe = new Stripe(STRIPE_SECRET_KEY);

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
      headers: { Allow: 'POST' },
    };
  }

  const data = JSON.parse(event.body);

  try {
    const deleted = await stripe.customers.del(data.id);
    if (deleted.deleted) {
      return {
        statusCode: 200,
        body: JSON.stringify({ deleted }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json',
        },
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
    };
  }

  //
};

export { handler };

//
