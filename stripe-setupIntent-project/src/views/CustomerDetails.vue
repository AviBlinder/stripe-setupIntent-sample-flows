<template>
  <main class="viewSize">
    <div class="flex flex-row md:flex-row w-full  justify-between mb-4">
      <!-- modal button -->
      <div
        class="flex flex-row justify-center align-middle p-2 w-6 md:w-8 mr-8 text-center"
      >
        <div>
          <i
            class="fa-solid fa-question-circle aria-hidden='true' text-2xl text-primary-400 mt-1 cursor-pointer"
            @click="toggleModal"
          ></i>
        </div>
        <!-- v-if="router.query.preview" -->
        <div class="relative">
          <SetupintentModal 
          :modalActive="modalActive" 
          @close-modal="toggleModal"
          >
          </SetupintentModal>
        </div>         
      </div>
      <!-- Add Setup Intent button -->
       <!-- justify-center align-middle p-2 w-6 md:w-8 mr-8 text-center -->
      <div class="flex flex-row btn justify-center align-middle m-1 pt-3 text-center font-medium">
        <router-link
          class=""
          :to="{
            name: 'addSetupintent',
            params: { id: id },
            query: { name: user.name },
          }"
        >
        <i class="fa fa-plus" aria-hidden="true"></i>
        Add Setup Intent
        </router-link>
        </div>
      <div class="flex flex-row btn justify-center align-middle m-1 pt-3 text-center font-medium ml-4">
          <Suspense>
            <router-link
              :to="{
                name: 'wallet',
                params: { id: id },
                query: { name: user.name },
              }"
            >
                <i class="fa fa-credit-card" aria-hidden="true"></i>
                Show Credit Cards
            </router-link>
          </Suspense>
          </div>
        </div>

    <div class="flex flex-row justify-normal ml-5 mb-3 md:ml-10 md:mb-5 text-2xl ">
      Customer Details:
    </div>
    <div class="grid grid-cols-1 mb-4">
    <div
      class=" shadow overflow-hidden md:ml-6 ">
      <div class="border border-primary-300 sm:rounded-lg md:rounded-lg ">
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
    </div>
  </main>
</template>

<script setup lang="ts">
  import { ref, onBeforeMount, inject } from 'vue';
  import type { Ref } from 'vue';

  import { useRouter, useRoute } from 'vue-router';
  // @ts-ignore
  import SetupintentModal from '../components/SetupintentModal.vue';

  import { type stripeUser} from '../types/customers';

  const route = useRoute();
  const router = useRouter();

  const id = route.params.id;

  // const user = ref<stripeUser >();
  // @ts-ignore
  const user: Ref<stripeUser > = ref({
      id:                '',
  object:                '',
  address:              {
    city:                 '',
    country:              '',
    line1:                '',
    line2:                null,
    postal_code:          '',
    state:                '',
    },
  balance:               0,
  created:               0,
  currency:              '',
  default_source:        null,
  delinquent:            false,
  description:           '',
  discount:              null,
  email:                 '',
  invoice_prefix:        '',
  invoice_settings:      {
  custom_fields:          null,
  default_payment_method: null,
  footer:                 null,
  rendering_options:      null,
  },
  livemode:              false,
  metadata:              null,
  name:                  '',
  next_invoice_sequence: 0,
  phone:                 '',
  preferred_locales:     null,
  shipping:              null,
  tax_exempt:            '',
  test_clock:            null,
  });
  const modalActive = ref<boolean>(false);
  const toggleModal = () => {
    modalActive.value = !modalActive.value;
  };

  onBeforeMount( async () => {
    const response = await fetch(
      `${inject('NETLIFY_FUNCTIONS_URL')}/getCustomerById/${id}`
    );
    const responseJson = await response.json();
    user.value = Object.assign({}, responseJson.customer)
  });
</script>

<style scoped></style>
