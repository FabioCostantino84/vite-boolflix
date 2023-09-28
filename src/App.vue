<script>

import { state } from './state.js'

export default {
  name: 'App',
  data() {
    return {
      state,
    }
  }
}
</script>



<template>
  <div class="container input-group mb-3">
    <input type="text" class="form-control" placeholder="Research" aria-label="Research"
      aria-describedby="button-addon2">
    <button class="btn btn-outline-secondary" type="button" id="button-addon2">Cerca</button>
  </div>
</template>



<style lang="scss">
@use './assets/scss/app.scss'
</style>
