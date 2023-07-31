<template>
  <div>
    <label
      for="first-name"
      class="block text-sm font-medium text-gray-700"
    ></label>
    <div class="mt-1">
      <input
        placeholder="First name"
        type="text"
        id="first-name"
        name="first-name"
        autocomplete="given-name"
        class="block w-full border-gray-300 rounded-md shadow-sm 
        focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{ fieldErrorBorder: fieldError }"
      />
    </div>
    <div
      class="fieldErrorMessage"
      v-if="error.firstName"
    >
      {{ error.firstName }}
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

      const { validateFirstNameField, error } = FormValidation();
      const validateInput = () => {
        validateFirstNameField('firstName', input.value, 2);
        error.firstName === undefined || error.firstName === ''
          ? (fieldError.value = false)
          : (fieldError.value = true);
      };

      return { input, error, validateInput, fieldError };
    },
  }
  </script>