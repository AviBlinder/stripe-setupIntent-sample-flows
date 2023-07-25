<template>
  <div>
    <h3>Customer Details</h3>
<div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            User database
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Details and informations about user.
        </p>
    </div>
    <div class="border-t border-gray-200">
        <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Full name
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{user.name}}
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Description
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ user.description}}
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Email address
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{user.email}}
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Balance
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ user.balance }}
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Address
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div v-if="user.address">
                    <span v-show="user.address.city"> {{ user.address.city }}</span>
                    <span v-show="user.address.line1"> - {{ user.address.line1 }}</span>
                    <br>
                    <span v-show="user.address.postal_code"> Code: {{ user.address.postal_code }}</span>
                  </div>
                  
                </dd>
            </div>
        </dl>
    </div>

    <div>
      <h4>
        <button class="btn" @click="getSetupIntents"> Show Credit Cards </button>
        <p v-if="setup_intents.data">total setup intents {{ setup_intents.data.length }}</p>
      </h4>
    </div>
</div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

  const route = useRoute();

  const user = ref({});
  const setup_intents = ref({})

  onMounted( async () => {
    const id = route.params.id;
    const response = await  fetch(`${BACKEND_BASE_URL}/stripe/v1/customers/${id}`)
    user.value = await response.json()
    console.log(user.value)
  })
  
  const getSetupIntents = async function ()  {

    const id = route.params.id;
    
    const response = await  fetch(`${BACKEND_BASE_URL}/stripe/v1/setupintents/${id}`)
    setup_intents.value = await response.json()
    
    console.log("setup_intents" + JSON.stringify(setup_intents))
  }
</script>

<style scoped></style>
