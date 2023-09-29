import { reactive } from "vue";
import axios from 'axios';

export const state = reactive({

    urlMovieInfo: 'https://api.themoviedb.org/3/search/movie?api_key=f8440c94019485ae649439c217a34225&language=it_IT&query=',

    movies: [],
    research: '',
    original_language: '',

    // mi permette di fare una chiamata a uno specifico indirizzo
    // url serve per passare un imput generico (può avere un nome di fantasia me meglio richiamare argomento)
    fetchMovieName(url) {

        // con questo metodo effetuo una chiamata , per prendre un dato
        // passo lo stesso paramtro(url) il metodo è riutilizzabile
        axios
            .get(url)
            .then(res => {
                console.log(res.data + 'ecco il response');
                this.movies = res.data.results;
                console.log(this.movies);
            })

        /* .catch(error => {
            console.error(error);
        }) */

    },

})

