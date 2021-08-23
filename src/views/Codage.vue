<template>
    <div class="Codage">

<v-app>
<Navbar></Navbar>

         <div class="mx-auto" style="width: 580px;">
        <e><br>OUTIL DE RECODAGE DES </e> <d>RSS </d>
        </div>
         <div class="mx-auto" style="width: 330px;">
        <f>________________________________________________________</f>
        </div>
        <br>

<v-container class="album py-5 ">
<v-row>

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
       
</v-row>
</v-container>              

<v-autocomplete filled rounded v-model="var_rss" v-on:click="liste_rss()" label="Rechercher un fichier RSS" :items="API_rss"
 append-icon="mdi-magnify"
 d-flex
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
    
          </v-autocomplete>
              <v-btn elevation="4" x-large  class="mx-auto" v-on:click="var_plus=!(var_plus)">
                  <v-icon >fas fa-plus</v-icon>
              </v-btn>

              <v-btn elevation="4" x-large class="mx-auto" v-on:click="recherche_rss()">
                  <v-icon >fas fa-search</v-icon>
              </v-btn>
</v-row>  


      <v-select
        v-model="var_critere"
        :items="critere"
        v-on:click="liste_rss_criteres()"
        attach
        chips
        deletable-chips
        :menu-props="{ bottom: true, offsetY: true }"
        label="Critères"
        multiple
        clearable
        v-if="var_plus==true"
      ></v-select>

       <v-select v-if="var_plus==true" v-model="var_tri" :items="var_items" label="Tri" outlined></v-select>



      <v-btn
        class="ma-2"
        color="grey darken-2"
        dark
        v-on:click="rss_precedant(0)"
        style=" float: left"
      >
        <v-icon
          dark
          left
        >
          mdi-arrow-left
        </v-icon>Precedent
      </v-btn>

    <v-progress-circular
      :size="40"
      :width="4"
      color="red"
      indeterminate
      style="width: 900px;"
      v-if="progression==true"

    ></v-progress-circular>


      <v-btn
        class="ma-2"
        color="red darken-2"
        dark
        v-on:click="rss_suivant(0)"
        style=" float: right"
      >Suivant 
        <v-icon
          dark
          right
        >
          mdi-arrow-right
        </v-icon>
      </v-btn>







</v-container>   


<!--
   <div class="album py-5 bg-light">
        <div class="container-xxl">
        <div class="row">
            <div v-for="rss in APIData_RSS" :key="rss.id" class="col-md-4">
            <ul class="list-group list-group-flush">

                    <a >   Finess {{rss.finess}} : Rss {{rss.num_rss}} : date entree {{rss.date_entree}}</a>
                    <br>

            </ul>
            </div>
        </div>
        </div>
    </div>
    <a v-if="donnee==1">{{var_rss}} _ {{var_finess}} _ {{var_date}}_{{APIData_RSS[0].num_rss}}</a>-->
    




<v-container v-if="donnee==1">        
<v-layout row wrap style="margin-bottom:10px; margin-top: 20px; border: 6px solid rgb(190, 190, 190); background-color:rgb(245, 245, 245)">
        <v-flex md3 lg3>
          <v-card height="100%" >
            <v-container class="headercards">
              <tr style="margin-bottom: 16px">
                <td class="idcard"><b_bis>Nombre RUM</b_bis> : {{ APIData_RUM[0].info_carte.nombre_rum }} </td>
                <td class="idcard"><b_bis>Age</b_bis> {{ APIData_RSS[0].age }} ans / jour si - 1an</td>

              </tr>
              <tr width="50px">
                <td class="idcard"><b_bis>N°séjour</b_bis> {{ APIData_RSS[0].num_admin }}</td>
                <td class="idcard"><b_bis>Entrée</b_bis> {{ APIData_RSS[0].date_entree }}</td>
              </tr>
              <tr>
                <td class="idcard" v-if="APIData_RSS[0].sexe=='1'"><b_bis>Sexe</b_bis> Homme</td>
                <td class="idcard" v-if="APIData_RSS[0].sexe=='2'"><b_bis>Sexe</b_bis> Femme</td>
                <td class="idcard"><b_bis>Sortie</b_bis> {{ APIData_RSS[0].date_sortie }}</td>
              </tr>
              <tr>
                <td><b_bis>Naissance</b_bis> {{ APIData_RSS[0].date_nais }}</td>
                <td><b_bis>UM</b_bis> {{ APIData_RSS[0].num_um }}</td>
              </tr>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex md1 lg1></v-flex>
        <v-flex md2 lg2>
          <v-card height="100%" >
            <v-card-title class="pb-0 justify-center">GHM</v-card-title>
            <v-container style="height: 140px">
              <a>Initial : <b_bis2>{{ APIData_RSS[0].ghm }}</b_bis2></a>
              <br><br>
              <a>Actuel : <b_bis2>    
                <v-progress-circular
                  :size="20"
                  :width="2"
                  color="red"
                  indeterminate
                ></v-progress-circular></b_bis2></a>

              <tr></tr>
<v-row>
              <v-card-subtitle class="text-center" >
                
                [
                <b v-if="bornes(APIData_RSS[0].duree_date,APIData_RSS[0].bb,APIData_RSS[0].bh)=='bb'">{{ APIData_RSS[0].bb }}</b>
                <a v-if="bornes(APIData_RSS[0].duree_date,APIData_RSS[0].bb,APIData_RSS[0].bh)!='bb'">{{ APIData_RSS[0].bb }}</a>
                -
                <b v-if="bornes(APIData_RSS[0].duree_date,APIData_RSS[0].bb,APIData_RSS[0].bh)=='bh'">{{ APIData_RSS[0].bh }}</b>
                <a v-if="bornes(APIData_RSS[0].duree_date,APIData_RSS[0].bb,APIData_RSS[0].bh)!='bh'">{{ APIData_RSS[0].bh }}</a>
                
                ] <b v-if="bornes(APIData_RSS[0].duree_date,APIData_RSS[0].bb,APIData_RSS[0].bh)=='bh'">{{ APIData_RSS[0].extreme_haut }}</b>
                
                
                 ({{ APIData_RSS[0].dms }}) 
                 ({{ APIData_RSS[0].tp }}€)</v-card-subtitle>
              
</v-row>

            
            </v-container>
            
          </v-card>
        </v-flex>
        
        <v-flex md1 lg1></v-flex>
        <v-flex md2 lg2>
          <v-card class="gain" height="100%">
            <v-card-title class="pb-0 justify-center">ECART TARIFAIRE</v-card-title>
            <v-container>
              <p><v-progress-circular
                  :size="40"
                  :width="2"
                  color="red"
                  indeterminate
                ></v-progress-circular>€</p>
            </v-container>
          </v-card>
        </v-flex>
                <v-flex md1 lg1></v-flex>
        <v-flex md2 lg2>
          <v-card height="100%">
            <v-card-title class="pb-0 justify-center">PRÉDICTION</v-card-title>
            <v-container>
              <p>{{ APIData_RSS[0].tarif_pred }} €</p>
              <p><b_bis2>{{ APIData_RSS[0].ghm_pred }}</b_bis2></p>
              <p>{{ APIData_RSS[0].score }}%</p>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex md1 lg1></v-flex>
        
      </v-layout>

</v-container>
  <!--<Headercards></Headercards>-->
 <!-- <a v-if="donnee==1"> das: {{APIData_RUM[1].acte.acte[0].id}} </a>

<div v-for="(rum,index) in APIData_RUM" :key="index" class="col-md-4">
    <a>({{index}}) </a>
<a> Num RUM:{{rum.info_carte.num_rum}} </a>
<a> DP : {{rum.dp.dp[0].dp}} </a>
<div v-for="(das2,index2) in rum.das.das" :key="das2.id" class="col-md-4">
    <a>({{index}},{{index2}}) </a>
<a> DAS : {{das2.das}} </a>
</div>
<div v-for="(acte3,index3) in rum.acte.acte" :key="acte3.id" class="col-md-4">
    <a>({{index}},{{index3}}) </a>
<a> Acte : {{acte3.acte}} </a>
</div>

</div>
-->


