<template>
  <div>
    <v-card class="mt-4" :loading="loading">
      <v-card-text>
        <v-skeleton-loader
          v-if="loading"
          :loading="loading"
          type="table-row-divider@6"
        ></v-skeleton-loader>

        <v-simple-table
          ref="n13"
          v-if="!loading"
        >
          <template v-slot:default>
            <thead>
              <tr class="text-uppercase primary">
                <th class="white--text"></th>
                <th
                  class="white--text text-right" v-for="(annee, indexAnnee) in n13.annee" :key="indexAnnee">{{ annee }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(trimestre, indexTrimestre) in n13.trimestre" :key="indexTrimestre">
                <th class="text-uppercase text-no-wrap">Trimestre {{ indexTrimestre }}</th>
                <td class="text-right" v-for="(annee, indexAnnee) in n13.annee" :key="indexTrimestre + indexAnnee">
                  {{ trimestre[annee] }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="text-uppercase primary">
                <th class="white--text">Total</th>
                <th class="white--text text-right" v-for="(annee, indexAnnee) in n13.annee" :key="indexAnnee">
                  {{ (n13.trimestre[1][annee] || 0) + (n13.trimestre[2][annee] || 0) + (n13.trimestre[3][annee] || 0) + (n13.trimestre[4][annee] || 0) }}
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

    <v-btn color="primary" small fixed bottom right fab @click="exportXLS('n13')">
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
            }
          ],
          xAxes: [
            {
              stacked: false,
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
    n13: {
      get () {
        return this.$store.state.national.n13
      }
    },
    chartData: {
      get () {
        return {
          labels: this.$store.state.national.n13.annee,
          datasets: [
            {
              type: 'bar',
              yAxisID: 'nombre',
              label: 'T1',
              data: Object.values(this.$store.state.national.n13.annee).map(annee => { return this.$store.state.national.n13.trimestre['1'][annee] }),
              borderWidth: '3',
              borderColor: 'royalblue',
              backgroundColor: 'royalblue'
            },
            {
              type: 'bar',
              yAxisID: 'nombre',
              label: 'T2',
              data: Object.values(this.$store.state.national.n13.annee).map(annee => { return this.$store.state.national.n13.trimestre['2'][annee] }),
              borderWidth: '3',
              borderColor: 'rebeccapurple',
              backgroundColor: 'rebeccapurple'
            },
            {
              type: 'bar',
              yAxisID: 'nombre',
              label: 'T3',
              data: Object.values(this.$store.state.national.n13.annee).map(annee => { return this.$store.state.national.n13.trimestre['3'][annee] }),
              borderWidth: '3',
              borderColor: 'yellowgreen',
              backgroundColor: 'yellowgreen'
            },
            {
              type: 'bar',
              yAxisID: 'nombre',
              label: 'T4',
              data: Object.values(this.$store.state.national.n13.annee).map(annee => { return this.$store.state.national.n13.trimestre['4'][annee] }),
              borderWidth: '3',
              borderColor: 'peru',
              backgroundColor: 'peru'
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
    await this.$store.dispatch('national/n13')
    this.loading = false
  }
}
</script>
