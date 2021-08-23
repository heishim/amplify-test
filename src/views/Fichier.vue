<template>
    <div class="fichier">
        <Navbar></Navbar>

         <div class="mx-auto" style="width: 625px;">
        <e><br>OUTIL DE TRAITEMENT DES </e> <d>RSS </d>
        </div>
         <div class="mx-auto" style="width: 300px;">
        <f>________________________________________________________</f>
        </div>
        <br>


<!--enctype permet de dire que c'est spécial et qu'on va utilise plusieurs données de data-->
    <form @submit.prevent="validerEnvoiDrop" enctype="multipart/form-data">
        <div v-if="message"
            :class="`message ${error ? 'is-danger' : 'is-success'}`"
        >
        <div class="message-body">{{message}}</div>
        </div>

    
 <!--Création de la dropzone-->
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
             <span v-if="file && (file.type == 'text/plain') && (file != null)" class="file-name">{{file.name}}</span>
        </ul>  
        </div>
    </div>  
    </form>
        <div class="mx-auto" style="width: 100px;">
        <a class="btn btn-sm btn-outline-secondary" role="button" aria-pressed="true" v-on:click="execution" >Execution</a>
        </div>
<!--
       <p v-if="ex && present==true" class="progress-bar">
            <progress 
                class="progress is-primary progress-bar-striped bg-danger progress-bar-animated"
                :value="progress2"
                max="100"
            >
                    
            {{progress2}} %

            </progress>
        </p> 
-->
 <v-progress-circular
      :size="50"
      :width="4"
      color="red"
      indeterminate
      style="width: 1300px;"
      v-if="present==true"

    ></v-progress-circular>

