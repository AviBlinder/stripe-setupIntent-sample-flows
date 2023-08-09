<template>
  <div>
    <div class="flex flex-col md:flex-row">
      <div class="flex flex-col  ">
        <div
          class="md:text-2xl mb-2 flex md:flex-row md:mt-2 text-secondary-700
          font-sans font-light tracking-wide md:tracking-normal text-left align-baseline
          "
        >
          List of Stripe Users:
        </div>
        <div
          class="mb-2 flex md:flex-row md:mt-2 text-md md:text-normal text-secondary-600 "
        >
          Select a user to get additional information and perform actions
        </div>
      </div>
      <div
        class="flex justify-center md:justify-end align-middle mt-3 md:mt-4 mb-2 "
      >
      </div>
    </div>

    <!-- delete modal -->
      <deleteConfirmation
      v-if="isOpen"
      :currentUser="currentUser"
      :modalIsOpen="isOpen"
      @delete:modelValue="confirmDelete"
      @cancelDelete="cancelDelete"
      >
      </deleteConfirmation>
    <!-- delete modal end -->
      <div class="flex justify-center mt-2">
    <div class=" h-auto grid grid-cols-1 ">
      <div class="overflow-auto rounded-lg shadow hidden md:block">
        <table class="w-full ">
          <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th
                class=" text-sm font-semibold tracking-wide text-left"
              >
                Name
              </th>
              <th></th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Created On
              </th>
              <th
                class="w-24 text-sm font-semibold tracking-wide text-left font-sans"
              >
                <span class="pl-6">Email </span>
              </th>
              <th
                class="w-24 p-3 text-sm font-semibold tracking-wide text-right"
              >
                Balance
              </th>
              <th
                class="w-24 p-3 text-sm font-semibold tracking-wide text-left"
              >
                Phone
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              class="bg-white hover:bg-slate-100"
              v-for="user in globalCustomers"
              :key="user.id"
            >
              <td
                class="p-3 text-sm text-secondary-400 whitespace-nowrap hover:underline"
              >
                <router-link
                  :to="{
                    name: 'customer-details',
                    params: { id: user.id },
                  }"
                >
                  {{ user.name }}
                </router-link>
              </td>
              <td>
                <button class="p-1 hover:scale-110" @click="openModal(user)">
                  <i class="fa-solid fa-trash text-red-500"> </i>
                </button>
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                <router-link
                  :to="{
                    name: 'customer-details',
                    params: { id: user.id },
                  }"
                >
                  {{ createDateFunc(user.created) }}
                </router-link>
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                <router-link
                  :to="{
                    name: 'customer-details',
                    params: { id: user.id },
                  }"
                >
                  <span
                    class="p-1.5 text-xs lowercase font-medium tracking-wider text-secondary-400 rounded-lg bg-opacity-50"
                  >
                    {{ user.email }}</span
                  >
                </router-link>
              </td>
              <td
                class="p-3 text-sm text-gray-700 whitespace-nowrap flex justify-end"
              >
                <router-link
                  :to="{
                    name: 'customer-details',
                    params: { id: user.id },
                  }"
                >
                  <span
                    class="p-1.5 text-xs font-medium uppercase tracking-wider
                     text-secondary-400 rounded-lg bg-opacity-50"
                  >
                    {{ user.balance }} {{ user.currency }} 
                  </span>
                </router-link>
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                <router-link
                  :to="{
                    name: 'customer-details',
                    params: { id: user.id },
                  }"
                >
                  <span v-if="user.phone">
                    {{ user.phone }}
                  </span>
                  <span v-else> N/A</span>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- on non-mobile devices - the cards will be hidden -->
      <div class="grid grid-cols-1 col-start-2 gap-4 md:hidden">
        <div
          v-for="user in globalCustomers"
          :key="user.id"
          class="bg-white space-y-3 p-4 rounded-lg hover:scale-105 w-[250px] shadow-lg 
          border-t-1 "
        >
          <router-link
            :to="{
              name: 'customer-details',
              params: { id: user.id },
            }"
          >
            <div
              class="flex flex-row space-t-2 text-xs py-2 bg-secondary-200 rounded-2xl"
            >
              <i class="ml-3 text-secondary-600/90 text-xs fa-solid fa-user"></i>
              <div class="flex justify-start align-middle ml-3">
                <p class="text-secondary-500 font-bold hover:underline">
                  {{ user.name }}
                </p>
              </div>
            </div>
          </router-link>

          <div
            class="flex flex-row items-center justify-between text-xs mb-2 mt-6"
          >
            <div>
              <i class="fa-regular fa-calendar text-secondary-300"> </i>
              <span class="pl-2">{{ createDateFunc(user.created) }}</span>
            </div>
            <div class="flex flex-row ml-5 justify-end">
              <i class="fa-solid fa-coins mx-1 text-secondary-600/90"></i>
              <span>
                {{ user.balance }}
              </span>
            </div>
          </div>

          <div class="flex items-center text-xs text-gray-700 my-1">
            <div>
              <i class="fa-regular fa-envelope text-secondary-300"></i>
              <span class="pl-2">{{ user.email }}</span>
            </div>
          </div>
          <div
            v-if="user.phone"
            class="flex items-center text-xs text-gray-700 my-4"
          >
            <div>
              <i class="fa-solid fa-phone text-secondary-300"></i>
              <span class="pl-2">{{ user.phone }}</span>
            </div>
          </div>
          <div v-else class="flex items-center text-xs text-gray-700 my-3">
            <div>
              <i class="fa-solid fa-phone text-secondary-300"></i>
              <span class="pl-2">N/A</span>
            </div>
          </div>

          <router-link
            :to="{
              name: 'customer-details',
              params: { id: user.id },
            }"
          >
            <div class="text-sm font-medium text-black mt-2">
              <i class="fa-solid fa-info text-secondary-400"></i>
              <span class="text-blue-500/90 text-xs pl-2"> View full profile</span>
            </div>
          </router-link>

          <hr class="border-1 border-slate-200 mt-2" />

          <div
            class="bg-red-500 opacity-80 mx-2 mt-5 rounded-lg flex flex-row justify-evenly align-middle"
          >
            <button
              class="font-semibold text-white p-1 tracking-wide leading-5 text-xs"
              @click="openModal(user)"
            >
              Delete customer
              <span class="ml-4">
                <i class="fa-solid fa-trash"> </i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, inject } from 'vue';
  import type { PropType } from 'vue'
  import { type stripeUser } from '../types/customers';
  const emit = defineEmits(['update:modelValue']) 
  
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  } from '@headlessui/vue';

  // @ts-ignore
   import deleteConfirmation from '../components/deleteConfirmation.vue';
  const baseURL = inject('NETLIFY_FUNCTIONS_URL');

  const props = defineProps({
    users: Object as PropType<stripeUser[]> 
  });

  const globalCustomers = ref(props.users)
  
  const currentUser = ref<stripeUser | any >(null)

  const createDateFunc = function (linuxDate: number) {
    const longDate = new Date(linuxDate * 1000);
    return (
      longDate.getDate() +
      '/' +
      longDate.getMonth() +
      '/' +
      longDate.getFullYear()
    );
  };
  // @ts-ignore
  const BACKEND_BASE_URL: string = import.meta.env.VITE_BACKEND_BASE_URL;
  //
  const isOpen = ref(false);

  function closeModal() {
    isOpen.value = false;
  }
  function openModal(user : object)  {
    currentUser.value = user;
    isOpen.value = true;
  }

  const cancelDelete = () => {
    closeModal()
  }

  const removeLocalStorage = async (id: string | any) => {
    // @ts-ignore
    let customers: [object] = await JSON.parse(
      // @ts-ignore
      localStorage.getItem('stripeCustomers')
    );

    let index: number = 0;
    let customer: object | any = {};
    // ts-ignore
    for ([index, customer] of customers.entries()) {
      // ts-ignore
      if (customer.id === id) {
        customers.splice(index, 1);
        if (customers.length > 0) {
          await localStorage.setItem(
            'stripeCustomers',
            JSON.stringify(customers)
            )
            // @ts-ignore
        globalCustomers.value = Object.assign({}, customers)            

      } else {
        await localStorage.removeItem('stripeCustomers');
            // @ts-ignore        
        globalCustomers.value = {}
        }
        break
      }
    }
    
    await emit('update:modelValue',globalCustomers)

  };
  //
  const confirmDelete = () => {
    // ts-ignore
    deleteCustomer(currentUser.value.id);
  };
  // @ts-ignore
  const deleteCustomer = async (id) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    };
    try {
      const response = await fetch(`${baseURL}/deleteCustomer`, requestOptions);
      await response.json()
       
        .then((data) => {
          switch (response.status) {
            case 200:
              removeLocalStorage(id);
              closeModal();
              break;
            default:
              console.log('delete customer status != 200 : ', response.status);
              closeModal();
              break;
          }
        })
    } catch (err) {
      console.log(`there was an error creating the deleting: ${err}`);
    }
  };
</script>

<style scoped></style>