<div class="mx-auto" v-if="donnee==1" style="margin-bottom:10px;">
 <v-card height="100%" style="border: 3px solid rgb(120, 120, 120)">
            <v-container class="headercards">
              <a>Commentaire de l'algorithme : -------------------------------------</a>
            </v-container>
          </v-card>
</div>

<!--
 <div class="text-center" v-if="donnee==1">
 <v-menu offset-y top>
 <template v-slot:activator="{ on, attrs }">
 <v-btn small color="red" dark v-bind="attrs" v-on="on">
 <v-icon>mdi-menu</v-icon>
 </v-btn>
 </template>
 <v-list>
 <v-list-item
 v-for="(option, index) in deroulant"
 :key="index"
 @click="selectSelection(option)"
 >
 <v-list-item-title>{{ option.title }}</v-list-item-title>
 </v-list-item>
 </v-list>
 </v-menu>
 </div>

 -->
    <div class="album py-5 bg-light" v-if="donnee==1">
      <div class="container">
        <div class="text-center">



  <div v-bind:class="flipped ? 'flip-container mx-auto flipped': 'flip-container mx-auto'">
      <div class="flipper">
        <div class="front">

<!-- Implementation des cartes -->
          <div>
          <v-card style="border: 8px solid rgb(210, 120, 120)" class="d-inline-block align-top" max-width="600" outlined elevation="18">

  <!-- Tri du Titre -->

           <v-card-title > 
            <div class="mx-auto">
              <k>UM {{APIData_RUM[rss_modif()].info_carte.num_um}} | CMD ou GHM</k>
            </div>
            <div class="mx-auto">
              <k>{{APIData_RUM[rss_modif()].duree.duree[0].duree}} jour(s)</k>
            </div>
          </v-card-title>

  <!-- Tri des données -->

    

    <!-- Création mini carte -->
    <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>DP</ab>
</v-expansion-panel-header>


          <v-card>
            <v-card-title>
              <v-col class="d-flex" cols="25" sm="25">
              <v-icon large class="mx-auto" color="red darken-2">mdi-domain</v-icon>
              <b>{{APIData_RUM[rss_modif()].dp.dp[0].dp}}</b>
              <bb>_</bb>
              <ab>{{APIData_RUM[rss_modif()].dp.dp[0].libelle}} </ab>
               </v-col>
            </v-card-title>
          </v-card>

    <!-- Création d'ajout -->

<v-expansion-panel-content>

<div style="height:55px">
          <v-col class="d-inline-flex p-2 bd-highlight">

            <v-select v-if="var_input1==false" v-model="var_dp[rss_modif()]" :items="var_items" label="DP" outlined></v-select>
            <v-autocomplete filled rounded v-if="var_input1==true"  v-model="var_dp[rss_modif()]" label="DP" :items="APIData_RSS[0].liste_das"
            append-icon="mdi-magnify"
            d-flex
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
                
                      </v-autocomplete>
            <v-subheader>
              <v-btn  @click="change_input1"><img width="20" height="8" src="../assets/keyword.png"></v-btn>
              <v-btn color=#666666 v-on:click="remplace_dp(rss_modif(),var_dp[rss_modif()])"><v-icon>mdi-cached</v-icon></v-btn>
            </v-subheader>
          </v-col>
</div>       
</v-expansion-panel-content>
</v-expansion-panel>
</v-expansion-panels>          


   <!-- Création mini carte -->
    <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>DR</ab>
</v-expansion-panel-header>
         
          <v-card v-if="APIData_RUM[rss_modif()].info_carte.dr!='        '">
            <v-card-title>
              <v-icon large color="darken-2">mdi-domain</v-icon >
              <b>{{APIData_RUM[rss_modif()].info_carte.dr}}</b>
               <a v-on:click="supp_dr(rss_modif())"> <bb>________________________________</bb><img width="20" height="8" src="../assets/delete.png"></a>
              <ab>{{APIData_RUM[rss_modif()].info_carte.libelle_dr}} </ab>
            </v-card-title>
          </v-card>
   
<v-expansion-panel-content>
<div style="height:55px">
    <v-col class="d-flex" cols="12" sm="12" v-if="var_retourner==false">

        <v-select v-model="var_dr[rss_modif()]" v-if="var_input1 == false" :items="var_items" label="DR" outlined></v-select>
                   <v-autocomplete filled rounded v-if="var_input1==true" v-on-click="liste_das" v-model="var_dr[rss_modif()]" label="DR" :items="APIData_RSS[0].liste_das"
            append-icon="mdi-magnify"
            d-flex
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
                
                      </v-autocomplete>
        <v-subheader>
          <v-btn  @click="change_input1">
          <img width="20" height="8" src="../assets/keyword.png">
          </v-btn>
        <v-btn color=#666666 v-on:click="ajout_dr(rss_modif(),var_dr[rss_modif()])"><v-icon>mdi-cached</v-icon></v-btn>
        </v-subheader>
    </v-col>

</div>       
</v-expansion-panel-content>
</v-expansion-panel>
</v-expansion-panels>  

    <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>DAS</ab>
</v-expansion-panel-header>
    <!-- Création mini carte -->
<div style="max-height:400px; overflow:scroll">
          <div  v-for="(das2) in APIData_RUM[rss_modif()].das.das" :key="das2.id">
            <v-card >
              <v-card-title >
                <v-col class="d-flex" cols="25" sm="25">
                <a>{{das2.das}} | <b>{{das2.severite}}</b></a>
                <!--  <v-icon v-on:click="remplace_dp(das2.das)" large class="mx-auto">mdi-arrow-up-bold-box-outline</v-icon>-->
                 <a v-on:click="supp_das(rss_modif(),das2.das)"> <bb>__________________________________</bb><img width="20" height="8" src="../assets/delete.png"></a>
                </v-col>
                
                <ab>{{das2.libelle}}</ab>

              </v-card-title>
            </v-card >
          </div>
</div>


    <!-- Création d'ajout -->


<v-expansion-panel-content>
<div style="height:55px">

          <v-col class="d-inline-flex p-2 bd-highlight">

            <v-select v-if="var_input1==false" v-model="var_das[rss_modif()]" :items="var_items" label="DAS" outlined></v-select>
            <v-autocomplete filled rounded v-if="var_input1==true" v-on-click="liste_das" v-model="var_das[rss_modif()]" label="DAS" :items="APIData_RSS[0].liste_das"
            append-icon="mdi-magnify"
            d-flex
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
                
                      </v-autocomplete>
            <v-subheader>
              <v-btn  @click="change_input1"><img width="20" height="8" src="../assets/keyword.png"></v-btn>
              <v-btn color=#666666 v-on:click="ajout_das(rss_modif(),var_das[rss_modif()])">Ajouter</v-btn>
            </v-subheader>
          </v-col>

</div>       
</v-expansion-panel-content>
</v-expansion-panel>
</v-expansion-panels>

 

    <!-- Création mini carte -->

    <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>ACTES CLASSANTS</ab>
</v-expansion-panel-header>
          <div style="max-height:300px; overflow:scroll">
            <div v-for="(acte4) in APIData_RUM[rss_modif()].acte_classant.acte" :key="acte4.id">
              <v-card >
                <v-card-title>
                  <v-col class="d-flex" cols="25" sm="25">
                    <v-icon large class="mx-auto" color="grey darken-2">mdi-domain</v-icon>
                  <a>{{acte4.acte}}[{{acte4.activite[1]}}]</a>
                  <a v-on:click="supp_acte_c(rss_modif(),acte4.acte,acte4.activite)"> <bb>_______________________________</bb><img width="20" height="8" src="../assets/delete.png"></a>
                  </v-col>
                  <br>
                  <ab>{{acte4.libelle}}</ab>

                </v-card-title>
              </v-card>
            </div>
          </div>

    <!-- Création d'ajout -->

