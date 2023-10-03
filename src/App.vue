<script>
import { state } from './state.js';
import HeaderApp from './components/HeaderApp.vue';
import CardApp from './components/CardApp.vue';


export default {
  components: {
    HeaderApp,
    CardApp,
  },
  name: 'App',
  data() {
    return {
      state,
    }
  },

  //metodo per filtrare i contenuti
  methods: {
    getData() {
      const url_movies = this.state.base_url + this.state.movies_endpoint + `?api_key=${this.state.api_key}&query=${this.state.query}`;
      this.state.fetchMovies(url_movies)

      const url_tv = this.state.base_url + this.state.tv_endpoint + `?api_key=${this.state.api_key}&query=${this.state.query}`;
      this.state.fetchTv(url_tv)

      this.state.query = '';


    }
    /* searchFilter() {
      const urlMovie = this.state.movie_base_url + this.state.research;

      // a questa variabile gli assegno la funzione fetchContentLists con il parametro da filtrare (urlMovie)
      let resultMovie = this.state.fetchContentLists(urlMovie)

      //console.log(resultMovie)
      // mi restituisce una stringa vuota nel mio input
      this.state.research = '';
    }, */
  },
}

</script>



<template>
  <HeaderApp></HeaderApp>

  <div class="container">
    <div class="container">
      <div class="row">

        <CardApp></CardApp>

      </div>
    </div>
  </div>
</template>




<style lang="scss">

</style>
