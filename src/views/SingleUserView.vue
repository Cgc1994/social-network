<template>
  <div v-if="loaded" class="single-user-container">
    <h1>{{ user.name }}</h1>
    <p>User: {{ user.username }}</p>
    <p>Email: {{ user.email }}</p>
    <p>City: {{ user.address.city }}</p>
    <p>Website: {{ user.website }}</p>
    <p>Company name: {{ user.company.name }}</p>

    <h2>Álbumes</h2>
    <ul>
      <li v-for="album in albums" :key="album.id">
        {{ album.title.toUpperCase() }}
        <img v-if="album.photos.length > 0" :src="album.photos[0].thumbnailUrl" alt="Thumbnail" />
        <h5>Fotos del álbum</h5>
        <ul>
          <li v-for="photo in album.photos" :key="photo.id">{{ photo.title }}</li>
        </ul>
      </li>
    </ul>

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
</style>