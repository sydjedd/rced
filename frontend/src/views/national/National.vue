<template>
  <v-card class="mb-4">
    <v-card-text>
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="(item, index) in items" :key="index" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'National',
  data () {
    return {
      items: [
        { title: 'N1 - Nombre et taux de certificats électroniques par an', icon: 'mdi-chart-line', link: 'n1' },
        { title: 'N2 - Nombre et taux de certificats électroniques depuis 2020', icon: 'mdi-chart-line', link: 'n2' },
        { title: 'N3 - Evolution du nombre de décès déclarés par voie électronique par région, par département et par an', icon: 'mdi-chart-line', link: 'n3' }
        /*
        { title: 'N4 - Evolution du nombre de décès déclarés par voie électronique par établissement et par an', icon: 'mdi-chart-line', link: 'n4' },
        { title: 'N5 - Taux de certification électronique par région avant 2020', icon: 'mdi-chart-line', link: 'n5' },
        { title: 'N6 - Nombre de certificats électroniques déclarés par an et par source de données', icon: 'mdi-chart-line', link: 'n6' },
        { title: 'N7 - Nombre de e-certificats en ou hors ES en 2020', icon: 'mdi-chart-line', link: 'n7' },
        { title: 'N8 - Etablissements (ET) raccordés à CertDC', icon: 'mdi-chart-line', link: 'n8' },
        { title: 'N9 - Médecins certifiant électroniquement : évolution par rapport à l\'année antérieure', icon: 'mdi-chart-line', link: 'n9' },
        { title: 'N10 - Etablissements certifiant électroniquement : évolutions par rapport à l\'année antérieure', icon: 'mdi-chart-line', link: 'n10' }
        */
      ]
    }
  }
}
</script>
