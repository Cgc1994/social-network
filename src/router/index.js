// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ListUsersView from '@/views/ListUsersView.vue';
import SingleUserView from '@/views/SingleUserView.vue';
import AlbumPhotosView from '@/views/AlbumPhotosView.vue';

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
  },
  {
    path: '/album/:id/photos',
    component: AlbumPhotosView,
    name: 'album-photos',
    props: route => ({ id: route.params.id }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;