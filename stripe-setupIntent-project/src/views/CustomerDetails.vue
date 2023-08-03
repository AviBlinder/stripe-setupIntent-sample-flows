<template>
  <main class="viewSize">
    <div class="flex flex-col md:flex-row">
      <div class="flex flex-row justify-center align-middle p-2 w-full mr-8 m-2 md:m-4 text-center">
        <div>
          <i
            class="fa-solid fa-question-circle aria-hidden='true' text-2xl text-primary-400 mt-1 cursor-pointer"
            @click="toggleModal"
          ></i>
        </div>
        <!-- v-if="router.query.preview" -->
        <SetupintentModal :modalActive="modalActive" @close-modal="toggleModal">
        </SetupintentModal>

        <!--  -->
        <router-link class="justify-start" :to="{ name: 'customers' }">
          <button class="btn-sm md:btn">
            <i class="fa fa-user" aria-hidden="true"></i>
            Back to Customers
          </button>
        </router-link>
      </div>
      <div
        class="flex flex-row justify-center align-middle p-2 w-full mr-8 m-2 md:m-4 text-center"
      >
        <router-link
          class="justify-start"
          :to="{
            name: 'addSetupintent',
            params: { id: id },
            query: { name: user.name },
          }"
        >
          <button class="btn-sm md:btn">
            <i class="fa fa-plus" aria-hidden="true"></i>
            Add Setup Intent
          </button>
        </router-link>

        <div>
          <Suspense>
            <router-link
              :to="{
                name: 'wallet',
                params: { id: id },
                query: { name: user.name },
              }"
            >
              <button class="btn-sm md:btn">
                <i class="fa fa-credit-card" aria-hidden="true"></i>
                Show Credit Cards
              </button>
            </router-link>
          </Suspense>
        </div>
      </div>
    </div>
    <hr class="border-1 border-slate-200 my-1" />
    <div class="flex flex-row justify-normal ml-5 mb-3 md:ml-10 md:mb-5 text-2xl">
      Customer Details: 
    </div>
    <div
      class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg md: ml-6"
    >
      <div class="border-t border-gray-200">
        <dl>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Full name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ user.name }}
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Description</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ user.description }}
            </dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Email address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ user.email }}
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Balance</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ user.balance }}
            </dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div v-if="user.address">
                <span v-show="user.address.city"> {{ user.address.city }}</span>
                <span v-show="user.address.line1">
                  - {{ user.address.line1 }}</span
                >
                <br />
                <span v-show="user.address.postal_code">
                  Code: {{ user.address.postal_code }}</span
                >
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { ref, onMounted , inject} from 'vue';

  import { useRouter, useRoute } from 'vue-router';
  // @ts-ignore
  import SetupintentModal from '../components/SetupintentModal.vue';

  import { type User, type InvoiceSettings } from '../types/customers';

  const route = useRoute();
  const router = useRouter();

  const id: string | any = route.params.id;

  const user = ref<User>({
    value: undefined,
    id: '',
    object: '',
    address: {
      state: '',
      city: '',
      line1: '',
      line2: null,
      postal_code: '',
      country: '',


    },
    balance: 0,
    created: 0,
    currency: null,
    default_source: null,
    delinquent: false,
    description: '',
    discount: null,
    email: '',
    invoice_prefix: '',
    livemode: false,
    name: '',
    next_invoice_sequence: 0,
    phone: null,
    preferred_locales: [],
    shipping: null,
    tax_exempt: '',
    test_clock: null,
  });
  const modalActive = ref<boolean>(false);
  const toggleModal = () => {
    modalActive.value = !modalActive.value;
  };

  onMounted(async () => {
    const response = await fetch(
      `${inject('NETLIFY_FUNCTIONS_URL')}/getCustomerById/${id}`)
      // @ts-ignore
    const responseJson = await response.json()
    user.value = responseJson.customer
  });
</script>

<style scoped></style>
