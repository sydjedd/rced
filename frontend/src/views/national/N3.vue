<template>
  <div>
    <v-alert v-model="alert" dense dismissible border="left" type="warning">
      Attention, l'année considérée est l'année de décès. Les données de 2017 et
      suivantes ne sont pas finalisées (doublons non enlevés). En rouge les
      données sont provisoires (retard dans la réception des certificats papier)
    </v-alert>

    <v-card :loading="n3.loading">
      <v-card-text>
        <v-skeleton-loader
          v-if="n3.loading"
          :loading="n3.loading"
          type="table-row-divider@6"
        ></v-skeleton-loader>
        <v-simple-table v-if="!n3.loading">
          <template v-slot:default>
            <thead>
              <tr class="text-uppercase primary">
                <th class="white--text"></th>
                <th
                  class="white--text text-right"
                  v-for="(annee, indexAnnee) in n3.annee"
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
                  v-for="(annee, indexAnnee) in n3.annee"
                  :key="indexTrimestre + indexAnnee"
                >
                  {{ n3.enEtablissement[annee][trimestre] }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="text-uppercase primary">
                <th class="white--text">Total</th>
                <th
                  class="white--text text-right"
                  v-for="(annee, indexAnnee) in n3.annee"
                  :key="indexAnnee"
                >
                  {{
                    (n3.enEtablissement[annee][1] || 0) +
                    (n3.enEtablissement[annee][2] || 0) +
                    (n3.enEtablissement[annee][3] || 0) +
                    (n3.enEtablissement[annee][4] || 0)
                  }}
                </th>
              </tr>
            </tfoot>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <v-card :loading="n3.loading" class="mt-5">
      <v-card-text>
        <v-skeleton-loader
          v-if="n3.loading"
          :loading="n3.loading"
          type="image@2"
        ></v-skeleton-loader>
        <bar-chart
          v-if="!n3.loading"
          :chart-data="chartData"
          :options="options"
        ></bar-chart>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart'

export default {
  components: {
    BarChart
  },
  data () {
    return {
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
    alert: {
      get () {
        return this.$store.state.national.n3.alert
      },
      set (newValue) {
        return this.$store.dispatch('national/property', {
          n: 'n3',
          property: 'alert',
          value: newValue
        })
      }
    },
    n3: {
      get () {
        return this.$store.state.national.n3
      }
    },
    chartData: {
      get () {
        return {
          labels: this.$store.state.national.n3.annee,
          datasets: [
            {
              type: 'bar',
              yAxisID: 'nombre',
              label: 'T1',
              data: Object.keys(
                this.$store.state.national.n3.enEtablissement
              ).map(
                (annee) =>
                  this.$store.state.national.n3.enEtablissement[annee]['1']
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
                this.$store.state.national.n3.enEtablissement
              ).map(
                (annee) =>
                  this.$store.state.national.n3.enEtablissement[annee]['2']
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
                this.$store.state.national.n3.enEtablissement
              ).map(
                (annee) =>
                  this.$store.state.national.n3.enEtablissement[annee]['3']
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
                this.$store.state.national.n3.enEtablissement
              ).map(
                (annee) =>
                  this.$store.state.national.n3.enEtablissement[annee]['4']
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
  created () {
    this.$store.dispatch('national/n3')
  }
}
</script>
