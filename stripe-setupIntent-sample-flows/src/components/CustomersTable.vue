<template>
  <div>
    <div class="flex flex-col md:flex-row">
      <div class="flex flex-col">
        <div
          class="text-lg md:text-xl mb-2 flex md:flex-row md:ml-10 md:mt-4 text-secondary-700"
        >
          List of Stripe Users:
        </div>
        <div
          class="mb-2 flex md:flex-row md:ml-10 md:mt-4 md:text-normal text-sm text-secondary-600"
        >
          Select a user to get additional information and perform actions
        </div>
      </div>
      <div class="flex justify-center  md:justify-end align-middle mt-3 md:mt-4 ml-5 md:ml-4">
        <router-link            
          :to="{ name:'AddCustomer'}">
             <button           
             class="btn text-center text-2xl md:text-lg font-semibold px-4
             ">Add Customer</button>
            </router-link>

      </div>
    </div>

    <div class="p-5 h-screen grid grid-cols-1">
      <div class="overflow-auto rounded-lg shadow hidden md:block">
        <table class="w-full">
          <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th
                class="w-20 p-3 text-sm font-semibold tracking-wide text-left"
              >
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
              <th
                class="w-24 p-3 text-sm font-semibold tracking-wide text-left"
              >
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
      <div class="grid grid-cols-1 col-start-2 gap-4 md:hidden">
        <div
          v-for="user in users"
          :key="user.id"
          class="bg-white space-y-3 p-4 rounded-lg  hover:scale-105 w-[250px]
          shadow-sm border-2"
        >
          <router-link
            :to="{
              name: 'customer-details',
              params: { id: user.id },
            }"
          >
            <div class="flex flex-row space-x-2 text-xs py-2 bg-secondary-200 rounded-2xl">
              <i class="fa-solid fa-user text-secondary-200"></i>
              <div class="flex justify-start basis-1/2 align-middle">
                <p class="text-secondary-500 font-bold hover:underline
                
                ">
                  {{ user.name }}
                </p>
              </div>
            </div>

              <div
                class="flex flex-row items-center text-xs mb-2 pb-2 mt-6">
              <div>
                <i class="fa-regular fa-calendar text-secondary-200 "> </i>
                {{ createDateFunc(user.created) }}
              </div>
            </div>
            
            <div class="flex items-center text-xs text-gray-700 mb-2">
              <div>
                <i class="fa-regular fa-envelope"></i>
                {{ user.email }}
              </div>
            </div>
            <div
              v-if="user.phone"
              class="flex items-center text-xs text-gray-700 my-2"
            >
              <div>
                <i class="fa-solid fa-phone"></i>
                {{ user.phone }}
              </div>
            </div>
            <hr class="border-1 border-slate-200 mt-5" />
            <div class="text-sm font-medium text-black mt-2">
              <i class="fa-solid fa-info"></i>
              <span class="text-blue-400 text-xs pl-1">
                View full profile</span
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
