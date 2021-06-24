<template>
  <v-expansion-panels multiple v-model="panel">
    <v-expansion-panel v-for="(item, index) in items" :key="index">
      <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="(child, index) in item.childs" :key="index" :to="child.link">
              <v-list-item-icon>
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ child.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style>
[class='v-expansion-panel']:not(:last-child) {
  margin-bottom: 16px;
}
</style>

<script>
export default {
  name: 'National',
  data () {
    return {
      panel: [0, 1, 2, 3, 4],
      items: [
        {
          title: 'Nombre de certificats de décès par année',
          childs: [
            { title: 'Nombre de certificats de décès reçus à l\'Inserm par année de décès', icon: 'mdi-chart-line', link: 'n1' },
            { title: 'Nombre de certificats électroniques par année de décès et par type d\'exercice', icon: 'mdi-chart-line', link: 'n2' },
            { title: 'Nombre de certificats électroniques en établissement par trimestre', icon: 'mdi-chart-line', link: 'n3' },
            { title: 'Nombre de certificats électroniques en établissement par trimestre et par région', icon: 'mdi-chart-line', link: 'n4' },
            { title: 'Evolution du nombre de décès déclarés par voie électronique par région, par département et par an', icon: 'mdi-chart-line', link: 'n5' }
          ]
        }
      ]
    }
  }
}
</script>
