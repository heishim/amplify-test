<template>
    <div class="Codage">

<v-app>
<Navbar></Navbar>



<v-container class="album py-5 ">
<v-row>
<v-select
          v-model="var_finess"
          :items="API_finess"
          v-on:click="recherche_finess"
          label="Etablissement"
          outlined
        ></v-select>
<v-select
          v-model="var_date"
          :items="API_date"
          v-on:click="recherche_date"
          label="Date"
          outlined
        ></v-select>
<v-select
          v-on:click="recherche_file"
          v-model="var_file"
          :items="API_file"
          label="Fichier"
          outlined
        ></v-select>
       
</v-row>
</v-container>              

 <v-row justify="center" style="margin-top: 20px">
          <v-btn v-on:click="recherche_complete" color="grey">Rechercher</v-btn>
        </v-row>

</v-app>
    </div>

</template>



<script>
import Navbar from '../components/Navbar'
import { getAPI } from '../axios-api'

export default {

    name: 'codage',
    data() {
        return {
            API_finess : [],
            API_date: [],
            API_file : [],
            var_file : "",
            var_finess : "",
            var_date : "",     
            }
    },
    components: {
        Navbar,

    },

    //fonction qui envoi user et recupere finess
            recherche_finess(){
                const formData = new FormData();
                formData.append("user", this.$store.user);
                
                getAPI.post('/liste_etablissement_codage/',formData)
               .then(response =>{
                console.log('Resultat recu')
                this.API_finess = response.data
            })
            .catch(err => {
                console.log(err)
            })
            },

         methods: {

//fonction qui envoi user et recupere finess
            async recherche_finess(){
                const formData = new FormData();
                formData.append("user", this.$store.user);
                
                getAPI.post('/liste_etablissement_codage/',formData)
               .then(response =>{
                console.log('Resultat recu')
                this.API_finess = response.data
            })
            .catch(err => {
                console.log(err)
            })
            },
//fonction qui envoi finess et recupere date
            async recherche_date(){
                const formData = new FormData();
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                
                getAPI.post('/liste_date_codage/',formData)
               .then(response =>{
                console.log('Resultat recu')
                this.API_date = response.data
            })
            .catch(err => {
                console.log(err)
            })
            },
//fonction qui envoi date et recupere fichier
            async recherche_file(){
                const formData = new FormData();
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);

                
                getAPI.post('/liste_file_codage/',formData)
               .then(response =>{
                console.log('Resultat recu')
                this.API_file = response.data
            })
            .catch(err => {
                console.log(err)
            })
            },

            recherche_complete(){
                this.$router.push({ name: 'codage' })
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


</style>
