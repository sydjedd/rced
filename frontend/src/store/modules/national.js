import Vue from 'vue'
import http from '@/helpers/http.js'

export default {
  namespaced: true,
  state: {
    alert: { n1: true, n2: true, n3: true },
    n10: { filter: '', annee: [], electronique: {}, papier: {} },
    n11: { filter: '', annee: [], enEtablissement: {}, horsEtablissement: {} },
    n12: { filter: '', annee: [], region: {} },
    n13: { filter: '', annee: [], enEtablissement: {} },
    n20: { filter: '', annee: {}, electronique: {}, total: {} },
    n21: { filter: '', annee: {}, region: {} },
    n22: { filter: '', annee: {}, departement: {} },
    n30: { filter: '', annee: [], departement: {} }
  },

  getters: {
    n12 (state) {
      if (state.n12.filter && state.n12.filter !== '' && Object.keys(state.n12.region).length) {
        const filter = Object.keys(state.n12.region)
          .filter((key) => key.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(state.n12.filter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) !== -1)
          .reduce((obj, key) => {
            obj[key] = state.n12.region[key]
            return obj
          }, {})
        if (filter && Object.keys(filter).length) {
          return filter
        }
      }
      return state.n12.region
    },
    n21 (state) {
      if (state.n21.filter && state.n21.filter !== '' && Object.keys(state.n21.region).length) {
        const filter = Object.keys(state.n21.region)
          .filter((key) => key.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(state.n21.filter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) !== -1)
          .reduce((obj, key) => {
            obj[key] = state.n21.region[key]
            return obj
          }, {})
        if (filter && Object.keys(filter).length) {
          return filter
        }
      }
      return state.n21.region
    },
    n22 (state) {
      if (state.n22.filter && state.n22.filter !== '' && Object.keys(state.n22.departement).length) {
        const filter = Object.keys(state.n22.departement)
          .filter((key) => key.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(state.n22.filter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) !== -1)
          .reduce((obj, key) => {
            obj[key] = state.n22.departement[key]
            return obj
          }, {})
        if (filter && Object.keys(filter).length) {
          return filter
        }
      }
      return state.n22.departement
    },
    n30 (state) {
      if (state.n30.filter && state.n30.filter !== '' && Object.keys(state.n30.departement).length) {
        const filter = Object.keys(state.n30.departement)
          .filter((key) => key.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(state.n30.filter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) !== -1)
          .reduce((obj, key) => {
            obj[key] = state.n30.departement[key]
            return obj
          }, {})
        if (filter && Object.keys(filter).length) {
          return filter
        }
      }
      return state.n30.departement
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
        Vue.set(state.n11.enEtablissement, element.annee_deces, element.nombre)
        state.n11.annee.push(element.annee_deces)
      })
      newValue.horsEtablissement.forEach((element) => {
        Vue.set(state.n11.horsEtablissement, element.annee_deces, element.nombre)
        if (state.n11.annee.indexOf(element.annee_deces) === -1) {
          state.n11.annee.push(element.annee_deces)
        }
      })
      state.n11.annee.sort()
    },
    UPDATE_N12 (state, newValue) {
      newValue.enEtablissement.forEach((element) => {
        const region = element.region_libelle || ''
        if (state.n12.annee.indexOf(element.annee_deces) === -1) {
          state.n12.annee.push(element.annee_deces)
        }
        if (!state.n12.region[region]) {
          Vue.set(state.n12.region, region, {})
        }
        if (!state.n12.region[region][element.annee_deces]) {
          state.n12.region[region][element.annee_deces] = {}
        }
        state.n12.region[region][element.annee_deces][element.trimestre_deces] = element.nombre
      })
      state.n12.annee.sort()
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
    UPDATE_N20 (state, newValue) {
      newValue.electronique.forEach((element) => {
        if (!state.n20.annee[element.semaine_deces_annee]) {
          state.n20.annee[element.semaine_deces_annee] = []
        }
        if (state.n20.annee[element.semaine_deces_annee].indexOf(element.semaine_deces) === -1) {
          state.n20.annee[element.semaine_deces_annee].push(element.semaine_deces)
        }

        if (!state.n20.electronique[element.semaine_deces_annee]) {
          state.n20.electronique[element.semaine_deces_annee] = {}
        }
        state.n20.electronique[element.semaine_deces_annee][element.semaine_deces] = element.nombre
      })
      newValue.total.forEach((element) => {
        if (!state.n20.annee[element.semaine_deces_annee]) {
          state.n20.annee[element.semaine_deces_annee] = []
        }
        if (state.n20.annee[element.semaine_deces_annee].indexOf(element.semaine_deces) === -1) {
          state.n20.annee[element.semaine_deces_annee].push(element.semaine_deces)
        }

        if (!state.n20.total[element.semaine_deces_annee]) {
          state.n20.total[element.semaine_deces_annee] = {}
        }
        state.n20.total[element.semaine_deces_annee][element.semaine_deces] = element.nombre
      })
      // state.n20.annee.sort()
    },
    UPDATE_N21 (state, newValue) {
      newValue.electronique.forEach((element) => {
        const region = element.region_libelle || ''
        if (!state.n21.annee[element.semaine_deces_annee]) {
          state.n21.annee[element.semaine_deces_annee] = []
        }
        if (state.n21.annee[element.semaine_deces_annee].indexOf(element.semaine_deces) === -1) {
          state.n21.annee[element.semaine_deces_annee].push(element.semaine_deces)
        }

        if (!state.n21.region[region]) {
          // state.n21.region[region] = { electronique: {}, total: {} }
          Vue.set(state.n21.region, region, { electronique: {}, total: {} })
        }

        if (!state.n21.region[region].electronique[element.semaine_deces_annee]) {
          // state.n21.region[region].electronique[element.semaine_deces_annee] = {}
          Vue.set(state.n21.region[region].electronique, element.semaine_deces_annee, {})
        }
        state.n21.region[region].electronique[element.semaine_deces_annee][element.semaine_deces] = element.nombre
        // Vue.set(state.n21.region[region].electronique[element.semaine_deces_annee], element.semaine_deces, element.nombre)
      })
      newValue.total.forEach((element) => {
        const region = element.region_libelle || ''
        if (!state.n21.annee[element.semaine_deces_annee]) {
          state.n21.annee[element.semaine_deces_annee] = []
        }
        if (state.n21.annee[element.semaine_deces_annee].indexOf(element.semaine_deces) === -1) {
          state.n21.annee[element.semaine_deces_annee].push(element.semaine_deces)
        }

        if (!state.n21.region[region]) {
          state.n21.region[region] = { electronique: {}, total: {} }
        }

        if (!state.n21.region[region].total[element.semaine_deces_annee]) {
          state.n21.region[region].total[element.semaine_deces_annee] = {}
        }
        state.n21.region[region].total[element.semaine_deces_annee][element.semaine_deces] = element.nombre
      })
      // state.n21.annee.sort()
    },
    UPDATE_N22 (state, newValue) {
      newValue.electronique.forEach((element) => {
        const departement = (element.departement_id || '') + ' - ' + (element.departement_libelle || '')
        if (!state.n22.annee[element.semaine_deces_annee]) {
          state.n22.annee[element.semaine_deces_annee] = []
        }
        if (state.n22.annee[element.semaine_deces_annee].indexOf(element.semaine_deces) === -1) {
          state.n22.annee[element.semaine_deces_annee].push(element.semaine_deces)
        }

        if (!state.n22.departement[departement]) {
          // state.n22.departement[departement] = { electronique: {}, total: {} }
          Vue.set(state.n22.departement, departement, { electronique: {}, total: {} })
        }

        if (!state.n22.departement[departement].electronique[element.semaine_deces_annee]) {
          // state.n22.departement[departement].electronique[element.semaine_deces_annee] = {}
          Vue.set(state.n22.departement[departement].electronique, element.semaine_deces_annee, {})
        }
        state.n22.departement[departement].electronique[element.semaine_deces_annee][element.semaine_deces] = element.nombre
        // Vue.set(state.n22.departement[departement].electronique[element.semaine_deces_annee], element.semaine_deces, element.nombre)
      })
      newValue.total.forEach((element) => {
        const departement = (element.departement_id || '') + ' - ' + (element.departement_libelle || '')
        if (!state.n22.annee[element.semaine_deces_annee]) {
          state.n22.annee[element.semaine_deces_annee] = []
        }
        if (state.n22.annee[element.semaine_deces_annee].indexOf(element.semaine_deces) === -1) {
          state.n22.annee[element.semaine_deces_annee].push(element.semaine_deces)
        }

        if (!state.n22.departement[departement]) {
          state.n22.departement[departement] = { electronique: {}, total: {} }
        }

        if (!state.n22.departement[departement].total[element.semaine_deces_annee]) {
          state.n22.departement[departement].total[element.semaine_deces_annee] = {}
        }
        state.n22.departement[departement].total[element.semaine_deces_annee][element.semaine_deces] = element.nombre
      })
      // state.n22.annee.sort()
    },
    UPDATE_N30 (state, newValue) {
      newValue.electronique.forEach((element) => {
        const departement = (element.departement_id || '') + ' - ' + (element.departement_libelle || '')
        if (state.n30.annee.indexOf(element.annee_deces) === -1) {
          state.n30.annee.push(element.annee_deces)
        }
        if (!state.n30.departement[departement]) {
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
    async n12 ({ commit, state }) {
      if (!state.n12.region.length) {
        const data = await http.get('national/n12/')
        if (!data) {
          return false
        }
        commit('UPDATE_N12', data)
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
    async n20 ({ commit, state }) {
      if (!state.n20.annee.length) {
        const data = await http.get('national/n20/')
        if (!data) {
          return false
        }
        commit('UPDATE_N20', data)
      }
    },
    async n21 ({ commit, state }) {
      if (!state.n21.annee.length) {
        const data = await http.get('national/n21/')
        if (!data) {
          return false
        }
        commit('UPDATE_N21', data)
      }
    },
    async n22 ({ commit, state }) {
      if (!state.n22.annee.length) {
        const data = await http.get('national/n22/')
        if (!data) {
          return false
        }
        commit('UPDATE_N22', data)
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
