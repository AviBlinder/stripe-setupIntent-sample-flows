<template>
  <header
    class="sticky top-0 max-w-full min-w-full bg-secondary-200 rounded-sm md:mt-3">
    <div class="flex flex-row md:flex-row gap-2 m-2 justify-around">
      <div class=" items-center gap-3 text-secondary-700 ">
        <RouterLink :to="{ name: 'home' }" class="flex flow-row justify-evenly" >
            <i class="fa-solid fa-credit-card text-2xl pl-2 mx-4"></i>
          <p class="text-2xl md:text-2xl">Stripe Setup Intents</p>
        </RouterLink>
      </div>

      <div class="text-[24px] md:text-lg flex-inital-4 text-secondary-600 align-middle ">
        <RouterLink to="/about">
          <i class="fa-solid fa-question md:pr-4  pl-2 mx-4 "></i>
        </RouterLink>
      </div>
    </div>
  </header>
</template>
