import Stripe from 'stripe';

// @ts-ignore
const handler = async (event, context) => {
  console.log('inside updateCustomerDefaultCC' , event.body)
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

  const body = JSON.parse(event.body);
  console.log('payment_id =', body.id);
  customer = body.customer
  payment_id = body.id
  
  try {
    const response = await stripe.customers.update(
      customer, {
        invoice_settings : {default_payment_method : payment_id}
      }
    );

    if (response) {
      return {
        statusCode: 200,
        body: JSON.stringify({ response }),
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
