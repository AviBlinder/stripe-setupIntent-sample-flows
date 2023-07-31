<template>
  <main class="viewSize">
  <!-- <main class="container text-white max-w-full"> -->
    <div>
      <UsersTable :users="users" />

      <div>
        <div v-if="selectedCustomer">
          <button @click="customerDetails" class="m-4 p-2 btn">
            See Customer details
          </button>
        </div>
        <!-- go to specific customer's details -->
      </div>
    </div>
    <div>
      <!-- create new customer -->
    </div>
    <div>
      <!-- create setupIntent (e.g. add payment method to customer) -->
    </div>

    <div id="stripe-element-mount-point" class="hidden"></div>
  </main>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import type { Ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  import UsersTable from '@/components/UsersTable.vue';

  // import { getToken } from '../utils/ExchangeCodeWithJWT.js'
  // const { userData } = getToken()

  const router = useRouter();
  const route = useRoute();

  import { type Users } from '../types/customers';

  const users: Ref<Users | null> = ref(null);
  const selectedCustomer : Ref<Users | null> = ref(null);
  const loading = ref(true);

  // @ts-ignore
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const style = '';
  const JWT = ref('');

  onMounted(async () => {
    //
    // make call to obtain JWT based on returned code from backend
    //
    // @ts-ignore
    const stripePublicKey : string = import.meta.env.VITE_STRIPE_KEY
    const ELEMENT_TYPE = 'card';
    // const ELEMENT_TYPE = "payment";
    // stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

    // @ts-ignore
    const stripe = Stripe(stripePublicKey);

    //stripe.elements is the stripe's Iframe
    const elements = stripe.elements();
    const element = elements.create(ELEMENT_TYPE, style);
    element.mount('#stripe-element-mount-point');
    loading.value = false;
  });

  // fetch('https://reqres.in/api/users')
  fetch(`${BACKEND_BASE_URL}/stripe/v1/customers`)
    .then((response) => response.json())
    .then((res2) => {
      users.value = res2.data;
      console.log(users.value);
    });

  const customerDetails = () => {
    // @ts-ignore
    router.push(`/customers/${selectedCustomer.value.id}`);
  };
</script>

<style scoped></style>
