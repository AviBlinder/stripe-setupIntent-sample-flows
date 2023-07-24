<template>
  <div>
    <h3>Customer Details</h3>
    <p>{{ $route.params.id }}</p>

    <p v-if="user">email: {{ user }}</p>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const user = ref(null);

  onMounted(() => {
    const id = route.params.id;

    fetch(`https://reqres.in/api/users/${id}`)
      .then((response) => response.json())
      .then((res2) => {
        user.value = res2.data;
      });
  });
</script>

<style scoped></style>
