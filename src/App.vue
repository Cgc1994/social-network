<template>
  <Navbar />
  <ListUsersView/>
  <router-view></router-view>
  <!-- <SingleUserView msg="Welcome to Your Vue.js App"/> -->
</template>

<script>
import Navbar from './components/Navbar.vue';
import ListUsersView from './views/ListUsersView.vue';
// import SingleUserView from './SingleUserView.vue';

export default {
  name: 'App',
  components: {
    ListUsersView,
    // SingleUserView
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
