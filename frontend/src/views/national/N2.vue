<template>
  <div>
    <v-card>
      <v-card-text>
        <v-tabs center-active grow show-arrows>
          <v-tab v-for="(item, index) in items" :key="index" :to="item.link">
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </v-card-text>
    </v-card>

    <v-alert class="mt-4" dense dismissible border="left" type="warning">
      Le nombre de certificats électroniques est issu de CertDC.
      <br>
      Le nombre de certificats papier est déduit du nombre total de décès mis à disposition par <a href="https://www.data.gouv.fr/fr/datasets/fichier-des-personnes-decedees" target="_blank" class="text-decoration-none">l'INSEE</a>.
      <br>
      L'année considérée est celle du décès (et non celle d'établissement du certificat par le médecin).
    </v-alert>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'National',
  data () {
    return {
      items: [
        { title: 'N2-0 Nombre et taux de certificats électroniques depuis 2020', link: '/national/n20' },
        { title: 'N2-1 Nombre et taux de certificats électroniques par région depuis 2020', link: '/national/n21' },
        { title: 'N2-2 Nombre et taux de certificats électroniques par département depuis 2020', link: '/national/n22' }
      ]
    }
  }
}
</script>