<v-expansion-panel-content>
<div style="height:55px">


          <v-col class="d-flex" cols="12" sm="12">

             <v-select v-if="var_input2 == false" v-model="var_acte[rss_modif()]" :items="var_items" label="Actes" outlined></v-select>
              <v-autocomplete filled rounded v-if="var_input2==true"  v-model="var_acte[rss_modif()]" label="Actes" :items="APIData_liste_actes"
            append-icon="mdi-magnify"
            d-flex
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
                
                      </v-autocomplete>
                      <v-select v-model="var_activite_c[rss_modif()]" :items="var_nombre" label="activité" outlined></v-select>
              <v-subheader>
                <v-btn  @click="change_input2"><img width="20" height="8" src="../assets/keyword.png"  ></v-btn>
              <v-btn color=#666666 v-on:click="ajout_acte(rss_modif(),var_acte[rss_modif()],var_activite_c[rss_modif()])">Ajouter</v-btn>
              </v-subheader>
          </v-col>
  </div>       
  </v-expansion-panel-content>
  </v-expansion-panel>
  </v-expansion-panels>
    <!-- Création commentaire -->

          <v-card-actions>
            <v-col>
              <div>
                <v-textarea v-model="var_commentaire[rss_modif()]" clearable class="mx-2" rows="1" prepend-icon="mdi-comment" clear-icon="mdi-close-circle" label="Commentaire" name="input-7-1"></v-textarea>
              </div>
              <v-btn @click="flipped=true"><img width="20" height="8" src="../assets/arrow-circle.png"  ></v-btn>
            </v-col>
          </v-card-actions>
          </v-card>


</div>
    </div>
    <div class="back">
      <v-card v-bind:style =var_bordure_fonction(rss_modif()) class="d-inline-block align-top" max-width="600" outlined elevation="18" >
  <!-- Tri du Titre -->

           <v-card-title > 
            <div class="mx-auto">
              <k>UM {{APIData_RUM[rss_modif()].info_carte.num_um}} | CMD ou GHM</k>
            </div>
            <div class="mx-auto">
              <k>{{APIData_RUM[rss_modif()].duree.duree[0].duree}} jour(s)</k>
            </div>
          </v-card-title>
    <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>IGS</ab>
</v-expansion-panel-header>

    <!-- Création mini carte -->

      <v-card :v-if="APIData_RUM[rss_modif()].info_carte.igs!='   '">
        <v-card-title >
        <a>{{APIData_RUM[rss_modif()].info_carte.igs}}</a>
        </v-card-title>
      </v-card >

    <!-- Création d'ajout -->

<v-expansion-panel-content>
<div style="height:55px">

    <v-col class="d-inline-flex p-2 bd-highlight" v-if="var_retourner==false">
        <v-select v-if="var_input1==false" v-model="var_igs[rss_modif()]" :items="var_items" label="IGS" outlined></v-select>
        <v-text-field v-if="var_input1==true" v-model="var_igs[rss_modif()]" label="IGS" :rules="rules" hide-details="auto"></v-text-field>
        
        <v-subheader>
          <v-btn  @click="change_input1"><img width="20" height="8" src="../assets/keyword.png"  ></v-btn>
          <v-btn color=#666666 v-on:click="remplace_igs(rss_modif(),var_igs[rss_modif()])" ><v-icon>mdi-cached</v-icon></v-btn>
  
        </v-subheader>
    </v-col>

  </div>       
  </v-expansion-panel-content>
  </v-expansion-panel>
  </v-expansion-panels>
 <!-- Création mini carte -->
    <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>ACTES</ab>
</v-expansion-panel-header>
          <div style="max-height:300px; overflow:scroll">
            <div v-for="(acte3) in APIData_RUM[rss_modif()].acte.acte" :key="acte3.id">
              <v-card >
                <v-card-title>
                  <v-col class="d-flex" cols="25" sm="25">
                  <a>{{acte3.acte}}[{{acte3.activite[1]}}]</a>

                  <a v-on:click="supp_acte(rss_modif(),acte3.acte,acte3.activite)"> <bb>__________________________________</bb><img width="20" height="8" src="../assets/delete.png"></a>
                  </v-col>
                  <br>
                  <ab>{{acte3.libelle}}</ab>

                </v-card-title>
              </v-card>
            </div>
          </div>

    <!-- Création d'ajout -->

<v-expansion-panel-content>
<div style="height:55px">

          <v-col class="d-flex" cols="12" sm="12">

              <v-select v-if="var_input2 == false" v-model="var_acte[rss_modif()]" :items="var_items" label="Actes" outlined></v-select>
              <v-autocomplete filled rounded v-if="var_input2==true"  v-model="var_acte[rss_modif()]" label="Actes" :items="APIData_liste_actes"
            append-icon="mdi-magnify"
            d-flex
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
                
                      </v-autocomplete>
                      <v-select v-model="var_activite[rss_modif()]" :items="var_nombre" label="activité" outlined></v-select>
              <v-subheader>
                <v-btn  @click="change_input2"><img width="20" height="8" src="../assets/keyword.png"  ></v-btn>
              <v-btn color=#666666 v-on:click="ajout_acte(rss_modif(),var_acte[rss_modif()],var_activite[rss_modif()])">Ajouter</v-btn>
              </v-subheader>
          </v-col>
  </div>       
  </v-expansion-panel-content>
  </v-expansion-panel>
  </v-expansion-panels>

<div class="ma-4">
 <v-btn v-on:click="supplementaire()" v-if="var_supplementaire==false" class="mx-auto" fab dark color="grey">
      <v-icon class="mx-auto" dark>
        mdi-plus
      </v-icon>
</v-btn>
</div>

<div class="ma-4">
 <v-btn v-on:click="supplementaire()" v-if="var_supplementaire==true" class="mx-auto" fab dark color="grey">
      <v-icon dark>
        mdi-minus
      </v-icon>
</v-btn>
</div>


<div v-if="var_supplementaire==false">
<v-container class="grey lighten-5">
    <v-row
      no-gutters
    >

    <v-col>
    <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>AGE GESTATIONNEL (s)</ab>
</v-expansion-panel-header>
 <!-- Création mini carte -->

      <v-card :v-if="APIData_RUM[rss_modif()].info_carte.age_gestationnel!='0'">
        <v-card-title >
        <a>{{APIData_RUM[rss_modif()].info_carte.age_gestationnel}}</a>
        </v-card-title>
      </v-card >

<v-expansion-panel-content>

     

<div style="height:55px">

    <v-col class="d-inline-flex p-2 bd-highlight">
      
        <v-text-field  v-model="var_gesta[rss_modif()]" label="Semaines" :rules="rules" hide-details="auto"></v-text-field>
        
        <v-subheader>
          
          <v-btn color=#666666 v-on:click="remplace_gesta(rss_modif(),var_gesta[rss_modif()])" small><v-icon>mdi-cached</v-icon></v-btn>
      
        </v-subheader>
    </v-col>

  </div>       
  </v-expansion-panel-content>
  </v-expansion-panel>
  </v-expansion-panels>
    </v-col>

    <v-col>
   <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>POIDS NAISSANCE (g)</ab>
</v-expansion-panel-header>
<!-- Création mini carte -->


      <v-card :v-if="APIData_RUM[rss_modif()].info_carte.poids!='   0'">
        <v-card-title >
        <a>{{APIData_RUM[rss_modif()].info_carte.poids}}</a>
        </v-card-title>
      </v-card >



<v-expansion-panel-content>

      

<div style="height:55px">

    <v-col class="d-inline-flex p-2 bd-highlight">
        <v-text-field  v-model="var_poids[rss_modif()]" label="Poids" :rules="rules" hide-details="auto"></v-text-field>
        <v-subheader>
          <v-btn color=#666666 v-on:click="remplace_poids(rss_modif(),var_poids[rss_modif()])" small><v-icon>mdi-cached</v-icon></v-btn>
        </v-subheader>
    </v-col>

  </div>       
  </v-expansion-panel-content>
  </v-expansion-panel>
  </v-expansion-panels>
    </v-col>

    </v-row>
    <v-row
      no-gutters
    >
<v-col>
 <v-expansion-panels focusable v-if="APIData_RSS[0].sexe==2">
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>DATE DERNIÈRES RÈGLES</ab>
</v-expansion-panel-header>

  <!-- Création mini carte -->


      <v-card :v-if="APIData_RUM[rss_modif()].info_carte.ddr!=''">
        <v-card-title >
        <a>{{APIData_RUM[rss_modif()].info_carte.ddr}}</a>
        </v-card-title>
      </v-card >



