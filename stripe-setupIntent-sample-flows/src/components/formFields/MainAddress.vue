<template>
  <div>
    <label
      for="address"
      class="block text-sm font-medium text-gray-700"
    ></label>
    <div class="mt-1">
      <input
        placeholder="Address"
        type="text"
        name="address"
        id="address"
        autocomplete="street-address"
        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{ fieldErrorBorder: fieldError }"
      />
    </div>
    <div class="fieldErrorMessage" v-if="error.Address">
      {{ error.Address }}
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue';
  // @ts-ignore
  import FormValidation from '@/utils/checkout/FormValidations.js';
  export default {
    setup() {
      let input = ref('');
      let fieldError = ref(false);

      const { validateAddressField, error } = FormValidation();
      const validateInput = () => {
        validateAddressField('Address', input.value, 10);
        error.Address === undefined || error.Address === ''
          ? (fieldError.value = false)
          : (fieldError.value = true);
      };

      return { input, error, validateInput, fieldError };
    },
  };
</script>

<style></style>
