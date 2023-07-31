<template>
  <div>
  <h1 class="text-xl mb-2">Your users:</h1>
  <div class="p-5 h-screen grid grid-cols-1">
    <div class="overflow-auto rounded-lg shadow hidden md:block">
      <table class="w-full">
        <thead class="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left">
              Name
            </th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">
              Created On
            </th>
            <th
              class="w-24 text-sm font-semibold tracking-wide text-left font-sans"
            >
              <span class="pl-6">Email </span>
            </th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">
              Phone
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            class="bg-white hover:bg-slate-300"
            v-for="user in users"
            :key="user.id"
          >
            <td
              class="p-3 text-sm text-secondary-400 whitespace-nowrap hover:underline"
            >
              <router-link
                :to="{
                  name: 'customer-details',
                  params: { id: user.id },
                }"
              >
                {{ user.name }}
              </router-link>
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <router-link
                :to="{
                  name: 'customer-details',
                  params: { id: user.id },
                }"
              >
                {{ createDateFunc(user.created) }}
              </router-link>
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <router-link
                :to="{
                  name: 'customer-details',
                  params: { id: user.id },
                }"
              >
                <span
                  class="p-1.5 text-xs font-medium uppercase tracking-wider text-secondary-400 rounded-lg bg-opacity-50"
                >
                  {{ user.email }}</span
                >
              </router-link>
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <router-link
                :to="{
                  name: 'customer-details',
                  params: { id: user.id },
                }"
              >
              <span v-if="user.phone">
              {{ user.phone }}
              </span>
              <span v-else> N/A</span>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- on non-mobile devices - the cards will be hidden -->
    <div class="grid grid-cols-1  col-start-2 gap-4 md:hidden ">
      <div
        v-for="user in users"
        :key="user.id"
        class="bg-white space-y-3 p-4 rounded-lg shadow hover:scale-105 "
      >
        <router-link
          :to="{
            name: 'customer-details',
            params: { id: user.id },
          }"
        >
          <div class="flex flex-row space-x-2 text-sm mb-2">
            <i class="fa-solid fa-user text-secondary-200"></i>
            <div class="flex justify-start basis-1/2 align-middle">
              <p class="text-secondary-500 font-bold hover:underline">
                {{ user.name }}
              </p>
            </div>
            <div class="flex text-gray-500 justify-end basis-1/2 align-middle">
              <i class="fa-regular fa-calendar text-secondary-200 px-1"> </i>
              {{ createDateFunc(user.created) }}
            </div>
          </div>
          <div class="flex items-center text-sm text-gray-700 mb-2">
            <div>
              <i class="fa-regular fa-envelope"></i>
              {{ user.email }}
            </div>
          </div>
          <div
            v-if="user.phone"
            class="flex items-center text-sm text-gray-700 my-2"
          >
            <div>
              <i class="fa-solid fa-phone"></i>
              {{ user.phone }}
            </div>
          </div>
          <hr class="border-1 border-slate-200 mt-5" />
          <div class="text-sm font-medium text-black my-4">
            <i class="fa-solid fa-info"></i>
            <span class="text-blue-400 text-sm pl-1">
              Click for additional details</span
            >
          </div>
        </router-link>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // const users = defineProps<User>()

  const props = defineProps({
    users: [Object],
  });

  console.log('users: ', props.users);

  const createDateFunc = function (linuxDate: number) {
    console.log(linuxDate);
    const longDate = new Date(linuxDate * 1000);
    console.log('longDate :', longDate);
    return (
      longDate.getDate() +
      '/' +
      longDate.getMonth() +
      '/' +
      longDate.getFullYear()
    );
  };
</script>

<style scoped></style>
