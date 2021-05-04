<template>
<div id="app">
  <!-- <amplify-authenticator>
    <div class="welcome">
      <h1>Hey, {{user.name}}!</h1>
      <amplify-sign-out></amplify-sign-out>
    </div>
  </amplify-authenticator>-->

    <div class="section">
      <div class="container">

            <router-view/>

      </div>
    </div>
</div>
</template>

<script>

//import { AuthState, onAuthUIStateChange } from 'aws-amplify-vue';
export default {
  name: 'App',
  //data(){
    //return{
      //user:{}
    //};
  //},
  /*created(){
    onAuthUIStateChange((state,user)=>{
      if(state === AuthState.SignedIn){
        this.user = user;
      }
    });
  }*/


};
</script>