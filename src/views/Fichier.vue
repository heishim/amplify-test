<template>
    <div class="fichier">
        <Navbar></Navbar>

        <div class="mx-auto" style="width: 600px;">
        <img src="../assets/outil.png" width="600" height="200" class="d-inline-block align-top" alt="" loading="lazy">
        </div>


<!--enctype permet de dire que c'est spécial et qu'on va utilise plusieurs données de data-->
    <form @submit.prevent="validerEnvoiDrop" enctype="multipart/form-data">
        <div v-if="message"
            :class="`message ${error ? 'is-danger' : 'is-success'}`"
        >
        <div class="message-body">{{message}}</div>
        </div>

    
 <!--enctype permet de dire que c'est spécial et qu'on va utilise plusieurs données de data-->
    <div class="dropzone">
        <input
            type="file"
            class="file-input"
            ref="file"
            accept=".txt"
            @change="validerEnvoiDrop"
        />
        <p v-if="!uploading" class="call-to-action">
            Déposez votre document RSS ici (.txt)
        </p>

       <p v-if="uploading" class="progress-bar bg-secondary ">
            <progress 
                class="progress is-primary progress-bar-striped bg-danger progress-bar-animated"
                :value="progress"
                max="100"
            >
                    
            {{progress}} %

            </progress>
        </p> 

    </div> 
    <div class="content">
        <div class="mx-auto" style="width: 200px;">
        <ul>
             <span v-if="file && (file.type == 'text/plain')" class="file-name">{{file.name}}</span>
        </ul>  
        </div>
    </div>  
    </form>
        <div class="mx-auto" style="width: 100px;">
        <a class="btn btn-sm btn-outline-secondary" role="button" aria-pressed="true" v-on:click="execution" >Execution</a>
        </div>

       <p v-if="ex && present==true" class="progress-bar">
            <progress 
                class="progress is-primary progress-bar-striped bg-danger progress-bar-animated"
                :value="progress2"
                max="100"
            >
                    
            {{progress2}} %

            </progress>
        </p> 

<!--enctype permet de dire que c'est spécial et qu'on va utilise plusieurs données de data-->

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
                    <!--<a  class="btn btn-sm btn-outline-primary" role="button" aria-pressed="true" v-on:click="resultat">ZIP</a>-->
                    <b  class="btn btn-sm btn-outline-secondary" role="button" aria-pressed="true" v-on:click="execution2">TELECHARGER</b>
                    </div>
                    <!--<small class="text-muted">{{fichier.date}}</small>-->
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    <div class="mx-auto" style="width: 520px;">
       <h8><i><c>*Cliquez sur le bouton ci dessous si une erreur est survenue*</c></i></h8>
    </div>
    
    <div class="mx-auto" style="width: 70px;">

    <a class="btn btn-sm btn-outline-secondary" role="button" aria-pressed="true" v-on:click="supprimer" >Clean</a>
    <!-- <a href="http://localhost:8080/" class="btn btn-sm btn-outline-primary" role="button" aria-pressed="true" v-on:click="supprimer">Recharger la page</a>-->
    </div>

                     
    
    </div>

</template>



