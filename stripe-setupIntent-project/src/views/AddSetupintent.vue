<template>
  <main class="viewSize">
    <div>
      <!-- :to="{ name: 'customers' }" -->
      <router-link class="flex justify-center my-1 md:my-4" 
      :to="{ name: 'customer-details', params : {id: route.params.id} }">
        <button class="btn-sm md:btn">
          <i class="fa fa-user" aria-hidden="true"></i>
          Back to Customer
        </button>
      </router-link>

      <!-- <hr class="border-1 bg-secondary-300 my-2 mx-6 md:ml-10" /> -->

      <!-- Stripe Element -->
      <form id="payment-form" class="mx-6 my-3 md:my-4 md:ml-10 md:mt-5 md:max-w-[500px]">
        <div id="payment-element">
          <!-- Elements will create form elements here -->
        </div>
        <button class="btn m-4" @click.prevent="submitSetupIntent" id="submit">
          Submit
        </button>
        <div id="error-message">
          <!-- Display error message to your customers here -->
        </div>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
    import { ref , onMounted} from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const setupIntentSecret = ref({});

    // @ts-ignore
    let globalElements = null
    const customerId: string | any = route.params.id;
    console.log('customerId :', customerId);
    // @ts-ignore
    const BACKEND_BASE_URL: string = import.meta.env.VITE_BACKEND_BASE_URL;
    // @ts-ignore    
    const FRONTEND_BASE_URL: string = import.meta.env.VITE_BASE_URL;
    // @ts-ignore
    const stripe_publishable_key = import.meta.env.VITE_STRIPE_KEY;
    // @ts-ignore
    const stripe = Stripe(stripe_publishable_key);

    const submitSetupIntent = async () => {
  // SuccessSetupIntent
        console.log("submitSetupIntent")

    const {error} = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      // @ts-ignore
       elements: globalElements,
      confirmParams: {
        return_url: `${FRONTEND_BASE_URL}/SuccessSetupIntent`
      }
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      const messageContainer = document.querySelector('#error-message');
      // @ts-ignore
      messageContainer.textContent = error.message;
      // @ts-ignore      
      console.log("error : ", messageContainer.textContent)
    } else {
      return
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }
    const createSetupIntent = () => {
      console.log('customerId ', customerId);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId }),
      };
      try {
        fetch(`${BACKEND_BASE_URL}/stripe/v1/create-setup-intent`, requestOptions)
          .then((response) => {
            switch (response.status) {
              case 200:
                return response.json();
              case 201:
                return response.json();
              default:
                console.log('status other - ', response);
                break;
            }
          })
          .then((data) => {
            setupIntentSecret.value = data.intent.client_secret;
            console.log('data = ', setupIntentSecret.value);
    //
      const options = {
        clientSecret: setupIntentSecret.value,
        // Fully customizable with appearance API.
        // appearance: {/*...*/},
      };

      // Set up Stripe.js and Elements using the SetupIntent's client secret
      const elements = stripe.elements(options);
      globalElements = elements

      // Create and mount the Payment Element
      const paymentElement = elements.create('payment');
      paymentElement.mount('#payment-element');
      //
      });
      } catch (err) {
        console.log('setup Intent error - ', err);
      }
    }
    
    onMounted ( () => {
      createSetupIntent()
    })
  
</script>