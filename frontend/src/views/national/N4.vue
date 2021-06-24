<template>
  <div>
    <v-alert v-model="alert" dense dismissible border="left" type="warning">
      Attention, l'année considérée est l'année de décès. Les données de 2017 et
      suivantes ne sont pas finalisées (doublons non enlevés). En rouge les
      données sont provisoires (retard dans la réception des certificats papier)
    </v-alert>

    <v-card :loading="n4.loading">
      <v-card-text>
        <v-skeleton-loader
          v-if="n4.loading"
          :loading="n4.loading"
          :type="'table-row-divider@' + skeletonLoader"
        ></v-skeleton-loader>
        <v-simple-table
          v-if="!n4.loading"
          class="sticky"
          dense
          fixed-header
          id="mytable"
          ref="mytable"
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
                  v-for="(annee, indexAnnee) in n4.annee"
                  :key="indexAnnee"
                >
                  {{ annee }}
                </th>
              </tr>
              <tr class="text-uppercase">
                <template v-for="(annee, indexAnnee) in n4.annee">
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
              <template v-for="(region, indexRegion) in n4.region">
                <tr :key="indexRegion + '1'">
                  <th class="text-no-wrap">{{ indexRegion }}</th>
                  <template v-for="(annee, indexAnnee) in n4.annee">
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
      </v-card-text>
    </v-card>
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
      skeletonLoader: 0
    }
  },
  computed: {
    alert: {
      get () {
        return this.$store.state.national.n4.alert
      },
      set (newValue) {
        return this.$store.dispatch('national/property', {
          n: 'n4',
          property: 'alert',
          value: newValue
        })
      }
    },
    filter: {
      get () {
        return this.$store.state.national.n4.filter
      },
      set (newValue) {
        return this.$store.dispatch('national/property', {
          n: 'n4',
          property: 'filter',
          value: newValue
        })
      }
    },
    n4: {
      get () {
        return {
          loading: this.$store.state.national.n4.loading,
          region: this.$store.getters['national/n4Region'],
          annee: this.$store.state.national.n4.annee
        }
      }
    }
  },
  created () {
    this.$store.dispatch('national/n4')
  },
  mounted () {
    const height = Math.floor(
      (document.documentElement.offsetHeight - 104) / 50
    )
    this.skeletonLoader = height > 13 ? 13 : height
  }
}
</script>
