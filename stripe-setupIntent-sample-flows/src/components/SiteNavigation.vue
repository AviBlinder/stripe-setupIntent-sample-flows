<template>

<header class="sticky top-0 shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4
       text-secondary-500 py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-cloud-sun-rain text-sk text-2xl"></i>
          <p class="text-2xl">Stripe Customers and Intents</p>
        </div>
      </RouterLink>

    <RouterLink to="/about">About</RouterLink>

    </nav>
  </header>
</template>

<script setup>

</script>