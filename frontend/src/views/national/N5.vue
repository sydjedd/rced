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
      Attention, le nombre de certificats n'est pas totalement finalisé pour les deux années antérieures à l'année en cours.
      <br>
      L'année considérée est celle du décès (et non celle d'établissement du certificat par le médecin).
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
