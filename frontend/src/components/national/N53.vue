<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      :loading="loading"
      type="table-row-divider@9"
    ></v-skeleton-loader>

    <v-simple-table
      ref="n53"
      v-if="!loading"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="primary text-uppercase white--text">Année</th>
            <th class="primary white--text" v-for="(annee, indexAnnee) in n53.annee" :key="indexAnnee">{{ annee }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(lieuDeces, indexLieuDeces) in n53.lieu_deces" :key="indexLieuDeces">
            <th class="text-uppercase text-no-wrap">{{ indexLieuDeces || '' }}</th>
            <td class="text-right" v-for="(annee, indexAnnee) in n53.annee" :key="indexLieuDeces + indexAnnee">{{ lieuDeces[annee] ? (lieuDeces[annee] / n53.total[annee] * 100).toFixed(2) + '%' : '' }}</td>
          </tr>
        </tbody>
        <!-- tfoot>
          <tr class="text-uppercase primary">
            <th class="white--text">Total</th>
            <th class="white--text text-right" v-for="(annee, indexAnnee) in n53.annee" :key="indexAnnee">{{ n53.total[annee] }}</th>
          </tr>
        </tfoot -->
      </template>
    </v-simple-table>

    <v-btn color="primary" small fixed bottom right fab @click="exportXLS('n53')">
      <v-icon>mdi-download</v-icon>
    </v-btn>
  </div>
</template>

<script>
import exportHelper from '@/helpers/export'

export default {
  data () {
    return {
      loading: true
    }
  },
  computed: {
    n53: {
      get () { return this.$store.state.national.n53 }
    }
  },
  methods: {
    exportXLS (tableName = '') {
      exportHelper.exportXLS(tableName, this.$refs[tableName].$el.querySelector('table').outerHTML)
    }
  },
  async created () {
    this.loading = true
    await this.$store.dispatch('national/n53')
    this.loading = false
  }
}
</script>
