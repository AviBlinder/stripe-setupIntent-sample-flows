<template>
  <div>
    <div>
      <label
        for="email-address"
        class="block text-sm font-medium text-gray-700"
      ></label>
      <div class="mt-1">
        <input
          type="email"
          id="email-address"
          name="email-address"
          autocomplete="email"
          placeholder="Email"
          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
          v-model="input"
          @keyup="validateInput"
          @blur="$emit('update:modelValue', $event.target.value)"
          @input="$emit('update:modelValue', $event.target.value)"
          :class="{ fieldErrorBorder: fieldError }"
        />
      </div>
    </div>
    <div class="fieldErrorMessage" v-if="error.email">
      {{ error.email }}
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

      const { validateEmailField, error } = FormValidation();
      const validateInput = () => {
        validateEmailField('email', input.value);
        error.email === undefined || error.email === ''
          ? (fieldError.value = false)
          : (fieldError.value = true);
      };

      return { input, error, validateInput, fieldError };
    },
  };
</script>
