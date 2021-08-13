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
          ref="n10"
          v-if="!loading"
        >
          <template v-slot:default>
            <thead>
              <tr class="text-uppercase primary">
                <th class="white--text"></th>
                <th
                  class="white--text text-center" v-for="(annee, indexAnnee) in n10.annee" :key="indexAnnee">{{ annee }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="text-uppercase">Électronique</th>
                <template v-for="(annee, indexAnnee) in n10.annee">
                  <td class="text-right" :key="indexAnnee + '1'">{{ n10.electronique[annee] }}</td>
                </template>
              </tr>
              <tr>
                <th class="text-uppercase">Papier</th>
                <template v-for="(annee, indexAnnee) in n10.annee">
                  <td class="text-right" :key="indexAnnee + '1'">{{ n10.papier[annee] }}</td>
                </template>
              </tr>
              <tr class="text-uppercase primary">
                <th class="white--text text-uppercase" colspan="100">
                  Répartition en pourcentage
                </th>
              </tr>
              <tr>
                <th class="text-uppercase">Électronique</th>
                <td class="text-right" v-for="(annee, indexAnnee) in n10.annee" :key="indexAnnee">
                  {{ ((n10.electronique[annee] / (n10.electronique[annee] + n10.papier[annee])) * 100 ).toFixed(2) }}%
                </td>
              </tr>
              <tr>
                <th class="text-uppercase">Papier</th>
                <td class="text-right" v-for="(annee, indexAnnee) in n10.annee" :key="indexAnnee">
                  {{ ((n10.papier[annee] / (n10.electronique[annee] + n10.papier[annee])) * 100).toFixed(2) }}%
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="text-uppercase primary">
                <th class="white--text">Total</th>
                <th class="white--text text-center" v-for="(annee, indexAnnee) in n10.annee" :key="indexAnnee">
                  {{ (n10.electronique[annee] || 0) + (n10.papier[annee] || 0) }}
                </th>
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

    <v-btn color="primary" small fixed bottom right fab @click="exportXLS('n10')">
      <v-icon>mdi-download</v-icon>
    </v-btn>
  </div>
</template>

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
                labelString: 'Année'
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
    n10: {
      get () {
        return this.$store.state.national.n10
      }
    },
    chartData: {
      get () {
        return {
          labels: this.$store.state.national.n10.annee,
          datasets: [
            {
              type: 'line',
              yAxisID: 'nombre',
              label: 'Électronique',
              data: Object.values(this.$store.state.national.n10.electronique),
              fill: false,
              borderColor: 'blue',
              tension: 0
            },
            {
              type: 'line',
              yAxisID: 'nombre',
              label: 'Papier',
              data: Object.values(this.$store.state.national.n10.papier),
              fill: false,
              borderColor: 'red',
              tension: 0
            },
            {
              type: 'bar',
              yAxisID: 'taux',
              label: '% Électronique',
              data: Object.keys(this.$store.state.national.n10.electronique).map((annee) => ((this.$store.state.national.n10.electronique[annee] / (this.$store.state.national.n10.electronique[annee] + this.$store.state.national.n10.papier[annee])) * 100).toFixed(2)),
              borderWidth: '3',
              borderColor: 'lightblue',
              backgroundColor: 'lightblue'
            },
            {
              type: 'bar',
              yAxisID: 'taux',
              label: '% Papier',
              data: Object.keys(this.$store.state.national.n10.papier).map((annee) => ((this.$store.state.national.n10.papier[annee] / (this.$store.state.national.n10.electronique[annee] + this.$store.state.national.n10.papier[annee])) * 100).toFixed(2)),
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
    await this.$store.dispatch('national/n10')
    this.loading = false
  }
}
</script>
