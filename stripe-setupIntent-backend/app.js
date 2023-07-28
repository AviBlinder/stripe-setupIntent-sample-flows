import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

const app = express();

app.use(cors());

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const port = 4001;

// stripe-related endpoints
// get all customers
app.get('/stripe/v1/customers', async (req,res) => {
    try {
      const customers = await stripe.customers.list({
        limit: 100,
      })
      
      res.status(200).send(customers)
    } catch (error) {
      console.log ("/stripe/customers error" , error)
      res.status(500).send({error})
    }   
})
// get customer by customerId
app.get('/stripe/v1/customers/:id', async (req,res) => {
    const customerId = req.params.id
    try {
      const customer = await stripe.customers.retrieve(
        customerId
      );
      console.log('customer retrieved :', customer)
      res.status(200).send(customer)
    } catch (error) {
      console.log ("/stripe/customers error" , error)
      res.status(500).send({error})
    }   
})
        
app.get('/stripe/v1/setupintents/:id', async (req,res) => {
  try {
    const customerId = req.params.id;
    
    const setupIntents = await stripe.setupIntents.list({
      customer: customerId,
    });

    // List of SetupIntents associated with the customer
    console.log('SetupIntents:', setupIntents.data);
    // if (!SetupIntents) {
    //   res.status(404).send('not found');
    //   return
    // }

      res.status(200).send(setupIntents)

  } catch (error) {
    // Handle any errors that occur during the retrieval
    console.error('Error retrieving SetupIntents:', error.message);
  }

//

})

// 
app.post('stripe/v1/payment/create', async (request, response) => {
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

//create a new customer
app.post('stripe/v1/create-customer', async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,
    });
    res.status(201).json({ customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create a SetupIntent
app.post('stripe/v1/create-setup-intent', async (req, res) => {
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
