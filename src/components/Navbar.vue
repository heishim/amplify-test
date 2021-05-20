<template>
   <!-- <div class="nav-bar">
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
            <li v-if="accessToken!=null"><p class = "deco">{{this.$store.user}}</p></li>
            
          </ul>
        </div>

          <div v-if="accessToken!=null"><a href="https://altao.com/">Retour au site</a></div>
          <p v-if="accessToken!=null"><router-link :to = "{ name:'logout' }"> <p class = "deco" v-on:click="supprimer">Deconnexion</p></router-link></p>





      </div>
    </nav>
  </div> -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
    <a class="navbar-brand" href="https://altao.com/"> <img src="../assets/altao.png" width="100" height="8" class="d-inline-block align-top" alt="" loading="lazy"></a>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">

      <li class="nav-item">
        <a class="nav-link" href="https://altao.com/">Site</a>
      </li>
      <a class="nav-link" v-on:click="menu">Accueil</a>
    <select class="form-select-color" color="red" aria-label="multiple select example" v-model="selected">
  <option disabled value="">Menu</option>
  <option v-on:click="depot">Depot</option>
  <option v-on:click="recuperer">Recuperer</option>
  <option v-if="this.$store.user=='Solemne'" v-on:click="finess">Finess</option>
  <option v-if="this.$store.user=='Solemne'" v-on:click="resultat">Resultats</option>

</select>

    </ul>
    <form class="form-inline my-2 my-lg-0">
       <a class="nav-link"><b class="deco">Connecté :</b> <a class="deco">{{this.$store.user}}</a> </a>
      <a v-if="accessToken!=null"><router-link :to = "{ name:'logout' }">
      <button class="btn btn-outline-danger my-2 my-sm-0" v-on:click="supprimer_deco">Deconnexion</button>
      </router-link></a>
    </form>

  </div>
</nav>
</template>

<script>
    import { mapState } from 'vuex'

    import { getAPI } from '../axios-api'
    export default {
    name: 'Navbar',
    data () {
        return {
            UserData :[],
            EmptyData : [],
            UserData2 : [],
            var : null,
            selected: "",
        };
    },    
    computed: mapState(['accessToken']),

    methods: {

       depot(){
            this.$router.push({ name: 'fichier' })
        },
        recuperer(){
            this.$router.push({ name: 'recuperer' })
        },
        finess(){
            this.$router.push({ name: 'finess' })
        },
        resultat(){
            this.$router.push({ name: 'resultat' })
        },

      menu(){
            this.$router.push({ name: 'menu' })
        },

        async supprimer_deco(){

            await getAPI.get('/empty/')
                .then(response =>{
                    console.log('Le fichier de l API à bien été recu !')
                    this.EmptyData = response.data
                })
                .catch(err => {
                    console.log(err)
                })
                if(this.EmptyData[0].vide == "true"){
                    this.var = null
                }else{
                await getAPI.get('/user/')
                .then(response =>{
                    console.log('Le fichier de l API à bien été recu !')
                    this.UserData2 = response.data
                })
                .catch(err => {
                    console.log(err)
                })
                if(this.UserData2[0].user == this.$store.user){
                    getAPI.get('/clean/')
                    .then(response =>{
                        console.log(response),
                        console.log("Supression réussie")
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    }else{
                        getAPI.get('/deletedelay/')
                        .then(response =>{
                            console.log('Le fichier de l API à bien été recu !')
                            console.log(response)
                        })
                        .catch(err => {
                            console.log(err)
                        })
  
                    }
                    }
        },

    },

  }
  


</script>

<style scoped>
.deco{
  color : #666666;
}
t{
  background-color: #666666; 
}
</style>
