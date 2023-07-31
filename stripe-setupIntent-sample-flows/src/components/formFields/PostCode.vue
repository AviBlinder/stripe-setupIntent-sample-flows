<template>
  <div>
    <label
      for="postal-code"
      class="block text-sm font-medium text-gray-700"
    ></label>
    <div class="mt-1">
      <input
        placeholder="Postal code"
        type="text"
        name="postal-code"
        id="postal-code"
        autocomplete="postal-code"
        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{ fieldErrorBorder: fieldError }"
      />
    </div>
    <div class="fieldErrorMessage" v-if="error.postalCode">
      {{ error.postalCode }}
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

      const { validatePostalCodeField, error } = FormValidation();
      const validateInput = () => {
        validatePostalCodeField('postalCode', input.value, 5);
        error.postalCode === undefined || error.postalCode === ''
          ? (fieldError.value = false)
          : (fieldError.value = true);
      };

      return { input, error, validateInput, fieldError };
    },
  };
</script>