<script>
    import axios from 'axios';
    import { getAPI } from '../axios-api'
    import { mapState } from 'vuex'
  
    import Navbar from '../components/Navbar'
    export default {
        name: 'Fichier',
        data () {
            return {
                APIData: [],
                SortieData: [],
                file: "",
                donnee: {
                'title': ''
                },
                uploading: false,
                ex: false,
                message: "",
                error: false,
                uploadedFiles: [],
                progress: 0,
                progress2: 0,
                present : false,
                
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
        computed: mapState(['APIData']),


         methods: {

        link(lien){
            let texte = '"' + lien + '"';
            return texte;
        },

        selectionDeFichier(){
            this.file = this.$refs.file.files[0];
        },

        activate() {
        var that = this;
        setTimeout(function() { that.isHidden = false; }, 200);
        },


        async validerEnvoiDrop() {
            this.supprimer()
            this.file = this.$refs.file.files[0]
            const file = this.file
            const allowedTypes = ["text/plain"]
            if (allowedTypes.includes(this.file.type)){
                const formData = new FormData();
                formData.append("title", this.file.name);
                formData.append("contenu",file);
                try{
                this.uploading = true;
                const res = await getAPI.post('/ajouter/fichiers/',formData,{
                    onUploadProgress: e => this.progress = Math.round(e.loaded * 100 / e.total)
                });
                this.uploadedFiles.push(res.data.file);
                this.uploading = false;
                this.present = true;
                this.progress2 = 0;
                }catch(err) {
                    this.message = err.response.data.error;
                    this.error = true;
                    this.uploading = false;
                }
            }else {
                this.$fire({
                    title: "Mauvais format",
                    text: "Veuillez réesayer avec un fichier au format .txt",
                    type: "error",
                    timer: 10000
                    }).then(r => {
                    console.log(r.value);
                });
            }
            //this.file = null
            //this.donnee.title = null
        },
        created3 () {
            getAPI.get('/ajouter/donnee/', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
                .then(response => {
                    this.$store.state.APIData= response.data
                })
                .catch(err => {
                    console.log(err)
                })
            },

        async created () {
            //this.supprimer()
            getAPI.get('/ajouter/donnee')
            .then(response =>{
                console.log('Le fichier de l API à bien été recu !')
                this.APIData = response.data
            })
            .catch(err => {
                console.log(err)
            })
            //this.ex = false

        },

        async resultat(){
            getAPI.get('/ajouter/sortie',)
            .then(response =>{
                console.log('REPONSE DE LA FONCTION GROUPAGE')
                this.SortieData = response.data
            })
            .catch(err => {
                console.log(err)
            })

        },

        async supprimer() {
            getAPI.get('/ajouter/clean/')
            .then(response =>{
                console.log(response),
                console.log("Supression réussie")
            })
            .catch(err => {
                console.log(err)
            })
            this.APIData = null
            this.donnee.title= null
            this.file = null
        },

        async validerEnvoi() {
            //this.supprimer()
            const formData = new FormData();
            formData.append("title", this.donnee.title);
            formData.append("contenu", this.file);
            getAPI.post('/ajouter/fichiers/',formData)
            .then(response =>{
                console.log(response),
                console.log("L'envoi a l'API réussi")
            })
            .catch(err => {
                this.message = err.response.data.error;
                this.error = true;
                console.log(err)
            })
            //this.file = null
            //this.donnee.title = null
        },
    timeout(ms) { //pass a time in milliseconds to this function
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    progression(){
        
        var interval = setInterval(() =>{
            if(this.progress2 < 100){
                this.ex = true
                this.progress2 += .1;
            }
            else{
                this.ex = false 
                this.present = false
                clearInterval(interval);
                
            }
        }, 10)

    },
     
    execution(){
        //this.$alert("Veuillez patienter...");
        /*this.$fire({
            title: "Execution",
            text: "Veuillez patienter...",
            type: "success",
            timer: 10000
            }).then(r => {
            console.log(r.value);
        });*/
        if ( this.present == true){
        this.progression()
        this.created()
        this.file = null
        } else{
            this.$fire({
            title: "Erreur",
            text: "Aucun fichier",
            timer: 5000
            }).then(r => {
            console.log(r.value);
        });
        }
    },

    execution2(){
        this.telecharger()
        this.APIData = null
    },
        
        async telecharger(){
            axios({
                url : 'http://ec2-34-222-77-100.us-west-2.compute.amazonaws.com/media/media/RSS_GROUPE.zip',
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
            this.supprimer()
        },
     
    }
    }
</script>

<style scoped>

    .dropzone{
        min-height : 200px;
        padding: 10px 10px;
        position: relative;
        cursor: pointer;
        outline: 2px dashed grey;
        outline-offset: -10px;
        background:#E4E4E4 ;
        color: #AB111C;
              font-family: Verdana, Geneva, Tahoma, sans-serif;

    }
    .input-file{
        opacity: 0;
        width: 100%;
        height: 200px;
        position: absolute;
        cursor: pointer;
    }

    .dropzone:hover{
        background :#666666;
    }

    .dropzone .call-to-action {
        font-size: 1.2rem;
        text-align: center;
        padding: 70px 0;
    }

    .dropzone .progress-bar{
        text-align: center;
        padding: 70px 10px;
    }
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
