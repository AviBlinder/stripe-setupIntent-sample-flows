<template>
  <Teleport to="body" :disabled="isMobile">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="
        fixed inset-0 bg-black bg-opacity-25
        w-full h-full   
        -top-1 left-0 flex justify-center px-8 "        
      >
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="p-4 bg-white rounded-xl 	            
            self-start mt-32 max-w-screen-md
            mt-6 text-left align-middle"
          >
            <!-- Modal contents -->
        <div class="flex justify-end ">
              <button @click="$emit('close-addCustomer-modal')">
                <i class="fa fa-close text-lg"> </i>
              </button>
        </div>            
        <div class="text-secondary-500/90       
        text-lg font-medium p-2 md:p-3 leading-2 tracking-tight font-sans ">
          <slot name="message"> 
                
          </slot>
       </div>

            <!--  -->
            <button
              class="text-white mt-8 bg-weather-primary py-2 px-6 btn"
              @click="$emit('close-addCustomer-modal')"
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

defineEmits(["close-addCustomer-modal"]);
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