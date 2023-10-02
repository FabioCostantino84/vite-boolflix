<script>
import { state } from '../state.js';
export default {
    name: 'HeaderApp',
    data() {
        return {
            state,
        }
    },
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
    <div class="container input-group mb-3">
        <input @keyup.enter="getData" type="search" class="form-control" placeholder="Cerca il film o la serie preferita"
            aria-label="Cerca il film o la serie preferita" aria-describedby="button-addon2" v-model="state.query">
        <button class="btn btn-outline-secondary" @click="getData" type="button" id="button-addon2">Cerca</button>
    </div>
</template>


<style lang="scss" scoped></style>