<template>
    <div class="fichier">
        <Navbar></Navbar>

        <div class="mx-auto" style="width: 600px;">
        <img src="../assets/outil.png" width="600" height="200" class="d-inline-block align-top" alt="" loading="lazy">
        </div>



    <div class="album py-5 bg-light">
        <div class="container">
        <div class="row">
            <div v-for="fichier in APIData" :key="fichier.id" class="col-md-4">
            <div class="card mb-4 box-shadow">
                <img width="200" height="8" src="../assets/Doc.png" class="d-inline-block align-top" alt="" loading="lazy">
                <div class="card-body">
                    <h4 class=""><a class="text-secondary" :href= fichier.contenu>{{fichier.title}}</a></h4>
                    <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">

                    </div>

                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    <div class="mx-auto" style="width: 70px;">

    <a class="btn btn-sm btn-outline-danger" role="button" aria-pressed="true" v-on:click="telecharger" >TELECHARGER</a>
   
    </div>

                     
    
    </div>

</template>



<script>
    import axios from 'axios';
    import { getAPI } from '../axios-api'
    import Navbar from '../components/Navbar'
    export default {
        name: 'Recuperer',
        data () {
            return {
                APIData2: [], 
                EmptyData2: [],
            };
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

            getAPI.get('/empty/')
                .then(response =>{
                    console.log('Le fichier de l API à bien été recu !')
                    this.EmptyData2 = response.data
                })
                .catch(err => {
                    console.log(err)
                })

            //this.supprimer()
            getAPI.get('/donnee')
            .then(response =>{
                console.log('Le fichier de l API à bien été recu !')
                this.APIData = response.data
            })
            .catch(err => {
                console.log(err)
            })
           
            //this.ex = false

        },


         methods: {

        

    execution2(){
        this.telecharger()
        this.APIData = null
    },
        
        async telecharger(name){
            axios({
                url : 'https://django.backend-altao.com/media/media/' + name,
                method: 'GET',
                responseType: 'blob',
            }).then((response) =>{
                var fileUrl = window.URL.createObjectURL(new Blob([response.data]))
                var fileLink = document.createElement('a')
                fileLink.href = fileUrl

                fileLink.setAttribute('download', 'RSS_GROUPE.zip')
                document.body.appendChild(fileLink)

                fileLink.click()
            })
            this.supprimerbis()
        },
     
    }
    }
</script>

<style scoped>


      a {
      color:#666666;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  b{
      color : #AB111C;
      font-family: Verdana, Geneva, Tahoma, sans-serif;

  }
  c{
            font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  
</style>
