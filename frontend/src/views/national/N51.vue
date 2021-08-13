<template>
  <div>
    <v-card class="mt-4" :loading="loading">
      <v-card-text>
        <v-skeleton-loader
          v-if="loading"
          :loading="loading"
          :type="'table-row-divider@' + skeletonLoader"
        ></v-skeleton-loader>

        <v-simple-table
          ref="n51"
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
                <th class="primary white--text text-center border-left" v-for="(annee, indexAnnee) in n51.annee" :key="indexAnnee" colspan="4">{{ annee }}</th>
              </tr>
              <tr>
                <template v-for="(annee, indexAnnee) in n51.annee">
                  <th class="primary white--text text-center text-uppercase border-left" :key="indexAnnee + 'e'">électronique<br>nombre</th>
                  <th class="primary white--text text-center text-uppercase" :key="indexAnnee + 'e%'">électronique<br>pourcentage</th>
                  <th class="primary white--text text-center text-uppercase" :key="indexAnnee + 'p'">papier<br>nombre</th>
                  <th class="primary white--text text-center text-uppercase" :key="indexAnnee + 'p%'">papier<br>pourcentage</th>
                </template>
              </tr>
            </thead>
            <tbody>
              <template v-for="(departement, indexDepartement) in n51.departement">
                <tr :key="indexDepartement">
                  <th class="text-no-wrap border-right">{{ indexDepartement || '' }}</th>
                  <template v-for="(annee, indexAnnee) in n51.annee">
                    <td class="text-right border-left" :key="indexDepartement + indexAnnee + 'e'"  :title="indexDepartement + ' - ' + indexAnnee + ' - ' + ' - Électronique nombre'">{{ departement.electronique[annee] || '' }}</td>
                    <td class="text-right" :key="indexDepartement + indexAnnee + 'e%'" :title="indexDepartement + ' - ' + indexAnnee + ' - ' + ' - Électronique pourcentage'">{{ departement.electronique[annee] ? (departement.electronique[annee] * 100 / (departement.electronique[annee] + (departement.papier[annee] || 0))).toFixed(2) + '%' : '' }}</td>
                    <td class="text-right" :key="indexDepartement + indexAnnee + 'p'"  :title="indexDepartement + ' - ' + indexAnnee + ' - ' + ' - Papier nombre'">{{ departement.papier[annee] || '' }}</td>
                    <td class="text-right" :key="indexDepartement + indexAnnee + 'p%'" :title="indexDepartement + ' - ' + indexAnnee + ' - ' + ' - Papier pourcentage'">{{ departement.papier[annee] ? (departement.papier[annee] * 100 / ((departement.electronique[annee] || 0) + departement.papier[annee])).toFixed(2) + '%' : '' }}</td>
                  </template>
                </tr>
              </template>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <v-btn color="primary" small fixed bottom right fab @click="exportXLS('n51')">
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
      get () { return this.$store.state.national.n51.filter },
      set (newValue) {
        return this.$store.dispatch('national/property', {
          n: 'n51',
          property: 'filter',
          value: newValue
        })
      }
    },
    n51: {
      get () {
        return {
          annee: this.$store.state.national.n51.annee,
          departement: this.$store.getters['national/n51']
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
    await this.$store.dispatch('national/n51')
    this.loading = false
  },
  mounted () {
    this.skeletonLoader = Math.floor(
      (document.documentElement.offsetHeight - 104) / 50
    )
  }
}
</script>
