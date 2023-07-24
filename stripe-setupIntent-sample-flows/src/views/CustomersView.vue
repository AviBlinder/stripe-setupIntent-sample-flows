<template>
  <div>
      <div class="m-6">
      <button class="btn">
        <RouterLink to="/about">About</RouterLink>
      </button >
    </div>

    <div>
      <!-- list existing customers -->
      <!-- <div>
        <p v-for="user in users" :key="user.id"> {{user.id}} - {{ user.email }}</p>
      </div> -->
      <div>
        <label class="m-4" for="customersList">Select a customer</label>
      </div>
      <select 
      class="bg-blue-100 border-4 "
      v-model="selectedCustomer" id="customersList">
        <option 
        class="text-md"
        v-for="user in users" :key="user.id" :value="user"> {{ user.email }}</option> 
      </select>
      <div>
        <div v-if="selectedCustomer">
          <button @click="customerDetails" class="m-4 p-2 bg-green-200">
            See Customer details
          </button>
        </div>
        <!-- go to specific customer's details -->
      </div>
    </div>
    <div>
      <!-- create new customer -->
    </div>
    <div>
      <!-- create setupIntent (e.g. add payment method to customer) -->
    </div>
  </div>
  
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type { Ref } from 'vue'

import {type Users} from '../types/customers'
import router from '@/router';

const users: Ref<Users | null> = ref(null)
const selectedCustomer = ref('')

fetch('https://reqres.in/api/users')
    .then(response => response.json())
    .then( res2 => {
      users.value = res2.data
      console.log(users.value)
    })
    
const customerDetails = () => {
  router.push(`/customers/${selectedCustomer.value.id}`)
}

</script>

<style scoped>

</style>