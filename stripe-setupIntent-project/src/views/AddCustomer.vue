<template>
  <main class="viewSize">
    <div class="m-2">
    <!-- <hr class="w-full mx-2 border-1 bg-secondary-200 my-2" /> -->
    <div v-if="!customerCreated">
      <div
        v-if="createCustomerResponse"
        class="text-lg m-2 md:text-xl text-center font-semibold text-red-500 leading-4"
      >
        {{ createCustomerResponse }}
      </div>
      <form>
        <div class="space-y-2 md:space-y-12">
          <div
            class="grid grid-cols-1 gap-x-8 md:border-b border-gray-900/10 pb-6 md:pb-8 md:grid-cols-3"
          >
            <div>
              <p class="text-base font-semibold leading-7 text-secondary-900">
                Personal Information
              </p>
              <p class="mt-1 text-sm leading-6 text-secondary-600">
                Use a permanent address where the customer can receive mail.
              </p>
            </div>

            <div
              class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 md:col-span-2"
            >
              <div class="sm:col-span-3">
                <label
                  for="full-name"
                  class="block text-sm font-medium leading-6 text-secondary-900"
                  >Full Name</label
                >
                <!-- @keyup="validateFullname" -->
                <div class="mt-2">
                  <input
                    v-model="customerDetails.fullName"
                    @blur="validateFullname"
                    type="text"
                    name="full-name"
                    id="full-name"
                    autocomplete="full-name"
                    class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                  <span
                    v-if="fullNameError"
                    :class="{ fieldErrorBorder: fullNameError }"
                  >
                    {{ fullNameValidationErrorMessage }}
                  </span>
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="phone-number"
                  class="block text-sm font-medium leading-6 text-secondary-900"
                  >Phone Number</label
                >
                <!-- @keyup="validatephoneError" -->
                <div class="mt-2">
                  <input
                    v-model="customerDetails.phone"
                    @blur="validatephoneError"
                    type="text"
                    name="phone-number"
                    id="phone-number"
                    autocomplete="phone-number"
                    class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                  <span
                    v-if="phoneError"
                    :class="{ fieldErrorBorder: phoneError }"
                  >
                    {{ phoneValidationErrorMessage }}
                  </span>
                </div>
              </div>

              <div class="sm:col-span-4">
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-secondary-900"
                  >Email address</label
                >
                <div class="mt-2">
                  <!-- @keyup="validateemailError" -->
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    v-model="customerDetails.email"
                    @blur="validateemailError"
                    class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                  <span
                    v-if="emailError"
                    :class="{ fieldErrorBorder: emailError }"
                  >
                    {{ emailValidationErrorMessage }}
                  </span>
                </div>
              </div>

              <!-- country -->
              <div class="sm:col-span-3">
                <label
                  for="country"
                  class="block text-sm font-medium leading-6 text-secondary-900"
                  >Country</label
                >
                <div class="mt-2">
                  <input
                    v-model="customerDetails.address.country"
                    id="country"
                    name="country"
                    type="text"
                    autocomplete="country"
                    class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <!-- state  -->
              <div class="sm:col-span-3">
                <label
                  for="state"
                  class="block text-sm font-medium leading-6 text-secondary-900"
                  >State</label
                >
                <div class="mt-2">
                  <input
                    v-model="customerDetails.address.state"
                    id="state"
                    name="state"
                    type="text"
                    autocomplete="state"
                    class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="city"
                  class="block text-sm font-medium leading-6 text-secondary-900"
                  >City</label
                >
                <div class="mt-2">
                  <input
                    v-model="customerDetails.address.city"
                    type="text"
                    name="city"
                    id="city"
                    autocomplete="address-level1"
                    class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="sm:col-span-3 md:col-start-4">
                <label
                  for="postal-code"
                  class="block text-sm font-medium leading-6 text-secondary-900"
                  >Postal code</label
                >
                <div class="mt-2">
                  <input
                    v-model="customerDetails.address.postal_code"
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autocomplete="postal-code"
                    class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div class="col-span-full">
                <label
                  for="street-address"
                  class="block text-sm font-medium leading-6 text-secondary-900"
                  >Street address</label
                >
                <div class="mt-2">
                  <input
                    v-model="customerDetails.address.line1"
                    type="text"
                    name="street-address"
                    id="street-address"
                    autocomplete="street-address"
                    class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="pl-6 md:pl-1 mb-4 md:mt-2 flex items-center justify-center md:justify-end gap-x-6"
        >
          <router-link class="justify-start" :to="{ name: 'customers' }">
            <button
              type="button"
              class="text-sm font-semibold leading-6 text-secondary-900"
            >
              Cancel
            </button>
          </router-link>

          <button
            type="submit"
            :disabled="validationError"
            @click.prevent="saveCustomer"
            class="rounded-md bg-primary-600 px-3 py-1 mt-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    <div v-else>
      <p class="text-lg md:text-xl m-4 text-green-500 font-bold leading-4">
        {{ createCustomerResponse }}
      </p>
    </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { ref, inject } from 'vue';
  import {useRouter} from 'vue-router'
  const router = useRouter()
  const baseURL = inject('NETLIFY_FUNCTIONS_URL');

  const customerDetails = ref({
    fullName: '',
    email: '',
    phone: '',
    address: {
      country: '',
      state: '',
      city: '',
      postal_code: '',
      line1: '',
    },
  });
  const createCustomerResponse = ref('');
  const customerCreated = ref(false);
  //

  const validationError = ref(true);
  const fullNameValidationErrorMessage = ref('');
  const phoneValidationErrorMessage = ref('');
  const emailValidationErrorMessage = ref('');

  const fullNameError = ref(false);
  const phoneError = ref(false);
  const emailError = ref(false);

  //validateFullname
  const validateFullname = () => {
    customerDetails.value.fullName.trim();
    if (
      customerDetails.value.fullName === '' ||
      customerDetails.value.fullName.length < 3
    ) {
      validationError.value = true;
      fullNameValidationErrorMessage.value = `Full name must contain at least three characters `;
      fullNameError.value = true;
      return true;
    } else {
      validationError.value = false;
      fullNameValidationErrorMessage.value = '';
      fullNameError.value = false;
      return false;
    }
  };
  //

  //validatephoneError
  const validatephoneError = () => {
    customerDetails.value.phone.trim();
    if (
      customerDetails.value.phone === '' ||
      customerDetails.value.phone.length < 6
    ) {
      validationError.value = true;
      phoneValidationErrorMessage.value = `Phone number must contain at least six characters `;
      phoneError.value = true;
      return true;
    } else {
      validationError.value = false;
      phoneValidationErrorMessage.value = '';
      phoneError.value = false;
      return false;
    }
  };

  //validateEmailError
  const validateemailError = () => {
    customerDetails.value.email.trim();
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!customerDetails.value.email.match(validRegex)) {
      validationError.value = true;
      emailValidationErrorMessage.value = ` Invalid email format `;
      emailError.value = true;
      return true;
    } else {
      validationError.value = false;
      emailValidationErrorMessage.value = '';
      emailError.value = false;
      return false;
    }
  };

  const updateLocalStorage = async (customer: any) => {
    // @ts-ignore
    if (JSON.parse(localStorage.getItem('stripeCustomers'))) {
      // @ts-ignore
      let customers = await JSON.parse(localStorage.getItem('stripeCustomers'));
      customers.unshift(customer);
      await localStorage.setItem('stripeCustomers', JSON.stringify(customers));
      return;
    } 
    // else {
    //   // create stripeCustomers localStorage for first customer
    //   await localStorage.setItem('stripeCustomers', JSON.stringify(customer));

    // }
  }
const redirectHome =  () => {
  setTimeout( () => {
    router.push(`/customers`);
      } , 2500)
  }

  const saveCustomer = async () => {
    if (!validationError.value) {
      var customer = Object.assign({}, customerDetails.value);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customer }),
      };
      try {
        const response = await fetch(`${baseURL}/createCustomer`,requestOptions);

        await response.json().then((data) => {
          switch (response.status) {
            case 200:
              createCustomerResponse.value =
                'customer already exists. Try a different email';
              customerCreated.value = false;
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              break;
            case 201:
              createCustomerResponse.value = 
              'customer created successfully. In a few secs you will be redirected back';
              const localStorageUpdated = updateLocalStorage(
                data.customerCreate
              );
              customerCreated.value = true;
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              redirectHome()
              break;
            default:
              createCustomerResponse.value = `issue creating new customer. return status is ${data}`;
              customerCreated.value = false;
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              break;
          }
        });
      } catch (err) {
        createCustomerResponse.value = `there was an error creating the customer: ${err}`;
        customerCreated.value = false;
      }
    }
  };
</script>

<style scoped>
  .inputError {
    color: red;
  }
  .inputOk {
    color: blue;
  }
</style>
