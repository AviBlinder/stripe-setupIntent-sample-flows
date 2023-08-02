import Stripe from 'stripe';

exports.handler = async  (event, context) => {
  const STRIPE_SECRET_KEY = 
    'sk_test_51HZCUYDYaqQmPGWxB2x4DNdkbPc0H6cet76GCOP4Q2ZtZ1jP4YiT7Pc8gFD3woAv07RinBUKp8jOThMZrZbbkp0b00vv6o0rbJ'

  const stripe = new Stripe(STRIPE_SECRET_KEY);
  
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


  // console.log("event :", event)
    try {
      const customers = await stripe.customers.list({
        limit: 100,
      })
      console.log("hello customers :", customers)
      return {
        statusCode: 200,
        body: JSON.stringify({ customers: customers }),
  }
    } catch (error) {
      console.log('/stripe/customers error', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error }),
      };

    }
};
