<template>
    <main class="viewSize">
      <button class="btn-sm md:btn"     
      @click="$router.go(-1)"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back to Customer Details</button>

      <router-link 
      class="justify-start"
      :to="{ name: 'customers' }">
        <button class="btn-sm md:btn">
          <i class="fa fa-user" aria-hidden="true"></i>
          Back to Customers
        </button>
      </router-link>

  <div>
    <p> Add Setup Intent</p>
  </div>
  </main>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>