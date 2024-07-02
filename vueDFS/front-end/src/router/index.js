import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/factures',
      name: 'factures',
      component: () => import('../views/Factures.vue')
    },
    {
      path: '/edit-factures/:id',
      name: 'edit-factures',
      component: () => import('../components/factures/EditFactures.vue'),
      props: true
    },
    {
      path: '/add-factures',
      name: 'add-factures',
      component: () => import('../components/factures/AddFactures.vue')
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('../views/Clients.vue')
    },
    {
      path: '/edit-client/:id',
      name: 'edit-client',
      component: () => import('../components/clients/EditClients.vue'),
      props: true
    },
    {
      path: '/add-client',
      name: 'add-client',
      component: () => import('../components/clients/AddClients.vue')
    }
  ]
});

export default router;