<!--Création de l'affichage des fichiers-->

    <div class="album py-5 bg-light">
        <div class="container">
        <div class="row">
            <div v-for="fichier in APIData" :key="fichier.id" class="col-md-4">
            <div class="card mb-4 box-shadow">
                <img width="200" height="8" src="../assets/Doc.png" class="d-inline-block align-top" alt="" loading="lazy">
                <div class="card-body">
                    <h4 class=""><a class="text-secondary" :href= fichier.contenu>{{fichier.title}}</a></h4>
                     <!-- Affichage du message pop up -->
                    <h1 v-if="popmessage(fichier.title,fichier.email)"></h1>
                        
                    <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                    <b  class="btn btn-sm btn-outline-secondary" role="button" aria-pressed="true" v-on:click="execution2">TELECHARGER</b>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    <div class="mx-auto" style="width: 520px;">
       <h8><i><c>*Cliquez sur le bouton ci-dessous si une erreur est survenue*</c></i></h8>
    </div>
    
    <div class="mx-auto" style="width: 70px;">

    <a class="btn btn-sm btn-outline-secondary" role="button" aria-pressed="true" v-on:click="supprimer" >Supprimer données</a>
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
                WaitData : [],
                EmptyData : [],
                UserData2 : [],
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
                UserData :[],
                APIData10 : "",
                
            };
        },

        //fonction qui s'execute a l'arrivée sur la page
        onIdle () {
            this.$store.dispatch('userLogout')
                .then(() => {
                this.$router.push({ name: 'login' })
                })
        },

        //declaration des composants
        components: {
            Navbar
        },
        
        //Variable de store.js
        computed: mapState(['APIData7']),

        //Déclaration de toutes les fonctions :
        methods: {

//Fonction qui permet d'envoyer le fichier et les données au back grace a l'API Axios : 

        async validerEnvoiDrop() {

            //réinitialiser les données
            this.APIData = null
            this.ex = false 
            this.progress2 = 0
            this.present = false

            //assignation du fichier a la constante file
            this.file = this.$refs.file.files[0]
            const file = this.file

            //liste des types de fichiers acceptés
            const allowedTypes = ["text/plain"]

            //Récupération de la donnée EmptyData :  true si vide, false si non vide
            await getAPI.get('/empty/')
                .then(response =>{
                    console.log('Le fichier de l API à bien été recu !')
                    this.EmptyData = response.data
                })
                .catch(err => {
                    console.log(err)
                })

            
            if (allowedTypes.includes(this.file.type)){ //si bon type fichier continue
                
                
                if(this.EmptyData[0].vide == "true"){ //si back est vide continue
                this.supprimerbis() //nettoie la base



                //Ajout des données dans la liste formData : 
                const formData = new FormData();
                formData.append("title", this.file.name);
                formData.append("contenu",file);
                formData.append("user",this.$store.user);
                //formData.append("csrfmiddlewaretoken",this.getCookie('csrftoken'));

                //Envoi des données au backend
                try{
                this.uploading = true;
                const res = await getAPI.post('/fichiers/',formData,{
                    onUploadProgress: e => this.progress = Math.round(e.loaded * 100 / e.total)
                });
                this.uploadedFiles.push(res.data.file);
                this.uploading = false;
                this.progress2 = 0;
                }catch(err) {
                    this.message = err.response.data.error;
                    this.error = true;
                    this.uploading = false;
                }
                }else{
                    //recupération de l'user pour determiner si l'user présent est autorisé à modifier les fichiers
                    await getAPI.get('/user/')
                    .then(response =>{
                        console.log('Le fichier de l API à bien été recu !')
                        this.UserData2 = response.data
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    if(this.UserData2[0].user == this.$store.user){
                        this.supprimerbis()
                        const formData = new FormData();
                        formData.append("title", this.file.name);
                        formData.append("contenu",file);
                        formData.append("user",this.$store.user);
                        try{
                        this.uploading = true;
                        const res = await getAPI.post('/fichiers/',formData,{
                            onUploadProgress: e => this.progress = Math.round(e.loaded * 100 / e.total)
                        });
                        this.uploadedFiles.push(res.data.file);
                        this.uploading = false;
                        this.progress2 = 0;
                        }catch(err) {
                            this.message = err.response.data.error;
                            this.error = true;
                            this.uploading = false;
                        }
                        }else{
                            //suppression des données avec delai de 4 minutes
                            getAPI.get('/deletedelay/')
                            .then(response =>{
                                console.log('Le fichier de l API à bien été recu !')
                                console.log(response)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                            this.ex = false 
                            this.progress2 = 0
                            //this.present = false
                            this.APIData = null
                            this.donnee.title= null
                            this.file = null
                            this.$fire({
                            title: "Server",
                            text: "Veuillez réessayer dans 5 minutes",
                            type: "error",
                            timer: 10000
                            }).then(r => {
                            console.log(r.value);
                        });
                        }
                    }
            }else {
                //format different de .txt
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
        

//Message popup indiquant si la fonction est un succes ou pas 
        popmessage(title,email){

            if(title != "erreur.txt"){
                    this.$fire({
                    title: "Fichier bien envoyé",
                    type: "success",
                    text: "Vous recevrez le resultat par mail (" + email + ") dans les 48h",
                    timer: 10000
                    }).then(r => {
                    console.log(r.value);
                    this.APIData10 = email
            })}
            else{
                    this.$fire({
                    title: "Probleme lors de l'envoi du fichier",
                    type: "error",
                    text: "Veuillez suivre les étapes suivantes : 1 - Clean 2 - Déconnexion 3 - Connectez vous et recommencez",
                    timer: 10000
                    }).then(r => {
                    console.log(r.value);
                });
                this.present=false
                this.progress2=0
            }

        },

//récupération des données du fichier
        async created () {
            //this.supprimer()
            await getAPI.get('/donnee')
            .then(response =>{
                console.log('Le fichier de l API à bien été recu !')
                this.APIData = response.data //donnee du titre, fichier
            })
            .catch(err => {
                console.log(err)
            })
            await getAPI.get('/donnee2')
            .then(response =>{
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
           
            //this.ex = false
        },

//appel de sortie pour zippage du dossier
        async resultat(){
            getAPI.get('/sortie',)
            .then(response =>{
                console.log('REPONSE DE LA FONCTION GROUPAGE')
                this.SortieData = response.data
            })
            .catch(err => {
                console.log(err)
            })
        },

//fonction qui supprime les données 
    
        async supprimer() {
            await getAPI.get('/empty/')
                .then(response =>{
                    console.log('Le fichier de l API à bien été recu !')
                    this.EmptyData = response.data
                })
                .catch(err => {
                    console.log(err)
                })
                if(this.EmptyData[0].vide == "true"){
                    this.ex = false 
                    this.progress2 = 0
                    this.present = false
                    this.APIData = null
                    this.donnee.title= null
                    this.file = null
                    this.$fire({
                    title: "Aucun RSS",
                    type: "error",
                    timer: 10000
                    }).then(r => {
                    console.log(r.value);
                });
                
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
                    this.ex = false 
                    this.progress2 = 0
                    this.present = false
                    this.APIData = null
                    this.donnee.title= null
                    this.file = null
                    }else{
                        getAPI.get('/deletedelay/')
                        .then(response =>{
                            console.log('Le fichier de l API à bien été recu !')
                            console.log(response)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        this.$fire({
                        title: "Vous n'avez aucun RSS",
                        type: "error",
                        timer: 10000
                        }).then(r => {
                        console.log(r.value);
                    });
                    }
                    }
        },

//suppression de données sans bouton 

        async supprimerbis() {
            await getAPI.get('/clean/')
            .then(response =>{
                console.log(response),
                console.log("Supression réussie")
            })
            .catch(err => {
                console.log(err)
            })
            this.APIData = null
            this.ex = false 
            this.progress2 = 0
            this.present = false
        },


//progression de la barre de chargement
/*    progression(){
        
        var interval = setInterval(() =>{
            if(this.progress2 < 100){
                this.ex = true
                this.progress2 += 0.02;
            }
            else{

                this.ex = false 
                this.present = false
                clearInterval(interval);

                
            }
        }, 10)
    },
   */  

//bouton d'execution = groupage, zipage et renvoi au frontend
    execution(){
        this.present = true
        if ( this.file != null){
        //this.progression()
        this.created()
        this.file = null
        //si fichier vaut erreur alors arret
            if(this.APIData[0].title != "erreur"){
                    this.$fire({
                    title: "Fichier bien envoyé",
                    type: "success",
                    text: "Vous recevrez le resultat par mail dans les 48h",
                    timer: 10000
                    }).then(r => {
                    console.log(r.value);
                    this.present= false
                });
                
            }
            else{
                    this.present = false
                    this.$fire({
                    title: "Probleme lors de l'envoi du fichier",
                    type: "error",
                    text: "Veuillez suivre les étapes suivantes : 1 - Clean 2 - Déconnexion 3 - Connectez vous et recommencez",
                    timer: 10000
                    }).then(r => {
                    console.log(r.value);
                });
            }
        } else{
            this.present = false
            this.$fire({
            title: "Erreur",
            text: "Aucun fichier",
            timer: 5000
            }).then(r => {
            console.log(r.value);
        });
        }
    },


//fonction qui permet le telechargement 
    execution2(){
        this.telecharger()
        this.APIData = null
    },
        
        async telecharger(){
            axios({
                url : 'https://backend-altao.com/media/media/RSS_GROUPE.zip',
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

        /*
        selectionDeFichier(){
            this.file = this.$refs.file.files[0];
        },
        activate() {
        var that = this;
        setTimeout(function() { that.isHidden = false; }, 200);
        },

        created3 () {
            getAPI.get('/donnee/', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
                .then(response => {
                    this.$store.state.APIData= response.data
                })
                .catch(err => {
                    console.log(err)
                })
            },

        async validerEnvoi() {
            //this.supprimer()
            const formData = new FormData();
            formData.append("title", this.donnee.title);
            formData.append("contenu", this.file);
            getAPI.post('/fichiers/',formData)
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

       getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
},
        */
     
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