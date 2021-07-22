import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import user from './modules/user'
import referentiel from './modules/referentiel'
import national from './modules/national'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    common,
    user,
    referentiel,
    national
  },
  strict: process.env.NODE_ENV !== 'production'
})
