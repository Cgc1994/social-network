<template>
  <div class="album-photos-container">
    <h2>Fotos del Álbum {{ albumTitle }}</h2>
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Foto</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="photo in photos" :key="photo.id">
          <td>{{ photo.title }}</td>
          <td>
            <img :src="photo.thumbnailUrl" :alt="photo.title" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AlbumPhotosView',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      albumTitle: '',
      photos: [],
    };
  },
  async beforeMount() {
    const recentlyVisitedAlbums = JSON.parse(localStorage.recentlyVisitedAlbums);
    const foundAlbum = recentlyVisitedAlbums.find((item) => item.id === Number(this.id));
    if (foundAlbum) {
      this.albumTitle = foundAlbum.title.toUpperCase();
    }
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${this.id}/photos`);
    this.photos = await response.json();
  },
};
</script>

<style scoped>
.album-photos-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}
h2 {
  color: #333;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
img {
  max-width: 100%;
  height: auto;
}
</style>