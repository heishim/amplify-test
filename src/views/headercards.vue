<template>
  <div style="margin-bottom: 40px">
    <v-container>
      <v-layout row wrap style="margin-top: 20px">
        <v-flex md3 lg3>
          <v-card height="100%" style="border: 6px solid rgb(120, 120, 120)">
            <v-container class="headercards">
              <tr style="margin-bottom: 16px">
                <td class="idcard">N°RSS: {{ rss.number }}</td>
                <td class="idcard">Age: {{ rss.age }}</td>
              </tr>
              <tr width="50px">
                <td class="idcard">N°séjour: {{ rss.sejournum }}</td>
                <td class="idcard">Entrée: {{ rss.dateentre }}</td>
              </tr>
              <tr>
                <td class="idcard">Sexe: {{ rss.sexe }}</td>
                <td class="idcard">Sortie: {{ rss.datesortie }}</td>
              </tr>
              <tr>
                <td>Né(e) le {{ rss.datenaiss }}</td>
                <td>UM: {{ rss.unitemed }}</td>
              </tr>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex md1 lg1></v-flex>
        <v-flex md2 lg2>
          <v-card flat height="100%">
            <v-card-title class="pb-0 justify-center">OBJECTIF</v-card-title>
            <v-container>
              <p>{{ objectif.financier }} €</p>
              <p>{{ objectif.cmdpredite }}</p>
              <p>{{ objectif.scorecmdpredite }}%</p>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex md1 lg1></v-flex>
        <v-flex md2 lg2>
          <v-card flat class="gain">
            <v-card-title class="pb-0 justify-center">GAIN</v-card-title>
            <v-container>
              <p>{{ gain }} €</p>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex md1 lg1></v-flex>
        <v-flex md2 lg2>
          <v-card flat class="ghm">
            <v-card-title class="pb-0 justify-center">GHM</v-card-title>
            <v-container style="height: 140px">
              <tr>
                <td>
                  {{ ghm.code }}
                </td>
              </tr>
              <tr>
                <td>
                  {{ ghm.intitule }} <br />
                  {{ ghm.severite }}
                </td>
              </tr>
            
            </v-container>
            
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "headercards",
  data: () => ({
    rss: {
      number: "123456789",
      sejournum: "417286",
      sexe: "Homme",
      datenaiss: "01/01/1990",
      age: "31",
      dateentre: "01/03/2021",
      datesortie: "05/03/2021",
      unitemed: "02",
    },
    objectif: {
      financier: 7864,
      cmdpredite: "CMD 15",
      scorecmdpredite: "83",
    },
    gain: 780,
    ghm: {
      code: "01C103",
      intitule: "Pose d'un simulateur médullaire",
      severite: "niveau 3",
      financier: "7864",
      cmdpredite: "cmd 15",
      scorecmdpredite: "83",
    },
  }),
};
</script>

<style scoped>
.v-card {
  background-color: #fff;
  height: 188px;
  border: 4px solid #aaa;
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
  color: #4caf50;
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