<v-expansion-panel-content>
<div style="height:55px">


    <v-col class="d-inline-flex p-2 bd-highlight" >
        
        <input v-model="var_ddr[rss_modif()]" type="date" label="Date"> 
        
        <v-subheader>
    
         <v-btn color=#666666 v-on:click="remplace_ddr(rss_modif(),var_ddr[rss_modif()])" small><v-icon>mdi-cached</v-icon></v-btn>
        </v-subheader>
    </v-col>


  </div>       
  </v-expansion-panel-content>
  </v-expansion-panel>
  </v-expansion-panels>
</v-col>

<v-col>
      <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>CONFIRMATION CODAGE</ab>
</v-expansion-panel-header>

      <v-card :v-if="APIData_RUM[rss_modif()].info_carte.confirm!=' '">
        <v-card-title >
        <a>{{APIData_RUM[rss_modif()].info_carte.confirm}}</a>
        </v-card-title>
      </v-card >

<v-expansion-panel-content>
<div style="height:55px">


    <v-col class="d-inline-flex p-2 bd-highlight">
        <v-select v-model="var_confirm[rss_modif()]" :items="var_choix" label="Choix" outlined small></v-select>
        <v-btn color=#666666 v-on:click="remplace_confirm(rss_modif(),var_confirm[rss_modif()])" small><v-icon>mdi-cached</v-icon></v-btn>
    </v-col>


  </div>       
  </v-expansion-panel-content>
  </v-expansion-panel>
  </v-expansion-panels>
</v-col>
    </v-row>

    <v-row
      no-gutters
    >
      <v-col>
             <v-expansion-panels focusable v-if="APIData_RUM[rss_modif()].duree.duree[0].duree==0">
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>NOMBRE DE SÉANCES</ab>
</v-expansion-panel-header>
 <!-- Création mini carte -->
 

      <v-card :v-if="APIData_RUM[rss_modif()].info_carte.seance!='0'">
        <v-card-title >
        <a>{{APIData_RUM[rss_modif()].info_carte.seance}}</a>
        </v-card-title>
      </v-card >


<v-expansion-panel-content>
 

<div style="height:55px">


    <v-col class="d-inline-flex p-2 bd-highlight">
        <v-text-field  v-model="var_seance[rss_modif()]" label="Séances" :rules="rules" hide-details="auto"></v-text-field>
        <v-subheader>
          <v-btn color=#666666 v-on:click="remplace_seance(rss_modif(),var_seance[rss_modif()])" small><v-icon>mdi-cached</v-icon></v-btn>
        </v-subheader>
    </v-col>

  </div>       
  </v-expansion-panel-content>
  </v-expansion-panel>
  </v-expansion-panels>
      </v-col>
    <v-col>
     <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>LITS DÉDIÉS</ab>
</v-expansion-panel-header>



    <!-- Création d'ajout -->
<v-expansion-panel-content>
<div style="height:55px">


    <v-col class="d-inline-flex p-2 bd-highlight" >
        <v-text-field  v-model="var_igs[rss_modif()]" label="Lits" :rules="rules" hide-details="auto"></v-text-field>
        <v-subheader>
          <v-btn color=#666666 v-on:click="remplace_igs" small><v-icon>mdi-cached</v-icon></v-btn>
        </v-subheader>
    </v-col>



  </div>       
  </v-expansion-panel-content>
  </v-expansion-panel>
  </v-expansion-panels>
    </v-col>

    </v-row>
  </v-container>
</div>

<v-card-actions>
    
<v-col>
<div>
      <v-textarea
          v-model="var_commentaire[rss_modif()]"
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

        </div>
        </div>
    </div> 

<v-expansion-panels focusable v-if="donnee==1">
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <cc>Voir l'ensemble des RUM</cc>
</v-expansion-panel-header>

<v-expansion-panel-content>

    <div class="album py-5 bg-light">
        <div class="container">
        <div class="row">

          
  <span v-for="(rum,index) in APIData_RUM" :key="index" class="col-md-4">

  <div v-bind:class="flipped ? 'flip-container mx-auto flipped': 'flip-container mx-auto'">
      <div class="flipper">
        <div class="front">

<!-- Implementation des cartes -->
          <div>
          <v-card v-bind:style =var_bordure_fonction(index) class="d-inline-block align-top" max-width="400" outlined elevation="18">

  <!-- Tri du Titre -->

           <v-card-title > 
            <div class="mx-auto">
              <k>UM {{rum.info_carte.num_um}} | CMD ou GHM</k>
            </div>
            <div class="mx-auto">
              <k>{{rum.duree.duree[0].duree}} jour(s)</k>
            </div>
          </v-card-title>

  <!-- Tri des données -->

    

    <!-- Création mini carte -->
    <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>DP</ab>
</v-expansion-panel-header>
          <v-card>
            <v-card-title>
              <v-col class="d-flex" cols="25" sm="25">
              <v-icon large class="mx-auto" color="red darken-2">mdi-domain</v-icon>
              <b>{{rum.dp.dp[0].dp}}</b>
              </v-col>
              <ab>{{rum.dp.dp[0].libelle}} </ab>
            </v-card-title>
          </v-card>

    <!-- Création d'ajout -->

<v-expansion-panel-content>
<div style="height:55px">
          <v-col class="d-inline-flex p-2 bd-highlight">

            <v-select v-if="var_input1==false" v-model="var_dp[index]" :items="var_items" label="DP" outlined></v-select>
            <v-autocomplete filled rounded v-if="var_input1==true" v-on-click="liste_das" v-model="var_dp[index]" label="DP" :items="APIData_RSS[0].liste_das"
            append-icon="mdi-magnify"
            d-flex
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
                
                      </v-autocomplete>
            <v-subheader>
              <v-btn  @click="change_input1"><img width="20" height="8" src="../assets/keyword.png"></v-btn>
              <v-btn color=#666666 v-on:click="remplace_dp(index,var_dp[index])"><v-icon>mdi-cached</v-icon></v-btn>
            </v-subheader>
          </v-col>
</div>       
</v-expansion-panel-content>
</v-expansion-panel>
</v-expansion-panels>          


   <!-- Création mini carte -->
    <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>DR</ab>
</v-expansion-panel-header>
         
          <v-card v-if="rum.info_carte.dr!='        '">
            <v-card-title>
              <v-icon large color="darken-2">mdi-domain</v-icon >
              <b>{{rum.info_carte.dr}}</b>
               <a v-on:click="supp_dr(index)"> <bb>__________________</bb><img width="20" height="8" src="../assets/delete.png"></a>
              <ab>{{rum.info_carte.libelle_dr}} </ab>
            </v-card-title>
          </v-card>
   
<v-expansion-panel-content>
<div style="height:55px">
    <v-col class="d-flex" cols="12" sm="12" v-if="var_retourner==false">

        <v-select v-model="var_dr[index]" v-if="var_input1 == false" :items="var_items" label="DR" outlined></v-select>
                   <v-autocomplete filled rounded v-if="var_input1==true" v-on-click="liste_das" v-model="var_dr[index]" label="DR" :items="APIData_RSS[0].liste_das"
            append-icon="mdi-magnify"
            d-flex
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
                
                      </v-autocomplete>
        <v-subheader>
          <v-btn  @click="change_input1">
          <img width="20" height="8" src="../assets/keyword.png">
          </v-btn>
        <v-btn color=#666666 v-on:click="ajout_dr(index,var_dr[index])"><v-icon>mdi-cached</v-icon></v-btn>
        </v-subheader>
    </v-col>

</div>       
</v-expansion-panel-content>
</v-expansion-panel>
</v-expansion-panels>  

    <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>DAS</ab>
</v-expansion-panel-header>
    <!-- Création mini carte -->
