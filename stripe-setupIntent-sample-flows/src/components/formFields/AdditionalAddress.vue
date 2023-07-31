<template>
  <div>
    <label
      for="apartment"
      class="block text-sm font-medium text-gray-700"
    ></label>
    <div class="mt-1">
      <input
        placeholder="Apartment, suite, etc. (optional)"
        type="text"
        name="apartment"
        id="apartment"
        class="placeholder-opacity-75 placeholder-gray-500 block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
        v-model="input"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue';
  export default {
    setup() {
      let input = ref('');

      return { input };
    },
  };
</script>

<style></style>
