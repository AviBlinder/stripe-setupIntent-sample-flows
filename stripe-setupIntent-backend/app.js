import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

const app = express();

app.use(cors());

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const port = 4001;

app.get('/', (req, res) => {
  res.status(200).send('Hello Stripe World');
}),

app.get('/products', (req, res) => {
    res.status(200).send('Hello Stripe Products');
});

// stripe-related endpoints
app.post('/payment/create', async (request, response) => {
  console.log('inside POST /stripe', request.header);
  // just getting the amount from the request is a BAD PRACTICE since it can be
  // hacked. It is better to fetch the price by some other property
  const { amount } = request.body;

  try {
    console.log('inside try stripe.paymentIntents.create', amount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'USD',
      description: 'Buy Product',
    });
    console.log('client_secret =', paymentIntent.client_secret);
    response.status(200).send({ secret: paymentIntent.client_secret });
  } catch (err) {
    console.log('error :' + err);
    response.status(500).send('error :' + err);
  }
});

// Route to create a new customer
app.post('/create-customer', async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,
    });
    res.status(201).json({ customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to create a SetupIntent
app.post('/create-setup-intent', async (req, res) => {
  try {
    const intent = await stripe.setupIntents.create({
      customer: req.body.customerId,
    });
    res.status(201).json({ intent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 
app.listen(port, () => {
  console.log('running on ' + port);
});
