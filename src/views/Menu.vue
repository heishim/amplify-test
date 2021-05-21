<template>
        <div class="Menu">
            
        <Navbar></Navbar>

         <div class="mx-auto" style="width: 165px;">
        <br><e>ACCUEIL </e>
        </div>
         <div class="mx-auto" style="width: 180px;">
        <f>________________________________</f>
        </div>
        <br>
        


        <div class="album py-5 bg-light">
        <div class="container">


            <button class="btn btn-xxl btn-outline-danger btn-lg btn-block " role="button" v-on:click = "depot">DEPOSER DES FICHIERS RSS</button>
               <br>
            <button class="btn btn-xxl btn-outline-secondary btn-lg btn-block" role="button" v-on:click = "recuperer">RECUPERER DES FICHIERS</button>
    
          <br>
            <button v-if="this.$store.user=='Solemne'" class="btn btn-xxl btn-outline-danger btn-lg btn-block" role="button" v-on:click = "finess">AJOUT DE NUMEROS FINESS</button>
                <br>
            <button v-if="this.$store.user=='Solemne'" class="btn btn-xxl btn-outline-secondary btn-lg btn-block" role="button" v-on:click = "resultat">RECUPERATION DES RESULTATS</button>
 <br>
            <button v-if="this.$store.user=='Solemne'" class="btn btn-xxl btn-outline-danger btn-lg btn-block" role="button" v-on:click = "solemne">SOLEMNE</button>


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
        },
        solemne(){
            this.$router.push({ name: 'solemne' })
        }
    },
    
  }
</script>

<style>
body { 
  background-color:#0000;
}
d{
      color : #AB111C;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: 35px;
      
  }
e{
    color : #666666;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 35px;
    
}
f{
      color : #AB111C;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: 10px;
      
  }


</style>
