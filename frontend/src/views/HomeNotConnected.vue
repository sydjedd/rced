<template>
  <v-main>
    <v-container fill-height justify-center>
      <v-card class="elevation-5" width="800">
        <v-card-title class="text-h4 text-center d-block">
          {{ this.$store.state.common.appName }}
        </v-card-title>

        <v-card-subtitle class="text-h6 text-center d-block">
          {{ this.$store.state.common.appDescription }}
        </v-card-subtitle>

        <v-img src="@/assets/analytics.jpg" height="200" contain></v-img>

        <v-card-text>
          Ce site présente des statistiques sur la certification électronique des décès.
          Il est destiné exclusivement aux personnes, institutions et établissements impliqués dans cette activité.
          La certification électronique des décès proprement dite s’effectue sur <a href="https://sic.certdc.inserm.fr/login.php">ce site</a>.
          <br />
          <br />
          Des données en accès libre sur les causes de décès sont disponibles à ces adresses :
          <br />
          <a href=" http://cepidc-data.inserm.fr/inserm/html/index2.htm">Interrogation des données sur les causes de décès de 1980 à 2016</a>
          <br />
          <a href="https://opendata.idf.inserm.fr/cepidc/covid-19/">Visualisation des données du centre d'épidémiologie sur les causes médicales de décès de l'Inserm sur la Covid-19</a>
          <br />
          <br />
          Les demandes de compte pour accéder à RCED et toute question à son sujet sont à adresser à <a href="mailto:siou.dsi@inserm.fr">siou.dsi@inserm.fr</a>
        </v-card-text>

        <v-card-actions class="text-center d-block">
          <v-btn color="primary" to="login">Connexion</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'HomeNotConnected'
}
</script>
