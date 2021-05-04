<template>
    <div class="nav-bar">
        <nav class="navbar navbar-expand-lg navbar-light bg-white nav-1">
            <div class="container mw-0 px-3">

                <a class="navbar-brand" href="#">
                <img src="../assets/altao.png" width="100" height="8" class="d-inline-block align-top" alt="" loading="lazy">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
            <li class="nav-item deco" v-if="accessToken!=null"><router-link :to = "{ name:'logout' }"> <p class = "deco">Deconnexion</p></router-link></li>
          </ul>
        </div>

      </div>
    </nav>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
    name: 'Navbar',
    computed: mapState(['accessToken'])
  }
</script>

<style scoped>
.deco{
  color : #666666;
}
</style>