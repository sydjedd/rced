export default {
  namespaced: true,
  state: {
    // TODO supprimer name et desciption du fichier .env
    appName: process.env.VUE_APP_NAME,
    appDescription: process.env.VUE_APP_DESCRIPTION,
    currentRoute: localStorage.getItem('currentRoute') || '/home'
  },
  mutations: {
    UPDATE_CURRENT_ROUTE (state, newValue) {
      localStorage.setItem('currentRoute', newValue)
      state.currentRoute = newValue
    }
  },
  actions: {
    updateCurrentRoute ({ commit }, newValue) {
      commit('UPDATE_CURRENT_ROUTE', newValue)
    }
  }
}
