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
      Attention, l'année considérée est l'année de décès. Les données de 2017 et
      suivantes ne sont pas finalisées (doublons non enlevés). En rouge les
      données sont provisoires (retard dans la réception des certificats papier)
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
/*
import N20 from '@/components/national/N20'
import N21 from '@/components/national/N21'
import N22 from '@/components/national/N22'
import N23 from '@/components/national/N23'
import N24 from '@/components/national/N24'
import N25 from '@/components/national/N25'

export default {
  name: 'National',
  components: {
    N20,
    N21,
    N22,
    N23,
    N24,
    N25
  },
  data () {
    return {
      currentItem: 0,
      items: [
        { title: 'N2-0 Taux de certification électronique et nombre de certificats en 2020', component: 'N20' },
        { title: 'N2-1 Nombre de certificats par région en 2020', component: 'N21' },
        { title: 'N2-2 Nombre de certificats par région et par département en 2020', component: 'N22' },
        { title: 'N2-3 Taux de certification électronique par région en 2020', component: 'N23' },
        { title: 'N2-4 Taux de certification électronique et nombre de certificats par région en 2020', component: 'N24' },
        { title: 'N2-5 Taux de certification électronique par région et par département en 2020', component: 'N25' }
      ]
    }
  }
}
*/
</script>
