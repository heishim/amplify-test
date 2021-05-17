<template>
        <div class="Menu">
            
        <Navbar></Navbar>

         <div class="mx-auto" style="width: 600px;">
        <img src="../assets/outil.png" width="600" height="200" class="d-inline-block align-top" alt="" loading="lazy">
        </div>



        <div class="album py-5 bg-light">
        <div class="container">


            <button class="btn btn-xxl btn-outline-danger btn-lg btn-block " role="button" v-on:click = "depot">DEPOSER DES FICHIERS RSS</button>
               <br>
            <button class="btn btn-xxl btn-outline-success btn-lg btn-block" role="button" v-on:click = "recuperer">RECUPERER DES FICHIERS</button>
    
          <br>
            <button v-if="this.$store.user=='Solemne'" class="btn btn-xxl btn-outline-secondary btn-lg btn-block" role="button" v-on:click = "finess">AJOUTER DES NUMEROS FINESS</button>
                <br>
            <button v-if="this.$store.user=='Solemne'" class="btn btn-xxl btn-outline-primary btn-lg btn-block" role="button" v-on:click = "resultat">RECUPERATION DU RESULTAT</button>


        </div>
        </div>
        </div>


</template>

<script >



  import Navbar from '../components/Navbar'
  export default {
    name: 'menu',
    data () {
      return {

      }
    },

     components: {
            Navbar
        },

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
        }
    },
    
  }
</script>

<style>
body { 
  background-color:#0000;
}

</style>
