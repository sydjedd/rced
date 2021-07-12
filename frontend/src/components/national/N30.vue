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
              <v-text-field full-width v-model="filter" placeholder="Ain, Var..." hide-details solo dense flat clearable prepend-inner-icon="mdi-magnify"></v-text-field>
            </th>
            <th class="primary white--text text-center border-left" v-for="(annee, indexAnnee) in n30.annee" :key="indexAnnee" colspan="2">{{ annee }}</th>
          </tr>
          <tr>
            <template v-for="(annee, indexAnnee) in n30.annee">
              <th class="primary white--text text-center text-uppercase border-left" :key="indexAnnee + '1'">nombre</th>
              <th class="primary white--text text-center text-uppercase" :key="indexAnnee + '2'">evolution</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(departement, indexDepartement) in n30.departement" :key="indexDepartement">
            <th class="text-no-wrap border-right">{{ indexDepartement }}</th>
            <template v-for="(annee, indexAnnee) in n30.annee">
              <td class="text-right border-left" :key="indexDepartement + indexAnnee + '1'" :title="indexDepartement + ' - ' + annee + ' - Nombre'">{{ departement[annee] ? departement[annee]['nombre'] : '' }}</td>
              <td class="text-right" :class="Number(departement[annee] ? (departement[annee]['evolution'] || 0) : 0) > 5 ? 'green--text' : Number(departement[annee] ? (departement[annee]['evolution'] || 0) : 0) < -5 ? 'red--text' : ''" :key="indexDepartement + indexAnnee + '2'" :title="indexDepartement + ' - ' + annee + ' - Evolution'">
                {{ departement[annee] ? (departement[annee]['evolution'] ? departement[annee]['evolution'] + '%' : '') : '' }}
              </td>
            </template>
          </tr>
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
      get () {
        return this.$store.state.national.n30.filter
      },
      set (newValue) {
        return this.$store.dispatch('national/property', {
          n: 'n30',
          property: 'filter',
          value: newValue
        })
      }
    },
    n30: {
      get () {
        return {
          annee: this.$store.state.national.n30.annee,
          departement: this.$store.getters['national/n30']
        }
      }
    }
  },
  async created () {
    this.loading = true
    await this.$store.dispatch('national/n30')
    this.loading = false
  },
  mounted () {
    this.skeletonLoader = Math.floor(
      (document.documentElement.offsetHeight - 104) / 50
    )
  }
}
</script>
