<script>

import { state } from './state.js'

export default {
  name: 'App',
  data() {
    return {
      state,
    }
  },
  methods: {
    searchFilmInfo() {
      const urlMovie = this.state.urlMovieInfo + this.state.research;
      let resultMovie = this.state.fetchMovieName(urlMovie)
      //console.log(resultMovie)
      // mi restituisce una stringa vuota nel mio input
      this.searchFilmInfo = '';
    },
  },
}

</script>



<template>
  <div class="container input-group mb-3">
    <input type="search"  class="form-control" placeholder="Research" aria-label="Research" aria-describedby="button-addon2"
      v-model="state.research">
    <button class="btn btn-outline-secondary" @click="searchFilmInfo()" type="button" id="button-addon2">Cerca</button>
  </div>

  <ul>
    <h1>FILM</h1>
    
    <li v-for="movie in this.state.movies">
      <div>TITOLO: {{ movie.title }} </div>
      <div>TITOLO ORIGINALE: {{ movie.original_title }}</div>
      <div>VOTO: {{ Math.floor(movie.vote_average)}}</div>
      <div>LINGUA: {{ movie.original_language.toUpperCase() }}</div>
    </li>
  </ul>
</template>




<style lang="scss">
@use './assets/scss/app.scss'
</style>
