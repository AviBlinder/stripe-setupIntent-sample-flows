import Stripe from 'stripe';

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

const searchCustomer = async (email) => {
    const searchQuery = `email: '${email}' `;
    try {
      const customerFound = await stripe.customers.search({
        query: searchQuery,
      });
      return customerFound.data;
    } catch (err) {
      console.log('search error :', err);
      return err;
    }
  };



  try {
    const data = JSON.parse(event.body);
    console.log('data = ', data);

    const customer = data.customer;
    const customerExists = await searchCustomer(customer.email);

    if (customerExists.length === 0) {
            return {
              statusCode: 404,
              body: JSON.stringify({ customerExists }),
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json',
              },
            };

    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ customerExists }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json',
        },
      };
    }
    // const customer = await stripe.customers.create({
    //   email: req.body.email,
    // });
  } catch (error) {
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
};
export { handler };

//