<div style="max-height:400px; overflow:scroll">
          <div  v-for="(das2) in rum.das.das" :key="das2.id">
            <v-card >
              <v-card-title >
                <v-col class="d-flex" cols="25" sm="25">
                <abbis>{{das2.das}} | <b>{{das2.severite}}</b></abbis>
                <!--  <v-icon v-on:click="remplace_dp(das2.das)" large class="mx-auto">mdi-arrow-up-bold-box-outline</v-icon>-->
                 <a v-on:click="supp_das(index,das2.das)"> <bb>___________________</bb><img width="20" height="8" src="../assets/delete.png"></a>
                </v-col>
                
                <ab>{{das2.libelle}}</ab>

              </v-card-title>
            </v-card >
          </div>
</div>


    <!-- Création d'ajout -->


<v-expansion-panel-content>
<div style="height:55px">

          <v-col class="d-inline-flex p-2 bd-highlight">

            <v-select v-if="var_input1==false" v-model="var_das[index]" :items="var_items" label="DAS" outlined></v-select>
            <v-autocomplete filled rounded v-if="var_input1==true" v-on-click="liste_das" v-model="var_das[index]" label="DAS" :items="APIData_RSS[0].liste_das"
            append-icon="mdi-magnify"
            d-flex
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
                
                      </v-autocomplete>
            <v-subheader>
              <v-btn  @click="change_input1"><img width="20" height="8" src="../assets/keyword.png"></v-btn>
              <v-btn color=#666666 v-on:click="ajout_das(index,var_das[index])">Ajouter</v-btn>
            </v-subheader>
          </v-col>

</div>       
</v-expansion-panel-content>
</v-expansion-panel>
</v-expansion-panels>

 

    <!-- Création mini carte -->

    <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>ACTES CLASSANTS</ab>
</v-expansion-panel-header>
          <div style="max-height:300px; overflow:scroll">
            <div v-for="(acte4) in rum.acte_classant.acte" :key="acte4.id">
              <v-card >
                <v-card-title>
                  <v-col class="d-flex" cols="25" sm="25">
                    <v-icon large class="mx-auto" color="grey darken-2">mdi-domain</v-icon>
                  <abbis>{{acte4.acte}}[{{acte4.activite[1]}}]</abbis>
                  <a v-on:click="supp_acte_c(index,acte4.acte,acte4.activite)"> <bb>_________________</bb><img width="20" height="8" src="../assets/delete.png"></a>
                  </v-col>
                  <br>
                  <ab>{{acte4.libelle}}</ab>

                </v-card-title>
              </v-card>
            </div>
          </div>

    <!-- Création d'ajout -->

<v-expansion-panel-content>
<div style="height:55px">


          <v-col class="d-flex" cols="12" sm="12">

             <v-select v-if="var_input2 == false" v-model="var_acte[index]" :items="var_items" label="Actes" outlined></v-select>
             <v-autocomplete filled rounded v-if="var_input2==true"  v-model="var_acte[index]" label="Actes" :items="APIData_liste_actes"
            append-icon="mdi-magnify"
            d-flex
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
                
                      </v-autocomplete>
            <v-select v-model="var_activite_c[index]" :items="var_nombre" label="activité" outlined></v-select>
              <v-subheader>
                <v-btn  @click="change_input2"><img width="20" height="8" src="../assets/keyword.png"  ></v-btn>
              <v-btn color=#666666 v-on:click="ajout_acte_c(index,var_acte[index],var_activite_c[index])">Ajouter</v-btn>
              </v-subheader>
          </v-col>
  </div>       
  </v-expansion-panel-content>
  </v-expansion-panel>
  </v-expansion-panels>
    <!-- Création commentaire -->

          <v-card-actions>
            <v-col>
              <div>
                <v-textarea v-model="var_commentaire[index]" clearable class="mx-2" rows="1" prepend-icon="mdi-comment" clear-icon="mdi-close-circle" label="Commentaire" name="input-7-1"></v-textarea>
              </div>
              <div class='text-center'>
              <v-btn @click="flipped=true" style=" float: center"><img width="20" height="8" src="../assets/arrow-circle.png"  ></v-btn>
              <v-btn v-on:click="razrum(index)" style=" float: left">Init</v-btn>
              <v-btn v-on:click="supprime_rum(index)" style=" float: right"><img width="20" height="8" src="../assets/delete.png"></v-btn>
              </div>
            </v-col>
          </v-card-actions>
          </v-card>


</div>
    </div>
    <div class="back">
      <v-card v-bind:style =var_bordure_fonction(index) class="d-inline-block align-top" max-width="400" outlined elevation="18">
  <!-- Tri du Titre -->

           <v-card-title > 
            <div class="mx-auto">
              <k>UM {{rum.info_carte.num_um}} | CMD ou GHM</k>
            </div>
            <div class="mx-auto">
              <k>{{rum.duree.duree[0].duree}} jour(s)</k>
            </div>
          </v-card-title>
    <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>IGS</ab>
</v-expansion-panel-header>

    <!-- Création mini carte -->

      <v-card :v-if="rum.info_carte.igs!='   '">
        <v-card-title >
        <a>{{rum.info_carte.igs}}</a>
        </v-card-title>
      </v-card >

    <!-- Création d'ajout -->

<v-expansion-panel-content>
<div style="height:55px">

    <v-col class="d-inline-flex p-2 bd-highlight" v-if="var_retourner==false">
        <v-select v-if="var_input1==false" v-model="var_igs[index]" :items="var_items" label="IGS" outlined></v-select>
        <v-text-field v-if="var_input1==true" v-model="var_igs[index]" label="IGS" :rules="rules" hide-details="auto"></v-text-field>
        
        <v-subheader>
          <v-btn  @click="change_input1"><img width="20" height="8" src="../assets/keyword.png"  ></v-btn>
          <v-btn color=#666666 v-on:click="remplace_igs(index,var_igs[index])"><v-icon>mdi-cached</v-icon></v-btn>
        </v-subheader>
    </v-col>

  </div>       
  </v-expansion-panel-content>
  </v-expansion-panel>
  </v-expansion-panels>
 <!-- Création mini carte -->
    <v-expansion-panels focusable>
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <ab>ACTES</ab>
</v-expansion-panel-header>
          <div style="max-height:300px; overflow:scroll">
            <div v-for="(acte3) in rum.acte.acte" :key="acte3.id">
              <v-card v-if="acte3!=''">
                <v-card-title>
                  <v-col class="d-flex" cols="25" sm="25">
                  <abbis>{{acte3.acte}}</abbis>
                  <abbis> [{{acte3.activite}}]</abbis>
                  <a v-on:click="supp_acte(index,acte3.acte,acte3.activite)"> <bb>_________________</bb><img width="20" height="8" src="../assets/delete.png"></a>
                  </v-col>
                  <br>
                  <ab>{{acte3.libelle}}</ab>

                </v-card-title>
              </v-card>
            </div>
          </div>

    <!-- Création d'ajout -->

<v-expansion-panel-content>
<div style="height:55px">

          <v-col class="d-flex" cols="12" sm="12">

              <v-select v-if="var_input2 == false" v-model="var_acte[index]" :items="var_items" label="Actes" outlined></v-select>
              <v-autocomplete filled rounded v-if="var_input2==true"  v-model="var_acte[index]" label="Actes" :items="APIData_liste_actes"
            append-icon="mdi-magnify"
            d-flex
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
                
                      </v-autocomplete>

              <v-select v-model="var_activite[index]" :items="var_nombre" label="activité" outlined></v-select>
              <v-subheader>
                <v-btn  @click="change_input2"><img width="20" height="8" src="../assets/keyword.png"  ></v-btn>
              <v-btn color=#666666 v-on:click="ajout_acte(index,var_acte[index],var_activite[index])">Ajouter</v-btn>
              </v-subheader>

             
          </v-col>
  </div>       
  </v-expansion-panel-content>
  </v-expansion-panel>
  </v-expansion-panels>

<div class="ma-4">
 <v-btn v-on:click="supplementaire()" v-if="var_supplementaire==false" class="mx-auto" fab dark color="grey">
      <v-icon class="mx-auto" dark>
        mdi-plus
      </v-icon>
</v-btn>
</div>

<div class="ma-4">
 <v-btn v-on:click="supplementaire()" v-if="var_supplementaire==true" class="mx-auto" fab dark color="grey">
      <v-icon dark>
        mdi-minus
      </v-icon>
