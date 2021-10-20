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
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'National',
  data () {
    return {
      items: [
        { title: 'N1-0 Nombre et taux de certificats électroniques par an', link: '/national/n10' },
        { title: 'N1-1 Nombre de certificats électroniques par an, en ou hors établissement', link: '/national/n11' },
        { title: 'N1-2 Nombre de certificats électroniques par trimestre et par région en établissement', link: '/national/n12' },
        { title: 'N1-3 Nombre de certificats électroniques par trimestre en établissement', link: '/national/n13' }
      ]
    }
  }
}
</script>
