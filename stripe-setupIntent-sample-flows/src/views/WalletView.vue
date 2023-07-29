<template>
  <div class="flex md:flex-row sm:flex-col gap-4 ">
      <ul v-if="setup_intents.length" v-for="intent in setup_intents"> 
        <hr class="bg-secondary-200 border-200 max-w-md mt-4">    
        <!-- Credit Card start -->
        <div class="bg-white min-h-full flex justify-center items-center">
          <div class="space-y-16">
            <div class="w-96 h-1/2 m-auto bg-red-100 rounded-xl relative 
            text-white shadow-2xl transition-transform transform hover:scale-110">
            <!--  -->

            <!--  -->
                <img 
                class="relative object-cover w-full h-full 
                opacity-70
                rounded-xl"                
                src="https://i.imgur.com/kGkSg1v.png">
                
               <!-- <div class="skewed-bg border-4
                        relative w-full h-full 
                  rounded-xl object-cover               
                  bg-gradient-to-r from-slate-200 from-0% 
                        via-red-500 via-50% to-slat-200 to-100%
                  before:absolute before:top-0 before:left-[50%] 
                  before:content-['']
                  before:skew-x-[-20deg] before:w-[1px] before:h-full
                  before:bg-slate-200">                   
                -->

                
                <div class="w-full px-6 absolute top-2">
                    <div class="flex  flex-row  ">
                        <div class="flex flex-col justify-start min-w-max -translate-x-1">
                            <p class="font-light">
                                Name
                            </p>
                            <p class="font-medium tracking-widest">
                                {{ route.query.name }}
                            </p>
                        </div>
                        <div class="flex justify-end bg-slate-400 p-4 mx-6 rounded-xl md:translate-x-9
                        ">
                          <p>
                            {{ intent.card.brand }}
                          </p>
                        </div>
                        <!-- <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png"/> -->
                    </div>
                    <div class="pt-1">
                        <p class="font-light">
                            Last 4 Digits
                        </p>
                        <p class="font-medium tracking-more-wider">                           
                            {{ intent.card.last4 }}
                        </p>
                    </div>
                    <div class="pt-4 pr-6">
                        <div class="flex justify-between">
                            <div class="">
                                <p class="font-light text-xs">
                                    Valid
                                </p>
                                <p class="font-medium tracking-wider text-sm">
                                    11/15
                                </p>
                            </div>
                            <div class="">
                                <p class="font-light text-xs text-xs">
                                    Expiry
                                </p>
                                <p class="font-medium tracking-wider text-sm">
                                    03/25
                                </p>
                            </div>
    
                            <div class="">
                                <p class="font-light text-xs">
                                    CVV
                                </p>
                                <p class="font-bold tracking-more-wider text-sm">
                                    ···
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
              <!-- </div> -->
            </div>
    
        </div>
    </div>
        <!-- Credit Card end-->
      </ul>
      <template v-else class="m-4 p-4">
        <p> No Credit Cards currently associated to this customer</p>
      </template>

  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import {onMounted, ref} from 'vue';

  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

  const route = useRoute()
  const setup_intents = ref([])

    onMounted( async () => {

      const id = route.params.id;
      const full_name = route.query.name
      console.log("id =",id)
      // const response = await  fetch(`${BACKEND_BASE_URL}/stripe/v1/setupintents/${id}`)
      const response = await  fetch(`${BACKEND_BASE_URL}/stripe/v1/payment_methods/${id}`)
      
      const fullResponse = await response.json()
      console.log("fullResponse:",fullResponse)

      setup_intents.value = fullResponse.data
    
      console.log("setup_intents: " ,JSON.stringify(setup_intents))
  })
</script>

<style scoped>

</style>