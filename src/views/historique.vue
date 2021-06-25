<template>
  <div absolute>
    <v-btn
      small
      right
      fixed
      fab
      @click="drawer = !drawer"
      elevation-10
      style="magin-top: 5px"
    >
      <v-icon> mdi-history </v-icon>
    </v-btn>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      right
      disable-resize-watcher
      width="346px"
      overflow="scroll"
      temporary
      hide-overlay
    >
      <div style="margin-bottom: 10px">
        <br />
        <h2 style="text-align: center">Historique</h2>
        <br />
        <v-simple-table>
          <tr v-for="item in historique" :key="item.action">
            <td style="text-align: center">{{ item.action }}</td>
            <td>{{ item.heure }}</td>
            <td>{{ item.date }}</td>
          </tr>
        </v-simple-table>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
tr:nth-child(even) {
  background-color: #eee;
}
tr:nth-child(odd) {
  background-color: #ccc;
}
</style>

<script>
export default {
  name: "historique",

  data: () => ({
    drawer: false,
    historique: [
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Modification du dp", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Modification du dp", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Modification du dp", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Modification du dp", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Modification du dp", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Modification du dp", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Modification du dp", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Modification du dp", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Modification du dp", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Modification du dp", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Modification du dp", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Modification du dp", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Modification du dp", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Modification du dp", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Modification du dp", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
      { action: "Ajout d'acte", date: "14/06/2021", heure: "11:57" },
    ],
  }),
};
</script>
