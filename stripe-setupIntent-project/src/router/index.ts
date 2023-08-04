import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import CustomersView from '../views/CustomersList.vue'
import CustomerDetails from '../views/CustomerDetails.vue';
import Wallet from '../views/WalletView.vue';
import SuccessSetupIntent from '../views/SuccessSetupIntent.vue'
import About from '../views/AboutView.vue';

import Sandbox from '../views/Sandbox.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CustomersView,
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomersView,
    },
    {
      path: '/customers/:id',
      name: 'customer-details',
      component: CustomerDetails,
    },
    {
      path: '/wallet/:id',
      name: 'wallet',
      component: Wallet,
    },
    {
      path: '/SuccessSetupIntent',
      name: 'SuccessSetupIntent',
      component: SuccessSetupIntent,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/addCustomer',
      name: 'AddCustomer',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddCustomer.vue'),
    },
    {
      path: '/addSetupintent/:id',
      name: 'addSetupintent',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddSetupintent.vue'),
    },
    {
      path: '/sandbox',
      name: 'sandbox',
      component: Sandbox,
    },
  ],
});

export default router
