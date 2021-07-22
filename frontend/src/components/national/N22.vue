<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      :loading="loading"
      :type="'table-row-divider@' + skeletonLoader"
    ></v-skeleton-loader>

    <v-simple-table
      ref="n22"
      class="sticky"
      v-if="!loading"
      dense
      fixed-header
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="primary text-none border-right" rowspan="2">
              <v-text-field full-width v-model="filter" placeholder="Ain, Var..." hide-details solo dense flat clearable prepend-inner-icon="mdi-magnify"></v-text-field>
            </th>
            <template v-for="(annee, indexAnnee) in n22.annee">
              <th class="primary white--text text-center border-left" v-for="(semaine, indexSemaine) in annee" :key="indexAnnee + indexSemaine" colspan="5">{{ indexAnnee }} - {{ semaine }}</th>
            </template>
          </tr>
          <tr>
            <template v-for="(annee, indexAnnee) in n22.annee">
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
          <template v-for="(departement, indexDepartement) in n22.departement">
            <tr :key="indexDepartement">
              <th class="text-no-wrap border-right">{{ indexDepartement }}</th>
              <template v-for="(annee, indexAnnee) in n22.annee">
                <template v-for="semaine in annee">
                  <td class="text-right border-left" :key="indexDepartement + indexAnnee + semaine + 'e'"  :title="indexDepartement + ' - ' + indexAnnee + ' - ' + semaine + ' - Électronique nombre'">{{ Object(departement.electronique[indexAnnee])[semaine] }}</td>
                  <td class="text-right" :key="indexDepartement + indexAnnee + semaine + 'e%'" :title="indexDepartement + ' - ' + indexAnnee + ' - ' + semaine + ' - Électronique pourcentage'">{{ Object(departement.electronique[indexAnnee])[semaine] && Object(departement.total[indexAnnee])[semaine] ? (Object(departement.electronique[indexAnnee])[semaine] / Object(departement.total[indexAnnee])[semaine] * 100).toFixed(2) + '%' : '' }}</td>
                  <td class="text-right" :key="indexDepartement + indexAnnee + semaine + 'p'"  :title="indexDepartement + ' - ' + indexAnnee + ' - ' + semaine + ' - Papier nombre'">{{ Object(departement.total[indexAnnee])[semaine] - Object(departement.electronique[indexAnnee])[semaine] || '' }}</td>
                  <td class="text-right" :key="indexDepartement + indexAnnee + semaine + 'p%'" :title="indexDepartement + ' - ' + indexAnnee + ' - ' + semaine + ' - Papier pourcentage'">{{ Object(departement.total[indexAnnee])[semaine] && Object(departement.electronique[indexAnnee])[semaine] ? ((Object(departement.total[indexAnnee])[semaine] - Object(departement.electronique[indexAnnee])[semaine]) / Object(departement.total[indexAnnee])[semaine] * 100).toFixed(2) + '%' : '' }}</td>
                  <td class="text-right primary--text" :key="indexDepartement + indexAnnee + semaine + 't'"  :title="indexDepartement + ' - ' + indexAnnee + ' - ' + semaine + ' - Total'">{{ Object(departement.total[indexAnnee])[semaine] }}</td>
                </template>
              </template>
            </tr>
          </template>
        </tbody>
      </template>
    </v-simple-table>

    <v-btn color="primary" small fixed bottom right fab @click="exportXLS('n22')">
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
      get () {
        return this.$store.state.national.n22.filter
      },
      set (newValue) {
        return this.$store.dispatch('national/property', {
          n: 'n22',
          property: 'filter',
          value: newValue
        })
      }
    },
    n22: {
      get () {
        return {
          annee: this.$store.state.national.n22.annee,
          departement: this.$store.getters['national/n22']
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
    await this.$store.dispatch('national/n22')
    this.loading = false
  },
  mounted () {
    this.skeletonLoader = Math.floor(
      (document.documentElement.offsetHeight - 104) / 50
    )
  }
}
</script>
