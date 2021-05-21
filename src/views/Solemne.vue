
<template>
    <div class="Solemne">
        <Navbar></Navbar>

         <div class="mx-auto" style="width: 700px;">
        <e><br>JE VIENS TE TENIR COMPAGNIE </e> <d>LUNDI </d>
        </div>
         <div class="mx-auto" style="width: 300px;">
        <f>________________________________________________________</f>
        </div>
                 <div class="mx-auto" style="width: 700px;">
        <img src="../assets/fete.jpg" width="600" height="100" class="d-inline-block align-top" alt="" loading="lazy">
                 </div>
        <br>
         <div class="mx-auto" style="width: 700px;">
        <h> *si tout se passe bien </h>
        </div>
        <br>
 
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
  dg{
      color : #AB111C;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: 20px;
      background-color:rgba(238, 245, 241, 0.795);
      
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
    font-size: 10px;
    
}
k{
    color : white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 20px;
    
}
 
</style>
