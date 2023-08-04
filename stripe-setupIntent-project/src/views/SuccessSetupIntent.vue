<template>
  <main class="viewSize">
    <div class="flex flex-col my-4 justify-center align-middle">
      <div class="bg-secondary-100 p-5 rounded-md">
        <div clas="font-semibold font-2xl">
          <p>Congrats! Setup Intent successfully created !!</p>
          <p> In a few seconds you will be redirected to the main page</p>
        </div>
      </div>
      <div class="my-5">
        <router-link class="" :to="{ name: 'customers' }">
          <button class="btn-sm md:btn">
            <i class="fa fa-user" aria-hidden="true"></i>
            Back to Customers
          </button>
        </router-link>
      </div>

      <!-- {{ setup_intent_client_secret }}  -->
    </div>
  </main>
</template>

<script setup lang="ts">

  import {onMounted} from 'vue'
  import { useRouter } from 'vue-router'

  
  const router = useRouter();
  
  onMounted ( () => {
    // setTimeout(functionRef, delay)
setTimeout( () => {
    router.push(`/customers`);
} , 4000)
  })
  // import { useRouter, useRoute } from 'vue-router'

  //   const route = useRoute();
  //   const setup_intent  = ref(route.query.setup_intent)
  //   const setup_intent_client_secret = ref(route.query.setup_intent_client_secret)
</script>

<style scoped></style>
