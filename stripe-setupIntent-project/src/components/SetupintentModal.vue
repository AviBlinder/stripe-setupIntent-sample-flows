<template>
  <Teleport to="body" :disabled="isMobile">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="absolute w-full bg-black bg-opacity-30 h-full 
        -top-1 left-0 flex justify-center px-8 "
      >
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="p-4 bg-white 	            
            self-start mt-32 max-w-screen-md
            mt-6"
          >
            <!-- Modal contents -->
        <div class="flex justify-end ">
              <button @click="$emit('close-modal')">
                <i class="fa fa-close text-lg"> </i>
              </button>
        </div>            
        <div class="text-secondary-600">
          <h1 class="text-xl mt-1 p-2">What is a Setup intent?</h1>
          <div class="text-sm font-light">
            <p class="mb-4 p-2">
              Use the <a 
              class="text-blue-600"
              target="_blank"
              href="https://stripe.com/docs/payments/setup-intents">Setup Intents API</a> 
              to set up a payment method 
              for future payments. 
              It is similar to a payment, but no charge is created. 
            Set up a payment method for future payments now.
          </p>
          <h2 class="text-lg">The Setup Intents API is useful for businesses that onboard customers but don’t charge them right away:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li class="my-2 px-2 pt-2">
              A car rental company that collects payment method details before the customer rents the car and charges the card after the rental period ends
            </li>
            <li class="my-2 p-2">
              A crowdfunding website that collects card details to be charged later, only if the campaign reaches a certain amount
            </li>
            <li class="my-2 p-2">
              A utility company that charges a different amount each month based on usage but collects SEPA payment details before the first month’s payment
            </li>
          </ol>
        </div>
          
          <!-- <hr class="border-1 "> -->
            <p class="border-l-2 border-secondary-200 pl-4   
            mt-2 ml-2 text-sm font-light text-secondary-600">
              Based on <a 
              class="text-blue-600"
              href="https://stripe.com/docs/payments/setup-intents" 
              target="_blank"
              >Stripe's official documentaion</a>

            </p>
        </div>

            <!--  -->
            <button
              class="text-white mt-8 bg-weather-primary py-2 px-6 btn"
              @click="$emit('close-modal')"
           >
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {ref} from 'vue';

defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
})

const isMobile = ref<boolean>(false)
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>