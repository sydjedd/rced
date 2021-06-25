<template>
  <div>
    <v-card>
      <v-card-text>
        <bar-chart :data="data" :options="options"></bar-chart>
      </v-card-text>
    </v-card>
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
      data: {
        labels: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
        datasets: [
          {
            type: 'line',
            yAxisID: 'nombre',
            label: 'Nombre de certificats de décès électronique',
            data: [1321, 4532, 9179, 21942, 24204, 26480, 27857, 35480, 53852, 66698, 72470, 94703, 114320, 115792],
            fill: false,
            borderColor: 'blue',
            tension: 0,
          },
          {
            type: 'bar',
            yAxisID: 'taux',
            label: 'Pourcentage de certificats de décès électronique',
            data: [0.25, 0.83, 1.68, 3.97, 4.43, 4.63, 4.89, 6.34, 9.07, 11.22, 11.84, 15.73, 19.32, 26.96],
            borderWidth: '3',
            borderColor: 'lightblue',
            backgroundColor: 'lightblue',
          },
          {
            type: 'line',
            yAxisID: 'nombre',
            label: 'Nombre de certificats de décès papier',
            data: [529395, 538509, 538476, 530467, 522504, 545410, 542318, 524326, 540078, 527555, 539599, 507384, 477340, 313724],
            fill: false,
            borderColor: 'red',
            tension: 0,
          },
          {
            type: 'bar',
            yAxisID: 'taux',
            label: 'Pourcentage de certificats de décès papier',
            data: [99.75, 99.17, 98.32, 96.03, 95.57, 95.37, 95.11, 93.66, 90.93, 88.78, 88.16, 84.27, 80.68, 73.04],
            borderWidth: '3',
            borderColor: 'lightcoral',
            backgroundColor: 'lightcoral',
          },
        ],
      },
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
              gridLines: { display: false }
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
  }
}
</script>
