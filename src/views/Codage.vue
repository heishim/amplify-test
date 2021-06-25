<template>
    <div class="Codage">

<v-app>
<Navbar></Navbar>



<v-container class="album py-5 ">
<v-row>
          <v-text-field
            v-model="rss"
            outlined
            clearable
            label="RSS"
            type="text"
          >
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-progress-circular
                  v-if="loading"
                  size="24"
                  color="info"
                  indeterminate
                ></v-progress-circular>
              </v-fade-transition>

            </template>
    
          </v-text-field>
              <v-btn elevation="4" x-large class="mx-auto" v-on:click="recherche_rss()">
                  <v-icon >fas fa-search</v-icon>
              </v-btn>
</v-row>   
</v-container>   

   <div class="album py-5 bg-light">
        <div class="container-xxl">
        <div class="row">
            <div v-for="rss in APIData_RSS" :key="rss.id" class="col-md-4">
            <ul class="list-group list-group-flush">

                    <j >    {{rss.date}} : CMD {{rss.cmd}}</j>
                    <br>

            </ul>
            </div>
        </div>
        </div>
    </div>



  <Headercards></Headercards>

<v-container class="album py-5 bg-light">
<v-row>

 <div v-bind:class="flipped ? 'flip-container mx-auto flipped': 'flip-container mx-auto'">
    <div class="flipper">
      <div class="front">
        <v-card  
    style="border: 6px solid rgb(200, 120, 120)"
    class="mx-auto"
    max-width="380"
    outlined
    elevation="18"
    >
 <v-card-title > 
   <div class="mx-auto">
     <k>13/04/2020 - 26/04/2020</k>
   </div>
     <div class="mx-auto">
    <k>UM 08 | CMD 14</k>
   </div>
</v-card-title>
 <v-card-subtitle>
  
     DIAGNOSTICS
 </v-card-subtitle>
<v-card>
<v-card-title>

<b>A02.1</b>
<v-icon large class="mx-auto" color="red darken-2">mdi-domain</v-icon>
<a>Septicémie à Salmonella</a>
  </v-card-title>
</v-card>
<v-card >
<v-card-title >

<a>A02.1</a>
    <v-icon v-on:click="remplace_dp()" large class="mx-auto">mdi-arrow-up-bold-box-outline</v-icon>
<a>Septicémie à Salmonella</a>

</v-card-title>
</v-card >
<v-card>
<v-card-title>
<a>A02.1</a>
    <v-icon v-on:click="remplace_dp()" class="mx-auto" large>mdi-arrow-up-bold-box-outline</v-icon>
<a>Septicémie à Salmonella</a>
</v-card-title>
</v-card>


<v-col class="d-inline-flex p-2 bd-highlight">

    <v-select
    v-if="var_input1==false"
    v-model="var_das"
    :items="var_items"
    label="DAS"
    outlined
  ></v-select>

            <v-text-field
      v-if="var_input1==true"
      v-model="var_das"
      label="DAS"
      :rules="rules"
      hide-details="auto"
    ></v-text-field>
        
        <v-subheader>
          <v-btn  @click="change_input1">
          <img width="20" height="8" src="../assets/keyword.png"  >
          </v-btn>
        <v-btn color=#666666 v-on:click="ajout_das">Ajouter</v-btn>
        </v-subheader>
      </v-col>

  <v-card-subtitle>
     ACTES CLASSANTS
 </v-card-subtitle>
<v-card >
<v-card-title>
<a>A02.1</a>
<v-icon large class="mx-auto" color="grey darken-2">mdi-domain</v-icon>
<a>Septicémie à Salmonella</a>
</v-card-title>
</v-card>
<v-card >
<v-card-title>
<a>A02.1</a>
<v-icon large class="mx-auto" color="grey darken-2">mdi-domain</v-icon>
<a>Septicémie à Salmonella</a>
</v-card-title>
</v-card>

   <v-col
        class="d-flex"
        cols="12"
        sm="12"
      >

        <v-select
          v-if="var_input2 == false"
          v-model="var_acte"
          :items="var_items"
          label="Actes"
          outlined
        ></v-select>

         <v-text-field
      v-if="var_input2==true"
      v-model="var_acte"
      label="Actes"
      :rules="rules"
      hide-details="auto"
    ></v-text-field>
        <v-subheader>
          <v-btn  @click="change_input2">
          <img width="20" height="8" src="../assets/keyword.png"  >
          </v-btn>
        <v-btn color=#666666 v-on:click="ajout_acte">Ajouter</v-btn>
        </v-subheader>
      </v-col>

