<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      :loading="loading"
      type="table-row-divider@6"
    ></v-skeleton-loader>

    <v-simple-table
      v-if="!loading"
    >
      <template v-slot:default>
        <thead>
          <tr class="text-uppercase primary">
            <th class="white--text"></th>
            <th
              class="white--text text-right"
              v-for="(annee, indexAnnee) in n13.annee"
              :key="indexAnnee"
            >
              {{ annee }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(trimestre, indexTrimestre) in 4"
            :key="indexTrimestre"
          >
            <th class="text-uppercase text-no-wrap">
              Trimestre {{ trimestre }}
            </th>
            <td
              class="text-right"
              v-for="(annee, indexAnnee) in n13.annee"
              :key="indexTrimestre + indexAnnee"
            >
              {{ n13.enEtablissement[annee][trimestre] }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="text-uppercase primary">
            <th class="white--text">Total</th>
            <th
              class="white--text text-right"
              v-for="(annee, indexAnnee) in n13.annee"
              :key="indexAnnee"
            >
              {{
                (n13.enEtablissement[annee][1] || 0) +
                (n13.enEtablissement[annee][2] || 0) +
                (n13.enEtablissement[annee][3] || 0) +
                (n13.enEtablissement[annee][4] || 0)
              }}
            </th>
          </tr>
        </tfoot>
      </template>
    </v-simple-table>

    <v-divider class="my-8"/>

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
  </div>
</template>

<script>
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
              data: Object.keys(
                this.$store.state.national.n13.enEtablissement
              ).map(
                (annee) =>
                  this.$store.state.national.n13.enEtablissement[annee]['1']
              ),
              borderWidth: '3',
              borderColor: 'royalblue',
              backgroundColor: 'royalblue'
            },
            {
              type: 'bar',
              yAxisID: 'nombre',
              label: 'T2',
              data: Object.keys(
                this.$store.state.national.n13.enEtablissement
              ).map(
                (annee) =>
                  this.$store.state.national.n13.enEtablissement[annee]['2']
              ),
              borderWidth: '3',
              borderColor: 'rebeccapurple',
              backgroundColor: 'rebeccapurple'
            },
            {
              type: 'bar',
              yAxisID: 'nombre',
              label: 'T3',
              data: Object.keys(
                this.$store.state.national.n13.enEtablissement
              ).map(
                (annee) =>
                  this.$store.state.national.n13.enEtablissement[annee]['3']
              ),
              borderWidth: '3',
              borderColor: 'yellowgreen',
              backgroundColor: 'yellowgreen'
            },
            {
              type: 'bar',
              yAxisID: 'nombre',
              label: 'T4',
              data: Object.keys(
                this.$store.state.national.n13.enEtablissement
              ).map(
                (annee) =>
                  this.$store.state.national.n13.enEtablissement[annee]['4']
              ),
              borderWidth: '3',
              borderColor: 'peru',
              backgroundColor: 'peru'
            }
          ]
        }
      }
    }
  },
  async created () {
    this.loading = true
    await this.$store.dispatch('national/n13')
    this.loading = false
  }
}
</script>
