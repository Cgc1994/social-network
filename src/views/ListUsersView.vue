<template>
  <div v-if="loaded" class="list-users-container">
    <h1>List of Users</h1>
    <ul class="user-list">
      <li v-for="user in users" :key="user.id" class="user-item">
        <router-link :to="'/user/' + user.id" class="user-link">{{ user.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ListUsersView',
  data() {
    return {
      users: [],
      loaded: false,
    };
  },
  async beforeMount() {
    await this.fetchUsers();
    this.loaded = true;
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/');
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    },
  },
};
</script>

<style scoped>
.list-users-container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #333;
}

.user-list {
  list-style: none;
  padding: 0;
}

.user-item {
  margin-bottom: 10px;
}

.user-link {
  text-decoration: none;
  color: #007BFF;
  font-weight: bold;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.3s ease;
}

.user-link:hover {
  border-bottom: 2px solid #007BFF;
}
</style>