<template>
  <main class="viewSize">
    <div class="ml-5">
      <Suspense>
        <CustomersTable 
        :users?="users" 
        @update:modelValue='updateUsers'
        v-model="users"
        />
      </Suspense>
     <div>
        <div v-if="selectedCustomer">
          <button
            @click="customerDetails"
            class="m-4 p-2 btn text-2xl md:texl-lg"
          >
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

<script async setup lang="ts">
  import { ref, onMounted, inject, getCurrentInstance } from 'vue';

  import { useRouter, useRoute } from 'vue-router';

  const componentKey = ref(0);

  const forceRerender = () => {
    componentKey.value += 1;
  };

  // @ts-ignore
  import CustomersTable from '../components/CustomersTable.vue';

  // import { getToken } from '../utils/ExchangeCodeWithJWT.js'
  // const { userData } = getToken()

  const router = useRouter();
  const route = useRoute();

  import { type Users } from '../types/customers';

  // @ts-ignore
  const users = ref({});
  const selectedCustomer = ref<Users | null>(null);
  const loading = ref(true);

  const style = '';
  const JWT = ref('');

  const updateUsers = async (event : any) => {
    users.value = Object.assign(event.value)
  }
  onMounted(async () => {
    // To Do:
    // make call to obtain JWT based on returned code from backend
    //
    // @ts-ignore
    const stripePublicKey: string = import.meta.env.VITE_STRIPE_KEY;
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

  //
//@ts-ignore
let getCustomers = ref<object | null>(null)



  if (localStorage.getItem('stripeCustomers') ) {
    // @ts-ignore
    const stripeCustomers = localStorage.getItem('stripeCustomers')
    // @ts-ignore
    users.value = JSON.parse(stripeCustomers)
    // @ts-ignore    
  } else {

    // fetch(`${BACKEND_BASE_URL}/stripe/v1/customers`)
    fetch(`${inject('NETLIFY_FUNCTIONS_URL')}/getCustomers`)
      .then((response) => response.json())
      .then((data) => {
        getCustomers.value = data;
        // @ts-ignore
        users.value = getCustomers.value.customers.data;
        localStorage.setItem('stripeCustomers', JSON.stringify(users.value));
      });
  }

  const customerDetails = () => {
    // @ts-ignore
    router.push(`/customers/${selectedCustomer.value.id}`);
  };
</script>

<style scoped></style>