</v-btn>
</div>

<v-card-actions>
    
<v-col>
<div>
      <v-textarea
          v-model="var_commentaire[index]"
          clearable
          class="mx-2"
          rows="1"
          prepend-icon="mdi-comment"
          clear-icon="mdi-close-circle"
          label="Commentaire"
          name="input-7-1"
        ></v-textarea>
</div>

<div class='text-center'>
<v-btn @click="flipped=false"><img width="20" height="8" src="../assets/arrow-circle.png"></v-btn>
</div>
</v-col>

</v-card-actions>
      </v-card>
    </div>
          </div>
  </div>

  </span>

<!--
 <v-btn class="d-inline-block align-top mx-auto" v-on:click="ajout_rum()" v-if="donnee==1" fab dark color="grey">
      <v-icon dark>
        mdi-plus
      </v-icon>
</v-btn>
-->
 <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          v-on:click="raz()"
        >
          <v-icon dark>
        mdi-plus
      </v-icon>
        </v-btn>

      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Ajout d'un RUM
        </v-card-title>


         <v-text-field filled rounded v-model="um" label="UM"
            append-icon="mdi-magnify"
            d-flex
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

         <v-autocomplete filled rounded v-on-click="liste_das" v-model="new_dp" label="DP" :items="APIData_RSS[0].liste_das"
            append-icon="mdi-magnify"
            d-flex
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
                
                      </v-autocomplete>
          <a>Date entrée : </a>
          <input v-model="date_entree" type="date" label="Date entrée">
          <a>Date sortie : </a>
          <input v-model="date_sortie" type="date" label="Date sortie">

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="primary"
            text
            v-on:click="raz()"
            @click="dialog = false"
          >
            Annuler
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            v-on:click="ajout_rum()"
            @click="dialog = false"
          >
            Créer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

        </div>
        </div>
    </div> 

</v-expansion-panel-content>
</v-expansion-panel>
</v-expansion-panels> 

<!-- <a>{{var_acte}} / {{var_das}} / {{var_dr}} / {{var_igs}} / {{var_commentaire}}</a> -->

<!--<Historyrecapbis v-if="donnee==1"></Historyrecapbis>-->

<v-expansion-panels focusable v-if="donnee==1">
<v-expansion-panel>
<v-expansion-panel-header style="text-align:center">
    <cc>Résumé</cc>
</v-expansion-panel-header>

<v-expansion-panel-content>
    <v-container>
      <div style="width: 100%">
        <v-container class="album py-5 bg-light">
<v-row>
        <div
          style="
            width: 60;
            position: relative;
            margin-right: auto;
            margin-left: auto;
          "
          
        >

          <v-card
          class="col-md-4"
            style="
              display: inline-block;
              width: 45%;
              min-height: 700px;
              float: left;
              background-color: #eee; margin-bottom:10px;"
              
              >
            <div style="padding-left: 50%; padding-right: 50%">
              <v-badge dot color="grey"></v-badge>
            </div>
            <v-card-title
              class="justify-center"
              primary-title
              style="padding-bottom: 16px; font-size: 20px; font-weight: bolder"
            >
              {{APIData_RSS[0].ghm}} | --- €
            </v-card-title>
            <v-container>
               <span v-for="(rum,index) in APIData_resume" :key="index" class="col-md-4">
               <v-card style="margin-bottom:10px;">
                <v-card-title>
                  {{APIData_RUM[index].info_carte.num_um}} : {{APIData_RUM[index].duree.duree[0].duree}} jours
                </v-card-title>
                            <v-container class="headercards">
              <tr style="margin-bottom: 16px">
                <td class="idcard" v-if="rum.dp.dp[0].dp!='vide'"><b_bis>DP</b_bis> {{rum.dp.dp[0].dp}}</td>
                <bb>__</bb>
                <td class="idcard" v-if="rum.info_carte.dr!='vide'"><b_bis>DR</b_bis> {{rum.info_carte.dr}}</td>

              </tr>
              <tr width="50px">
                <td class="idcard" v-if="rum.das.das[0].das!='vide'"><b_bis>DAS :</b_bis> </td>
                <span v-for="(das,index) in rum.das.das[0].das" :key="index">
                <td class="idcard" v-if="rum.das.das[0].das!='vide'">{{das}} | </td>
                </span>
                <td class="idcard" v-if="rum.acte_classant.acte[0].acte!='vide'"><b_bis>Actes classants : {{rum.acte_classant.acte[0].acte}}</b_bis> </td>
              </tr>
              <tr>
                <td class="idcard" v-if="rum.acte.acte[0].acte!='vide'"><b_bis>Actes :</b_bis> </td>
                <span v-for="(acte,index) in rum.acte.acte[0].acte" :key="index">
                <td class="idcard" v-if="rum.acte.acte[0].acte!='vide'">{{acte}} | </td>
                </span>
                <td class="idcard" v-if="rum.info_carte.igs!='vide'"><b_bis>IGS : {{rum.info_carte.igs}}</b_bis> </td>
              </tr>
              <tr>
              </tr>
            </v-container>
              </v-card>
               </span>
            </v-container>

          </v-card>

           <v-card
          class="col-md-4"
            style="
              display: inline-block;
              width: 45%;
              min-height: 700px;
              float: left;
              background-color: #eee; margin-bottom:10px;"  
              >
            <div style="padding-left: 50%; padding-right: 50%">
              <v-badge dot color="red"></v-badge>
            </div>
            <v-card-title
              class="justify-center"
              primary-title
              style="padding-bottom: 16px; font-size: 20px; font-weight: bolder"
            >
              ----- | --- €
            </v-card-title>
            <v-container>
               <span v-for="(rum,index) in APIData_resume" :key="index" class="col-md-4">
               <v-card style="margin-bottom:10px;">
                <v-card-title>
                  {{APIData_RUM[index].info_carte.num_um}} : {{APIData_RUM[index].duree.duree[0].duree}} jours
                </v-card-title>
                            <v-container class="headercards">
              <tr style="margin-bottom: 16px">
                <td class="idcard" v-if="rum.dp.dp[0].dp!='vide'"><b_bis>DP</b_bis> {{rum.dp.dp[0].dp2}}</td>
                <bb>__</bb>
                <td class="idcard" v-if="rum.info_carte.dr!='vide'"><b_bis>DR</b_bis> {{rum.info_carte.dr2}}</td>

              </tr>
              <tr width="50px">
                <td class="idcard" v-if="rum.das.das[0].das!='vide'"><b_bis> DAS :</b_bis> </td>
                <span v-for="(das,index) in rum.das.das[0].das2" :key="index">
                <td class="idcard" v-if="rum.das.das[0].das!='vide'">{{das}} | </td>
                </span>
                <td class="idcard" v-if="rum.acte_classant.acte[0].acte!='vide'"><b_bis>Actes classants : </b_bis>{{rum.acte_classant.acte[0].acte2}} </td>
              </tr>
              <tr>
                <td class="idcard" v-if="rum.acte.acte[0].acte!='vide'"><b_bis>Actes :</b_bis> </td>
                <span v-for="(acte,index) in rum.acte.acte[0].acte2" :key="index">
                <td class="idcard" v-if="rum.acte.acte[0].acte!='vide'">{{acte}} | </td>
                </span>
                <td class="idcard" v-if="rum.info_carte.igs!='vide'"><b_bis>IGS : {{rum.info_carte.igs2}}</b_bis> </td>
              </tr>
              <tr>
              </tr>
            </v-container>
              </v-card>
               </span>
            </v-container>

          </v-card>

          <v-card
          class="col-md-4"
            style="
              display: inline-block;
              width: 45%;
              min-height: 700px;
              float: right;
              background-color: #eee; margin-bottom:10px;"
              
              >
            <div style="padding-left: 50%; padding-right: 50%">
              <v-badge dot color="grey"></v-badge>
            </div>
            <v-container>
