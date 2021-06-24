<template>
  <div>
    <v-alert v-model="alert" dense dismissible border="left" type="warning">
      Attention, l'année considérée est l'année de décès. Les données de 2017 et
      suivantes ne sont pas finalisées (doublons non enlevés). En rouge les
      données sont provisoires (retard dans la réception des certificats papier)
    </v-alert>

    <v-card :loading="n2.loading">
      <v-card-text>
        <v-skeleton-loader
          v-if="n2.loading"
          :loading="n2.loading"
          type="table-row-divider@4"
        ></v-skeleton-loader>
        <v-simple-table v-if="!n2.loading">
          <template v-slot:default>
            <thead>
              <tr class="text-uppercase primary">
                <th class="white--text"></th>
                <th
                  class="white--text text-right"
                  v-for="(annee, indexAnnee) in n2.annee"
                  :key="indexAnnee"
                >
                  {{ annee }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="text-uppercase text-no-wrap">En établissement</th>
                <td
                  class="text-right"
                  v-for="(annee, indexAnnee) in n2.annee"
                  :key="indexAnnee"
                >
                  {{ n2.enEtablissement[annee] }}
                </td>
              </tr>
              <tr>
                <th class="text-uppercase text-no-wrap">Hors établissement</th>
                <td
                  class="text-right"
                  v-for="(annee, indexAnnee) in n2.annee"
                  :key="indexAnnee"
                >
                  {{ n2.horsEtablissement[annee] }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="text-uppercase primary">
                <th class="white--text">Total</th>
                <th
                  class="white--text text-right"
                  v-for="(annee, indexAnnee) in n2.annee"
                  :key="indexAnnee"
                >
                  {{
                    (n2.enEtablissement[annee] || 0) +
                    (n2.horsEtablissement[annee] || 0)
                  }}
                </th>
              </tr>
            </tfoot>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <v-card :loading="n2.loading" class="mt-5">
      <v-card-text>
        <v-skeleton-loader
          v-if="n2.loading"
          :loading="n2.loading"
          type="image@2"
        ></v-skeleton-loader>
        <line-chart
          v-if="!n2.loading"
          :chart-data="chartData"
          :options="options"
        ></line-chart>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart'

export default {
  components: {
    LineChart
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
    alert: {
      get () {
        return this.$store.state.national.n2.alert
      },
      set (newValue) {
        return this.$store.dispatch('national/property', {
          n: 'n2',
          property: 'alert',
          value: newValue
        })
      }
    },
    n2: {
      get () {
        return this.$store.state.national.n2
      }
    },
    chartData: {
      get () {
        return {
          labels: this.$store.state.national.n2.annee,
          datasets: [
            {
              type: 'line',
              yAxisID: 'nombre',
              data: Object.values(
                this.$store.state.national.n2.enEtablissement
              ),
              label: 'En établissement',
              fill: false,
              borderColor: 'blue',
              tension: 0
            },
            {
              type: 'line',
              // yAxisID: 'nombre',
              data: Object.values(
                this.$store.state.national.n2.horsEtablissement
              ),
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
  created () {
    this.$store.dispatch('national/n2')
  }
}
</script>
