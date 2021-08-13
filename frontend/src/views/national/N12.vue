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
          ref="n12"
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
                <th class="primary white--text text-center border-left" v-for="(annee, indexAnnee) in n12.annee" :key="indexAnnee" colspan="5">{{ annee }}</th>
              </tr>
              <tr>
                <template v-for="(annee, indexAnnee) in n12.annee">
                  <th class="primary white--text text-center text-uppercase border-left" :key="indexAnnee + '1'">t1</th>
                  <th class="primary white--text text-center text-uppercase" :key="indexAnnee + '2'">t2</th>
                  <th class="primary white--text text-center text-uppercase" :key="indexAnnee + '3'">t3</th>
                  <th class="primary white--text text-center text-uppercase" :key="indexAnnee + '4'">t4</th>
                  <th class="primary white--text text-center text-uppercase" :key="indexAnnee + 'T'">total</th>
                </template>
              </tr>
            </thead>
            <tbody>
              <template v-for="(region, indexRegion) in n12.region">
                <tr :key="indexRegion + '1'">
                  <th class="text-no-wrap border-right">{{ indexRegion }}</th>
                  <template v-for="(annee, indexAnnee) in n12.annee">
                    <td class="text-right border-left" :key="indexRegion + indexAnnee + '1'" :title="indexRegion + ' - ' + annee + ' - Trimestre 1'">{{ region[annee] ? region[annee]['1'] || '' : '' }}</td>
                    <td class="text-right" :key="indexRegion + indexAnnee + '2'" :title="indexRegion + ' - ' + annee + ' - Trimestre 2'">{{ region[annee] ? region[annee]['2'] || '' : '' }}</td>
                    <td class="text-right" :key="indexRegion + indexAnnee + '3'" :title="indexRegion + ' - ' + annee + ' - Trimestre 3'">{{ region[annee] ? region[annee]['3'] || '' : '' }}</td>
                    <td class="text-right" :key="indexRegion + indexAnnee + '4'" :title="indexRegion + ' - ' + annee + ' - Trimestre 4'">{{ region[annee] ? region[annee]['4'] || '' : '' }}</td>
                    <th class="text-right primary--text" :key="indexRegion + indexAnnee + '5'" :title="indexRegion + ' - ' + annee + ' - Total'">{{ (region[annee] ? region[annee]['1'] || 0 : 0) + (region[annee] ? region[annee]['2'] || 0 : 0) + (region[annee] ? region[annee]['3'] || 0 : 0) + (region[annee] ? region[annee]['4'] || 0 : 0) || '' }}</th>
                  </template>
                </tr>
              </template>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <v-btn color="primary" small fixed bottom right fab @click="exportXLS('n12')">
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
        return this.$store.state.national.n12.filter
      },
      set (newValue) {
        return this.$store.dispatch('national/property', {
          n: 'n12',
          property: 'filter',
          value: newValue
        })
      }
    },
    n12: {
      get () {
        return {
          annee: this.$store.state.national.n12.annee,
          region: this.$store.getters['national/n12']
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
    await this.$store.dispatch('national/n12')
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
