(Stripe Documentation)[https://stripe.com/docs/payments/save-and-reuse?platform=web&ui=elements]



#### Custom Payment Flow - Use this integration to set up recurring payments or to create one-time payments with a
 final amount determined later, often after the customer receives your service.

1. Create a Customer - Server Side
const stripe = require('stripe')('sk_test_51HZCUYDYaqQmPGWxB2x4DNdkbPc0H6cet76GCOP4Q2ZtZ1jP4YiT7Pc8gFD3woAv07RinBUKp8jOThMZrZbbkp0b00vv6o0rbJ');
const customer = await stripe.customers.create();

2. Create a SetupIntent - Server Side
Create a SetupIntent with automatic_payment_methods enabled, the SetupIntent is created using the payment methods you configured 
in the Dashboard.
```js
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51HZCUYDYaqQmPGWxB2x4DNdkbPc0H6cet76GCOP4Q2ZtZ1jP4YiT7Pc8gFD3woAv07RinBUKp8jOThMZrZbbkp0b00vv6o0rbJ');

const setupIntent = await stripe.setupIntents.create({
  customer: '{{CUSTOMER_ID}}',
  automatic_payment_methods: {
    enabled: true,
  },
});
```
3. Retrieve the client secret from SetupIntent
Included in the returned SetupIntent is a client secret, which the client side uses to securely complete the payment process 
instead of passing the entire SetupIntent object. 
You can use different approaches to pass the client secret to the client side.

3.1 Retrieve the client secret from an endpoint on your server, using the browser’s fetch function. 
This approach is best if your client side is a single-page application, particularly one built with a 
modern frontend framework like React.

Create the server endpoint that serves the client secret:
```js
const express = require('express');
const app = express();

app.get('/secret', async (req, res) => {
  const intent = // ... Fetch or create the SetupIntent
  res.json({client_secret: intent.client_secret});
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
```
3.2 And then fetch the client secret with JavaScript on the client side:
```js
(async () => {
  const response = await fetch('/secret');
  const {client_secret: clientSecret} = await response.json();
  // Render the form using the clientSecret
})();
```

4. Collect Payment Details (Client Side)
You’re ready to collect payment details on the client with the Payment Element. 
The Payment Element is a prebuilt UI component that simplifies collecting payment details for a variety of payment methods.


4.1 Setup Stripe.json
```html
<head>
  <title>Checkout</title>
  <script src="https://js.stripe.com/v3/"></script>
</head>
```

4.2 Create an instance of Stripe on the Checkout page:
// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/apikeys
```js
const stripe = Stripe('pk_test_51HZCUYDYaqQmPGWxErmJFop9ZOv8fNYgRv8Kj55hlthvefQg6N8qnq1a2hfXh7pepZo5OK3Pobgjh4u1fsWNUl4000CAoZu1tS');
```
4.3 Add the Payment Element to your payment setup page
```html
<form id="payment-form">
  <div id="payment-element">
    <!-- Elements will create form elements here -->
  </div>
  <button id="submit">Submit</button>
  <div id="error-message">
    <!-- Display error message to your customers here -->
  </div>
</form>
<script>
const options = {
  clientSecret: '{{CLIENT_SECRET}}',
  // Fully customizable with appearance API.
  appearance: {/*...*/},
</script>
};
```
// Set up Stripe.js and Elements using the SetupIntent's client secret
const elements = stripe.elements(options);

// Create and mount the Payment Element
```js
const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');
```
- Note: Configure currency
When using SetupIntents with automatic_payment_methods, passing currency into options when creating the Elements provider, 
influences which payment methods are rendered by the Payment Element. 
Payment Element renders the payment methods enabled in the Stripe Dashboard that support the provided currency. 
See Payment method integration options for more details about what’s supported.

5. Submit the payment details to Stripe (Client Side)
Use stripe.confirmSetup to complete the setup using details collected by the Payment Element. 
Provide a return_url to this function so that Stripe can redirect the user after they complete setup. 
We may first redirect them to an intermediate site, like a bank authorization page, before redirecting them to the return_url.

If your customer saves their card details, we immediately redirect them to the return_url when setup is successful. 
If you don’t want to redirect for card payments, you can set redirect to if_required. 
This only redirects customers that check out with redirect-based payment methods.

```js
const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {error} = await stripe.confirmSetup({
    //`Elements` instance that was used to create the Payment Element
    elements,
    confirmParams: {
      return_url: 'https://example.com/account/payments/setup-complete',
    }
  });

  if (error) {
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Show error to your customer (for example, payment
    // details incomplete)
    const messageContainer = document.querySelector('#error-message');
    messageContainer.textContent = error.message;
  } else {
    // Your customer will be redirected to your `return_url`. For some payment
    // methods like iDEAL, your customer will be redirected to an intermediate
    // site first to authorize the payment, then redirected to the `return_url`.
  }
});
```
- Optional: You can use stripe.retrieveSetupIntent to retrieve the SetupIntent using the setup_intent_client_secret query parameter. 
Successful confirmation of the SetupIntent saves the resulting PaymentMethod ID (in result.setupIntent.payment_method) 
to the provided Customer.

// Initialize Stripe.js using your publishable key
const stripe = Stripe('{PUBLISHABLE_KEY}');

// Retrieve the "setup_intent_client_secret" query parameter appended to
// your return_url by Stripe.js
```js
const clientSecret = new URLSearchParams(window.location.search).get(
  'setup_intent_client_secret'
);
```
// Retrieve the SetupIntent
stripe.retrieveSetupIntent(clientSecret).then(({setupIntent}) => {
  const message = document.querySelector('#message')

  // Inspect the SetupIntent `status` to indicate the status of the payment
  // to your customer.
  //
  // Some payment methods will [immediately succeed or fail][0] upon
  // confirmation, while others will first enter a `processing` state.
  //
  // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
```js  
  switch (setupIntent.status) {
    case 'succeeded': {
      message.innerText = 'Success! Your payment method has been saved.';
      break;
    }

    case 'processing': {
      message.innerText = "Processing payment details. We'll update you when processing is complete.";
      break;
    }

    case 'requires_payment_method': {
      message.innerText = 'Failed to process payment details. Please try another payment method.';

      // Redirect your user back to your payment page to attempt collecting
      // payment again

      break;
    }
  }
});
```
------------
6 - Charge the saved payment method later (Server Side)
When you’re ready to charge your customer off-session, use the Customer and PaymentMethod IDs to create a PaymentIntent. 
To find a payment method to charge, list the payment methods associated with your customer. 
This example lists cards but you can list any supported type.

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
```js
const stripe = require('stripe')('sk_test_51HZCUYDYaqQmPGWxB2x4DNdkbPc0H6cet76GCOP4Q2ZtZ1jP4YiT7Pc8gFD3woAv07RinBUKp8jOThMZrZbbkp0b00vv6o0rbJ');

const paymentMethods = await stripe.paymentMethods.list({
  customer: '{{CUSTOMER_ID}}',
  type: 'card',
});
```
6.1 When you have the Customer and PaymentMethod IDs, create a PaymentIntent with the amount and currency of the payment. 
Set a few other parameters to make the off-session payment:
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
```js
const stripe = require('stripe')('sk_test_51HZCUYDYaqQmPGWxB2x4DNdkbPc0H6cet76GCOP4Q2ZtZ1jP4YiT7Pc8gFD3woAv07RinBUKp8jOThMZrZbbkp0b00vv6o0rbJ');

try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'aed',
    automatic_payment_methods: {enabled: true},
    customer: '{{CUSTOMER_ID}}',
    payment_method: '{{PAYMENT_METHOD_ID}}',
    off_session: true,
    confirm: true,
  });
} catch (err) {
  // Error code will be authentication_required if authentication is needed
  console.log('Error code is: ', err.code);
  const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
  console.log('PI retrieved: ', paymentIntentRetrieved.id);
}
```