<script>
import { state } from './state.js';
import HeaderApp from './components/HeaderApp.vue';

export default {
  components: {
    HeaderApp,
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
  <!-- <div class="container input-group mb-3">
    <input @keyup.enter="getData" type="search" class="form-control" placeholder="Cerca il film o la serie preferita"
      aria-label="Cerca il film o la serie preferita" aria-describedby="button-addon2" v-model="state.query">
    <button class="btn btn-outline-secondary" @click="getData" type="button" id="button-addon2">Cerca</button>
  </div> -->

  <div class="container">
    <h2>Movies</h2>
    <div class="container">
      <div class="row">

        <!-- creare un componente card -->
        <div v-for="movie in this.state.movies" class="col-2 p-0">
          <div class="card">
            <img
              :src="movie.poster_path ? 'https://image.tmdb.org/t/p/w342/' + `${movie.poster_path}` : 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Error-icon.png'"
              alt="Immagine di Copertina">

            <div class="info text-white">
              <div><b>TITOLO:</b> {{ movie.title }}</div>
              <div><b>TITOLO ORIGINALE:</b> {{ movie.original_title }}</div>

              <!-- va modificata la stampa dinamica delle bandiere -->
              <div v-if="movie.original_language.toUpperCase() === 'IT'"><b>LINGUA:</b> {{
                movie.original_language.toUpperCase()
              }}<img
                  src="data:image/png;base64,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">
              </div>

              <div v-else-if="movie.original_language.toUpperCase() === 'FR'"><b>LINGUA:</b> {{
                movie.original_language.toUpperCase()
              }}<img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGlklEQVR4nO3Z+U+TdxzA8Y4lZlkopQV3/AVLliwG8EKdHJZyFw9aaFEpLvGnLVvMlmzRpb9syTaPjeE5ERFR26qZ2eIYgsh9tJS23GfLIUehYFvQRJfwWZ7v0+fp8/R5enC6LHyTd2JMTF6fD9/nm6gczsbZOBtnxQcA3hiasG8zWx1fmacc9yxWh8lsdc5aphz/YKFfY7835bhntjq+HJyxb8X+DOd1n5BPNIJgheqUxeoctlidsMSGF8Syk3aJRLDucP5xDS9YoToXrFDNc/PUS4WTLWTIYUEsn1/IkJ+dk0h464IPydUkcfPUoxicaEUDZODNi2UTz9PlGWsnVyqDgvNUv1DhqznAApnsHCiVQauLl2g2cfPUd9jwqz+AHBviPsTkvrV6m1eo//SGX5sB5DAvlv++Kj8JrkL9oy/8Wg2wgA/x/YrwwXmaTH/4NRlAjCXDPuxFZ5rs0LLwYccecLkK9fi6DiCWkc2nZ6OcadmTc8JlPLHeXhx6KtRy8OYph1c0Ki0LLzULnClZZ5aEf/v4/fe5CvUrn3AFXojizrLwQ5N2F5oCT6PD51Ol4EyRgiNZ+nI+PfvdJWxf/W0gcLzbS4YPTjyDgfE5r2gC7kyR4CVjZX4TmF6ieTM4TzXCBnejcXhILt5S4AS+/+msF7SUgkZwcCZlgjMxczigZ5WnUEV63zYVfovMH3zIA943ZoO+0Rn/aNQhcCTizYkObPE7ADdP9QXbNSG2TYWH5JYC72ipdzjlumDwfgw+ZoPe0RnoGZkOCI0SHUTZRQc+8z+A4s4933AcjXcTRYV73nMEd22dgHcPW1FODE6iM1nRqIQDRJpABjCwXRM2OO9oCfCOlLDCB1jgPS54l2UKOs2TzG2zo8Eu3I+3b3+r/wFyb4+xw28y4Hg36HDKPcfgvRjctXUC3jk0AR1DEy44Fe2G24U0ONj3ZYA9PmPE7wAhuaUv2Ld9k4bGCkUVMz5QBKdcFxJunkTw9sFxMA08ZWybFY3DwR4vBnt8+gv/Axwpfc52TRjww8Vk1JfFE97FAjf1j4Gxf4x5RYSeaBz+LM5VbPpCAAOUjLLBQxnw62SMDxSDu7ZOwNsx+MBTBDf0jUJb74jPbZPouHQMjheTNux/gKMlbUx4MSs8NKcIRX1ZGHDX1gm4oXcE4fU9wyxXhIIm4WkYHDW3N03nf4DDN+6yXRM3HEfzUddQnvAOP/DWbgu0dpk90B7bpsFT8T5OVfsdIDSn+HNf26bC+TmFwJcX0l4WKtyIwV3XhQrXdZlB2znkE/0sJpUCT3GV/KnfAXg5RZHscAJ9DaHdXWV+oB5wvQe8pWMQWtoHfKOp8D3JeLtFWwL6OzDvcNEwc9tU+FUygew32svCgHdbSLjWBW9uH4AmUz/zitC27YbP7k4C2+4kC3AC/DtyqLzolOc1YYPjXaHB2zC467rQ4B2DJLzJ2AeNhl6/aNQurESYixZ9zQn0bM69/h5fVvjKE+5G43AiAwtc5wPeYOiF+rYeFnQyDY2KTgRbdMLLyeiEdwIeAP0UZIXnfMKzsS6jGHDXPcfgzQTc2EfC6/XdUNfaxbJtN3o2WgSzO0Vg25kAth0JpzlLPWHHCrl82ZVxJvwypUsQln2J8YGScFM/CW8g4PpuqG3tghpdJ33bnmgcDrYdwsm5KOHy/t1UILtySCC7vOgJx9CorIso6sviD16r64QabQdUt7S70dEYWkRFg227EGa2CxdtW4UHl4Unh8i+9AN121Q43gXay9JI3HMM3tbDhGs74ElLO1Q1m6hXhESjtu1DzWyN+46z4qNUBgmyLz4Iy6LCL7iTnvcKryPguk4S/qTZBFVNRnjcZPSAu9AIHg/TUfH3A342/R6JZpNAeuGWG43Dw1EFtJeFDV7tAa9sNEBlQxsDjYqKg+mouFL4ULKJs6pHqQwKk54/S4WjJAW0l4X4QGnwZhMNXlGvh0f1ejfaDV+cjog9DRzO2v3302ZpQWK4tGAEg4dLfkVR4TUs8Mce8PK6Viiv1SE0KjIWpiNjxmci4sSc9TiCnPyQcEn+mXBJvjNckk+Huz7QKiq8oQ3BH7ngf9dooaxGi+DWiFjndMTen2Y+2MXlrPfhyS/ywyU/n6zWdlgY8EYDgldQ4bU6BC+rboGHVc2W6Yi9J+0f7eFz/gunstEUWdFkPFHRaLhb0aA3PqrT28prW1+V12hfltXqbH9Va41l1S13H1Y1nfijsjHydXs3zsb5v5x/AekgUFzlvoQKAAAAAElFTkSuQmCC">
              </div>

              <div v-else-if="movie.original_language.toUpperCase() === 'EN'"><b>LINGUA:</b> {{
                movie.original_language.toUpperCase()
              }}<img
                  src="data:image/png;base64,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">
              </div>

              <div v-else-if="movie.original_language.toUpperCase() === 'ES'"><b>LINGUA:</b> {{
                movie.original_language.toUpperCase()
              }}<img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEU0lEQVR4nO1ZfUxVZRh/Kr0HuHzcXeBaMbOZ4+u8xhaS9UfDsD/KUCFta7lJc2xtpiXK+gMWFhYrkwxYFHWbzHvl8lXg+BQQ7jVIRYtBpAnnDTAx/KOtWsh//do5I61LznM/zrnXxm97trNz3ufZ7/c+z7O953mJFrGIRfgMEN31YxKt5Yz2cUa1nNGoxGhaEum6YoymuUjfcUYOeY28VvahQONSCsVJIpVIIk1wRvDEZB+J0TtTCXS/7sR/iKcYzuiwxGjOU+L/IeS6HEuOqQt5idEGpSR8JL7ARLomMcrWjDiep3skkSr8TpwtEFIGorv9Sv7yYxTKRfpSc/Lshn0xsYJC/EJe3g05oI7kofQGoxY56z4L4CKV602e32zwD3wlvzFQ5PnNTHjX2BMpZOIiXQkCAVcvJ5PZYwFwCaVwCQgSK/WMfI9xGZzCbBAQh2Iylx7jMvUCnMKBgJN2LRBR7EH5GMYDTtjlbgYJUHEAhHNJ2u2C/ekMxXDTcnzfHKc86yaib8kaNbuff6sAv3ZHYKrVhP6jMThbFY0zH0XgtC0Gk60m/NEdoUMZGfaqECDU3SrAaF0kmh+PwecZ0Tj2lAW2jFhYM8xoSTfjYmOkHlmoUVFCwqi7429NIRj5MEx57ioIhyM/ArWFYagpCIMjLxy9b4Qr36ZsoZjrCNFSwIiaEvrZ3XGgUoB1v4DfG0MxmGNCy3ORaF1vRr99D1x1uzHSuQezfXE4sl/AYJWGApyGaTUlNOfueO1EEgZbd2PGakT1WhNKdiyFbaUFvQ1tOFVQie6jDvxykuGbjtcw3Z6oZQbmvBIwfDAJbbnrcWZHFKxPWFCQvwrVK2Jxwl6PgeJqfF3fjm9LUtC5cx2G3tNQgFOYVdEDhqvujid3rUJHVSHOF4bjkzVReDMnETkZmdj+9Fa02x1oszkwUpWMLmsRenY9pGEGDFe8auJzryfi+EvZOFf+AOpfDIcjKxK56zLxcnom2jeY0Z5pwoWyBLTmbsHZ/KQAN7FTcLg7XjySitPdlRiqXK4IqM2KRN12I5qfjEbzThM6N5kw9nECzjs/xchnj2jZxHY1JbTP3XGs0YJeWxoma8yofSFCEWDbFouWLQ+ic3MUOrLNmKmNRZ89DZcaLNoJOGXI8+ooUVG6CUVvb8NQXTz6341H0yuPwlaRB3tFEbpeTcfQwYeVb/Ka8vc3aifgq6WptxWgiHAJYxrWsZdmkFSRD9rjtEt4687+oRkwWlQLmC+jQwEn7rphh8hT8FSK4iL9dMf+1MvgjJ4NtIBxRlnkC+TJccB2XyTPSyeIRosNfhvyyoNWPUVIjBr8Ntz9VyZEKtNBwGG/j9f/CWk1PaPFBYck0sz4atpMeuBCIkXLk+P56yFfic9KIpXKMUlvTCbSfZzRAS4S94K8xEUqnkimeykYwEVK44z2ckY1kkjD8mT772vW+Wf53TGeTHny2kDzXcQi/i/4CxS7S/c22kG3AAAAAElFTkSuQmCC">
              </div>

              <div v-else-if="movie.original_language.toUpperCase() === 'JA'"><b>LINGUA:</b> {{
                movie.original_language.toUpperCase()
              }}<img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHElEQVR4nO3Y23MTVRwH8IyIDzyCPoH+D6IgF5U7LXcqUCo4DoI4Poj4woh9UIZBwEFmZLyAMvqiMlKm4BSoBVrSkkuTdHNtks19c9kku81ukt2q0/DydU6YEUVkz2ZL+tLfzHnLw+d3snv2d74m03RN13QZLgAzOEFZzAlqZ0pQulOiEkoJajlVrN5NFip344VyOcaXg3Fe7o7mpM5YTloE4AnTVFec//NZTlBOpgSF50QV/1wpQUGyWEWiUEE8X66vGC8jmpMQyZYQTos5Ni2c8OekeU2HxwrqM5yofMuJSu1BOA2ezYyBTYukCYQ4oRZMFs9GIvmnm4LnhOqulKjKD4M3gEcwVcRosgB/Ii/5EnzHY4MzwExOVM7/H9wIPpDIIxDn4Y/z8MWy5xiGmTmp+Hw+PyslqL2PH5+DN5qFm81cZ5j8rEnb+WbiPZEMPGwaDMvdCgaDTxluoDmPTe5feDdpIMzBFUyeNYRPC9XdU4UfCaVIA3CNxnc2hOd5ZQ4nKqWpxSfg9MdlhonoP2LvnfP68LG0gMyvNzF29DSq+z+A2r6nvir7D0I8cgrJ7l6MRjL0+EAcjkAcdl/0a134mPTHPL0fqczVflT3HsDvW3Y9cpHfJC73UeOH/THYvNGahQk+R7/7gnKSGp8tQThzXhP+4MqdPgtPmNPE231R2LwRWN3sCSo8GbI4QcnR7rxu/ObXMb6pA+MbdyJ76hsqvM3DwsKE+K4uzKDZ/cV6HptG4OMbdkJd3w513Q6wF3s08VZ3GBZ3GEMjwYUUDaidtC+ssu/9huFq63YoLdsgdbyNEV9UE3+HCWGICR7WbCAlKpdpjkpy2hiBK2tfu7fWtCH8Y7c2fiSIQWfgEk0DQZpzfuzo543BW+7Dq6u3orpqCzKHjmjih1yjMDsDAYoGVJnmI1Xdf9AwvLpyMyorNkNo36uJH3QGcHvYX9JuQKjWaL6w4+1vGYZXlm9CZdlGSGvaNPFmhx+3Hb4JzQaSxUqNZjwY375HA75NE15+dQPKr6yHtLqNAu/HwLBXu4F4oSzTzDaVve/9B6626oOXX14HeWkrim1vUuB96Ld5tR+henpAMZgVP/7MMFxe0gJ58VokD3Zq4gfsXvRbPdovcYyXL9NMlcmua4bh0qI1kBauhv+7C9p4mwc3LYz2MUpyG5qReDSShbz7HUNwacEqFFrbYXEENPG3rG7ctLg/1P4HctIi2nk+dulaw/DSiyvry/v9L3R4qxu9NtcCqmGOTYtZ2stI+vgZ/fAXVqA0fznYzk+p8X13mMwntGkeScyob1IhDtyxL3TBx+YvR+TwMQw5A1T4GxYGfXdGjptoi8R99cRMxzUw9PMViFvfuA9/6SHw55eBX7sdnvMXqHf+Rh3vmrjab59r0lMk7tN7hyVTZeiHi+AOfIT8pl0Ql7ZCXNICfn0Hku8egu/cT7CQXdeFH8Fvg84vdeHrDWSzswMJvqTrAk4zEuvFD7mkHjPTWG5KssqpxPcNucju72gI/3cTsey5qcL3mp1fmYxWFzDDzaavNB0/6LxmNpufNE1GkaDVzaavNw/vuNrTw0xOuHu/CWYmySqb8diYJ2vnH1Ykq3QE4qVJxw86xwy/sLTlDIfnkLjP7o1MGMe7Jsg532e3zzY1u+ze6FySmFnd4WwD+CwZD3R/YR9HkQGQhE4ktyHRB0kPzA6ffHvYVxuwe2sDNo98y+rxk3mejMRkqqQezKZruqbL9Kj6C24rsxfePvPMAAAAAElFTkSuQmCC">
              </div>

              <div v-else-if="movie.original_language.toUpperCase() === 'DE'"><b>LINGUA:</b> {{
                movie.original_language.toUpperCase()
              }}<img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEFklEQVR4nO2ZyWsbVxzHfyRuTj2k7Sk0PXVvkrZuvMRLLC9ZJEuyLGkkWdbMaGYeKOCUJj2FQhr50uDkUru30j8gIdBSQintydCcCgUtljcocWulkSXZlhfsmiTSt8yYFCwKkqxtCv7C56aBz/e9p3kz84gOcpCDlJ1gMHiIMdYiy/JVSZLuiaIYFkUxLoritiAI2zzPx30+X9jn893zer1X3G53s3oN1TuSJL2mKEpQkqQ/ZFmGJEnw+/0QRVFDEATwPK/h8/kwPDwMr9erMTQ0tODxeG7Y7fbjNRf3+/1HGWNjsizvqOL7kIfH44Hb7YbL5XrCcdyEzWY7WhN5RVGcjLGUoigoV969WwAcx8HpdKacTqejauLBYLBBHXXGWK7S8txuATgcDtjt9q8DgcALFZV3uVxHGGM/MMZQZXmoDA4O3q9YCZfLdVhRlLs1lIfNZlP5zmAwNJRdgDH2VR3kMTAwAIvFMl6WvCzLphqsefyXvNVqVQvkLBaLdV/ygiC8oihKuo7yUDGbzSmz2fxSyQUYY7d1II/+/n6YTKaxkuQDgcAxWZa3dCIPo9G4bTQai9+x06O3H2xah7Bp8WDTrOLGRr8bGyYXNkwcNowc1i86sX7Bsct5O9bODWKtT8WGtd4BZHpUrMh0W5ExWLDaZd7lbD9WO01Y6TBipd2IlbaLWDlzAcut57Hceg7LLX1IN/ch3dSL9OkepD/qRqrRgFlh5Jei5DE52ZDhLz3Tk3zqwy7EOy1PJw3BwrfVxPg3st7kUx90Ifn+WYQ+vsYXLJAavfWzHuWTpzoR40d+LFhg5er1R3qUT57swLzVt1iwwKo0sqNH+eSJdjzssv5dsECG8+f0KL90og3x5t5swQLrliFdyi+914bEqQ4UUcCjS/mld8/gr5PthQtkHEJOj/KJd1qx2NhdeAkt85d29CifeLsFv7eZCv+Jk5evxfUon3irGTNGrvBt9NFnX/ykR/nEm00IcVLhjezPm+N+Pco/fqMJv0qXh4t6mFu2+5/pTX6hsefpZLHvyPFPbzzQk/zj108jNMAX9zitzcIMHcvO0VZunvAvc3nM7oLnzOQxnUcsj6k8onlE9rCNEL1KpSQ7T7d0Ig+E6GZJ8tosxOjl7ByldCCfRJRKf6nXSsyRKTtLuTrK5xCm/X1WeZ7sHE3URT6s8WVZ8tosgA5nZ+lOzeVD9C0mqfxPi1qJGB3BDN2v4ch/j9+osl+o1ZnANI1hmnJVXfMhmqi4/J4is+TENKWqMPIphKl6Bxx7SsToRUzTKGK0UwH5J9qoh6g2R0x7ikToOGL0OaZoYR/yDxGh6yXvsFUpAjqEKDVhiq4gSncRpRCitIgobWlEaBERCiFCdxCmT7Tfgup/zHqQg9D/P/8A9+JSzY86f54AAAAASUVORK5CYII=">
              </div>

              <div v-else="movie.original_language.toUpperCase()"><b>LINGUA:</b> {{ movie.original_language.toUpperCase()
              }}
              </div>
              <div><b>VOTO:</b>
                <i v-for="vote in Math.floor(5 - Math.floor(5 - movie.vote_average / 2)) " class="fa-solid fa-star"></i>
                <i v-for="vote in Math.floor(5 - (movie.vote_average / 2)) " class="fa-regular fa-star"></i>
              </div>
              <div><b>OVERVIEW:</b> {{ movie.overview }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2>Tv</h2>

    <div class="container">
      <div class="row">

        <!-- creare un componente card -->
        <div v-for="tv in this.state.tvS" class="col-2 p-0">
          <div class="card">
            <img
              :src="tv.poster_path ? 'https://image.tmdb.org/t/p/w342/' + `${tv.poster_path}` : 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Error-icon.png'"
              alt="Immagine di Copertina">

            <div class="info text-white">
              <div><b>TITOLO:</b> {{ tv.title }}</div>
              <div><b>TITOLO ORIGINALE:</b> {{ tv.original_title }}</div>

              <!-- va modificata la stampa dinamica delle bandiere -->
              <div v-if="tv.original_language.toUpperCase() === 'IT'"><b>LINGUA:</b> {{
                tv.original_language.toUpperCase()
              }}<img
                  src="data:image/png;base64,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">
              </div>

              <div v-else-if="tv.original_language.toUpperCase() === 'FR'"><b>LINGUA:</b> {{
                tv.original_language.toUpperCase()
              }}<img
                  src="data:image/png;base64,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">
              </div>

              <div v-else-if="tv.original_language.toUpperCase() === 'EN'"><b>LINGUA:</b> {{
                tv.original_language.toUpperCase()
              }}<img
                  src="data:image/png;base64,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">
              </div>

              <div v-else-if="tv.original_language.toUpperCase() === 'ES'"><b>LINGUA:</b> {{
                tv.original_language.toUpperCase()
              }}<img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEU0lEQVR4nO1ZfUxVZRh/Kr0HuHzcXeBaMbOZ4+u8xhaS9UfDsD/KUCFta7lJc2xtpiXK+gMWFhYrkwxYFHWbzHvl8lXg+BQQ7jVIRYtBpAnnDTAx/KOtWsh//do5I61LznM/zrnXxm97trNz3ufZ7/c+z7O953mJFrGIRfgMEN31YxKt5Yz2cUa1nNGoxGhaEum6YoymuUjfcUYOeY28VvahQONSCsVJIpVIIk1wRvDEZB+J0TtTCXS/7sR/iKcYzuiwxGjOU+L/IeS6HEuOqQt5idEGpSR8JL7ARLomMcrWjDiep3skkSr8TpwtEFIGorv9Sv7yYxTKRfpSc/Lshn0xsYJC/EJe3g05oI7kofQGoxY56z4L4CKV602e32zwD3wlvzFQ5PnNTHjX2BMpZOIiXQkCAVcvJ5PZYwFwCaVwCQgSK/WMfI9xGZzCbBAQh2Iylx7jMvUCnMKBgJN2LRBR7EH5GMYDTtjlbgYJUHEAhHNJ2u2C/ekMxXDTcnzfHKc86yaib8kaNbuff6sAv3ZHYKrVhP6jMThbFY0zH0XgtC0Gk60m/NEdoUMZGfaqECDU3SrAaF0kmh+PwecZ0Tj2lAW2jFhYM8xoSTfjYmOkHlmoUVFCwqi7429NIRj5MEx57ioIhyM/ArWFYagpCIMjLxy9b4Qr36ZsoZjrCNFSwIiaEvrZ3XGgUoB1v4DfG0MxmGNCy3ORaF1vRr99D1x1uzHSuQezfXE4sl/AYJWGApyGaTUlNOfueO1EEgZbd2PGakT1WhNKdiyFbaUFvQ1tOFVQie6jDvxykuGbjtcw3Z6oZQbmvBIwfDAJbbnrcWZHFKxPWFCQvwrVK2Jxwl6PgeJqfF3fjm9LUtC5cx2G3tNQgFOYVdEDhqvujid3rUJHVSHOF4bjkzVReDMnETkZmdj+9Fa02x1oszkwUpWMLmsRenY9pGEGDFe8auJzryfi+EvZOFf+AOpfDIcjKxK56zLxcnom2jeY0Z5pwoWyBLTmbsHZ/KQAN7FTcLg7XjySitPdlRiqXK4IqM2KRN12I5qfjEbzThM6N5kw9nECzjs/xchnj2jZxHY1JbTP3XGs0YJeWxoma8yofSFCEWDbFouWLQ+ic3MUOrLNmKmNRZ89DZcaLNoJOGXI8+ooUVG6CUVvb8NQXTz6341H0yuPwlaRB3tFEbpeTcfQwYeVb/Ka8vc3aifgq6WptxWgiHAJYxrWsZdmkFSRD9rjtEt4687+oRkwWlQLmC+jQwEn7rphh8hT8FSK4iL9dMf+1MvgjJ4NtIBxRlnkC+TJccB2XyTPSyeIRosNfhvyyoNWPUVIjBr8Ntz9VyZEKtNBwGG/j9f/CWk1PaPFBYck0sz4atpMeuBCIkXLk+P56yFfic9KIpXKMUlvTCbSfZzRAS4S94K8xEUqnkimeykYwEVK44z2ckY1kkjD8mT772vW+Wf53TGeTHny2kDzXcQi/i/4CxS7S/c22kG3AAAAAElFTkSuQmCC">
              </div>

              <div v-else-if="tv.original_language.toUpperCase() === 'JA'"><b>LINGUA:</b> {{
                tv.original_language.toUpperCase()
              }}<img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHElEQVR4nO3Y23MTVRwH8IyIDzyCPoH+D6IgF5U7LXcqUCo4DoI4Poj4woh9UIZBwEFmZLyAMvqiMlKm4BSoBVrSkkuTdHNtks19c9kku81ukt2q0/DydU6YEUVkz2ZL+tLfzHnLw+d3snv2d74m03RN13QZLgAzOEFZzAlqZ0pQulOiEkoJajlVrN5NFip344VyOcaXg3Fe7o7mpM5YTloE4AnTVFec//NZTlBOpgSF50QV/1wpQUGyWEWiUEE8X66vGC8jmpMQyZYQTos5Ni2c8OekeU2HxwrqM5yofMuJSu1BOA2ezYyBTYukCYQ4oRZMFs9GIvmnm4LnhOqulKjKD4M3gEcwVcRosgB/Ii/5EnzHY4MzwExOVM7/H9wIPpDIIxDn4Y/z8MWy5xiGmTmp+Hw+PyslqL2PH5+DN5qFm81cZ5j8rEnb+WbiPZEMPGwaDMvdCgaDTxluoDmPTe5feDdpIMzBFUyeNYRPC9XdU4UfCaVIA3CNxnc2hOd5ZQ4nKqWpxSfg9MdlhonoP2LvnfP68LG0gMyvNzF29DSq+z+A2r6nvir7D0I8cgrJ7l6MRjL0+EAcjkAcdl/0a134mPTHPL0fqczVflT3HsDvW3Y9cpHfJC73UeOH/THYvNGahQk+R7/7gnKSGp8tQThzXhP+4MqdPgtPmNPE231R2LwRWN3sCSo8GbI4QcnR7rxu/ObXMb6pA+MbdyJ76hsqvM3DwsKE+K4uzKDZ/cV6HptG4OMbdkJd3w513Q6wF3s08VZ3GBZ3GEMjwYUUDaidtC+ssu/9huFq63YoLdsgdbyNEV9UE3+HCWGICR7WbCAlKpdpjkpy2hiBK2tfu7fWtCH8Y7c2fiSIQWfgEk0DQZpzfuzo543BW+7Dq6u3orpqCzKHjmjih1yjMDsDAYoGVJnmI1Xdf9AwvLpyMyorNkNo36uJH3QGcHvYX9JuQKjWaL6w4+1vGYZXlm9CZdlGSGvaNPFmhx+3Hb4JzQaSxUqNZjwY375HA75NE15+dQPKr6yHtLqNAu/HwLBXu4F4oSzTzDaVve/9B6626oOXX14HeWkrim1vUuB96Ld5tR+henpAMZgVP/7MMFxe0gJ58VokD3Zq4gfsXvRbPdovcYyXL9NMlcmua4bh0qI1kBauhv+7C9p4mwc3LYz2MUpyG5qReDSShbz7HUNwacEqFFrbYXEENPG3rG7ctLg/1P4HctIi2nk+dulaw/DSiyvry/v9L3R4qxu9NtcCqmGOTYtZ2stI+vgZ/fAXVqA0fznYzk+p8X13mMwntGkeScyob1IhDtyxL3TBx+YvR+TwMQw5A1T4GxYGfXdGjptoi8R99cRMxzUw9PMViFvfuA9/6SHw55eBX7sdnvMXqHf+Rh3vmrjab59r0lMk7tN7hyVTZeiHi+AOfIT8pl0Ql7ZCXNICfn0Hku8egu/cT7CQXdeFH8Fvg84vdeHrDWSzswMJvqTrAk4zEuvFD7mkHjPTWG5KssqpxPcNucju72gI/3cTsey5qcL3mp1fmYxWFzDDzaavNB0/6LxmNpufNE1GkaDVzaavNw/vuNrTw0xOuHu/CWYmySqb8diYJ2vnH1Ykq3QE4qVJxw86xwy/sLTlDIfnkLjP7o1MGMe7Jsg532e3zzY1u+ze6FySmFnd4WwD+CwZD3R/YR9HkQGQhE4ktyHRB0kPzA6ffHvYVxuwe2sDNo98y+rxk3mejMRkqqQezKZruqbL9Kj6C24rsxfePvPMAAAAAElFTkSuQmCC">
              </div>

              <div v-else-if="tv.original_language.toUpperCase() === 'DE'"><b>LINGUA:</b> {{
                tv.original_language.toUpperCase()
              }}<img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEFklEQVR4nO2ZyWsbVxzHfyRuTj2k7Sk0PXVvkrZuvMRLLC9ZJEuyLGkkWdbMaGYeKOCUJj2FQhr50uDkUru30j8gIdBSQintydCcCgUtljcocWulkSXZlhfsmiTSt8yYFCwKkqxtCv7C56aBz/e9p3kz84gOcpCDlJ1gMHiIMdYiy/JVSZLuiaIYFkUxLoritiAI2zzPx30+X9jn893zer1X3G53s3oN1TuSJL2mKEpQkqQ/ZFmGJEnw+/0QRVFDEATwPK/h8/kwPDwMr9erMTQ0tODxeG7Y7fbjNRf3+/1HGWNjsizvqOL7kIfH44Hb7YbL5XrCcdyEzWY7WhN5RVGcjLGUoigoV969WwAcx8HpdKacTqejauLBYLBBHXXGWK7S8txuATgcDtjt9q8DgcALFZV3uVxHGGM/MMZQZXmoDA4O3q9YCZfLdVhRlLs1lIfNZlP5zmAwNJRdgDH2VR3kMTAwAIvFMl6WvCzLphqsefyXvNVqVQvkLBaLdV/ygiC8oihKuo7yUDGbzSmz2fxSyQUYY7d1II/+/n6YTKaxkuQDgcAxWZa3dCIPo9G4bTQai9+x06O3H2xah7Bp8WDTrOLGRr8bGyYXNkwcNowc1i86sX7Bsct5O9bODWKtT8WGtd4BZHpUrMh0W5ExWLDaZd7lbD9WO01Y6TBipd2IlbaLWDlzAcut57Hceg7LLX1IN/ch3dSL9OkepD/qRqrRgFlh5Jei5DE52ZDhLz3Tk3zqwy7EOy1PJw3BwrfVxPg3st7kUx90Ifn+WYQ+vsYXLJAavfWzHuWTpzoR40d+LFhg5er1R3qUT57swLzVt1iwwKo0sqNH+eSJdjzssv5dsECG8+f0KL90og3x5t5swQLrliFdyi+914bEqQ4UUcCjS/mld8/gr5PthQtkHEJOj/KJd1qx2NhdeAkt85d29CifeLsFv7eZCv+Jk5evxfUon3irGTNGrvBt9NFnX/ykR/nEm00IcVLhjezPm+N+Pco/fqMJv0qXh4t6mFu2+5/pTX6hsefpZLHvyPFPbzzQk/zj108jNMAX9zitzcIMHcvO0VZunvAvc3nM7oLnzOQxnUcsj6k8onlE9rCNEL1KpSQ7T7d0Ig+E6GZJ8tosxOjl7ByldCCfRJRKf6nXSsyRKTtLuTrK5xCm/X1WeZ7sHE3URT6s8WVZ8tosgA5nZ+lOzeVD9C0mqfxPi1qJGB3BDN2v4ch/j9+osl+o1ZnANI1hmnJVXfMhmqi4/J4is+TENKWqMPIphKl6Bxx7SsToRUzTKGK0UwH5J9qoh6g2R0x7ikToOGL0OaZoYR/yDxGh6yXvsFUpAjqEKDVhiq4gSncRpRCitIgobWlEaBERCiFCdxCmT7Tfgup/zHqQg9D/P/8A9+JSzY86f54AAAAASUVORK5CYII=">
              </div>

              <div v-else="tv.original_language.toUpperCase()"><b>LINGUA:</b> {{ tv.original_language.toUpperCase()
              }}
              </div>
              <div><b>VOTO:</b>
                <i v-for="vote in Math.floor(5 - Math.floor(5 - tv.vote_average / 2)) " class="fa-solid fa-star"></i>
                <i v-for="vote in Math.floor(5 - (tv.vote_average / 2)) " class="fa-regular fa-star"></i>
              </div>
              <div><b>OVERVIEW:</b> {{ tv.overview }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<style lang="scss">
.card {
  position: relative;
}

.card>img {
  width: 100%;
  object-fit: contain;
}


.info {
  font-size: 10px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  background-color: black;
}

.card>img:hover {
  display: none;
}

.card:hover .info {
  opacity: 1;
}

i {
  color: goldenrod
}
</style>
