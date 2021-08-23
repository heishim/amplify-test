<template>
  <div>
    <v-container>
      <div style="width: 100%">
        <h2 style="text-align: center">Résumé</h2>
        <v-container class="album py-5 bg-light">
<v-row>
        <div
          style="
            width: 70%;
            position: relative;
            margin-right: auto;
            margin-left: auto;
          "
        >
          <v-card
            style="
              display: inline-block;
              width: 45%;
              min-height: 700px;
              background-color: #eee;
            "
          >
            <v-card-title
              class="justify-center"
              primary-title
              style="padding-bottom: 16px; font-size: 40px; font-weight: bolder"
            >
              {{ avant.tarif }} €
            </v-card-title>
            <div style="padding-left: 50%; padding-right: 50%">
              <v-badge dot color="red lighten-"></v-badge>
            </div>
            <v-container>
              <v-card>
                <v-card-title>RUM 0</v-card-title>
              </v-card>
              <p style="text-align: center">{{ avant.dp }}</p>
              <v-card-title primary-title class="justify-center">
                DAS
              </v-card-title>
              <p style="text-align: center">{{ avant.das }}</p>
              <v-card-title primary-title class="justify-center">
                ACTE
              </v-card-title>
              <p style="text-align: center">{{ avant.acte }}</p>
              <v-card-title primary-title class="justify-center">
                CMD
              </v-card-title>
              <p style="text-align: center">{{ avant.cmd }}</p>
            </v-container>
          </v-card>

          <v-card
            style="
              display: inline-block;
              width: 45%;
              min-height: 700px;
              float: right;
              background-color: #eee;
            "
          >
            <v-card-title
              class="pt-5 justify-center"
              primary-title
              style="padding-bottom: 16px; font-size: 40px; font-weight: bolder"
            >
              {{ apres.tarif }} €
            </v-card-title>
            <div style="padding-left: 50%; padding-right: 50%">
              <v-badge dot color="success"></v-badge>
            </div>
            <v-container>
              <v-card-title primary-title class="justify-center">
                DP
              </v-card-title>
              <p style="text-align: center">{{ apres.dp }}</p>
              <v-card-title primary-title class="justify-center">
                DAS
              </v-card-title>
              <p style="text-align: center">{{ apres.das }}</p>
              <v-card-title primary-title class="justify-center">
                ACTE
              </v-card-title>
              <p style="text-align: center">{{ apres.acte }}</p>
              <v-card-title primary-title class="justify-center">
                CMD
              </v-card-title>
              <p style="text-align: center">{{ apres.cmd }}</p>
            </v-container>
          </v-card>
        </div>

</v-row>
        </v-container>
                <v-row justify="center" style="margin-top: 20px">
          <v-btn color="red"> Valider</v-btn>
        </v-row>
              </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "historyrecapbis",
  data: () => ({
    drawer: false,
    avant: {
      dp: "cancer des poumons",
      das: "---",
      acte: "chimiothérapy",
      tarif: 5432,
      cmd: 15,
    },
    apres: {
      dp: "cancer des poumons",
      das: "mycose buccale en cours de chimiothérapie",
      acte: "chimiothérapy",
      tarif: 6543,
      cmd: 13,
    },
  }),
};
</script>
