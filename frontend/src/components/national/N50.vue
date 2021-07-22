<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      :loading="loading"
      :type="'table-row-divider@' + skeletonLoader"
    ></v-skeleton-loader>

    <v-simple-table
      ref="n50"
      class="sticky"
      v-if="!loading"
      dense
      fixed-header
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="primary text-none border-right" rowspan="2">
              <v-text-field full-width v-model="filter" placeholder="Bretagne, Occitanie..." hide-details solo dense flat clearable prepend-inner-icon="mdi-magnify"></v-text-field>
            </th>
            <th class="primary white--text text-center border-left" v-for="(annee, indexAnnee) in n50.annee" :key="indexAnnee" colspan="4">{{ annee }}</th>
          </tr>
          <tr>
            <template v-for="(annee, indexAnnee) in n50.annee">
              <th class="primary white--text text-center text-uppercase border-left" :key="indexAnnee + 'e'">électronique<br>nombre</th>
              <th class="primary white--text text-center text-uppercase" :key="indexAnnee + 'e%'">électronique<br>pourcentage</th>
              <th class="primary white--text text-center text-uppercase" :key="indexAnnee + 'p'">papier<br>nombre</th>
              <th class="primary white--text text-center text-uppercase" :key="indexAnnee + 'p%'">papier<br>pourcentage</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="(region, indexRegion) in n50.region">
            <tr :key="indexRegion">
              <th class="text-no-wrap border-right">{{ indexRegion || '' }}</th>
              <template v-for="(annee, indexAnnee) in n50.annee">
                <td class="text-right border-left" :key="indexRegion + indexAnnee + 'e'"  :title="indexRegion + ' - ' + indexAnnee + ' - ' + ' - Électronique nombre'">{{ region.electronique[annee] || '' }}</td>
                <td class="text-right" :key="indexRegion + indexAnnee + 'e%'" :title="indexRegion + ' - ' + indexAnnee + ' - ' + ' - Électronique pourcentage'">{{ region.electronique[annee] ? (region.electronique[annee] * 100 / (region.electronique[annee] + (region.papier[annee] || 0))).toFixed(2) + '%' : '' }}</td>
                <td class="text-right" :key="indexRegion + indexAnnee + 'p'"  :title="indexRegion + ' - ' + indexAnnee + ' - ' + ' - Papier nombre'">{{ region.papier[annee] || '' }}</td>
                <td class="text-right" :key="indexRegion + indexAnnee + 'p%'" :title="indexRegion + ' - ' + indexAnnee + ' - ' + ' - Papier pourcentage'">{{ region.papier[annee] ? (region.papier[annee] * 100 / ((region.electronique[annee] || 0) + region.papier[annee])).toFixed(2) + '%' : '' }}</td>
              </template>
            </tr>
          </template>
        </tbody>
      </template>
    </v-simple-table>

    <v-btn color="primary" small fixed bottom right fab @click="exportXLS('n50')">
      <v-icon>mdi-download</v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
::v-deep .sticky .v-data-table__wrapper {
  max-height: calc(100vh - 104px);
}
th,
td {
  box-shadow: none !important;
}
td {
  cursor: default;
}
th.border-left,
td.border-left {
  border-left: solid 1px rgba(0, 0, 0, 0.12) !important;
}
th.border-right,
td.border-right {
  border-right: solid 1px rgba(0, 0, 0, 0.12) !important;
}
.sticky table thead tr:first-child th:first-child .v-input {
  width: 200px;
}
.sticky table tbody tr th:first-child,
.sticky table thead tr:first-child th:first-child {
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  position: -o-sticky;
  position: sticky;
  left: 0;
  z-index: 1;
}
.sticky table thead tr:first-child th:first-child {
  z-index: 3;
}
.sticky table tbody tr th:first-child {
  background-color: #fff;
}
</style>

<script>
import exportHelper from '@/helpers/export'

export default {
  data () {
    return {
      loading: true,
      skeletonLoader: 0
    }
  },
  computed: {
    filter: {
      get () { return this.$store.state.national.n50.filter },
      set (newValue) {
        return this.$store.dispatch('national/property', {
          n: 'n50',
          property: 'filter',
          value: newValue
        })
      }
    },
    n50: {
      get () {
        return {
          annee: this.$store.state.national.n50.annee,
          region: this.$store.getters['national/n50']
        }
      }
    }
  },
  methods: {
    exportXLS (tableName = '') {
      exportHelper.exportXLS(tableName, this.$refs[tableName].$el.querySelector('table').outerHTML)
    }
  },
  async created () {
    this.loading = true
    await this.$store.dispatch('national/n50')
    this.loading = false
  },
  mounted () {
    const height = Math.floor(
      (document.documentElement.offsetHeight - 104) / 50
    )
    this.skeletonLoader = height > 13 ? 13 : height
  }
}
</script>
