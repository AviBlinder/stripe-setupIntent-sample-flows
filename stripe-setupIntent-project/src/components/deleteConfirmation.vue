<template>
  <main class="viewSize">
    <div class="">

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed top-2 left-3 md:left-14 overflow-y-auto ">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle 
              shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg  leading-6 text-gray-900 font-bold"
              >
                Confirm Customer Deletion
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500 tracking-wide font-medium">
                  Please confirm the deletion of this customer.
                  This action is irreversible. 
                </p>
              </div>

              <div class="mt-6 flex flex-row justify-evenly">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent 
                  bg-red-400 px-4 py-2 text-sm md:text-md font-medium text-white hover:bg-red-500 
                  focus:outline-none 
                  focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
                  @click="deleteCustomer"
                >
                  Delete
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent 
                  bg-secondary-100 px-4 py-2 text-sm md:text-md font-medium text-secondary-600 hover:bg-secondary-200 
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Cancel
                </button>

              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  </div>
  </main>
</template>

<script setup lang="ts" >
import { ref , inject} from 'vue'
  const props = defineProps({
    user: Object,    
    modalIsOpen:  Boolean
  });

  console.log("user :", props.user)

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
  const baseURL = inject('NETLIFY_FUNCTIONS_URL');

  const deleteCustomer = (id) => {
    console.log('deleteCustomer ', id);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    };
    try {
      fetch(`${baseURL}/deleteCustomer`, requestOptions).then((response) => {
        switch (response.status) {
          case 200:
            console.log('delete customer status 200 ', response.status);
            isOpen.value = false

            break;
          default:
            console.log('delete customer status ', response.status);
            isOpen.value = true
            break;
        }
      });
    } catch (err) {
      console.log(`there was an error creating the deleting: ${err}`);
    }

    // stripe/v1/delete-customer
  };

</script>
