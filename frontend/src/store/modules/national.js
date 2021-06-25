import Vue from 'vue'
import http from '@/helpers/http.js'

export default {
  namespaced: true,
  state: {
    n10: { filter: '', annee: [], electronique: {}, papier: {} },
    n11: { filter: '', annee: [], enEtablissement: {}, horsEtablissement: {} },
    n13: { filter: '', annee: [], enEtablissement: {} },
    n12: { filter: '', annee: [], region: {} },
    n30: { filter: '', annee: [], departement: {} }
  },

  getters: {
    n30Departement (state) {
      if (state.n30.filter && state.n30.filter !== '' && Object.keys(state.n30.departement).length) {
        const filter = Object.keys(state.n30.departement)
          .filter((key) => key.toLowerCase().indexOf(state.n30.filter.toLowerCase()) !== -1)
          .reduce((obj, key) => {
            obj[key] = state.n30.departement[key]
            return obj
          }, {})
        if (filter && Object.keys(filter).length) {
          return filter
        }
      }
      return state.n30.departement
    },
    n12Region (state) {
      if (state.n12.filter && state.n12.filter !== '' && Object.keys(state.n12.region).length) {
        const filter = Object.keys(state.n12.region)
          .filter((key) => key.toLowerCase().indexOf(state.n12.filter.toLowerCase()) !== -1)
          .reduce((obj, key) => {
            obj[key] = state.n12.region[key]
            return obj
          }, {})
        if (filter && Object.keys(filter).length) {
          return filter
        }
      }
      return state.n12.region
    }
  },
  mutations: {
    UPDATE_PROPERTY (state, data) {
      state[data.n][data.property] = data.value
      localStorage.setItem(data.n + '.' + data.property, data.value)
    },
    UPDATE_N10 (state, newValue) {
      newValue.electronique.forEach((element) => {
        state.n10.electronique[element.annee_deces] = element.nombre
        state.n10.annee.push(element.annee_deces)
      })
      newValue.papier.forEach((element) => {
        state.n10.papier[element.annee_deces] = element.nombre
        if (state.n10.annee.indexOf(element.annee_deces) === -1) {
          state.n10.annee.push(element.annee_deces)
        }
      })
      state.n10.annee.sort()
    },
    UPDATE_N11 (state, newValue) {
      newValue.enEtablissement.forEach((element) => {
        // On utilise Vue.set(object, key, value) sinon impossible d utiliser Object.keys
        // state.n11.enEtablissement[element['annee_deces']] = element['nombre']
        Vue.set(
          state.n11.enEtablissement,
          element.annee_deces,
          element.nombre
        )
        state.n11.annee.push(element.annee_deces)
      })
      newValue.horsEtablissement.forEach((element) => {
        // On utilise Vue.set(object, key, value) sinon impossible d utiliser Object.keys
        // state.n11.horsEtablissement[element['annee_deces']] = element['nombre']
        Vue.set(
          state.n11.horsEtablissement,
          element.annee_deces,
          element.nombre
        )
        if (state.n11.annee.indexOf(element.annee_deces) === -1) {
          state.n11.annee.push(element.annee_deces)
        }
      })
      state.n11.annee.sort()
    },
    UPDATE_N13 (state, newValue) {
      newValue.enEtablissement.forEach((element) => {
        if (state.n13.annee.indexOf(element.annee_deces) === -1) {
          state.n13.annee.push(element.annee_deces)
        }
        if (!state.n13.enEtablissement[element.annee_deces]) {
          state.n13.enEtablissement[element.annee_deces] = {}
        }
        state.n13.enEtablissement[element.annee_deces][element.trimestre_deces] = element.nombre
      })
      state.n13.annee.sort()
    },
    UPDATE_N12 (state, newValue) {
      let region = ''
      newValue.enEtablissement.forEach((element) => {
        region = (element.region_libelle || '')
        if (state.n12.annee.indexOf(element.annee_deces) === -1) {
          state.n12.annee.push(element.annee_deces)
        }
        if (!state.n12.region[region]) {
          // On utilise Vue.set(object, key, value) sinon impossible d utiliser Object.keys
          // state.n12.region[region] = {}
          Vue.set(state.n12.region, region, {})
        }
        if (!state.n12.region[region][element.annee_deces]) {
          state.n12.region[region][element.annee_deces] = {}
        }
        state.n12.region[region][element.annee_deces][element.trimestre_deces] = element.nombre
      })
      state.n12.annee.sort()
    },
    UPDATE_N30 (state, newValue) {
      let departement = ''
      newValue.electronique.forEach((element) => {
        departement =
          (element.departement_id || '') +
          ' - ' +
          (element.departement_libelle || '')
        if (state.n30.annee.indexOf(element.annee_deces) === -1) {
          state.n30.annee.push(element.annee_deces)
        }
        if (!state.n30.departement[departement]) {
          // On utilise Vue.set(object, key, value) sinon impossible d utiliser Object.keys
          // state.n30.departement[departement] = {}
          Vue.set(state.n30.departement, departement, {})
        }
        state.n30.departement[departement][element.annee_deces] = {
          nombre: element.nombre,
          evolution: element.evolution || null
        }
      })
      state.n30.annee.sort()
    }
  },
  actions: {
    async property ({ commit }, data) {
      commit('UPDATE_PROPERTY', data)
    },
    async n10 ({ commit, state }) {
      if (!state.n10.annee.length) {
        const data = await http.get('national/n10/')
        if (!data) {
          return false
        }
        commit('UPDATE_N10', data)
      }
    },
    async n11 ({ commit, state }) {
      if (!state.n11.annee.length) {
        const data = await http.get('national/n11/')
        if (!data) {
          return false
        }
        commit('UPDATE_N11', data)
      }
    },
    async n13 ({ commit, state }) {
      if (!state.n13.annee.length) {
        const data = await http.get('national/n13/')
        if (!data) {
          return false
        }
        commit('UPDATE_N13', data)
      }
    },
    async n12 ({ commit, state }) {
      if (!state.n12.region.length) {
        const data = await http.get('national/n12/')
        if (!data) {
          return false
        }
        commit('UPDATE_N12', data)
      }
    },
    async n30 ({ commit, state }) {
      if (!state.n30.annee.length) {
        const data = await http.get('national/n30/')
        if (!data) {
          return false
        }
        commit('UPDATE_N30', data)
      }
    }
  }
}
