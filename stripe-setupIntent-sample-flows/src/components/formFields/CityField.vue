<template>
  <div>
    <label for="city" class="block text-sm font-medium text-gray-700"></label>
    <div class="mt-1">
      <input
        placeholder="City"
        type="text"
        name="city"
        id="city"
        autocomplete="address-level2"
        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{ fieldErrorBorder: fieldError }"
      />
    </div>
    <div class="fieldErrorMessage" v-if="error.City">
      {{ error.City }}
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue';
  // @ts-ignore
  import FormValidation from '@/utils/checkout/FormValidations.js';
  export default {
    props: {
      isRequired: {
        type: Boolean,
        required: true,
        default: false,
      },
    },

    setup() {
      let input = ref('');
      let fieldError = ref(false);

      const { validateCityField, error } = FormValidation();
      const validateInput = () => {
        validateCityField('City', input.value, 2);
        error.City === undefined || error.City === ''
          ? (fieldError.value = false)
          : (fieldError.value = true);
      };
      return { input, error, validateInput, fieldError };
    },
  };
</script>

<style></style>
