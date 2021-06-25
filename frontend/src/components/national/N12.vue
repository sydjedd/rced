<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      :loading="loading"
      :type="'table-row-divider@' + skeletonLoader"
    ></v-skeleton-loader>

    <v-simple-table
      class="sticky"
      id="mytable"
      ref="mytable"
      v-if="!loading"
      dense
      fixed-header
    >
      <template v-slot:default>
        <thead>
          <tr class="text-uppercase">
            <th class="primary text-none" rowspan="2">
              <v-text-field
                full-width
                v-model="filter"
                placeholder="Ain, Var..."
                hide-details
                solo
                dense
                flat
                clearable
                prepend-inner-icon="mdi-magnify"
              ></v-text-field>
            </th>
            <th
              class="white--text text-center primary border-left"
              colspan="5"
              v-for="(annee, indexAnnee) in n12.annee"
              :key="indexAnnee"
            >
              {{ annee }}
            </th>
          </tr>
          <tr class="text-uppercase">
            <template v-for="(annee, indexAnnee) in n12.annee">
              <th
                class="white--text text-center primary border-left"
                :key="indexAnnee + '1'"
              >
                T1
              </th>
              <th
                class="white--text text-center primary"
                :key="indexAnnee + '2'"
              >
                T2
              </th>
              <th
                class="white--text text-center primary"
                :key="indexAnnee + '3'"
              >
                T3
              </th>
              <th
                class="white--text text-center primary"
                :key="indexAnnee + '4'"
              >
                T4
              </th>
              <th
                class="white--text text-center primary"
                :key="indexAnnee + 'T'"
              >
                Total
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="(region, indexRegion) in n12.region">
            <tr :key="indexRegion + '1'">
              <th class="text-no-wrap">{{ indexRegion }}</th>
              <template v-for="(annee, indexAnnee) in n12.annee">
                <td
                  class="text-right border-left"
                  :key="indexRegion + indexAnnee + '1'"
                  :title="indexRegion + ' - ' + annee + ' - Trimestre 1'"
                >
                  {{ region[annee] ? region[annee]['1'] || '' : '' }}
                </td>
                <td
                  class="text-right"
                  :key="indexRegion + indexAnnee + '2'"
                  :title="indexRegion + ' - ' + annee + ' - Trimestre 2'"
                >
                  {{ region[annee] ? region[annee]['2'] || '' : '' }}
                </td>
                <td
                  class="text-right"
                  :key="indexRegion + indexAnnee + '3'"
                  :title="indexRegion + ' - ' + annee + ' - Trimestre 3'"
                >
                  {{ region[annee] ? region[annee]['3'] || '' : '' }}
                </td>
                <td
                  class="text-right"
                  :key="indexRegion + indexAnnee + '4'"
                  :title="indexRegion + ' - ' + annee + ' - Trimestre 4'"
                >
                  {{ region[annee] ? region[annee]['4'] || '' : '' }}
                </td>
                <th
                  class="text-right primary--text"
                  :key="indexRegion + indexAnnee + '5'"
                  :title="indexRegion + ' - ' + annee + ' - Total'"
                >
                  {{
                    (region[annee] ? region[annee]['1'] || 0 : 0) +
                      (region[annee] ? region[annee]['2'] || 0 : 0) +
                      (region[annee] ? region[annee]['3'] || 0 : 0) +
                      (region[annee] ? region[annee]['4'] || 0 : 0) || ''
                  }}
                </th>
              </template>
            </tr>
          </template>
        </tbody>
        <!--tfoot>
          <tr class="text-uppercase primary">
          <tr class="text-uppercase primary">
          <tr class="text-uppercase primary">
          <tr class="text-uppercase primary">
            <th class="white--text">Total</th>
            <th  class="white--text text-right" v-for="(value, index) in dataN3.annee" :key="index">{{
                (dataN3.enEtablissement[value][1] || 0)
              + (dataN3.enEtablissement[value][2] || 0)
              + (dataN3.enEtablissement[value][3] || 0)
              + (dataN3.enEtablissement[value][4] || 0)
            }}</th>
          </tr>
        </tfoot-->
      </template>
    </v-simple-table>
  </div>
</template>

<style scoped>
.v-card .v-card__title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
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
.sticky table thead tr:first-child th:first-child .v-input {
  width: 190px;
}
.sticky table tbody tr th:first-child,
.sticky table thead tr:first-child th:first-child {
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  position: -o-sticky;
  position: sticky;
  left: 0;
}
.sticky table tbody tr th:first-child {
  z-index: 2;
  background-color: #fff;
}
.sticky table thead tr:first-child th:first-child {
  z-index: 3;
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
          loading: this.$store.state.national.loading,
          region: this.$store.getters['national/n12Region'],
          annee: this.$store.state.national.n12.annee
        }
      }
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
