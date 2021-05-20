<template>
    <div class="Resultat">
        <Navbar></Navbar>

         <div class="mx-auto" style="width: 560px;">
        <e><br>RECUPERATION DES </e> <d>RESULTATS </d>
        </div>
         <div class="mx-auto" style="width: 300px;">
        <f>________________________________________________________</f>
        </div>
        <br>
         <div class="mx-auto" style="width: 700px;">
        <h> Veuillez sélectionner le(s) dossier(s) à télécharger ou supprimer : </h>
        </div>
        <br>



    <div class="album py-5 bg-light">
        <div class="container-xxl">
        <div class="row">
            <div v-for="fichier in APIData3" :key="fichier.id" class="col-md-4">
            <ul class="list-group list-group-flush">
                <li class="list-group-item"> 


                    <input type="radio" :id="fichier.id" :value="fichier" v-model="picked2">

                    <k>_</k>
                    <img width="20" height="8" src="../assets/Doc.png"  >
                    <j>    {{fichier}}</j>

                    </li>
                    
                




            </ul>
            </div>
        </div>
        </div>
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
        <input type="radio" id="all" value="all" v-model="picked2">
<label for="all">Tout séléctionner</label>
<br>



                   


            <b  class="btn btn-sm btn-outline-secondary btn-lg btn-block " role="button" aria-pressed="true" v-on:click="telecharger(picked2)">TELECHARGER : {{picked2}}</b>

            <a  class="btn btn-sm btn-outline-danger btn-lg btn-block " role="button" aria-pressed="true" v-on:click="supprimer(picked2)">SUPPRIMER</a>



    



        
    
    </div>

    

</template>



<script>
    import axios from 'axios';
    import { getAPI } from '../axios-api'
    import Navbar from '../components/Navbar'
    
    export default {
        name: 'Resultat',
        data () {
            return {
                APIData3: [], 
                checkedFiles : [],
                name_zip : [],
                present2 : false,
                ex2 : false,
                progress3 : 0,
                picked : "",
                picked2 : "",
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

            getAPI.get('/resultat', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
            .then(response =>{
                console.log('Resultat recu')
                this.APIData3 = response.data
            })
            .catch(err => {
                console.log(err)
            })

        },


         methods: {

        affectation(name){
        
        this.picked2 = name

        },

        
        
        async telecharger2(name){
            axios({
                url : 'https://backend-altao.com/media/resultat/' + name,
                method: 'GET',
                responseType: 'blob',
            }).then((response) =>{
                var fileUrl = window.URL.createObjectURL(new Blob([response.data]))
                var fileLink = document.createElement('a')
                fileLink.href = fileUrl

                fileLink.setAttribute('download', name)
                document.body.appendChild(fileLink)

                fileLink.click()
            })
            //this.supprimerbis()
        },

        async telecharger_all(){
            this.progression()
            await getAPI.get('/telecharger_all')
            .then(response =>{
                console.log('Zip crée')
                this.name_zip=response.data
            })
            .catch(err => {
                console.log(err)
            })

            axios({
                url : 'https://backend-altao.com/media/zip/' + this.name_zip[0],
                method: 'GET',
                responseType: 'blob',
            }).then((response) =>{
                var fileUrl = window.URL.createObjectURL(new Blob([response.data]))
                var fileLink = document.createElement('a')
                fileLink.href = fileUrl

                fileLink.setAttribute('download', name)
                document.body.appendChild(fileLink)

                fileLink.click()
            })

            getAPI.get('/clean_zip')
            .then(response =>{
                console.log('Zip supprimé'+ response)
            })
            .catch(err => {
                console.log(err)
            })

        },

        created () {

            getAPI.get('/resultat')
            .then(response =>{
                console.log('Resultat recu')
                this.APIData3 = response.data
            })
            .catch(err => {
                console.log(err)
            })
           
            //this.ex = false

        },

        async telecharger(name){
        if(this.picked2 == ""){
            this.$fire({
            text: "Aucun fichier séléctionné",
            timer: 5000
            }).then(r => {
            console.log(r.value);
        });
        }
        else{
        if(name=="all"){
            this.$confirm("Voulez vous vraiment tout télécharger ?").then(() => {
            this.telecharger_all()
            });
        }
        else{
        this.$confirm("Voulez vous télécharger le fichier " + name + " ?").then(() => {
            this.telecharger2(name)
        });
        }
        }
        },

        async supprimer(name){
        if(this.picked2 == ""){
            this.$fire({
            text: "Aucun fichier séléctionné",
            timer: 5000
            }).then(r => {
            console.log(r.value);
        });
        }
        else{
        if(name=="all"){
            this.supprimer_all()
        }
        else{
        this.$confirm("Voulez vous vraiment supprimer le fichier " + name + " ?").then(() => {
            this.boite(name)
        });
        }
        }
        },


        async supprimer_all(){
            this.$confirm("Voulez vous vraiment tout supprimer ?").then(() => {
            getAPI.get('/delete_all/')
            .then(response =>{
                console.log(response),
                console.log("Supression")
                this.created()
            })
            .catch(err => {
                console.log(err)
            })
            });
        },

        async boite(name){
            
            const formData = new FormData();
            formData.append("name", name);
            try{
            await getAPI.post('/name/',formData);
            }catch(err) {
                this.message = err.response.data.error;
            }
            getAPI.get('/delete_one/')
            .then(response =>{
                console.log(response),
                console.log("Supression" + name)
                this.created ()

            })
            .catch(err => {
                console.log(err)
            })


        },

        progression(){
        
            var interval = setInterval(() =>{
                if(this.progress3 < 100){
                    this.present2 = true
                    this.progress3 += .1;
                }
                else{
                    this.ex2 = false 
                    this.present2 = false
                    this.progress3 = 0
                    clearInterval(interval);
                    
                }
            }, 10)

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
h{
    color : #666666;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 20px;
    
}
k{
    color : white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 20px;
    
}
 
</style>
