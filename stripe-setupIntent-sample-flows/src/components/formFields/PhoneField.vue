<template>
  <div>
    <label for="phone" class="block text-sm font-medium text-gray-700"></label>
    <div class="mt-1">
      <input
        placeholder="Phone"
        type="text"
        name="phone"
        id="phone"
        autocomplete="tel"
        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500
         focus:border-secondary-500 sm:text-sm"
        v-model="input"
        @keyup="validateInput"
        @blur="$emit('update:modelValue', $event.target.value)"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{ fieldErrorBorder: fieldError }"
      />
    </div>
    <div class="fieldErrorMessage" v-if="error.Phone">
      {{ error.Phone }}
    </div>
  </div>
</template>

<script>
  import { ref, watch } from 'vue';
  // @ts-ignore
  import FormValidation from '@/utils/FormValidations.js';
  export default {
    setup() {
      let input = ref('');
      let fieldError = ref(false);

      const { validatePhoneField, error } = FormValidation();
      const validateInput = () => {
        validatePhoneField('Phone', input.value, 6);
        error.Phone === '';
        error.Phone === undefined || error.Phone === ''
          ? (fieldError.value = false)
          : (fieldError.value = true);
      };

      watch(
        () => input.value,
        () => {
          validateInput();
        }
      );

      return { input, error, validateInput, fieldError };
    },
  };
</script>
