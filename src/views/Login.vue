<template>
  <div>
     <a class="navbar-brand" href="https://altao.com/"> <img src="../assets/altao.png" width="100" height="8" class="d-inline-block align-top" alt="" loading="lazy"></a>
  <div class="container text-dark">
    <div class="row justify-content-md-center">
      <div class="col-md-5 p-3 login justify-content-md-center">
        <h1 class="h3 mb-3 font-weight-normal text-center text-white">Connectez vous</h1>

        <p v-if="incorrectAuth" class="text-white">Identifiant ou mot de passe incorrect</p>
        <form v-on:submit.prevent="login">
          <div class="form-group">
            <input type="text" name="username" id="user" v-model="username" class="form-control" placeholder="Identifiant">
          </div>
          <div class="form-group">
            <input type="password" name="password" id="pass" v-model="password" class="form-control" placeholder="Mot de passe">
          </div>
          <button type="submit" class="btn btn-lg btn-danger btn-block">Connexion</button>
        </form>
        
      </div>
    </div>
  </div>
  </div>
</template>

<script>
    import { getAPI } from '../axios-api'
  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: '',
        incorrectAuth: false
      }
    },
    methods: {
      login () { 
        this.$store.dispatch('userLogin', {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'menu' })
          //this.supprimer()
        })
        .catch(err => {
          console.log(err)
          this.incorrectAuth = true
        })
        },

      async supprimer() {
            getAPI.get('/clean/')
            .then(response =>{
                console.log(response),
                console.log("Supression réussie")
            })
            .catch(err => {
                console.log(err)
            })
        },
      },
      
  }
</script>

<style>
body { 
  background-color:#f4f4f4;
}

  .login{
    background-color:#666666;
    margin-top:10%;
  }
  input {
    padding: 25px 10px;
}

</style>
