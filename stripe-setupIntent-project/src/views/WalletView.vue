<template>
  <main class="viewSize">
    <div class="flex flex-row md:flex-row align-middle justify-center m-2 md:m-4">
      <router-link :to="{ name: 'customer-details', params: { id: route.params.id } }">
        <button class="btn-sm md:btn">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
          Back to Customer
        </button>
      </router-link>

      <router-link :to="{ name: 'customers' }">
        <button class="btn-sm md:btn">
          <i class="fa fa-user" aria-hidden="true"></i>
          Back to Customers List
        </button>
      </router-link>
    </div>
    <div class="flex md:flex-row sm:flex-col gap-4">
      <div v-if="loaded">
        <div v-if="setup_intents.length" class="mb-3 md:mb-3">
          <ul v-for="(intent, index) in setup_intents" :key="index">
            <hr class="bg-secondary-200 border-200 max-w-md my-1 ml-2 md:my-4" />
            <!-- Credit Card start -->
            <div class="bg-white min-h-full flex justify-center items-center ml-4 md-ml-4
            ">
              <div class="space-y-16">
                <div
                  class="w-96 h-1/2 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
                  <img class="relative object-cover w-full h-full opacity-70 rounded-xl"
                    src="https://i.imgur.com/kGkSg1v.png" />
                  <div class="w-full px-6 absolute top-2 
                  text-md font-medium leading-6 tracking-tight text-slate-700">
                    <div class="flex flex-row mt-3 ">
                      <div class="flex flex-col justify-start min-w-max -translate-x-1">
                        <p class="">Name</p>
                        <p class=" ">
                          {{ route.query.name }}
                        </p>
                      </div>
                      <div class="flex justify-end bg-amber-500/60 p-4  md:mx-6 rounded-xl 
                      translate-x-10 md:translate-x-10">
                        <span>
                          {{ intent.card.brand }}
                        </span>
                      </div>
                    </div>
                    <div class="mt-6 md:mt-5">
                      <div class="pt-1 md:pt-4 pr-6 flex flex-col justify-end ">
                        <div class="flex justify-between">
                          <div class="flex justify-start flex-col align-baseline">
                            <p class="">Expiry</p>
                            <p class="">
                              {{ intent.card.exp_month }} /
                              {{ intent.card.exp_year }}

                            </p>
                          </div>
                          <div class="md:pt-1 ml-7 flex justify-end flex-col align-baseline ">
                            <p class="">Last Digits</p>
                            <div class="flex justify-end">

                              <p class="">
                                *** {{ intent.card.last4 }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-evenly flex-row align-baseline my-2">
              <button @click="setDefaultCC(intent.customer, intent.id)" class="btn bg-slate-400 hover:bg-slate-500"> Set
                as Default C.C.
              </button>
              <div>
                <span class="text-sm font-semibold text-secondary-500 tracking-wide">Default:
                </span>
                <i v-if="intent.id == defaultCC" class="fa fa-check text-green-400"></i>
                <i v-else class="fa fa-x text-secondary-500 text-xs"></i>

              </div>
            </div>
            <!-- Credit Card end-->
          </ul>
          <hr class="bg-secondary-200 border-200 max-w-md mt-2 ml-2 md:my-4" />
        </div>
        <template v-else>
          <div class="m-4 p-4">
            <p>No Credit Cards currently associated to this customer</p>
          </div>
        </template>
      </div>
      <div v-else>
        <p> Loading data...</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref, inject, computed } from 'vue';
import { type Setupintents } from '../types/setupintents';
// @ts-ignore
const baseURL = inject('NETLIFY_FUNCTIONS_URL');

const route = useRoute();
// @ts-ignore
const setup_intents = ref<Setupintents | any>([]);
const loaded = ref(false)
const defaultCC = ref(null)

const users = ref([{}])
const user = ref({})

const defaultPaymentId = computed(() => {

})


const setDefaultCC = async (customer: string, payment_id: string) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customer,
      id: payment_id
    }),
  };
  try
  {
    const response = await fetch(`${baseURL}/updateCustomerDefaultCC`, requestOptions);
    await response.json().then((data) => {
    })

    // update customer's entrly on localeStorage with default payment method
    // @ts-ignore
    await updateLocaltStorage(customer, payment_id)
  } catch (err)
  {
    console.log(err)
  }
}

const updateLocaltStorage = async (customer_id: string, payment_id: string) => {
  if (localStorage.getItem('stripeCustomers'))
  {
    const stripeCustomers = await localStorage.getItem('stripeCustomers')
    // @ts-ignore
    users.value = await JSON.parse(stripeCustomers)
    // find current customer
    // @ts-ignore
    let index: number = 0;
    let customer: object | any = {};
    for ([index, customer] of users.value.entries())
    {
      if (customer.id === customer_id)
      {
        user.value = Object.assign({}, customer)
        // @ts-ignore
        user.value.invoice_settings.default_payment_method = payment_id
        // @ts-ignore
        defaultCC.value = user.value.invoice_settings.default_payment_method
        users.value[index] = user.value
        await localStorage.setItem('stripeCustomers', JSON.stringify(users.value));
        break
      }
    }
    // 
  }
}

const getPaymetMethodsByCustomerId = async () => {
  const response = await fetch(
    `${inject('NETLIFY_FUNCTIONS_URL')}/getPaymetMethodsByCustomerId/${route.params.id}`
  );

  const fullResponse = await response.json();
  setup_intents.value = await fullResponse.paymentMethods;
  loaded.value = true
}

const loadCustomers = async () => {
  if (localStorage.getItem('stripeCustomers'))
  {
    const stripeCustomers = await localStorage.getItem('stripeCustomers')
    // @ts-ignore
    users.value = await JSON.parse(stripeCustomers)
    // find current customer
    // @ts-ignore
    let index: number = 0;
    let customer: object | any = {};
    for ([index, customer] of users.value.entries())
    {
      // ts-ignore
      if (customer.id === route.params.id)
      {
        user.value = Object.assign({}, customer)
        // @ts-ignore
        // @ts-ignore
        if (user.value.invoice_settings.default_payment_method)
        {
          // @ts-ignore
          defaultCC.value = user.value.invoice_settings.default_payment_method
        }
        break
      }
    }
    // 
  } else
  {
    const response = await fetch(`${baseURL}/getCustomerById/${route.params.id}`)
    const responseJson = await response.json();
    user.value = Object.assign({}, responseJson.customer)
  }
}



onMounted(async () => {
  loaded.value = false
  const id = route.params.id;
  const full_name = route.query.name;

  await getPaymetMethodsByCustomerId()
  await loadCustomers()

})
</script>

<style scoped></style>