<v-card-actions>
    
<v-col>
<div>
      <v-textarea
          v-model="var_commentaire"
          clearable
          class="mx-2"
          rows="1"
          prepend-icon="mdi-comment"
          clear-icon="mdi-close-circle"
          label="Commentaire"
          name="input-7-1"
        ></v-textarea>

</div>


<v-btn @click="flipped=true"><img width="20" height="8" src="../assets/arrow-circle.png"  ></v-btn>

</v-col>
</v-card-actions>
</v-card>

      </div>
      <div class="back mx-auto">
        <v-card  
    style="border: 6px solid rgb(200, 120, 120)"
    class="mx-auto"
    max-width="380"
    outlined
    elevation="18"
    >
 <v-card-title > 
   <div class="mx-auto">
     <k>13/04/2020 - 26/04/2020</k>
   </div>
     <div class="mx-auto">
    <k>UM 08 | CMD 14</k>
   </div>
</v-card-title>
 <v-card-subtitle>
  
     IGS
 </v-card-subtitle>
<v-card >
<v-card-title >

<a>396</a>

</v-card-title>
</v-card >



   <v-col
        class="d-inline-flex p-2 bd-highlight"

        v-if="var_retourner==false"
      >

        <v-select
          v-if="var_input1==false"
          v-model="var_igs"
          :items="var_items"
          label="IGS"
          outlined
        ></v-select>
            <v-text-field
      v-if="var_input1==true"
      v-model="var_igs"
      label="IGS"
      :rules="rules"
      hide-details="auto"
    ></v-text-field>
        
        <v-subheader>
          <v-btn  @click="change_input1">
          <img width="20" height="8" src="../assets/keyword.png"  >
          </v-btn>
        <v-btn color=#666666 v-on:click="remplace_igs">Remplacer</v-btn>
        </v-subheader>
      </v-col>

  <v-card-subtitle v-if="var_retourner==false">
     DR
 </v-card-subtitle>
<v-card v-if="var_retourner==false">
<v-card-title>
<b>A02.1</b>
<v-icon large class="mx-auto" color="red darken-2">mdi-domain</v-icon>
<a>Septicémie à Salmonella</a>
</v-card-title>
</v-card>


   <v-col
        class="d-flex"
        cols="12"
        sm="12"
        v-if="var_retourner==false"
      >

        <v-select
          v-model="var_dr"
          v-if="var_input2 == false"
          :items="var_items"
          label="DR"
          outlined
        ></v-select>

         <v-text-field
      v-model="var_dr"
      v-if="var_input2==true"
      label="DR"
      :rules="rules"
      hide-details="auto"
    ></v-text-field>
        <v-subheader>
          <v-btn  @click="change_input2">
          <img width="20" height="8" src="../assets/keyword.png">
          </v-btn>
        <v-btn color=#666666 v-on:click="remplace_dr">Remplacer</v-btn>
        </v-subheader>
      </v-col>
<v-card-actions>
    
<v-col>
<div>
      <v-textarea
          clearable
          class="mx-2"
          rows="1"
          prepend-icon="mdi-comment"
          clear-icon="mdi-close-circle"
          label="Commentaire"
          name="input-7-1"
        ></v-textarea>

</div>


<v-btn @click="flipped=false"><img width="20" height="8" src="../assets/arrow-circle.png"></v-btn>

</v-col>
</v-card-actions>
</v-card>
      </div>
    </div>
  </div>


 <v-btn class="mx-auto" fab dark color="grey">
      <v-icon dark>
        mdi-plus
      </v-icon>
</v-btn>
</v-row>
</v-container>              

 <v-row justify="center" style="margin-top: 20px">
          <v-btn v-on:click="sauvegarder_commentaire" color="grey">Sauvegarder</v-btn>
        </v-row>

<!-- <a>{{var_acte}} / {{var_das}} / {{var_dr}} / {{var_igs}} / {{var_commentaire}}</a> -->

<Historyrecapbis></Historyrecapbis>


 

</v-app>
    </div>

</template>



