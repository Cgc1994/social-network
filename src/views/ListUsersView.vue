<template>
  <div v-if="loaded" class="list-users-container">
    <h1>Listado de usuarios</h1>
    <ul class="user-list">
      <li v-for="user in users" :key="user.id" class="user-item">
        <a @click="navigateToUser(user.id)" class="user-link">{{ user.name }}</a>
      </li>
    </ul>
    <br>
    <div v-if="recentlyVisitedAlbums.length">
      <h4>Álbumes recién visitados</h4>
      <table class="recently-visited-table">
        <thead>
          <tr>
            <th>Autor</th>
            <th>Álbum</th>
            <th>Fecha de visita</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="album in recentlyVisitedAlbums" :key="album.id">
            <td>{{ album.name }}</td>
            <td>{{ album.title }}</td>
            <td>{{ album.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else class="loading-indicator">
    Loading...
  </div>
</template>

<script>
export default {
  name: 'ListUsersView',
  data() {
    return {
      users: [],
      loaded: false,
      recentlyVisitedAlbums: [],
    };
  },
  async beforeMount() {
    await this.fetchUsers();
    this.loadRecentlyVisitedAlbums();
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
    navigateToUser(userId) {
      this.$router.push({ name: 'single-user', params: { id: userId } });
    },
    loadRecentlyVisitedAlbums() {
      const recentlyVisitedAlbums = JSON.parse(localStorage.getItem('recentlyVisitedAlbums')) || [];
      this.recentlyVisitedAlbums = recentlyVisitedAlbums;
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

.recently-visited-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.recently-visited-table th, .recently-visited-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.recently-visited-table th {
  background-color: #f2f2f2;
}

.loading-indicator {
  text-align: center;
  margin-top: 20px;
  font-size: 1.2em;
  color: #555;
}
</style>