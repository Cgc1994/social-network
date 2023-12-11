// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ListUsersView from '@/views/ListUsersView.vue';
import SingleUserView from '@/views/SingleUserView.vue';

const routes = [
  {
    path: '/',
    component: ListUsersView,
    name: 'list-users',
  },
  {
    path: '/user/:id',
    component: SingleUserView,
    name: 'single-user',
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;