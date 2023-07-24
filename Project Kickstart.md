# Frontend Project: checkout-page-with-vue-stripe-express
## Start new Vue 3 app:
~~~sh
npm init vue@latest stripe-setupIntent-basic-flows
cd <project>
npm install
npm run dev
~~~

* (optional) - configure vite.config.ts:
```js
  server: {
    port: 3005
  },

```

##Adding Tailwindcss to the new / existing project:
[tailwind setup](https://v2.tailwindcss.com/docs/guides/vue-3-vite)
```sh
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

- add the following to tailwind.config.js file:
```js
  //  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
     content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],

```
- Include Tailwind in your CSS
```js
/* ./src/index.css */
@tailwind base;
@tailwind components;
.btn {
  @apply rounded-lg bg-blue-500 p-2 m-2
}
@tailwind utilities;
```
- link index.css to main.js:
```js
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
...
```

## Add stripe script to index.html:
~~~js
    <script src="https://js.stripe.com/v3"></script>
~~~
[Stripe Elements Documentation](https://stripe.com/docs/js/elements_object/)

## Setup .env file + import variables + Initialize Stripe object:
### Important: make sure .env file is included in **.gitignore** file so it is not propagated
.env file:
~~~ 
VITE_STRIPE_KEY=pk_test...
VITE_STRIPE_PRICE=price_1NWDvtDYaqQmPGWxskCrmJsc
VITE_BASE_URL=http://localhost:3000
~~~

And import in Component:
``` js
      stripe = Stripe(import.meta.env.VITE_STRIPE_KEY);

```


### calling a backend REST API using await fetch():
```js
      try {
        const response = await fetch("http://localhost:4001/stripe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ amount: 1999 })
        });
        const { secret } = await response.json();
        console.log("secret", secret);

        const paymentMethodReq = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: billingDetails
        });


```

### Deconstructing a Form's input with Object.fromEntries and FormData
* Object.fromEntries converts a key-value instansce (such as a Map()) into an Object.
* FormData() The FormData interface provides a way to construct a set of key/value pairs representing form fields and their values.

```js
      const { name, email, address, city, state, zip } = Object.fromEntries(
        new FormData(event.target)
      );

```

## Backend Project - Create a Backend Express Server - in a parallel level to the F.E. project:
~~~sh
npm init 
...
entry point: app.js
```
```sh
npm i cors dotenv express nodemon stripe
```

#### In package.json, add the following
```js
  "scripts": {
    "start": "nodemon --watch app.js",
  },
  "type": "module",
~~~

### Basic app.js setup:
```js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Stripe from 'stripe';

const app = express()

app.use(cors())

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const port = 4001

app.get('/',(req,res) => {
  res.status(200).send('Hello Stripe World')
}),


app.get('/products',(req,res) => {
  res.status(200).send  ('Hello Stripe Products')
})

app.listen(port, () => {
  console.log("running on " + port)
})
```

## add .env file with STRIPE_SECRET_KEY + define .env in .gitignore
### 

Once the express file is setup, run:
```sh
npm start
```


In order to test the webhook, we can expose it with:
[Localtunnel](https://theboroer.github.io/localtunnel-www/)

```
npm install -g localtunnel
lt --port 4001 
```
Use same port as the one exposed by express on App.js