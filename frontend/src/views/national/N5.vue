<template>
  <div>
    <!-- v-alert dense dismissible border="left" type="warning" outlined prominent text -->
    <v-alert v-model="alert" dense dismissible border="left" type="warning">
      Attention, le nombre de e-certificats est partiel pour l'année en cours
      (septembre à la date de production de ce rapport) et considère les e-dc
      déclarés en établissement et hors établissement. L'année considérée est
      celle de la date de validation du certificat électronique (et non la date
      du décès). Pour les 2 années antérieures, il peut y avoir à la marge
      quelques certificats "doublons" qui sont traités au moment de la
      finalisation de l'année. L'évolution est celle du nombre de e-dc par
      rapport à l'année antérieure.
    </v-alert>

    <v-card :loading="n5.loading">
      <v-card-text>
        <v-skeleton-loader
          v-if="n5.loading"
          :loading="n5.loading"
          :type="'table-row-divider@' + skeletonLoader"
        ></v-skeleton-loader>
        <v-simple-table v-if="!n5.loading" class="sticky" dense fixed-header>
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
                  colspan="2"
                  v-for="(annee, indexAnnee) in n5.annee"
                  :key="indexAnnee"
                >
                  {{ annee }}
                </th>
              </tr>
              <tr class="text-uppercase">
                <template v-for="(annee, indexAnnee) in n5.annee">
                  <th
                    class="white--text text-center primary border-left"
                    :key="indexAnnee + '1'"
                  >
                    nombre
                  </th>
                  <th
                    class="white--text text-center primary"
                    :key="indexAnnee + '2'"
                  >
                    evolution
                  </th>
                </template>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(departement, indexDepartement) in n5.departement"
                :key="indexDepartement"
              >
                <th class="text-no-wrap">{{ indexDepartement }}</th>
                <template v-for="(annee, indexAnnee) in n5.annee">
                  <td
                    class="text-right border-left"
                    :key="indexDepartement + indexAnnee + '1'"
                    :title="indexDepartement + ' - ' + annee + ' - Nombre'"
                  >
                    {{ departement[annee] ? departement[annee]['nombre'] : '' }}
                  </td>
                  <td
                    class="text-right"
                    :class="
                      Number(
                        departement[annee]
                          ? departement[annee]['evolution'] || 0
                          : 0
                      ) > 5
                        ? 'green--text'
                        : Number(
                            departement[annee]
                              ? departement[annee]['evolution'] || 0
                              : 0
                          ) < -5
                        ? 'red--text'
                        : ''
                    "
                    :key="indexDepartement + indexAnnee + '2'"
                    :title="indexDepartement + ' - ' + annee + ' - Evolution'"
                  >
                    {{
                      departement[annee]
                        ? departement[annee]['evolution']
                          ? departement[annee]['evolution'] + '%'
                          : ''
                        : ''
                    }}
                  </td>
                </template>
              </tr>
            </tbody>
            <!--tfoot>
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
        return this.$store.state.national.n5.alert
      },
      set (newValue) {
        return this.$store.dispatch('national/property', {
          n: 'n5',
          property: 'alert',
          value: newValue
        })
      }
    },
    filter: {
      get () {
        return this.$store.state.national.n5.filter
      },
      set (newValue) {
        return this.$store.dispatch('national/property', {
          n: 'n5',
          property: 'filter',
          value: newValue
        })
      }
    },
    n5: {
      get () {
        return {
          loading: this.$store.state.national.n5.loading,
          departement: this.$store.getters['national/n5Departement'],
          annee: this.$store.state.national.n5.annee
        }
      }
    }
  },
  created () {
    this.$store.dispatch('national/n5')
  },
  mounted () {
    this.skeletonLoader = Math.floor(
      (document.documentElement.offsetHeight - 104) / 50
    )
  }
}
</script>
