<template>
  <main class="viewSize">
    <button class="btn-sm md:btn" @click="$router.go(-1)">
      <i class="fa fa-arrow-left" aria-hidden="true"></i> Back to Customers
    </button>
    <div class="m-5 max-w-md">
      <!-- <i class="fa-solid fa-sun text-2xl"></i> -->
      Add A Customer 

      <form @submit.prevent>
        <div class="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
          <div>
            <!-- @update:modelValue="updateFirstName" -->
            <FirstNameField
              v-model="firstName"
            />
            <!-- @update:modelValue="updateLastName" -->
            <LastNameField
              v-model="lastName"
            />
            <!-- @update:modelValue="updateAddress" -->
            <AddressField
              v-model="address"
            />
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">

  import {ref} from 'vue'
  // Form fields
    import FirstNameField from '../components/formFields/FirstName.vue';
    import LastNameField from '../components/formFields/LastName.vue';
    // import CompanyNameField from '../components/formFields/CompanyName.vue';
    import AddressField from '../components/formFields/MainAddress.vue';
    // import AdditionalAddressField from '../components/formFields/AdditionalAddress.vue';
    // import CityField from '../components/formFields/CityField.vue';
    // import PostalCodeField from '../components/formFields/PostCode.vue';
    // import CountryField from '../components/formFields/CountryField.vue';
    // import PhoneField from '../components/formFields/PhoneField.vue';

    const firstName = ref('')
    const lastName = ref('')
    const address = ref('')

    const updateFirstName = () => {
          console.log("first name : ", firstName.value)
        };
    const updateLastName = () => {
          console.log("first name : ", lastName.value)
        };
    const updateAddress = () => {
          console.log("first name : ", address.value)
        };

    
</script>

<style scoped></style>
