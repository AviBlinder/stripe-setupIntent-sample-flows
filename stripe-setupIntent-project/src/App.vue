<template>
  <!-- <div class="flex flex-col min-h-screen"> -->
    <SiteNavigation/>

    <!-- flex-row md:flex-col  grow mt-4  -->
    <Suspense>
      <div class="max-w-full flex justify-center align-middle ">
      <RouterView  v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" />
      </Transition>
      </RouterView>
      </div>
    </Suspense>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
// import SiteNavigation from './components/SiteNavigation.vue'

</script>


