<template>
  <div>
    <v-card class="mt-4" :loading="loading">
      <v-card-text>
        <v-skeleton-loader
          v-if="loading"
          :loading="loading"
          type="table-row-divider@7"
        ></v-skeleton-loader>

        <v-simple-table
          ref="n20"
          class="sticky"
          v-if="!loading"
        >
          <template v-slot:default>
            <thead>
              <tr class="text-uppercase primary">
                <th class="white--text"></th>
                <template v-for="(annee, indexAnnee) in n20.annee">
                  <th class="white--text text-center" v-for="(semaine, indexSemaine) in annee" :key="indexAnnee + indexSemaine">
                    {{ indexAnnee }} <br> {{ semaine }}
                  </th>
                </template>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="text-uppercase fixed">Électronique</th>
                <template v-for="(annee, indexAnnee) in n20.annee">
                  <td class="text-right" v-for="(semaine, indexSemaine) in annee" :key="'e' + indexAnnee + indexSemaine">
                    {{ n20.electronique[indexAnnee][semaine] }}
                  </td>
                </template>
              </tr>
              <tr>
                <th class="text-uppercase fixed">Papier</th>
                <template v-for="(annee, indexAnnee) in n20.annee">
                  <td class="text-right" v-for="(semaine, indexSemaine) in annee" :key="'p' + indexAnnee + indexSemaine">
                    {{ n20.total[indexAnnee][semaine] && n20.electronique[indexAnnee][semaine] ? n20.total[indexAnnee][semaine] - n20.electronique[indexAnnee][semaine] : '' }}
                  </td>
                </template>
              </tr>
              <tr class="text-uppercase primary">
                <th class="white--text text-uppercase header" colspan="3">
                  Répartition en pourcentage
                </th>
                <th colspan="1000"></th>
              </tr>
              <tr>
                <th class="text-uppercase fixed">Électronique</th>
                <template v-for="(annee, indexAnnee) in n20.annee">
                  <td class="text-right" v-for="(semaine, indexSemaine) in annee" :key="'pe' + indexAnnee + indexSemaine">
                    {{ n20.electronique[indexAnnee][semaine] && n20.total[indexAnnee][semaine] ? (n20.electronique[indexAnnee][semaine] / n20.total[indexAnnee][semaine] * 100).toFixed(2) + '%' : '' }}
                  </td>
                </template>
              </tr>
              <tr>
                <th class="text-uppercase fixed">Papier</th>
                <template v-for="(annee, indexAnnee) in n20.annee">
                  <td class="text-right" v-for="(semaine, indexSemaine) in annee" :key="'pp' + indexAnnee + indexSemaine">
                    {{ n20.electronique[indexAnnee][semaine] && n20.total[indexAnnee][semaine] ? ((n20.total[indexAnnee][semaine] - n20.electronique[indexAnnee][semaine]) / n20.total[indexAnnee][semaine] * 100).toFixed(2) + '%' : '' }}
                  </td>
                </template>
              </tr>
            </tbody>
            <tfoot>
              <tr class="text-uppercase primary">
                <th class="white--text">Total</th>
                <template v-for="(annee, indexAnnee) in n20.annee">
                  <td class="white--text text-center" v-for="(semaine, indexSemaine) in annee" :key="'t' + indexAnnee + indexSemaine">
                    {{ n20.total[indexAnnee][semaine] || '' }}
                  </td>
                </template>
              </tr>
            </tfoot>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <v-card class="mt-4" :loading="loading">
      <v-card-text>
        <v-skeleton-loader
          v-if="loading"
          :loading="loading"
          type="image@2"
        ></v-skeleton-loader>

        <bar-chart
          v-if="!loading"
          :chart-data="chartData"
          :options="options"
        ></bar-chart>
      </v-card-text>
    </v-card>

    <v-btn color="primary" small fixed bottom right fab @click="exportXLS('n20')">
      <v-icon>mdi-download</v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