<v-card>
          <v-card-subtitle>
            RUM 0
          </v-card-subtitle>
          <ab> {{var_commentaire[0]}} </ab>
          <v-card-subtitle>
            RUM 1
          </v-card-subtitle>
          <ab> {{var_commentaire[1]}} </ab>
          <v-card-subtitle>
            RUM 2
          </v-card-subtitle>
          <ab> {{var_commentaire[2]}} </ab>
          <v-card-subtitle>
            RUM 3
          </v-card-subtitle>
          <ab> {{var_commentaire[3]}} </ab>
          <v-card-subtitle>
            Global
          </v-card-subtitle>
          <ab> {{commentaire_bonus}} </ab>
          </v-card>
        
         <v-textarea
          v-model="commentaire_bonus"
          class="mx-2"
          rows="1"
          prepend-icon="mdi-comment"
          clear-icon="mdi-close-circle"
          name="input-7-1"
          label="Commentaire bonus"
        ></v-textarea>
            </v-container>

          </v-card>
        </div>


</v-row>
        </v-container>
              
              </div>
    </v-container>
 </v-expansion-panel-content>
</v-expansion-panel>
</v-expansion-panels> 


  <v-row justify="center" style="margin-top: 20px" v-if="donnee==1">
                <v-btn
        class="ma-2"
        color="red"
        dark
        v-on:click="recompo_telecharger()"
      > Telecharger
        <v-icon dark>
          mdi-cloud-download
        </v-icon>
      </v-btn>
        </v-row>
</v-app>
    </div>

</template>



<script>
import Navbar from '../components/Navbar'
//import Headercards from './headercards.vue'
//import Historyrecapbis from "./historyrecapbis.vue";
//mport critere from './criteres.vue'
import { getAPI } from '../axios-api'
import axios from 'axios';

