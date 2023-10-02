import { reactive } from "vue";
import axios from 'axios';

export const state = reactive({

    // url multi
    /* base_url: 'https://api.themoviedb.org/3/search/multi?api_key=f8440c94019485ae649439c217a34225&language=it_IT&query=', */

    base_url: 'https://api.themoviedb.org/3/',

    // variabile dove assegnamo il percorso della chiamata al sito (meglio [] rispetto '')
    movies_endpoint: 'search/movie',
    tv_endpoint: 'search/tv',
    api_key: 'f8440c94019485ae649439c217a34225',
    query: '',
    movies: [],
    tvS: [],
    // variabile dove viene restituito il testo scritto nell'input sotto forma di stringa
    research: '',

    original_language: '',

    // mi permette di fare una chiamata a uno specifico indirizzo
    // url serve per passare un imput generico (può avere un nome di fantasia me meglio richiamare argomento)
    fetchMovies(url) {

        // con questo metodo effetuo una chiamata , per prendre un dato
        // passo lo stesso paramtro(url) il metodo è riutilizzabile
        axios
            .get(url)
            .then(res => {
                this.movies = res.data.results;
                console.log(this.movies);
            })

            .catch(error => {
                console.error(error);
            })

    },

    fetchTv(url) {
        axios
            .get(url)
            .then(res => {
                this.tvS = res.data.results;
                console.log(this.tvS);
            })

            .catch(error => {
                console.error(error);
            })

    },

})