.sticky table tbody tr th:first-child,
.sticky table thead tr:first-child th:first-child,
.sticky table tfoot tr:first-child th:first-child {
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  position: -o-sticky;
  position: sticky;
  z-index: 1;
  left: 0;
  background: inherit;
}
.sticky table tbody tr th:first-child {
  background-color: #fff;
}
.sticky table tbody tr th.header {
  background: inherit;
}
</style>

<script>
import exportHelper from '@/helpers/export'
import BarChart from '@/components/chart/BarChart'

export default {
  components: {
    BarChart
  },
  data () {
    return {
      loading: true,
      options: {
        scales: {
          yAxes: [
            {
              id: 'nombre',
              position: 'left',
              scaleLabel: {
                display: true,
                labelString: 'Nombre'
              },
              ticks: { beginAtZero: false },
              gridLines: { display: true }
            },
            {
              id: 'taux',
              stacked: true,
              position: 'right',
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100,
                callback (value) {
                  return value + '%'
                }
              },
              scaleLabel: {
                display: true,
                labelString: 'Répartition'
              },
              gridLines: { display: false }
            }
          ],
          xAxes: [
            {
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: 'Année / Semaine'
              },
              gridLines: { display: false }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    n20: {
      get () { return this.$store.state.national.n20 }
    },
    chartData: {
      get () {
        return {
          labels: Object.keys(this.$store.state.national.n20.annee).reduce((acc, annee) => (acc.concat(Object.values(this.$store.state.national.n20.annee[annee]).map((semaine) => (annee + ' - ' + semaine)))), []),
          datasets: [
            {
              type: 'line',
              yAxisID: 'nombre',
              label: 'Électronique',
              data: Object.keys(this.$store.state.national.n20.annee).reduce((acc, annee) => (acc.concat(Object.values(this.$store.state.national.n20.electronique[annee]))), []),
              fill: false,
              borderColor: 'blue',
              tension: 0
            },
            {
              type: 'line',
              yAxisID: 'nombre',
              label: 'Papier',
              data: Object.keys(this.$store.state.national.n20.annee).reduce(
                (acc, annee) => (
                  acc.concat(
                    Object.values(this.$store.state.national.n20.annee[annee]).map(
                      (semaine) => (this.$store.state.national.n20.total[annee][semaine] && this.$store.state.national.n20.electronique[annee][semaine] ? this.$store.state.national.n20.total[annee][semaine] - this.$store.state.national.n20.electronique[annee][semaine] : null)
                    )
                  )
                ),
                []
              ),
              fill: false,
              borderColor: 'red',
              tension: 0
            },
            {
              type: 'bar',
              yAxisID: 'taux',
              label: '% Électronique',
              data: Object.keys(this.$store.state.national.n20.annee).reduce(
                (acc, annee) => (
                  acc.concat(
                    Object.values(this.$store.state.national.n20.annee[annee]).map(
                      (semaine) => (this.$store.state.national.n20.electronique[annee][semaine] && this.$store.state.national.n20.total[annee][semaine] ? (this.$store.state.national.n20.electronique[annee][semaine] / this.$store.state.national.n20.total[annee][semaine] * 100).toFixed(2) : null)
                    )
                  )
                ),
                []
              ),
              borderWidth: '3',
              borderColor: 'lightblue',
              backgroundColor: 'lightblue'
            },
            {
              type: 'bar',
              yAxisID: 'taux',
              label: '% Papier',
              data: Object.keys(this.$store.state.national.n20.annee).reduce(
                (acc, annee) => (
                  acc.concat(
                    Object.values(this.$store.state.national.n20.annee[annee]).map(
                      (semaine) => (this.$store.state.national.n20.total[annee][semaine] && this.$store.state.national.n20.electronique[annee][semaine] && this.$store.state.national.n20.total[annee][semaine] ? ((this.$store.state.national.n20.total[annee][semaine] - this.$store.state.national.n20.electronique[annee][semaine]) / this.$store.state.national.n20.total[annee][semaine] * 100).toFixed(2) : null)
                    )
                  )
                ),
                []
              ),
              borderWidth: '3',
              borderColor: 'lightcoral',
              backgroundColor: 'lightcoral'
            }
          ]
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
    await this.$store.dispatch('national/n20')
    this.loading = false
  }
}
</script>
