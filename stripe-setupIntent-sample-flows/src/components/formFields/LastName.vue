<template>
  <div>
    <label
      for="last-name"
      class="block text-sm font-medium text-gray-700"
    ></label>
    <div class="mt-1">
      <input
        placeholder="last name"
        type="text"
        id="last-name"
        name="last-name"
        autocomplete="family-name"
        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{ fieldErrorBorder: fieldError }"
      />
    </div>
    <div
      class="fieldErrorMessage"
      v-if="error.lastName"
    >
      {{ error.lastName }}
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

      const { validateLastNameField, error } = FormValidation();
      const validateInput = () => {
        validateLastNameField('lastName', input.value, 2);
        error.lastName === undefined || error.lastName === ''
          ? (fieldError.value = false)
          : (fieldError.value = true);
      };

      return { input, error, validateInput, fieldError };
    },
  }
  </script>
