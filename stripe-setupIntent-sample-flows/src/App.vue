<script setup lang="ts">
</script>

<template>
  <div class=" w-screen">
        <nav class="inline-block min-w-full m-6">

          <button class="btn">
            <RouterLink to="/">Home</RouterLink>
          </button >
          <button class="btn">
            <RouterLink to="/about">About</RouterLink>
          </button >
        </nav>
<div class="w-2/4 mx-9">
  <RouterView />
</div>
  </div>
</template>

<style scoped>

</style>
