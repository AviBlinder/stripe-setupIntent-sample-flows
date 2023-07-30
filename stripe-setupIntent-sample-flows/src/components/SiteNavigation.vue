<template>

<header class="sticky top-0 shadow-lg max-w-full min-w-full ">
    <nav
      class="flex flex-col sm:flex-row items-center gap-4
       text-secondary-600 py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-credit-card text-sk text-2xl pl-2"></i>
          <p class="text-2xl">Stripe Customers and Intents</p>
        </div>
      </RouterLink>
      <router-link :to="{name: 'view1'}"> view1 </router-link>
      <router-link :to="{name: 'view2'}"> view2 </router-link>
      <router-link :to="{name: 'view3'}"> view3 </router-link>
      <router-link :to="{name: 'view4'}"> view4 </router-link>

    <RouterLink to="/about">About</RouterLink>

    </nav>
  </header>
</template>