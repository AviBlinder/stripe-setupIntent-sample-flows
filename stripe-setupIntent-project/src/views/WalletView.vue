<template>
  <main class="viewSize">
    <div
      class="flex flex-row md:flex-row align-middle justify-center m-2 md:m-4"
    >
      <router-link
        :to="{ name: 'customer-details', params: { id: route.params.id } }"
      >
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
      <div v-if="setup_intents.length" class="mb-3 md:mb-3">
        <ul v-for="(intent, index) in setup_intents" :key="index">
          <hr class="bg-secondary-200 border-200 max-w-md my-1 ml-2 md:my-4" />
          <!-- Credit Card start -->
          <div
            class="bg-white min-h-full flex justify-center items-center ml-4 md-ml-4
            "
          >
            <div class="space-y-16">
              <div
                class="w-96 h-1/2 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110"
              >
                <!--  -->

                <!--  -->
                <img
                  class="relative object-cover w-full h-full opacity-70 rounded-xl"
                  src="https://i.imgur.com/kGkSg1v.png"
                />
                <div
                  class="w-full px-6 absolute top-2 
                  text-md font-medium leading-6 tracking-tight text-slate-700"
                >
                  <div class="flex flex-row mt-3 ">
                    <div
                      class="flex flex-col justify-start min-w-max -translate-x-1"
                    >
                      <p class="">Name</p>
                      <p class=" ">
                        {{ route.query.name }}
                      </p>
                    </div>
                    <div
                      class="flex justify-end bg-slate-400 p-4 ml-9 md:mx-6 rounded-xl md:translate-x-9"
                    >
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
                          <p class="">Last  Digits</p>
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
  </main>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { onMounted, ref, inject } from 'vue';

  // @ts-ignore
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const route = useRoute();
  // @ts-ignore
  const setup_intents = ref([]);

  onMounted(async () => {
    const id = route.params.id;
    const full_name = route.query.name;

    const response = await fetch(
      `${inject('NETLIFY_FUNCTIONS_URL')}/getPaymetMethodsByCustomerId/${id}`
    );

    const fullResponse = await response.json();
    setup_intents.value = await fullResponse.paymentMethods;

    console.log('fullResponse.paymentMethods =', setup_intents.value);
  });
</script>

<style scoped></style>
