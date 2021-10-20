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
      Le taux de certification électronique n'est calculable qu'à la fin de la réception de tous les certificats papier et de la finalisation des données.
      <br>
      L’exactitude des données au-delà de 2018 n’est donc pas garantie.
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
        { title: 'N5-0 Taux de certificats électroniques par région avant 2020', link: '/national/n50' },
        { title: 'N5-1 Taux de certificats électroniques par département avant 2020', link: '/national/n51' },
        { title: 'N5-2 Répartition par type de lieux de décès : tous certificats avant 2020', link: '/national/n52' },
        { title: 'N5-3 Répartition par type de lieux de décès : certificats électroniques avant 2020', link: '/national/n53' }
      ]
    }
  }
}
</script>
