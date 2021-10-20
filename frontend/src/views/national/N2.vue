<template>
  <div>
    <v-card>
      <v-card-text>
        <v-tabs center-active grow show-arrows>
          <v-tab v-for="(item, index) in items" :key="index" :to="item.link">
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </v-card-text>
    </v-card>

    <v-alert class="mt-4" dense dismissible border="left" type="warning">
      En rouge, des chiffres non pris en compte dans le graphique car probablement incomplets.
      <br>
      Le nombre de certificats papier est déduit du nombre total de décès enregistré par l'Insee et non des données du CépiDc.
      <br>
      Il n’est pas fait de distinction entre les types d'exercice (libéral ou en établissement).
    </v-alert>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'National',
  data () {
    return {
      items: [
        { title: 'N2-0 Nombre et taux de certificats électroniques depuis 2020', link: '/national/n20' },
        { title: 'N2-1 Nombre et taux de certificats électroniques par région depuis 2020', link: '/national/n21' },
        { title: 'N2-2 Nombre et taux de certificats électroniques par département depuis 2020', link: '/national/n22' }
      ]
    }
  }
}
</script>
