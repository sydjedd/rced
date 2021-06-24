import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import HomeNotConnected from '@/views/HomeNotConnected.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import National from '@/views/national/National.vue'
import N1 from '@/views/national/N1.vue'
import N2 from '@/views/national/N2.vue'
import N3 from '@/views/national/N3.vue'
import N4 from '@/views/national/N4.vue'
import N5 from '@/views/national/N5.vue'
import N6 from '@/views/national/N6.vue'
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
    { path: '/n1', name: 'Nombre de certificats de décès reçus à l\'Inserm par année de décès', component: N1, meta: { auth: true, loggedOnly: true } },
    { path: '/n2', name: 'Nombre de certificats électroniques par année de décès et par type d\'exercice', component: N2, meta: { auth: true, loggedOnly: true } },
    { path: '/n3', name: 'Nombre de certificats électroniques en établissement par trimestre', component: N3, meta: { auth: true, loggedOnly: true } },
    { path: '/n4', name: 'Nombre de certificats électroniques en établissement par trimestre et par région', component: N4, meta: { auth: true, loggedOnly: true } },
    { path: '/n5', name: 'Evolution du nombre de décès déclarés par voie électronique par région, par département et par an', component: N5, meta: { auth: true, loggedOnly: true } },
    { path: '/n6', name: 'Evolution du nombre de décès déclarés par voie électronique par établissement et par an', component: N6, meta: { auth: true, loggedOnly: true } },
    { path: '/regional', name: 'Régional', component: Regional, meta: { auth: true, loggedOnly: true } },
    { path: '/etablissement', name: 'Établissement', component: Etablissement, meta: { auth: true, loggedOnly: true } },
    { path: '*', name: 'Redirection accueil', redirect: '/home', meta: { auth: true, loggedOnly: true } }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogged = store.state.user.is_logged

  if (to.meta.auth === true && !isLogged) {
    return next('/login')
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
