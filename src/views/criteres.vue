<template>
  <div class="acceuil">
    <v-toolbar color="primary">
    </v-toolbar>

    <v-container>  
      <v-expansion-panels focusable multiple>
        <v-expansion-panel value="0" class="mb-5 mt-16" >
          <v-expansion-panel-header>Etablissement</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row align="center">
              <v-col cols="12">
                <v-select
                  :items="items"
                  :menu-props="{ bottom: true, offsetY: true }"
                  label="Veuillez selectionner votre établissement"
                ></v-select>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Résumé de sortie standardisé</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class="mt-5">
              <v-col cols="12" sm="6">
                <v-autocomplete
                  filled
                  rounded
                  label="Rechercher un fichier RSS"
                  :items="items"
                  append-icon="mdi-magnify"
                  d-flex
                > </v-autocomplete>
              </v-col>
              <v-spacer></v-spacer>
              <v-col
                cols="12"
                sm="4"
              >
                <v-select
                  v-model="value"
                  :items="items"
                  attach
                  chips
                  deletable-chips
                  :menu-props="{ bottom: true, offsetY: true }"
                  label="Critères"
                  multiple
                  clearable
                ></v-select>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        
      </v-expansion-panels>
      <v-expansion-panels multiple accordion  :value="expanded">
        <v-expansion-panel v-for="(item,i) in exptest" :key="i">
            <v-expansion-panel-header>{{item.title}}</v-expansion-panel-header>
            <v-expansion-panel-content>
                {{item.content}}
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'accueil',
  
  data: () => ({
    expanded: [0],
    items: ['abaa', 'abbbb', 'abcccc', 'dddd', 'oizrjfh',"lilij","lihj","moiknh","ljjjfh"],
    }),
  }
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>