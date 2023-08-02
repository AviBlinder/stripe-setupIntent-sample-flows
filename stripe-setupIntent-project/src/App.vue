<template>
  <div class="flex flex-col min-h-screen">

    <SiteNavigation/>

    <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" />
      </Transition>
    </RouterView>

  </div>

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteNavigation from './components/SiteNavigation.vue'

</script>


