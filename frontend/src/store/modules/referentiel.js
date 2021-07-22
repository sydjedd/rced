import http from '@/helpers/http.js'

export default {
  namespaced: true,
  state: {
    region: JSON.parse(localStorage.getItem('region')) || {},
    departement: JSON.parse(localStorage.getItem('departement')) || {},
    lieu_deces: JSON.parse(localStorage.getItem('lieu_deces')) || {}
  },
  mutations: {
    UPDATE_REGION (state, newValue) {
      const region = newValue.region.reduce((acc, obj) => {
        acc[obj.id] = obj.libelle
        return acc
      }, {})
      localStorage.setItem('region', JSON.stringify(region))
      state.region = region
    },
    UPDATE_DEPARTEMENT (state, newValue) {
      const departement = newValue.departement.reduce((acc, obj) => {
        acc[obj.id] = obj.libelle
        return acc
      }, {})
      localStorage.setItem('departement', JSON.stringify(departement))
      state.departement = departement
    },
    UPDATE_LIEU_DECES (state, newValue) {
      const lieuDeces = newValue.lieu_deces.reduce((acc, obj) => {
        acc[obj.id] = obj.libelle
        return acc
      }, {})
      localStorage.setItem('lieu_deces', JSON.stringify(lieuDeces))
      state.lieu_deces = lieuDeces
    }
  },
  actions: {
    async updateRegion ({ commit, state }) {
      if (!Object.keys(state.region).length) {
        const data = await http.get('referentiel/region/')
        if (!data) { return false }
        commit('UPDATE_REGION', data)
      }
    },
    async updateDepartement ({ commit, state }) {
      if (!Object.keys(state.departement).length) {
        const data = await http.get('referentiel/departement/')
        if (!data) { return false }
        commit('UPDATE_DEPARTEMENT', data)
      }
    },
    async updateLieuDeces ({ commit, state }) {
      if (!Object.keys(state.lieu_deces).length) {
        const data = await http.get('referentiel/lieu_deces/')
        if (!data) { return false }
        commit('UPDATE_LIEU_DECES', data)
      }
    }
  }
}
