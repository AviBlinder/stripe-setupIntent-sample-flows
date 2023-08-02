<template>
  <div>
      Congrats! Setup Intent successfully created

      <!-- {{ setup_intent }}

      {{ setup_intent_client_secret }} -->
  </div>
</template>

<script setup>

import {ref} from 'vue'
import { useRoute } from 'vue-router'

  const route = useRoute();
  const setup_intent  = ref(route.query.setup_intent)
  const setup_intent_client_secret = ref(route.query.setup_intent_client_secret)

</script>

<style scoped>

</style>