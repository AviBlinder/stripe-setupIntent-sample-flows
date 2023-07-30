<template>
  <main class="viewSize">
    <div
      class="flex flex-row 
       align-middle p-2 w-full  mr-8 m-4 text-center"
    >
    <!--  -->
        <i class="fa-solid fa-question-circle 
        aria-hidden='true'
        text-2xl 
        text-primary-400 mt-3 
          cursor-pointer"
          @click="toggleModal"
        ></i>
        <!-- v-if="router.query.preview" -->
      <SetupintentModal
        :modalActive="modalActive"
        @close-modal="toggleModal"
      >
      </SetupintentModal>
    <!--  -->
      <router-link 
      class="justify-start"
      :to="{ name: 'addSetupintent' }">
        <button class="btn text-center text-sm font-semibold">
          Add Setup Intent
        </button>
      </router-link>

            <div>
          <Suspense>
            <router-link
              :to="{
                name: 'wallet',
                params: { id: id },
                query: { name: user.name },
              }"
            >
              <button class="btn">Show Credit Cards</button>
            </router-link>
          </Suspense>
      </div>

    </div>
    

    <div class="text-2xl">Customer Details</div>
    <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
      <div class="border-t border-gray-200">
        <dl>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Full name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ user.name }}
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Description</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ user.description }}
            </dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Email address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ user.email }}
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Balance</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ user.balance }}
            </dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div v-if="user.address">
                <span v-show="user.address.city"> {{ user.address.city }}</span>
                <span v-show="user.address.line1">
                  - {{ user.address.line1 }}</span
                >
                <br />
                <span v-show="user.address.postal_code">
                  Code: {{ user.address.postal_code }}</span
                >
              </div>
            </dd>
          </div>
        </dl>
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import SetupintentModal from '../components/SetupintentModal.vue';


  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const route = useRoute();

  const user = ref({});
  const modalActive = ref(false);
  const toggleModal = () => {
    modalActive.value = !modalActive.value;
};

  onMounted(async () => {
    const id = route.params.id;
    const response = await fetch(
      `${BACKEND_BASE_URL}/stripe/v1/customers/${id}`
    );
    user.value = await response.json();
    console.log(user.value);
  });
</script>

<style scoped></style>
