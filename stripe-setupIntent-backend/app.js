import express, { Router } from 'express';
import serverless from 'serverless-http';

import bodyParser from 'body-parser';

import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

const app = express();

app.use(cors());

dotenv.config();

// create application/json parser
var jsonParser = bodyParser.json()

const router = Router();
app.use('/.netlify/functions/', router);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const port = 4001;

// stripe-related endpoints
// get all customers
app.get('/api/stripe/v1/customers', async (req, res) => {
  try {
    const customers = await stripe.customers.list({
      limit: 100,
    });

    res.status(200).send(customers);
  } catch (error) {
    console.log('/stripe/customers error', error);
    res.status(500).send({ error });
  }
});
// get customer by customerId
app.get('/api/stripe/v1/customers/:id', async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await stripe.customers.retrieve(customerId);
    // console.log('customer retrieved :', customer);
    res.status(200).send(customer);
  } catch (error) {
    console.log('/stripe/customers error', error);
    res.status(500).send({ error });
  }
});

app.get('/api/stripe/v1/payment_methods/:id', async (req, res) => {
  const customerId = req.params.id;

  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });
    // console.log('paymentMethods:', paymentMethods);
    res.status(200).send(paymentMethods);
  } catch (err) {
    console.log('error in /stripe/v1/payment_methods/:id', err);
    res.status(500).send(err);
  }
});

app.get('/api/stripe/v1/setupintents/:id', async (req, res) => {
  
  try {
    const customerId = req.params.id;

    const setupIntents = await stripe.setupIntents.list({
      customer: customerId,
    });

    // List of SetupIntents associated with the customer
    // if (!SetupIntents) {
    //   res.status(404).send('not found');
    //   return
    // }

    res.status(200).send(setupIntents);
  } catch (error) {
    // Handle any errors that occur during the retrieval
    console.error('Error retrieving SetupIntents:', error.message);
  }

  //
});

//
app.post('/api/stripe/v1/payment/create', jsonParser, async (request, response) => {
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
    response.status(200).send({ secret: paymentIntent.client_secret });
  } catch (err) {
    console.log('error :' + err);
    response.status(500).send('error :' + err);
  }
});

//create a new customer
app.post('/api/stripe/v1/create-customer', jsonParser, async (req, res) => {
  try {
    // console.log("req.headers ", req.headers)
    const customer = req.body.customer
    // console.log("inside create-customer ", customer)
    const customerExists = await searchCustomer(customer.email)
    if (customerExists.length === 0) {
      const currency = selectCurrency()
      const balance = selectBalance()
      const customerCreate = await stripe.customers.create({
        email: customer.email,
        name: customer.fullName,
        phone: customer.phone,
        address: customer.address,
        description: customer.fullName,
        balance: balance
      });
      res.status(201).json({ customerCreate });
    } else {
      console.log('customer already exists', customer.email);
      res.status(200).json({ customerExists });

    }
    // const customer = await stripe.customers.create({
    //   email: req.body.email,
    // });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const searchCustomer = async (email) => {
  const searchQuery = `email: '${email}' `
  try {
    const customerFound = await stripe.customers.search({
      query: searchQuery,
    }); 
    // console.log('search customer :', customerFound.data);
    return customerFound.data
  } catch (err) {
    console.log('search error :',err )
    return err
  }
    
  }

  const selectCurrency = () => {
    const currencies = ['usd', 'eur', 'aed', 'nis', 'egp', 'gbp','jpy',];
    let currency = currencies[Math.floor(Math.random() * currencies.length)]
    return currency
  }
  const selectBalance = () => {
    const balance = Math.floor(Math.random() * 1000);
    return balance
  }

// create a SetupIntent
app.post('/api/stripe/v1/create-setup-intent', jsonParser, async (req, res) => {
  try {
    const intent = await stripe.setupIntents.create({
      customer: req.body.customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(201).json({ intent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//api.use('/api/', router);

app.listen(port, () => {
  console.log('running on ' + port);
});

export const handler = serverless(app);
