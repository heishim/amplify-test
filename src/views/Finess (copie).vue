<template>

    <form enctype="multipart/form-data">
            <Navbar></Navbar>

        <div class="mx-auto" style="width: 600px;">
        <img src="../assets/outil.png" width="600" height="200" class="d-inline-block align-top" alt="" loading="lazy">
        </div>
        
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Utilisateur</label>
            </div>

            <select class="custom-select" id="inputGroupSelect01" v-model="valeurUser" >
                <option selected>Choisissez un utilisateur</option>
                <option v-for="fichier in APIData4" :key="fichier.id" value:fichier.user>{{fichier.user}}</option>

            </select>

        </div>
        <a>{{this.valeurUser}}</a>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Etablissement</label>
            </div>
            <select class="custom-select" id="inputGroupSelect02" v-model="valeurEtablissement" >
                <option selected>Choisissez un établissement</option>
                <option v-for="fichier in APIData4" :key="fichier.id" value:fichier.finess>{{fichier.finess}}</option>
            </select>
        </div>
         <div class="mx-auto" style="width: 10px;">
         <button  class="btn btn-sm btn-outline-success" role="button" aria-pressed="true" v-on:click="ajouter">AJOUTER</button>
    </div>
    <div class="mx-auto" style="width: 20px;">
            <button  class="btn btn-sm btn-outline-danger" role="button" aria-pressed="true" v-on:click="supprimer">SUPPRIMER</button>
    </div>

    <div class="album py-5 bg-light">
        <div class="container-xxl">
        <div class="row">
            <div v-for="fichier in APIData5" :key="fichier.id" class="col-md-4">
            <ul class="list-group list-group-flush">
                <li class="list-group-item"> <img width="20" height="8" src="../assets/user.png"  >
                    <d >    {{fichier.user}} : {{fichier.finess}}</d>
                    <br>
                    </li>
            </ul>
            </div>
        </div>
        </div>
    </div>

        
    </form>

</template>

<script>

import { getAPI } from '../axios-api'
import Navbar from '../components/Navbar'
export default {
    name: 'customSelect',
    data() {
        return {
            valeurUser:"", 
            valeurEtablissement:"",
            APIData4 : [],
            APIData5 : [],
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

    created () {

            getAPI.get('/user')
            .then(response =>{
                console.log('Resultat recu')
                this.APIData4 = response.data
            })
            .catch(err => {
                console.log(err)
            })
            getAPI.get('/finess')
            .then(response =>{
                console.log('Resultat recu')
                this.APIData5 = response.data
            })
            .catch(err => {
                console.log(err)
            })
           

        },


         methods: {


        created () {

            getAPI.get('/user')
            .then(response =>{
                console.log('Resultat recu')
                this.APIData4 = response.data
            })
            .catch(err => {
                console.log(err)
            })
            getAPI.get('/finess')
            .then(response =>{
                console.log('Resultat recu')
                this.APIData5 = response.data
            })
            .catch(err => {
                console.log(err)
            })
        },

         async ajouter(){
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
            this.created()
        },

        async supprimer(){
            const formData = new FormData();
            formData.append("name");
            try{
            await getAPI.post('/name/',formData);
            }catch(err) {
                this.message = err.response.data.error;
            }
            getAPI.get('/delete_one/')
            .then(response =>{
                console.log(response),
                console.log("Supression")
                this.created ()

            })
            .catch(err => {
                console.log(err)
            })
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

  }
  c{
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            
  }
    d{
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-size: 15px;
            color : #666666;
            
  }
  
  
</style>
