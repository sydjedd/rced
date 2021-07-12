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
      Attention, l'année considérée est l'année de décès.
      <br>
      Les données de 2017 et suivantes ne sont pas finalisées (doublons non enlevés).
      <br>
      En rouge les données sont provisoires (retard dans la réception des certificats papier).
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
import N10 from '@/components/national/N10'
import N11 from '@/components/national/N11'
import N12 from '@/components/national/N12'
import N13 from '@/components/national/N13'

export default {
  name: 'National',
  components: {
    N10,
    N11,
    N12,
    N13
  },
  data () {
    return {
      currentItem: 0,
      items: [
        { title: 'N1-0 Nombre et taux de certificats électroniques par an', component: 'N10' },
        { title: 'N1-1 Nombre de certificats électroniques par an, en ou hors établissement', component: 'N11' },
        { title: 'N1-2 Nombre de certificats électroniques par trimestre et par région en établissement', component: 'N12' },
        { title: 'N1-3 Nombre de certificats électroniques par trimestre en établissement', component: 'N13' }
      ]
    }
  }
}
</script>
