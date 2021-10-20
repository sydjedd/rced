import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import HomeNotConnected from '@/views/HomeNotConnected.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import National from '@/views/national/National.vue'
import N1 from '@/views/national/N1.vue'
import N10 from '@/views/national/N10'
import N11 from '@/views/national/N11'
import N12 from '@/views/national/N12'
import N13 from '@/views/national/N13'
import N2 from '@/views/national/N2.vue'
import N20 from '@/views/national/N20.vue'
import N21 from '@/views/national/N21.vue'
import N22 from '@/views/national/N22.vue'
import N30 from '@/views/national/N30.vue'
import N5 from '@/views/national/N5.vue'
import N50 from '@/views/national/N50.vue'
import N51 from '@/views/national/N51.vue'
import N52 from '@/views/national/N52.vue'
import N53 from '@/views/national/N53.vue'

/*
import N4 from '@/views/national/N4.vue'
import N6 from '@/views/national/N6.vue'
import N7 from '@/views/national/N7.vue'
import N8 from '@/views/national/N8.vue'
import N9 from '@/views/national/N9.vue'
import N10 from '@/views/national/N10.vue'
*/
import Regional from '@/views/Regional.vue'
import Etablissement from '@/views/Etablissement.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // TODO gerer logout
    { path: '/', name: 'Accueil non connecté', component: HomeNotConnected, meta: { auth: false, loggedOnly: false } },
    { path: '/login', name: 'Login', component: Login, meta: { auth: false, loggedOnly: false } },
    { path: '/home', name: 'Accueil', component: Home, meta: { auth: true, loggedOnly: true } },
    { path: '/profile', name: 'Profil', component: Profile, meta: { auth: true, loggedOnly: true } },
    { path: '/national', name: 'National', component: National, meta: { auth: true, loggedOnly: true } },
    {
      path: '/national/n1',
      component: N1,
      children: [
        { path: '', redirect: '/national/n10' },
        { path: '/national/n10', name: 'N1-0 Nombre et taux de certificats électroniques par an', component: N10, meta: { auth: true, loggedOnly: true } },
        { path: '/national/n11', name: 'N1-1 Nombre de certificats électroniques par an, en ou hors établissement', component: N11, meta: { auth: true, loggedOnly: true } },
        { path: '/national/n12', name: 'N1-2 Nombre de certificats électroniques par trimestre et par région en établissement', component: N12, meta: { auth: true, loggedOnly: true } },
        { path: '/national/n13', name: 'N1-3 Nombre de certificats électroniques par trimestre en établissement', component: N13, meta: { auth: true, loggedOnly: true } }
      ]
    },
    {
      path: '/national/n2',
      component: N2,
      children: [
        { path: '', redirect: '/national/n20' },
        { path: '/national/n20', name: 'N2-0 Nombre et taux de certificats électroniques depuis 2020', component: N20, meta: { auth: true, loggedOnly: true } },
        { path: '/national/n21', name: 'N2-1 Nombre et taux de certificats électroniques par région depuis 2020', component: N21, meta: { auth: true, loggedOnly: true } },
        { path: '/national/n22', name: 'N2-2 Nombre et taux de certificats électroniques par département depuis 2020', component: N22, meta: { auth: true, loggedOnly: true } }
      ]
    },
    { path: '/national/n30', name: 'N3 - Evolution du nombre de décès déclarés par voie électronique par région, par département et par an', component: N30, meta: { auth: true, loggedOnly: true } },
    {
      path: '/national/n5',
      component: N5,
      children: [
        { path: '', redirect: '/national/n50' },
        { path: '/national/n50', name: 'N5-0 Taux de certificats électroniques par région avant 2020', component: N50, meta: { auth: true, loggedOnly: true } },
        { path: '/national/n51', name: 'N5-1 Taux de certificats électroniques par département avant 2020', component: N51, meta: { auth: true, loggedOnly: true } },
        { path: '/national/n52', name: 'N5-2 Répartition par type de lieux de décès : tous certificats avant 2020', component: N52, meta: { auth: true, loggedOnly: true } },
        { path: '/national/n53', name: 'N5-3 Répartition par type de lieux de décès : certificats électroniques avant 2020', component: N53, meta: { auth: true, loggedOnly: true } }
      ]
    },
    /*
    { path: '/n4', name: 'n4', component: N4, meta: { auth: true, loggedOnly: true } },
    { path: '/n6', name: 'n6', component: N6, meta: { auth: true, loggedOnly: true } },
    { path: '/n7', name: 'n7', component: N7, meta: { auth: true, loggedOnly: true } },
    { path: '/n8', name: 'n8', component: N8, meta: { auth: true, loggedOnly: true } },
    { path: '/n9', name: 'n9', component: N9, meta: { auth: true, loggedOnly: true } },
    { path: '/n10', name: 'n10', component: N10, meta: { auth: true, loggedOnly: true } },
    */
    { path: '/regional', name: 'Régional', component: Regional, meta: { auth: true, loggedOnly: true } },
    { path: '/etablissement', name: 'Établissement', component: Etablissement, meta: { auth: true, loggedOnly: true } },
    { path: '*', name: 'Redirection accueil', redirect: '/home', meta: { auth: true, loggedOnly: true } }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogged = store.state.user.is_logged

  if (to.meta.auth === true && !isLogged) {
    return next('/')
  }

  if (isLogged && to.meta.loggedOnly === false) {
    return next(store.state.common.currentRoute)
  }

  if (to.meta.loggedOnly === true) {
    store.dispatch('common/updateCurrentRoute', to.path)
  }

  next()
})

/*
router.afterEach((to) => {
  if (to.path !== '/login' && to.path !== '/') {
    store.dispatch('common/updateCurrentRoute', to.path);
  }
});
*/

export default router