export default {

    name: 'codage',
    data() {
        return {
            var_retourner : false,
            var_items: ['Tarif','Ecart'],
            var_input1 : true,
            var_input2 : false,
            var_dr : [],
            var_igs : [],
            var_das : [],
            var_dp : [],
            var_choix : ["Oui","Non"],
            choix : '',
            var_acte : [],
            var_commentaire : [],
            var_commentaire2 : {},
            var_supplementaire : false,
            var_rss : "",
            API_finess : [],
            API_date: [],
            API_file : [],
            var_file : "",
            var_finess : "",
            var_date : "",   
            flipped : false,
            API_rss : [],
            APIData_RSS : [],
            APIData_RUM : [],
            APIData_resume : [],
            APIData_liste_das : [],
            APIData_liste_actes : [],
            donnee : 0,
            espace : "  uuu    ",
            commentaire_bonus : "",
            deroulant: [{title : 'Réinitialiser'},{title: 'Sauvegarder'},{title : 'Critères'}],
            critere : ['score>80%', 'score>90%','score>95%','ecart_positif','ecart_negatif','cmd10','cmd6','a_recoder','liste_complete'],
            var_critere : ['a_recoder'],
            var_plus : false,
            progression : false,
            var_dp_unique : '',
            var_nombre : ['01','2','3','4'],
            var_activite : [],
            var_activite_c : [],
            var_gesta : [],
            var_poids : [],
            var_ddr : [],
            var_confirm : [],
            var_seance : [],
            var_lits : [],
            var_tri : 'gain',
            date_entree : '',
            date_sortie : '',
            um : '',
            new_dp : '',
            dialog: false,


            
            

            }
    },
    components: {
        Navbar,
       // Headercards,
       // Historyrecapbis,
       //critere,

    },



    

         methods: {

             retourner(){
                 this.var_retourner = !this.var_retourner
             },
             supplementaire(){
                 this.var_supplementaire = !this.var_supplementaire
             },
             change_input1(){
                 this.var_input1 = !this.var_input1
             },

             change_input2(){
                 this.var_input2 = !this.var_input2
             },
             rss_suivant(i){
               
               while(this.var_rss!=this.API_rss[i]){
                 i = i + 1
               }
                this.progression = true
                this.var_rss= this.API_rss[i+1]
                
                this.com()
                this.recherche_rss()
             },
             rss_precedant(i){
                 while(this.var_rss!=this.API_rss[i]){
                 i = i + 1
               }
                 this.var_rss= this.API_rss[i-1]
              this.com()
              this.recherche_rss()

             },
             rss_modif(){
                 var i = 0
                 while(i!=parseInt(this.APIData_RSS[0].determinant,10)){
                 i = i + 1
               }
                return i


             },
            var_bordure_fonction(i){
              if (i == this.APIData_RSS[0].determinant){
                return "border: 6px solid rgb(200, 120, 120)"
              }
              else{
                return ""
              }
            },
            bornes(i,bb,bh){
              var i2 = parseInt(i,10)
              var bb2 = parseInt(bb,10)
              var bh2 = parseInt(bh,10)
              if (i2<=bh2 & i>=bb2){
                return "0"
              }
              if (i2>bh2){
                return "bh"
              }
              if (i2<bb2){
                return "bb"
              }
              
              
            },


            async supprimer_rum(index){

                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("rum", index);
                getAPI.post('/supprimer_rum/',formData)
               .then(response =>{
                console.log(response)

            })
            .catch(err => {
                console.log(err)
            })

            },



//fonction qui envoi le rss et retotune les données de celui ci
            async recherche_rss1(){
                //this.APIData_RSS = null
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                getAPI.post('/recherche_rss/',formData)
               .then(response =>{
                console.log('Resultat recu')
                this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
            this.donnee=1
            },

            async razrum(index){
                //this.APIData_RSS = null
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("rum", index);
                await getAPI.post('/raz_rum/',formData)
               .then(response =>{
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
            this.donnee=1
            this.recherche_rss()
            },

//fonction qui envoi le rss et retourne les données de celui ci
            async recherche_rum(){
                //this.APIData_RSS = null
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                getAPI.post('/recherche_rum/',formData)
               .then(response =>{
                console.log('Resultat recu')
                this.APIData_RUM = response.data
            })
            .catch(err => {
                console.log(err)
            })
            this.donnee=1
            },

//fonction qui envoi le rss et retourne les données de celui ci
            async resume(){
                //this.APIData_RSS = null
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                getAPI.post('/resume/',formData)
               .then(response =>{
                console.log('Resultat recu')
                this.APIData_resume = response.data
            })
            .catch(err => {
                console.log(err)
            })
            },

            async recherche_rss(){
              if((this.var_rss!= "")&(this.var_date!="")&(this.var_finess!="")){
              await (this.progression = true)
              this.recherche_rss1()
              this.recherche_rum()
              //this.liste_das()
              this.liste_actes()
              this.resume()
              this.progression=false
              }
              else{
                 this.$fire({
            text: "Remplissez les champs requis",
            timer: 5000
            }).then(r => {
            console.log(r.value);
        });

              }
            },

//fonction qui retourne la liste des DAS
            async liste_das(){
              const formData = new FormData();
              formData.append("sexe", this.APIData_RSS[0].sexe);
              formData.append("age", this.APIData_RSS[0].age);
              getAPI.post('/liste_das/',formData)
              .then(response =>{
              console.log('Resultat recu')
              this.APIData_liste_das = response.data
            })
            .catch(err => {
                console.log(err)
            })
            },
//fonction qui retourne la liste des actes
            async liste_actes(){
                getAPI.get('/liste_actes/')
               .then(response =>{
                console.log('Resultat recu')
                this.APIData_liste_actes = response.data
            })
            .catch(err => {
                console.log(err)
            })
            },


//fonction qui ajoute un DAS
            async ajout_das(index,code){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("code", code);
                formData.append("rum", index);
                
                await getAPI.post('/ajout_das/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.var_das[index]=""
                this.recherche_rum()
                this.resume()

            },

//fonction qui remplace DP par DAS
            async remplace_dp(index,code){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("code", code);
                formData.append("rum", index);
                
                await getAPI.post('/modif_dp/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.var_dp[index]=""
                this.recherche_rum()
                this.resume()
            },

//fonction qui ajoute un acte
            async ajout_acte(index,code,activite){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("code", code);
                formData.append("rum", index);
                formData.append("activite", activite);
                await getAPI.post('/ajout_acte/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.var_das[index]=""
                this.recherche_rum()
                this.resume()
            },
//fonction qui supprime un DAS
            async supp_das(index,code){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("code", code);
                formData.append("rum", index);

                await getAPI.post('/supp_das/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.recherche_rum()
                this.resume()
            },
//fonction qui supprime un acte
            async supp_acte(index,code,activite){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("code", code);
                formData.append("activite", activite);
                formData.append("rum", index);
                
                await getAPI.post('/supp_acte/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.recherche_rum()
                this.resume()
            },

//fonction qui supprime un acte
            async supp_acte_c(index,code,activite){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("code", code);
                formData.append("activite", activite);
                formData.append("rum", index);
                
                await getAPI.post('/supp_acte_c/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.recherche_rum()
                this.resume()
            },

//fonction qui supprime DR
            async supp_dr(index){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("rum", index);
                
                await getAPI.post('/supp_dr/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.recherche_rum()
                this.resume()
            },

//fonction qui supprime IGS
            async supp_igs(index,code){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("code", code);
                formData.append("rum", index);
                
                await getAPI.post('/supp_igs/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.recherche_rum()
                this.resume()
            },

//fonction qui remplace l'IGS
            async remplace_igs(index,code){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("code", code);
                formData.append("rum", index);
                
                await getAPI.post('/modif_igs/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.var_igs[index]=""
                this.recherche_rum()
                this.resume()
            },

//fonction qui remplace l'IGS
            async remplace_seance(index,code){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("code", code);
                formData.append("rum", index);
                
                await getAPI.post('/modif_seance/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.var_seance[index]=""
                this.recherche_rum()
                this.resume()
            },

//fonction qui remplace l'IGS
            async remplace_ddr(index,code){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("code", code);
                formData.append("rum", index);
                
                await getAPI.post('/modif_ddr/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.var_ddr[index]=""
                this.recherche_rum()
                this.resume()
            },

//fonction qui remplace l'IGS
            async remplace_gesta(index,code){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("code", code);
                formData.append("rum", index);
                
                await getAPI.post('/modif_gesta/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.var_gesta[index]=""
                this.recherche_rum()
                this.resume()
            },

            async remplace_poids(index,code){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("code", code);
                formData.append("rum", index);
                
                await getAPI.post('/modif_poids/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.var_poids[index]=""
                this.recherche_rum()
                this.resume()
            },

            async ajout_rum(){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("date_entree", this.date_entree);
                formData.append("date_sortie", this.date_sortie);
                formData.append("um", this.um);
                formData.append("dp", this.new_dp);
                
                await getAPI.post('/ajout_rum/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })

                this.recherche_rum()
                this.resume()
                this.raz()
            },

            async raz(){
              
              this.date_sortie = ''
              this.date_entree =''
              this.um =''
              this.new_dp=''

            },

            async remplace_confirm(index,code){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("code", code);
                formData.append("rum", index);
                
                await getAPI.post('/modif_confirm/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.var_poids[index]=""
                this.recherche_rum()
                this.resume()
            },

//fonction qui remplace le DR
            async ajout_dr(index,code){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("code", code);
                formData.append("rum", index);
                
                await getAPI.post('/ajout_dr/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })
                this.var_dr[index]=""
                this.recherche_rum()
                this.resume()
            },

//fonction qui envoi commentaire
            async com(){
                var comm = this.var_commentaire[0] + '|' + this.var_commentaire[1] + '|' + this.var_commentaire[2] + '|' +this.var_commentaire[3] + '|' + this.var_commentaire[4] + this.var_commentaire[5] + '|' + this.var_commentaire[6] + '|' + this.var_commentaire[7] + '|' + this.var_commentaire[8] + '|' + this.var_commentaire[9] + '|' + this.var_commentaire[10]
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("commentaire", comm);
                formData.append("rum", this.APIData_RUM[0].info_carte.nombre_rum);
                await getAPI.post('/commentaire/',formData)
               .then(response =>{
                console.log(response)
                //this.APIData_RSS = response.data
            })
            .catch(err => {
                console.log(err)
            })

            },



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
                if(this.var_finess!=""){
                  getAPI.post('/liste_date_codage/',formData)
                .then(response =>{
                  console.log('Resultat recu')
                  this.API_date = response.data
              })
              .catch(err => {
                  console.log(err)
              })
                }
              else{
                this.$fire({
            text: "Selectionnez un finess",
            timer: 5000
            }).then(r => {
            console.log(r.value);
        });
              }
            },

//fonction qui envoi les finess et date et recupere num RSS
            async liste_rss2(){
                const formData = new FormData();
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                if(this.var_date!=""){
                getAPI.post('/liste_rss/',formData)
               .then(response =>{
                console.log('Resultat recu')
                this.API_rss = response.data
            })
            .catch(err => {
                console.log(err)
            })
                }
                else{
                  this.$fire({
            text: "Selectionnez une date",
            timer: 5000
            }).then(r => {
            console.log(r.value);
        });
                }
            },

//fonction qui recompose
            async recompo(){

                const formData = new FormData();
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("rss", this.var_rss);
                await getAPI.post('/recompo/',formData)
               .then(response =>{
                console.log('Resultat recu')
                this.API_rss = response.data
            })
            .catch(err => {
                console.log(err)
            }) 
            },

        async telecharger(){
          const formData = new FormData();
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("rss", this.var_rss);
                await getAPI.post('/recompo/',formData)
               .then(response =>{
                console.log('Resultat recu')
                this.API_rss = response.data
            })
            .catch(err => {
                console.log(err)
            }) 
            axios({
                url : 'http://127.0.0.1:8000/media/user/'+this.$store.user+'/'+this.APIData_RSS[0].finess+'/'+this.var_date+'/rss_recompo.txt',
                method: 'GET',
                responseType: 'blob',
            }).then((response) =>{
                var fileUrl = window.URL.createObjectURL(new Blob([response.data]))
                var fileLink = document.createElement('a')
                fileLink.href = fileUrl
                fileLink.setAttribute('download', 'rss_'+this.var_rss+'_recompo.txt')
                document.body.appendChild(fileLink)
                fileLink.click()
            })
            this.supprimerbis()
        },


            async recompo_telecharger(){

             // this.recompo()
              this.telecharger()

            },



//fonction qui envoi les finess et date et criteres puis recupere la liste num RSS
            async liste_rss(){
                const formData = new FormData();
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                formData.append("criteres", this.var_critere);
                if(this.var_date!=""){
                getAPI.post('/criteres/',formData)
               .then(response =>{
                console.log('Resultat recu')
                this.API_rss = response.data
            })
            .catch(err => {
                console.log(err)
            })
                }
                else{
                  this.$fire({
            text: "Selectionnez une date",
            timer: 5000
            }).then(r => {
            console.log(r.value);
        });
                }
              this.var_rss = ""
            },


//fonction qui reinitialise toutes les données
            async reinitialiser(){
                const formData = new FormData();
                formData.append("rss", this.var_rss);
                formData.append("user", this.$store.user);
                formData.append("finess", this.var_finess);
                formData.append("date", this.var_date);
                getAPI.post('/reinitialiser/',formData)
               .then(response =>{
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
            this.recherche_rss()
            },

//fonction qui execute l'action de la selection
          async selectSelection(option){
            if(option=='Réinitialiser'){
              this.reinitialiser()
            }
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

        cc {
      color:#666666;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 24px;
  }
        ab {
      color:#293133;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 14px;
        }

      abbis {
      color:#666666;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 13px;
  }
    
  
  b{
      color : #AB111C;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
          font-size: 15px;

  }
    b_bis{
      color : #AB111C;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
          font-size: 14px;

  }
      b_bis2{
      color : #AB111C;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
          font-size: 18px;

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
    bb{
      color : #FFFFFF;
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

td.idcard {
  padding-bottom: 7%;
}
td {
  padding-bottom: 5%;
  font-weight: 500;
}

tr {
  text-align: center;
  font-size: 14px;
}

.v-card.gain p {
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: #AB111C;
}
.v-card.objectif td {
  color: rgb(75, 75, 75);
}
.v-card p {
  text-align: center;
  margin: 8px;
  font-weight: 500;
}

</style>
