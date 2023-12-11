<template>
  <div class="navbar">
    <router-link to="/">Main Page</router-link>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
}
.navbar-brand {
  font-size: 1.5em;
  font-weight: bold;
}
.navbar-links {
  display: flex;
  gap: 20px;
}
</style>