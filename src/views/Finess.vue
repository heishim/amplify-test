<template>
    <div class="Resultat">
        <Navbar></Navbar>

         <div class="mx-auto" style="width: 520px;">
        <e><br>AJOUT DE NUMEROS </e> <d>FINESS </d>
        </div>
         <div class="mx-auto" style="width: 300px;">
        <f>________________________________________________________</f>
        </div>
        <br>



    <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Utilisateur</label>
            </div>

            <select class="custom-select" id="inputGroupSelect01" v-model="valeurUser" >

                <option v-for="fichier in APIData4" :key="fichier.id" value:fichier.user>{{fichier.user}}</option>

            </select>

        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Region</label>
            </div>
            <select class="custom-select" id="inputGroupSelect02" v-model="valeurRegion" >

                <option v-for="fichier in APIData8" :key="fichier.id" value:fichier.region v-on:click="region">{{fichier.region}}</option>
            </select>
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Etablissement</label>
            </div>
            <select class="custom-select" id="inputGroupSelect02" v-model="valeurEtablissement" >

                <option v-for="fichier in APIData9" :key="fichier.id" value:fichier.etab>{{fichier.etab}}</option>
            </select>
        </div>

        <p v-if="present2==true" class="progress-bar">
        <progress 
            class="progress is-primary progress-bar-striped bg-danger progress-bar-animated"
            :value="progress3"
            max="100"
        >
                
        {{progress3}} %

        </progress>
        </p> 

             <b  class="btn btn-sm btn-outline-secondary btn-lg btn-block " role="button" aria-pressed="true" v-on:click="ajouter(valeurEtablissement,valeurUser)">AJOUTER FINESS</b>

    <br>
  
            <a  class="btn btn-sm btn-outline-danger btn-lg btn-block " role="button" aria-pressed="true" v-on:click="supprimer(valeurEtablissement,valeurUser)">SUPPRIMER FINESS</a>

    <br>

            <a  class="btn btn-sm btn-outline-danger btn-lg btn-block " role="button" aria-pressed="true" v-on:click="supprimer_user_finess(valeurUser)">SUPPRIMER UTILISATEUR</a>
    <div class="album py-5 bg-light">
        <div class="container-xxl">
        <div class="row">
            <div v-for="fichier in APIData5" :key="fichier.id" class="col-md-4">
            <ul class="list-group list-group-flush">
                <li class="list-group-item"> <img width="20" height="8" src="../assets/user.png"  >
                    <j >    {{fichier.user}} : {{fichier.finess}}</j>
                    <br>
                    </li>
            </ul>
            </div>
        </div>
        </div>
    </div>


                     
    
    </div>

</template>



<script>
   import { getAPI } from '../axios-api'
import Navbar from '../components/Navbar'
    import { mapState } from 'vuex'
