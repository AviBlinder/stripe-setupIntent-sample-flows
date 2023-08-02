import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import CustomersView from '../views/CustomersList.vue'
import CustomerDetails from '../views/CustomerDetails.vue';

import view1 from '../views/view1.vue'
import view2 from '../views/view2.vue'
import view3 from '../views/view3.vue'
import view4 from '../views/view4.vue'

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
      path: '/view1',
      name: 'view1',
      component: view1,
    },
    {
      path: '/view2',
      name: 'view2',
      component: view2,
    },
    {
      path: '/view3',
      name: 'view3',
      component: view3,
    },
    {
      path: '/view4',
      name: 'view4',
      component: view4,
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WalletView.vue'),
    },
    {
      path: '/SuccessSetupIntent',
      name: 'SuccessSetupIntent',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SuccessSetupIntent.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
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
