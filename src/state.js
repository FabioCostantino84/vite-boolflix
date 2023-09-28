import { reactive } from "vue";
import axios from 'axios';

export const state = reactive ({

    urlMovie: 'https://api.themoviedb.org/3/search/movie?api_key=f8440c94019485ae649439c217a34225&language=it_IT&query=',
    
    fetchMovieName(url) {


        axios
            .get(url)
            .then(response => {

                this.movies = response.data.results
                console.log(response.data.results);

            })
            .catch(error => {
                console.error(error);
            })

    },
    
})

