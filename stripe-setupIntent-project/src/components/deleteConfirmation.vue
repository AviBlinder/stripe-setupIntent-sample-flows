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

        <div class="fixed top-2 left-3 md:left-14 overflow-y-auto">
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
                class="w-full max-w-md transform overflow-hidden rounded-2xl 
                bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg leading-6 text-gray-900 font-bold"
                >
                  Confirm Customer Deletion
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 tracking-wide font-medium">
                    Please confirm the deletion of customer
                    
                    {{ currentUser.email }}
                    This action is irreversible.
                  </p>
                </div>

                <div class="mt-6 flex flex-row justify-evenly">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm md:text-md font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
                    @click="confirmDelete"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-secondary-100 px-4 py-2 text-sm md:text-md font-medium text-secondary-600 hover:bg-secondary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="cancelDelete"
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
import { ref , onMounted} from 'vue'
import type { PropType } from 'vue'
import { type stripeUser  } from '../types/customers';

  const props = defineProps({
    currentUser: Object as PropType<stripeUser> | any,        
    modalIsOpen:  Boolean
  });

onMounted( () => {
  isOpen.value = props.modalIsOpen
  // ts-ignore

})
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const emit = defineEmits(['delete:modelValue','cancelDelete']) 
const isOpen = ref(false)

const confirmDelete = () => {
  emit('delete:modelValue')

}

const cancelDelete = () => {
  emit('cancelDelete')
}
function closeModal() {
  isOpen.value = false
  
}
function openModal() {
  isOpen.value = true
}


</script>
