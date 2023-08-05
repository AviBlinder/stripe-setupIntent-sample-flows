<template>
  <Disclosure as="nav" class="bg-secondary-400" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
      <div class="relative flex h-8 items-center justify-between">
        <div class="flex items-center px-2 lg:px-0">
          <!-- non-mobile menu -->
          <div class="hidden lg:ml-6 lg:block">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <router-link
                :to="{ name: 'customers' }"
                class="rounded-md bg-secondary-800 px-3 py-2 text-sm font-medium text-white"
                >Customers</router-link
              >
              <router-link
                :to="{ name: 'AddCustomer' }"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Add Customer
              </router-link>
            </div>
          </div>
        </div>
        <!-- search field on mobile  -->
        <div class="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-center">
          <div class="w-full max-w-lg lg:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div
                class="pointer-events-none absolute inset-y-0 top-1 left-0 flex items-center pl-3"
              >
                <MagnifyingGlassIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                name="search"
                class="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </div>
        <!-- mobile menu -->
        <div class="flex lg:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <!-- non-mobile menu -->
        <div class="hidden lg:ml-4 lg:block">
          <div class="flex items-center">
            <router-link
              :to="{ name: 'about' }"
              class="relative flex-shrink-1 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <div class="flex flex-row align-baseline px-2">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">View notifications</span>
                <AcademicCapIcon class="h-5 w-5" aria-hidden="true"
                  >About
                </AcademicCapIcon>
                <span class="mt-1 ml-1"> About </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- mobile menu -->
    <DisclosurePanel class="lg:hidden">
      <div class="border-t border-gray-700 pb-3 pt-4">
        <div class="flex items-center px-5"></div>
        <div class="mt-3 space-y-1 px-2">
          <router-link :to="{ name: 'customers' }" class="">
            <DisclosureButton
              as="button"
              href="#"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-700 hover:text-white"
              >Customers</DisclosureButton
            >
          </router-link>
          <router-link :to="{ name: 'AddCustomer' }">
            <DisclosureButton
              as="button"
              href="#"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-700 hover:text-white"
              >Add Customer</DisclosureButton
            >
          </router-link>
          <router-link :to="{ name: 'about' }">
            <DisclosureButton
              as="button"
              href="#"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-700 hover:text-white"
              >About</DisclosureButton
            >
          </router-link>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  } from '@headlessui/vue';
  import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
  import {
    Bars3Icon,
    XMarkIcon,
    AcademicCapIcon,
  } from '@heroicons/vue/24/outline';
</script>
