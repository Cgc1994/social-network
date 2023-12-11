<template>
  <div v-if="loaded" class="single-user-container">
    <h1>{{ user.name }}</h1>
    <p>Usuario: {{ user.username }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Ciudad: {{ user.address.city }}</p>
    <p>Website: {{ user.website }}</p>
    <p>Nombre de la compañía: {{ user.company.name }}</p>

    <h2>Álbumes</h2>
    <table class="user-table">
      <thead>
        <tr>
          <th>Nombre del Álbum</th>
          <th>Portada</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="album in albums" :key="album.id">
          <td>{{ album.title }}</td>
          <td v-if="album.photos.length > 0">
            <img :src="album.photos[0].thumbnailUrl" alt="Thumbnail" />
          </td>
          <td>
            <button @click="viewAlbum(album)">Ver Álbum</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>TODOs</h2>
    <div>
      <input v-model="newTodo" @input="validateTodo" placeholder="Nuevo TODO" />
      <button @click="addTodo" :disabled="newTodoError">Agregar</button>
      <p v-if="newTodoError" class="error-message">Solo texto, por favor.</p>
    </div>
    <div>
      <input v-model="searchText" placeholder="Buscar TODO" />
    </div>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" disabled />
        {{ todo.title }}
        <button @click="deleteTodo(todo.id)">Eliminar</button>
      </li>
    </ul>
  </div>
  <div v-else class="loading-indicator">
    Loading...
  </div>
</template>

<script>

import { getRecentlyVisitedAlbums, setRecentlyVisitedAlbums } from '@/services/localStorageService';

export default {
  name: 'SingleUserView',
  data() {
    return {
      user: {},
      albums: [],
      todos: [],
      newTodo: '',
      newTodoError: false,
      searchText: '',
      loaded: false,
      recentlyVisitedAlbums: getRecentlyVisitedAlbums(),
    };
  },
  async beforeMount() {
    const userId = this.$route.params.id;
    await Promise.all([this.fetchUserDetails(userId), this.fetchUserAlbums(userId), this.fetchUserTodos(userId)]);
    this.loaded = true;
  },
  computed: {
    filteredTodos() {
      return this.todos.filter(todo => todo.title.includes(this.searchText));
    },
  },
  methods: {
    async fetchUserDetails(userId) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data = await response.json();
        this.user = data;
      } catch (error) {
        console.error('Error al obtener detalles del usuario:', error);
      }
    },
    async fetchUserAlbums(userId) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
        const data = await response.json();
        this.albums = data.map(album => ({
          ...album,
          photos: [],
        }));
        await this.fetchUserPhotos();
      } catch (error) {
        console.error('Error al obtener álbumes del usuario:', error);
      }
    },
    async fetchUserPhotos() {
      for (const album of this.albums) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`);
        const photos = await response.json();
        album.photos = photos;
      }
    },
    async fetchUserTodos(userId) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
        const data = await response.json();
        this.todos = data;
      } catch (error) {
        console.error('Error al obtener TODOs del usuario:', error);
      }
    },
    validateTodo() {
      this.newTodoError = !/^[a-zA-Z\s]*$/.test(this.newTodo);
    },

    addTodo() {
      if (!this.newTodoError && this.newTodo.trim() !== '') {
        const newTodo = {
          userId: this.user.id,
          title: this.newTodo.trim(),
          completed: false,
          id: Date.now(),
        };
        this.todos.push(newTodo);
        this.newTodo = '';
      }
    },

    deleteTodo(todoId) {
      const index = this.todos.findIndex(todo => todo.id === todoId);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    },
    async viewAlbum(album) {
      const recentlyVisitedAlbums = JSON.parse(localStorage.getItem('recentlyVisitedAlbums')) || [];
      const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
      recentlyVisitedAlbums.push({
        id: album.id,
        name: this.user.name,
        title: album.title,
        time: new Date().toLocaleDateString('es-ES', dateOptions),
      });
      setRecentlyVisitedAlbums(recentlyVisitedAlbums);

      this.$router.push({ name: 'album-photos', params: { id: album.id } });
    },
  },
};
</script>

<style scoped>
.single-user-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}

.loading-indicator {
  text-align: center;
  margin-top: 20px;
  font-size: 1.2em;
  color: #555;
}

h1 {
  color: #333;
}
.error-message {
  color: red;
  margin-top: 5px;
}

.user-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.user-table th, .user-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.user-table th {
  background-color: #f2f2f2;
}
</style>