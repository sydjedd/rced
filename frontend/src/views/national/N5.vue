<template>
  <div>
    <v-card class="mb-4">
      <v-card-text>
        <v-tabs v-model="currentItem" center-active grow show-arrows>
          <v-tab v-for="(item, index) in items" :key="index">
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </v-card-text>
    </v-card>

    <v-alert dense dismissible border="left" type="warning">
      Attention, le nombre de certificats n'est pas totalement finalisé pour les deux années antérieures à l'année en cours.
      <br>
      L'année considérée est celle du décès (et non celle d'établissement du certificat par le médecin).
    </v-alert>

    <v-card>
      <v-card-text>
        <v-tabs-items v-model="currentItem">
          <v-tab-item v-for="(item, index) in items" :key="index">
            <component :is="item.component"></component>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import N50 from '@/components/national/N50'
import N51 from '@/components/national/N51'
import N52 from '@/components/national/N52'
import N53 from '@/components/national/N53'

export default {
  name: 'National',
  components: {
    N50,
    N51,
    N52,
    N53
  },
  data () {
    return {
      currentItem: 0,
      items: [
        { title: 'N5-0 Taux de certificats électroniques par région avant 2020', component: 'N50' },
        { title: 'N5-1 Taux de certificats électroniques par département avant 2020', component: 'N51' },
        { title: 'N5-2 Répartition par type de lieux de décès : tous certificats avant 2020', component: 'N52' },
        { title: 'N5-3 Répartition par type de lieux de décès : certificats électroniques avant 2020', component: 'N53' }
      ]
    }
  }
}
</script>