export default {
    name: 'customSelect',
    data() {
        return {
            valeurUser:"", 
            valeurEtablissement:"",
            valeurRegion:"",
            APIData4 : [],
            APIData5 : [],
            APIData8 : [],
            APIData9 : [],
            APIData10 : [],
            present2 : false,
            ex2 : false,
            progress3 : 0
            }
    },

    onIdle () {
        this.$store.dispatch('userLogout')
            .then(() => {
            this.$router.push({ name: 'login' })
            })
        },
        components: {
            Navbar
        },
        computed: mapState(['APIData7']),

    created () {

            getAPI.get('/users')
            .then(response =>{
                console.log('Resultat recu')
                    this.APIData4= response.data
            })
            .catch(err => {
                console.log(err)
            })
            getAPI.get('/dictionnaire')
            .then(response =>{
                console.log('Resultat recu')
                this.APIData5 = response.data
            })
            .catch(err => {
                console.log(err)
            })
            getAPI.get('/region')
            .then(response =>{
                console.log('Resultat recu')
                this.APIData8 = response.data
            })
            .catch(err => {
                console.log(err)
            })      

        },


         methods: {


        created () {

            getAPI.get('/users')
            .then(response =>{
                console.log('Resultat recu')
                this.APIData4 = response.data
            })
            .catch(err => {
                console.log(err)
            })
            getAPI.get('/dictionnaire')
            .then(response =>{
                console.log('Resultat recu')
                this.APIData5 = response.data
            })
            .catch(err => {
                console.log(err)
            })
            getAPI.get('/region')
            .then(response =>{
                console.log('Resultat recu')
                this.APIData8 = response.data
            })
            .catch(err => {
                console.log(err)
            })
        },

        delete_donnee_finess(){
            getAPI.get('/delete_donnee_finess')
            .then(response =>{
                console.log('Resultat recu')
                this.APIData10 = response.data
            })
            .catch(err => {
                console.log(err)
            })
        },


        region(){
            if(this.valeurRegion != ""){
            this.APIData9=""
            const formData = new FormData();
            formData.append("name", this.valeurRegion);
            try{
            getAPI.post('/name/',formData);
            }catch(err) {
                this.message = err.response.data.error;
            }
            getAPI.get('/etab')
            .then(response =>{
                console.log('Resultat recu')
                this.APIData9 = response.data
            })
            .catch(err => {
                console.log(err)
            })
            }
            else{
            this.$fire({
            title: "Erreur",
            text: "Aucune donnée",
            timer: 5000
            }).then(r => {
            console.log(r.value);
        });
                
            }
        },



        progression(){
        
            var interval = setInterval(() =>{
                if(this.progress3 < 100){
                    this.present2 = true
                    this.progress3 += .3;
                }
                else{
                    this.ex2 = false 
                    this.present2 = false
                    this.progress3 = 0
                    clearInterval(interval);
                    
                }
            }, 10)

        },

         async ajouter2(){
            this.progression()
            const formData = new FormData();
            formData.append("user", this.valeurUser);
            formData.append("finess", this.valeurEtablissement);
            try{
            await getAPI.post('/finess/',formData);
            }catch(err) {
                this.message = err.response.data.error;
            }
            this.valeurUser=""
            this.valeurEtablissement=""
            this.valeurRegion=""
            await getAPI.get('/ajouter_finess')
            .then(response =>{
                console.log('Resultat recu')
                this.APIData10 = response.data
            })
            .catch(err => {
                console.log(err)
            })
            this.created()
        },

         async supprimer2(){
            this.progression()
            const formData = new FormData();
            formData.append("user", this.valeurUser);
            formData.append("finess", this.valeurEtablissement);
            try{
            await getAPI.post('/finess/',formData);
            }catch(err) {
                this.message = err.response.data.error;
            }
            this.valeurUser=""
            this.valeurEtablissement=""
            this.valeurRegion=""
            await getAPI.get('/supprimer_finess')
            .then(response =>{
                console.log('Resultat recu')
                this.APIData10 = response.data
            })
            .catch(err => {
                console.log(err)
            })
            this.created()
        },

         async supprimer_user_finess2(){
            this.progression()
            const formData = new FormData();
            formData.append("user", this.valeurUser);
            formData.append("finess", "supprimer");
            try{
            await getAPI.post('/finess/',formData);
            }catch(err) {
                this.message = err.response.data.error;
            }
            this.valeurUser=""
            this.valeurEtablissement=""
            this.valeurRegion=""
            await getAPI.get('/supprimer_user_finess')
            .then(response =>{
                console.log('Resultat recu')
                this.APIData10 = response.data
            })
            .catch(err => {
                console.log(err)
            })
            this.created()
        },

        async ajouter(etab,user){
        if(etab != "" && user != ""){   
        this.$confirm("Ajouter l'établissement " + etab + " à l'utilisateur "+ user + " ?").then(() => {
            //this.delete_donnee_finess()
            this.ajouter2()
        });
        }
        else{
            this.$fire({
            title: "Erreur",
            text: "Aucune donnée",
            timer: 5000
            }).then(r => {
            console.log(r.value);
        });
        }
        },

        async supprimer(etab,user){
       if(etab != "" && user != ""){ 
        this.$confirm("Supprimer l'établissement " + etab + " lié à l'utilisateur "+ user + " ?").then(() => {
            //this.delete_donnee_finess()
            this.supprimer2()
        });
       }
        else{
            this.$fire({
            title: "Erreur",
            text: "Aucune donnée",
            timer: 5000
            }).then(r => {
            console.log(r.value);
        });
        }
        },

        async supprimer_user_finess(user){
        if(user != ""){ 
        this.$confirm("Supprimer toutes les données liées à l'utilisateur "+ user + " ?").then(() => {
            //this.delete_donnee_finess()
            this.supprimer_user_finess2()
        });
        }
        else{
            this.$fire({
            title: "Erreur",
            text: "Aucune donnée",
            timer: 5000
            }).then(r => {
            console.log(r.value);
        });
        }
        },

     
    }
    }
</script>

<style scoped>


      a {
      color:#666666;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 15px;
  }
  b{
      color : #AB111C;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
          font-size: 15px;

  }
  c{
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            
  }
    j{
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-size: 15px;
            color : #666666;
            
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
