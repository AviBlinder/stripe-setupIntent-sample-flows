<template>
  <header 
    class="sticky top-0 max-w-full min-w-full bg-secondary-200 rounded-sm md:mt-3">
    <div class="flex flex-col md:flex-row gap-4 flex-1 justify-between align-middle m-2">
      <RouterLink :to="{ name: 'home' }">
        <div
          class="flex items-center gap-3 justif-center text-secondary-700"
        >
          <i class="fa-solid fa-credit-card text-2xl pl-2"></i>
          <p class="text-xl md:text-2xl">Stripe Customers and Intents</p>
        </div>
      </RouterLink>
      <router-link :to="{name: 'view2'}"
      class="text-xl md:text-lg"
      > view2 </router-link>
      <!-- <router-link :to="{name: 'view1'}"> view1 </router-link> 
      <router-link :to="{name: 'view3'}"> view3 </router-link>
      <router-link :to="{name: 'view4'}"> view4 </router-link> -->

      <RouterLink to="/about">
        <div
          class="flex justify-end text-xl flex-inital-4 text-secondary-700"
        >
          <i class="fa-solid fa-user md:pt-1 md:pr-4"></i>
        </div>
      </RouterLink>
    </div>
  </header>
</template>
