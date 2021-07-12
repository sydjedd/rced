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
      Le nombre de certificats électroniques est issu de CertDC.
      <br>
      Le nombre de certificats papier est déduit du nombre total de décès mis à disposition par <a href="https://www.data.gouv.fr/fr/datasets/fichier-des-personnes-decedees" target="_blank" class="text-decoration-none">l'INSEE</a>.
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
import N20 from '@/components/national/N20'
import N21 from '@/components/national/N21'
import N22 from '@/components/national/N22'

export default {
  name: 'National',
  components: {
    N20,
    N21,
    N22
  },
  data () {
    return {
      currentItem: 0,
      items: [
        { title: 'N2-0 Nombre et taux de certification électronique depuis 2020', component: 'N20' },
        { title: 'N2-1 Nombre et taux de certification électronique par région depuis 2020', component: 'N21' },
        { title: 'N2-2 Nombre et taux de certification électronique par département depuis 2020', component: 'N22' }
      ]
    }
  }
}
</script>
