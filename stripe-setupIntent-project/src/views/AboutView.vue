<template>
  <main class="viewSize">
    <div class="m-2"></div>
    <div
      class="max-w-sm md:max-w-xl mx-4 p-1 text-sm md:text-md 
      font-sans font-light tracking-wide md:tracking-normal text-left align-baseline"
    >
      <div class="leading-6">
        <div>
          <p
            class="text-2xl tracking-tight text-left align-middle text-secondary-700 ml-4"
          >
            About Stripe's Setup Intent
          </p>
        </div>
        <div>
          <p class="my-2">
            <span>&#10003;</span>
            A
            <span class="text-secondary-600 font-semibold"
              >Stripe Setup Intent </span
            >is a mechanism provided by
            <a class="text-blue-600" href="https://stripe.com" target="_blank">
              Stripe</a
            >, a popular online payments processing platform, to securely
            collect and manage payment information from customers for future
            use.
          </p>
          <p class="my-2">
            <span>&#10003;</span>
            It's particularly useful in scenarios where you want to set up a
            payment method (usually a credit card) for a customer but you don't
            want to immediately charge them. This is common in scenarios like
            subscription-based services or marketplaces.
          </p>
        </div>
        <div class="my-4">
          <p>
            <span>&#10003;</span>
            A Setup Intent represents the process of setting up a payment method
            for future use. It's often used to create and confirm the
            association of a payment method with a customer's account, ensuring
            that the payment method is valid and can be charged later when
            needed.
          </p>
        </div>
      </div>
      <div class="bg-slate-200 p-2 rounded-xl">
        <div class="py-2 font-bold tracking-tight text-secondary-900">
          <p class="text-center">
            Here's how the basic flow of a Setup Intent works
          </p>
        </div>

        <div class="mx-2 mt-2">
          <span class="font-semibold tracking-tight text-secondary-900"
            >1. Create Setup Intent:</span
          >
          <p class="p-2">
            You create a Setup Intent on the Stripe server, specifying the
            customer ID and payment method details. This will initiate the
            process of setting up the payment method.
          </p>
        </div>
        <div class="mx-2 my-2">
          <span class="font-semibold tracking-tight text-secondary-900"
            >2. Confirm Setup Intent:
          </span>
          <p class="p-2">
            You use the client-side Stripe.js library to confirm the Setup
            Intent. This involves validating the payment method (usually through
            authentication, like a one-time code sent to the cardholder),
            confirming its validity, and attaching it to the customer's account.
          </p>
        </div>
        <div class="mx-2 my-2">
          <span class="font-semibold text-secondary-900 tracking-tight"
            >3. Use Setup Intent for Payments:</span
          >
          <p class="p-2">
            After the Setup Intent is confirmed, the payment method is now
            associated with the customer's account. You can use it to make
            future payments on their behalf, whether it's for a subscription, a
            one-time charge, or any other payment scenario.
          </p>
        </div>
      </div>

      <div class="my-4 border-l-2 border-secondary-400">
        <p class="p-2 leading-6">
          This approach is more secure and user-friendly compared to directly
          collecting credit card information. The customer's sensitive
          information is collected and validated by Stripe without ever being
          transmitted through your server.
        </p>
      </div>
    </div>
  </main>
</template>

<style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>
