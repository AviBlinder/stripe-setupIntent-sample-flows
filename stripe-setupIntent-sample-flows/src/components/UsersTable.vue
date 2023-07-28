<template>
  <div>
    <!--  -->
    <div class="flex lg:flex-row sm:flex-col ">
      <div class="flex flex-col w-full m-4">
        <div class="m-2 text-xl font-semibold"> Users</div>
        <div class="mx-4 my-2"> A list of all the users in your account including their name,
              title, email and role.</div>
      </div>
        <div class="flex flex-col"> 
          <div class="hidden "> 
          </div>
        <div class="justify-end align-middle p-2 
          w-full 
           block mr-8 m-4 text-center"> 
          <button class="btn text-center text-sm font-semibold
          ">Add User</button>
          
        </div>
      </div>
    </div>
    <div class="px-4 sm:px-6 lg:px-8 border-gray-300 border-2
    flex flex-col">
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="tableColumns sm:pl-0">Name</th>
                  <th scope="col" class="tableColumns">Created Date</th>
                  <th scope="col" class="tableColumns">Email</th>
                  <th scope="col" class="tableColumns">Phone</th>
                  <th scope="col" class="tableColumns ml-6">Details</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.id">
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
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
                  <!-- <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  {{ user.name }}</td> -->
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ createDateFunc(user.created) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.email }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.phone }}
                  </td>
                  <td class="flex justify-center items-left">
                    <router-link
                      :to="{
                        name: 'customer-details',
                        params: { id: user.id },
                      }"
                    >
                      <span class="hidden hover:visible">Customer Details</span>
                      <eyeIcon
                        class="hover:bg-green-100 hover:px-10 hover:py-3 px-10 py-3 bg-white rounded-xl"
                      >
                      </eyeIcon>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import eyeIcon from '../icons/eye.vue';

  const props = defineProps(['users']);

  console.log(props.users);

  const createDateFunc = function (linuxDate) {
    console.log('createDateFunc : ', linuxDate);
    const longDate = new Date(linuxDate * 1000);
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