<script>
import Navbar from '../components/Navbar'
import Headercards from './headercards.vue'
import Historyrecapbis from "./historyrecapbis.vue";
import { getAPI } from '../axios-api'






export default {

    name: 'codage',
    data() {
        return {
            var_retourner : false,
            var_items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            var_input1 : false,
            var_input2 : false,
            var_dr : "",
            var_igs : "",
            var_das : "",
            var_acte : "",
            var_commentaire : "",
            flipped: false,
            rss : "",
            APIData_RSS : [],
            

            
  
            }
    },
    components: {
        Navbar,
        Headercards,
        Historyrecapbis,

    },

         methods: {

             retourner(){
                 this.var_retourner = !this.var_retourner
             },

             change_input1(){
                 this.var_input1 = !this.var_input1
             },

             change_input2(){
                 this.var_input2 = !this.var_input2
             },



//fonction qui envoi le rss et retotune les données de celui ci
            async recherche_rss(){
                const formData = new FormData();
                formData.append("rss", this.rss);
                
                getAPI.post('/recherche_rss/',formData)
               .then(response =>{
                console.log('Resultat recu')
                this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.rss=""
            },

//fonction qui ajoute un DAS
            async ajout_das(){
                const formData = new FormData();
                formData.append("das", this.var_das);
                
                getAPI.post('/ajout_das/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.var_das=""
                this.maj_cartes(/*numero rss a ajouter*/)
            },

//fonction qui remplace DP par DAS
            async remplace_dp(das){
                const formData = new FormData();
                formData.append("das", das);
                
                getAPI.post('/remplace_dp/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.maj_cartes(/*numero rss a ajouter*/)
            },

//fonction qui ajoute un acte
            async ajout_acte(){
                const formData = new FormData();
                formData.append("acte", this.var_acte);
                
                getAPI.post('/ajout_acte/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.var_acte=""
                this.maj_cartes(/*numero rss a ajouter*/)
            },

//fonction qui remplace l'IGS
            async remplace_igs(){
                const formData = new FormData();
                formData.append("igs", this.var_igs);
                
                getAPI.post('/remplace_igs/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.var_igs=""
                this.maj_cartes(/*numero rss a ajouter*/)
            },

//fonction qui remplace le DR
            async remplace_dr(){
                const formData = new FormData();
                formData.append("dr", this.var_dr);
                
                getAPI.post('/remplace_dr/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.var_dr=""
                this.maj_cartes(/*numero rss a ajouter*/)
            },

//fonction qui sauvegarde commentaire
            async sauvegarde_commentaire(){
                const formData = new FormData();
                formData.append("commentaire", this.var_commentaire);
                
                getAPI.post('/sauvegarde_commentaire/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.maj_cartes(/*numero rss a ajouter*/)
            },

//fonction qui met a jour toutes les cartes
            async maj_cartes(rss){
                const formData = new FormData();
                formData.append("rss", rss);
                
                getAPI.post('/maj_cartes/',formData)
               .then(response =>{
                console.log(response)
                this.APIData_RSS = response.data
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
  k{
      color : #AB111C;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
          font-size: 25px;

  }
i.frontFlipBtn,
i.backFlipBtn {
    position:absolute; 
    right: 20px; 
    top: 20px;
    color:#FFFFFF;
}
i.backFlipBtn {
    -webkit-transform: rotateY(-180deg);
    -moz-transform: rotateY(-180deg);
    -o-transform: rotateY(-180deg);
    -ms-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
}
.flip-container {
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -o-perspective: 1000;
  perspective: 1000;
}
.flip-container {
  min-height: 120px;
}
.flipper {
  -moz-transform: perspective(1000px);
  -moz-transform-style: preserve-3d;
  position: relative;
}
.front,
.back {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.6s;
  -webkit-transform-style: preserve-3d;
  -moz-transition: 0.6s;
  -moz-transform-style: preserve-3d;
  -o-transition: 0.6s;
  -o-transform-style: preserve-3d;
  -ms-transition: 0.6s;
  -ms-transform-style: preserve-3d;
  transition: 0.6s;
  transform-style: preserve-3d;
  top: 0;
  left: 0;
  width: 100%;
}
.back {
  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  position: absolute;
}
.flip-container.flipped .back {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  transform: rotateY(0deg);
}
.flip-container.flipped .front {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
.front {
  z-index: 2;
}


</style>
