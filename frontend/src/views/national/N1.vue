<template>
  <div>
    <v-alert v-model="alert" dense dismissible border="left" type="warning">
      Attention, l'année considérée est l'année de décès. Les données de 2017 et
      suivantes ne sont pas finalisées (doublons non enlevés). En rouge les
      données sont provisoires (retard dans la réception des certificats papier)
    </v-alert>

    <v-card :loading="n1.loading">
      <v-card-text>
        <v-skeleton-loader
          v-if="n1.loading"
          :loading="n1.loading"
          type="table-row-divider@7"
        ></v-skeleton-loader>
        <v-simple-table v-if="!n1.loading">
          <template v-slot:default>
            <thead>
              <tr class="text-uppercase primary">
                <th class="white--text"></th>
                <th
                  class="white--text text-center"
                  v-for="(annee, indexAnnee) in n1.annee"
                  :key="indexAnnee"
                >
                  {{ annee }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="text-uppercase">Électronique</th>
                <template v-for="(annee, indexAnnee) in n1.annee">
                  <td class="text-right" :key="indexAnnee + '1'">
                    {{ n1.electronique[annee] }}
                  </td>
                </template>
              </tr>
              <tr>
                <th class="text-uppercase">Papier</th>
                <template v-for="(annee, indexAnnee) in n1.annee">
                  <td class="text-right" :key="indexAnnee + '1'">
                    {{ n1.papier[annee] }}
                  </td>
                </template>
              </tr>
              <tr class="text-uppercase primary">
                <th class="white--text text-uppercase" colspan="100">
                  Répartition en pourcentage
                </th>
              </tr>
              <tr>
                <th class="text-uppercase">Électronique</th>
                <td
                  class="text-right"
                  v-for="(annee, indexAnnee) in n1.annee"
                  :key="indexAnnee"
                >
                  {{
                    (
                      (n1.electronique[annee] /
                        (n1.electronique[annee] + n1.papier[annee])) *
                      100
                    ).toFixed(2)
                  }}%
                </td>
              </tr>
              <tr>
                <th class="text-uppercase">Papier</th>
                <td
                  class="text-right"
                  v-for="(annee, indexAnnee) in n1.annee"
                  :key="indexAnnee"
                >
                  {{
                    (
                      (n1.papier[annee] /
                        (n1.electronique[annee] + n1.papier[annee])) *
                      100
                    ).toFixed(2)
                  }}%
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="text-uppercase primary">
                <th class="white--text">Total</th>
                <th
                  class="white--text text-center"
                  v-for="(annee, indexAnnee) in n1.annee"
                  :key="indexAnnee"
                >
                  {{ (n1.electronique[annee] || 0) + (n1.papier[annee] || 0) }}
                </th>
              </tr>
            </tfoot>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <v-card :loading="n1.loading" class="mt-5">
      <v-card-text>
        <v-skeleton-loader
          v-if="n1.loading"
          :loading="n1.loading"
          type="image@2"
        ></v-skeleton-loader>
        <bar-chart
          v-if="!n1.loading"
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
    alert: {
      get () {
        return this.$store.state.national.n1.alert
      },
      set (newValue) {
        return this.$store.dispatch('national/property', {
          n: 'n1',
          property: 'alert',
          value: newValue
        })
      }
    },
    n1: {
      get () {
        return this.$store.state.national.n1
      }
    },
    chartData: {
      get () {
        return {
          labels: this.$store.state.national.n1.annee,
          datasets: [
            {
              type: 'line',
              yAxisID: 'nombre',
              label: 'Électronique',
              data: Object.values(this.$store.state.national.n1.electronique),
              fill: false,
              borderColor: 'blue',
              tension: 0
            },
            {
              type: 'line',
              yAxisID: 'nombre',
              label: 'Papier',
              data: Object.values(this.$store.state.national.n1.papier),
              fill: false,
              borderColor: 'red',
              tension: 0
            },
            {
              type: 'bar',
              yAxisID: 'taux',
              label: '% Électronique',
              data: Object.keys(this.$store.state.national.n1.electronique).map(
                (annee) =>
                  (
                    (this.$store.state.national.n1.electronique[annee] /
                      (this.$store.state.national.n1.electronique[annee] +
                        this.$store.state.national.n1.papier[annee])) *
                    100
                  ).toFixed(2)
              ),
              borderWidth: '3',
              borderColor: 'lightblue',
              backgroundColor: 'lightblue'
            },
            {
              type: 'bar',
              yAxisID: 'taux',
              label: '% Papier',
              data: Object.keys(this.$store.state.national.n1.papier).map(
                (annee) =>
                  (
                    (this.$store.state.national.n1.papier[annee] /
                      (this.$store.state.national.n1.electronique[annee] +
                        this.$store.state.national.n1.papier[annee])) *
                    100
                  ).toFixed(2)
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
  created () {
    this.$store.dispatch('national/n1')
  }
}
</script>
