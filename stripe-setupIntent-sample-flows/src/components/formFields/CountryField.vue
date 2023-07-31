<template>
<div>
  <label for="country" class="block text-sm font-medium text-gray-700"></label>
  <div class="mt-1">
    <select
      id="country"
      name="country"
      autocomplete="country-name"
      placeholder="Country"
      class="block w-full border-gray-300 rounded-md shadow-sm 
      focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
       v-model="input"
       @input="$emit('update:modelValue', $event.target.value)"
       @blur="$emit('update:modelValue', $event.target.value)"
    >
      <!-- <option data-code="US" value="United States">United States</option> -->
      <option v-for="country in countriesList" :key="country.name">
        {{country.name}}
      </option>
    </select>
  </div>
  </div>
</template>
<script>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';

  export default {
    setup() {
      let input = ref("Israel")

      const store = useStore();

      return {
        input,
        countriesList: computed(
          () => store.getters['general/getcountriesList']
        ),
      };
    },
  };
</script>
