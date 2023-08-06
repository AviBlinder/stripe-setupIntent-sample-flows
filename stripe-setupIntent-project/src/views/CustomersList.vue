<template>
  <main class="viewSize">
    <div v-if="!loading">
      <Suspense>
        <CustomersTable 
        :users="users" 
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
    <div v-else> Loading customers ...</div>

  </main>
</template>

<script async setup lang="ts">
  import { ref, onMounted, inject, getCurrentInstance } from 'vue';

  import { useRouter, useRoute } from 'vue-router';
  const router = useRouter();
  const route = useRoute();
  
  const componentKey = ref(0);

  const forceRerender = () => {
    componentKey.value += 1;
  };

  // @ts-ignore
  import CustomersTable from '../components/CustomersTable.vue';

  import { type stripeUser, type Users } from '../types/customers';

  // @ts-ignore
  const users = ref<stripeUser | any>(null);
  const selectedCustomer = ref<Users | null>(null);
  const loading = ref(true);

  const updateUsers = async (event : any) => {
    users.value = Object.assign(event.value)
  }

   const customerDetails = () => {
      // @ts-ignore
      router.push(`/customers/${selectedCustomer.value.id}`);
    }
    const baseURL = inject('NETLIFY_FUNCTIONS_URL');

  onMounted(async () => {
    loading.value = true
    await loadCustomers()
    loading.value = false
  });

  //
//@ts-ignore
const loadCustomers = async () => {

  if (await localStorage.getItem('stripeCustomers') ) {
 
       const stripeCustomers = await localStorage.getItem('stripeCustomers')
      // @ts-ignore
      users.value = await JSON.parse(stripeCustomers)
    } else {
      const response = await fetch(`${baseURL}/getCustomers`)
      await response.json().then ( (data) => {
          users.value = data.customers.data;                   
           if (users.value) {
          localStorage.setItem('stripeCustomers', JSON.stringify(users.value));
          }
      })
    }
  }
</script>

<style scoped></style>
