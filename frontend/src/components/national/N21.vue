<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      :loading="loading"
      :type="'table-row-divider@' + skeletonLoader"
    ></v-skeleton-loader>

    <v-simple-table
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
            <template v-for="(annee, indexAnnee) in n21.annee">
              <th class="primary white--text text-center border-left" v-for="(semaine, indexSemaine) in annee" :key="indexAnnee + indexSemaine" colspan="5">{{ indexAnnee }} - {{ semaine }}</th>
            </template>
          </tr>
          <tr>
            <template v-for="(annee, indexAnnee) in n21.annee">
              <template v-for="semaine in annee">
                <th class="primary white--text text-center text-uppercase border-left" :key="indexAnnee + semaine + 'e'">électronique<br>nombre</th>
                <th class="primary white--text text-center text-uppercase" :key="indexAnnee + semaine + 'e%'">électronique<br>pourcentage</th>
                <th class="primary white--text text-center text-uppercase" :key="indexAnnee + semaine + 'p'">papier<br>nombre</th>
                <th class="primary white--text text-center text-uppercase" :key="indexAnnee + semaine + 'p%'">papier<br>pourcentage</th>
                <th class="primary white--text text-center text-uppercase" :key="indexAnnee + semaine + 't'">total</th>
              </template>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="(region, indexRegion) in n21.region">
            <tr :key="indexRegion">
              <th class="text-no-wrap border-right">{{ indexRegion }}</th>
              <template v-for="(annee, indexAnnee) in n21.annee">
                <template v-for="semaine in annee">
                  <td class="text-right border-left" :key="indexRegion + indexAnnee + semaine + 'e'"  :title="indexRegion + ' - ' + indexAnnee + ' - ' + semaine + ' - Électronique nombre'">{{ Object(region.electronique[indexAnnee])[semaine] }}</td>
                  <td class="text-right" :key="indexRegion + indexAnnee + semaine + 'e%'" :title="indexRegion + ' - ' + indexAnnee + ' - ' + semaine + ' - Électronique pourcentage'">{{ Object(region.electronique[indexAnnee])[semaine] && Object(region.total[indexAnnee])[semaine] ? (Object(region.electronique[indexAnnee])[semaine] / Object(region.total[indexAnnee])[semaine] * 100).toFixed(2) + '%' : '' }}</td>
                  <td class="text-right" :key="indexRegion + indexAnnee + semaine + 'p'"  :title="indexRegion + ' - ' + indexAnnee + ' - ' + semaine + ' - Papier nombre'">{{ Object(region.total[indexAnnee])[semaine] - Object(region.electronique[indexAnnee])[semaine] || '' }}</td>
                  <td class="text-right" :key="indexRegion + indexAnnee + semaine + 'p%'" :title="indexRegion + ' - ' + indexAnnee + ' - ' + semaine + ' - Papier pourcentage'">{{ Object(region.total[indexAnnee])[semaine] && Object(region.electronique[indexAnnee])[semaine] ? ((Object(region.total[indexAnnee])[semaine] - Object(region.electronique[indexAnnee])[semaine]) / Object(region.total[indexAnnee])[semaine] * 100).toFixed(2) + '%' : '' }}</td>
                  <td class="text-right primary--text" :key="indexRegion + indexAnnee + semaine + 't'"  :title="indexRegion + ' - ' + indexAnnee + ' - ' + semaine + ' - Total'">{{ Object(region.total[indexAnnee])[semaine] }}</td>
                </template>
              </template>
            </tr>
          </template>
        </tbody>
      </template>
    </v-simple-table>
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
export default {
  data () {
    return {
      loading: true,
      skeletonLoader: 0
    }
  },
  computed: {
    filter: {
      get () { return this.$store.state.national.n21.filter },
      set (newValue) {
        return this.$store.dispatch('national/property', {
          n: 'n21',
          property: 'filter',
          value: newValue
        })
      }
    },
    n21: {
      get () {
        return {
          annee: this.$store.state.national.n21.annee,
          region: this.$store.getters['national/n21']
        }
      }
    }
  },
  async created () {
    this.loading = true
    await this.$store.dispatch('national/n21')
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
