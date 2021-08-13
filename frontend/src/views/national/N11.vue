<template>
  <div>
    <v-card class="mt-4" :loading="loading">
      <v-card-text>
        <v-skeleton-loader
          v-if="loading"
          :loading="loading"
          type="table-row-divider@4"
        ></v-skeleton-loader>

        <v-simple-table
          ref="n11"
          v-if="!loading"
        >
          <template v-slot:default>
            <thead>
              <tr class="text-uppercase primary">
                <th class="white--text"></th>
                <th class="white--text text-right" v-for="(annee, indexAnnee) in n11.annee" :key="indexAnnee">{{ annee }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="text-uppercase text-no-wrap">En établissement</th>
                <td class="text-right" v-for="(annee, indexAnnee) in n11.annee" :key="indexAnnee">{{ n11.enEtablissement[annee] }}</td>
              </tr>
              <tr>
                <th class="text-uppercase text-no-wrap">Hors établissement</th>
                <td class="text-right" v-for="(annee, indexAnnee) in n11.annee" :key="indexAnnee">{{ n11.horsEtablissement[annee] }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="text-uppercase primary">
                <th class="white--text">Total</th>
                <th class="white--text text-right" v-for="(annee, indexAnnee) in n11.annee" :key="indexAnnee">
                  {{ (n11.enEtablissement[annee] || 0) + (n11.horsEtablissement[annee] || 0) }}
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

        <line-chart
          v-if="!loading"
          :chart-data="chartData"
          :options="options"
        ></line-chart>
      </v-card-text>
    </v-card>

    <v-btn color="primary" small fixed bottom right fab @click="exportXLS('n11')">
      <v-icon>mdi-download</v-icon>
    </v-btn>
  </div>
</template>

<script>
import exportHelper from '@/helpers/export'
import LineChart from '@/components/chart/LineChart'

export default {
  components: {
    LineChart
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
              ticks: { beginAtZero: true },
              gridLines: { display: true }
            }
          ],
          xAxes: [
            {
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
    n11: {
      get () {
        return this.$store.state.national.n11
      }
    },
    chartData: {
      get () {
        return {
          labels: this.$store.state.national.n11.annee,
          datasets: [
            {
              type: 'line',
              yAxisID: 'nombre',
              data: Object.values(this.$store.state.national.n11.enEtablissement),
              label: 'En établissement',
              fill: false,
              borderColor: 'blue',
              tension: 0
            },
            {
              type: 'line',
              // yAxisID: 'nombre',
              data: Object.values(this.$store.state.national.n11.horsEtablissement),
              label: 'Hors établissement',
              fill: false,
              borderColor: 'red',
              tension: 0
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
    await this.$store.dispatch('national/n11')
    this.loading = false
  }
}
</script>
