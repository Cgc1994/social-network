<template>
  <div class="navbar">
    <router-link to="/">Main Page</router-link>
    <div class="navbar-links">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
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
.navbar-links router-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
</style>