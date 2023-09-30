import { reactive } from "vue";
import axios from 'axios';

export const state = reactive({

    movie_base_url: 'https://api.themoviedb.org/3/search/movie?api_key=f8440c94019485ae649439c217a34225&language=it_IT&query=',

    tv_base_url: 'https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=',
    // variabile dove assegnamo il percorso della chiamata al sito (meglio [] rispetto '')
    movies: [],
    // variabile dove viene restituito il testo scritto nell'input sotto forma di stringa
    research: '',

    original_language: '',

    // mi permette di fare una chiamata a uno specifico indirizzo
    // url serve per passare un imput generico (può avere un nome di fantasia me meglio richiamare argomento)
    fetchContentLists(url) {

        // con questo metodo effetuo una chiamata , per prendre un dato
        // passo lo stesso paramtro(url) il metodo è riutilizzabile
        axios
            .get(url)
            .then(res => {
                this.movies = res.data.results;
                console.log(this.movies);
            })

        /* .catch(error => {
            console.error(error);
        }) */

    },

})

