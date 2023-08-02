export const itunesSearch = async (search: string): Promise<ItunesTypes> =>
  await fetch(
    `https://itunes.apple.com/search?term=${search}&entity=album`
  ).then(val => val.json());


<template>
  <form @submit.prevent="searchItunes(searchText)">
    <input type="text" v-model="searchText" />
    <button @click="searchItunes(searchText)">Search</button>
    <div v-if="data.results">
      <div v-for="album in data.results" :key="album.artistId">
        <TheShowAlbum :album="album" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { itunesSearch } from "./services/iTunesAPI";
import { ItunesTypes } from "./types/ItunesTypes.interface";
import TheShowAlbum from "./components/TheShowAlbum.vue";

export default defineComponent({
  name: "App",
  components: {
    TheShowAlbum
  },
  setup() {
    let albums = reactive<{ data: ItunesTypes }>({ data: {} });
    let searchText = ref("");
    const searchItunes = async (search: string): Promise<void> => {
      const value = await itunesSearch(search);
      albums.data = value;
      console.log("data", albums);
    };

    return { searchItunes, ...toRefs(albums), searchText };
  }
});
</script>

<style>
</style>
