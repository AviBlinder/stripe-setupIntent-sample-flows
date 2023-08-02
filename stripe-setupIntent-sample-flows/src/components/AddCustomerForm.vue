<template>
<form>
    <div class="space-y-2 md:space-y-12">

      <div class="grid grid-cols-1 gap-x-8  border-b 
      border-gray-900/10 pb-6 md:pb-8 md:grid-cols-3 ml-5 md:ml-1">
        <div>
          <h2 class="text-base font-semibold leading-7 text-secondary-900">Personal Information</h2>
          <p class="mt-1 text-sm leading-6 text-secondary-600">Use a permanent address where the customer can receive mail.</p>
        </div>

        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 md:col-span-2">
          <div class="sm:col-span-3">
            <label for="full-name" class="block text-sm font-medium leading-6 text-secondary-900">Full Name</label>
            <div class="mt-2">
              <input v-model="customerDetails.fullName"
              type="text" name="full-name" id="full-name" autocomplete="full-name" 
              class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="phone-number" class="block text-sm font-medium leading-6 text-secondary-900">Phone Number</label>
            <div class="mt-2">
              <input v-model="customerDetails.phone"
              type="text" name="phone-number" id="phone-number" autocomplete="phone-number" 
              class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="email" class="block text-sm font-medium leading-6 text-secondary-900">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" 
              v-model="customerDetails.email"
              class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm 
              ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 
              focus:ring-2 focus:ring-inset focus:ring-primary-600 
              sm:text-sm sm:leading-6" />
            </div>
          </div>

<!-- country -->
          <div class="sm:col-span-3">
            <label for="country" class="block text-sm font-medium leading-6 text-secondary-900">Country</label>
            <div class="mt-2">
              <input 
              v-model="customerDetails.address.country"
              id="country" name="country" type="text" autocomplete="country" 
              class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm 
              ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 
              focus:ring-2 focus:ring-inset focus:ring-primary-600 
              sm:text-sm sm:leading-6" />
            </div>
          </div>

<!-- state  -->
          <div class="sm:col-span-3">
            <label for="state" class="block text-sm font-medium leading-6 text-secondary-900">State</label>
            <div class="mt-2">
              <input 
              v-model="customerDetails.address.state"
              id="state" name="state" type="text" autocomplete="state" 
              class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm 
              ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 
              focus:ring-2 focus:ring-inset focus:ring-primary-600 
              sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="city" class="block text-sm font-medium leading-6 text-secondary-900">City</label>
            <div class="mt-2">
              <input 
               v-model="customerDetails.address.city"
              type="text" name="city" id="city" autocomplete="address-level1" 
              class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-2 md:col-start-4">
            <label for="postal-code" class="block text-sm font-medium leading-6 text-secondary-900">ZIP / Postal code</label>
            <div class="mt-2">
              <input 
              v-model="customerDetails.address.postal_code"
              type="text" name="postal-code" id="postal-code" autocomplete="postal-code" 
              class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

         <div class="col-span-full">
            <label for="street-address" class="block text-sm font-medium leading-6 text-secondary-900">Street address</label>
            <div class="mt-2">
              <input 
              v-model="customerDetails.address.line1"
              type="text" name="street-address" id="street-address" 
              autocomplete="street-address" 
              class="block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-secondary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>
      </div>

    
    </div>

    <div class=" pl-6 md:pl-1 md:mt-2  flex items-center justify-center md:justify-end gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-secondary-900">Cancel</button>
      <button type="submit" 
      @click.prevent="saveCustomer"
      class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
      Save
    </button>
    </div>
  </form>
</template>  