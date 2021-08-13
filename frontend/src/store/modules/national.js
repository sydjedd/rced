import Vue from 'vue'
import http from '@/helpers/http.js'

export default {
  namespaced: true,
  state: {
    alert: { n1: true, n2: true, n3: true },
    n10: { filter: '', annee: [], electronique: {}, papier: {} },
    n11: { filter: '', annee: [], enEtablissement: {}, horsEtablissement: {} },
    n12: { filter: '', annee: [], region: {} },
    n13: { filter: '', annee: [], trimestre: {} },
    n20: { filter: '', annee: {}, electronique: {}, total: {} },
    n21: { filter: '', annee: {}, region: {} },
    n22: { filter: '', annee: {}, departement: {} },
    n30: { filter: '', annee: [], departement: {} },
    n50: { filter: '', annee: [], region: {} },
    n51: { filter: '', annee: [], departement: {} },
    n52: { filter: '', annee: [], lieu_deces: {}, total: {} },
    n53: { filter: '', annee: [], lieu_deces: {}, total: {} }
  },

  getters: {
    n12 (state) {
      if (state.n12.filter && state.n12.filter !== '' && Object.keys(state.n12.region).length) {
        const filter = Object.keys(state.n12.region)
          .filter((key) => key.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(state.n12.filter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) !== -1)
          .reduce((acc, obj) => {
            acc[obj] = state.n12.region[obj]
            return acc
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
          .reduce((acc, obj) => {
            acc[obj] = state.n21.region[obj]
            return acc
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
          .reduce((acc, obj) => {
            acc[obj] = state.n22.departement[obj]
            return acc
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
          .reduce((acc, obj) => {
            acc[obj] = state.n30.departement[obj]
            return acc
          }, {})
        if (filter && Object.keys(filter).length) {
          return filter
        }
      }
      return state.n30.departement
    },
    n50 (state) {
      if (state.n50.filter && state.n50.filter !== '' && Object.keys(state.n50.region).length) {
        const filter = Object.keys(state.n50.region)
          .filter((key) => key.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(state.n50.filter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) !== -1)
          .reduce((acc, obj) => {
            acc[obj] = state.n50.region[obj]
            return acc
          }, {})
        if (filter && Object.keys(filter).length) {
          return filter
        }
      }
      return state.n50.region
    },
    n51 (state) {
      if (state.n51.filter && state.n51.filter !== '' && Object.keys(state.n51.departement).length) {
        const filter = Object.keys(state.n51.departement)
          .filter((key) => key.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(state.n51.filter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) !== -1)
          .reduce((acc, obj) => {
            acc[obj] = state.n51.departement[obj]
            return acc
          }, {})
        if (filter && Object.keys(filter).length) {
          return filter
        }
      }
      return state.n51.departement
    }
  },
  mutations: {
    UPDATE_PROPERTY (state, data) {
      state[data.n][data.property] = data.value
      localStorage.setItem(data.n + '.' + data.property, data.value)
    },
    UPDATE_N10 (state, newValue) {
      newValue.electronique.forEach((element) => {
        if (state.n10.annee.indexOf(element.annee_deces) === -1) {
          state.n10.annee.push(element.annee_deces)
        }
        state.n10.electronique[element.annee_deces] = element.nombre
      })
      newValue.papier.forEach((element) => {
        if (state.n10.annee.indexOf(element.annee_deces) === -1) {
          state.n10.annee.push(element.annee_deces)
        }
        state.n10.papier[element.annee_deces] = element.nombre
      })
      state.n10.annee.sort()
    },
    UPDATE_N11 (state, newValue) {
      newValue.enEtablissement.forEach((element) => {
        if (state.n11.annee.indexOf(element.annee_deces) === -1) {
          state.n11.annee.push(element.annee_deces)
        }
        state.n11.enEtablissement[element.annee_deces] = element.nombre
      })
      newValue.horsEtablissement.forEach((element) => {
        if (state.n11.annee.indexOf(element.annee_deces) === -1) {
          state.n11.annee.push(element.annee_deces)
        }
        state.n11.horsEtablissement[element.annee_deces] = element.nombre
      })
      state.n11.annee.sort()
    },
    UPDATE_N12 (state, newValue) {
      newValue.enEtablissement.forEach((element) => {
        const region = element.region || ''
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
        if (!state.n13.trimestre[element.trimestre_deces]) {
          state.n13.trimestre[element.trimestre_deces] = {}
        }
        state.n13.trimestre[element.trimestre_deces][element.annee_deces] = element.nombre
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
      // TODO ne pas oublier de trier par ordre croissant
      // state.n20.annee.sort()
    },
    UPDATE_N21 (state, newValue) {
      newValue.electronique.forEach((element) => {
        const region = element.region || ''
        if (!state.n21.annee[element.semaine_deces_annee]) {
          state.n21.annee[element.semaine_deces_annee] = []
        }
        if (state.n21.annee[element.semaine_deces_annee].indexOf(element.semaine_deces) === -1) {
          state.n21.annee[element.semaine_deces_annee].push(element.semaine_deces)
        }
        if (!state.n21.region[region]) {
          Vue.set(state.n21.region, region, { electronique: {}, total: {} })
        }
        if (!state.n21.region[region].electronique[element.semaine_deces_annee]) {
          Vue.set(state.n21.region[region].electronique, element.semaine_deces_annee, {})
        }
        state.n21.region[region].electronique[element.semaine_deces_annee][element.semaine_deces] = element.nombre
      })
      newValue.total.forEach((element) => {
        const region = element.region || ''
        if (!state.n21.annee[element.semaine_deces_annee]) {
          state.n21.annee[element.semaine_deces_annee] = []
        }
        if (state.n21.annee[element.semaine_deces_annee].indexOf(element.semaine_deces) === -1) {
          state.n21.annee[element.semaine_deces_annee].push(element.semaine_deces)
        }
        if (!state.n21.region[region]) {
          Vue.set(state.n21.region, region, { electronique: {}, total: {} })
        }
        if (!state.n21.region[region].total[element.semaine_deces_annee]) {
          Vue.set(state.n21.region[region].total, element.semaine_deces_annee, {})
        }
        state.n21.region[region].total[element.semaine_deces_annee][element.semaine_deces] = element.nombre
      })
      // TODO ne pas oublier de trier par ordre croissant
      // state.n21.annee.sort()
    },
    UPDATE_N22 (state, newValue) {
      newValue.electronique.forEach((element) => {
        const departement = element.departement || ''
        if (!state.n22.annee[element.semaine_deces_annee]) {
          state.n22.annee[element.semaine_deces_annee] = []
        }
        if (state.n22.annee[element.semaine_deces_annee].indexOf(element.semaine_deces) === -1) {
          state.n22.annee[element.semaine_deces_annee].push(element.semaine_deces)
        }
        if (!state.n22.departement[departement]) {
          Vue.set(state.n22.departement, departement, { electronique: {}, total: {} })
        }
        if (!state.n22.departement[departement].electronique[element.semaine_deces_annee]) {
          Vue.set(state.n22.departement[departement].electronique, element.semaine_deces_annee, {})
        }
        state.n22.departement[departement].electronique[element.semaine_deces_annee][element.semaine_deces] = element.nombre
      })
      newValue.total.forEach((element) => {
        const departement = element.departement || ''
        if (!state.n22.annee[element.semaine_deces_annee]) {
          state.n22.annee[element.semaine_deces_annee] = []
        }
        if (state.n22.annee[element.semaine_deces_annee].indexOf(element.semaine_deces) === -1) {
          state.n22.annee[element.semaine_deces_annee].push(element.semaine_deces)
        }
        if (!state.n22.departement[departement]) {
          Vue.set(state.n22.departement, departement, { electronique: {}, total: {} })
        }
        if (!state.n22.departement[departement].total[element.semaine_deces_annee]) {
          Vue.set(state.n22.departement[departement].total, element.semaine_deces_annee, {})
        }
        state.n22.departement[departement].total[element.semaine_deces_annee][element.semaine_deces] = element.nombre
      })
      // TODO ne pas oublier de trier par ordre croissant
      // state.n22.annee.sort()
    },
    UPDATE_N30 (state, newValue) {
      newValue.electronique.forEach((element) => {
        const departement = element.departement || ''
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
    },
    UPDATE_N50 (state, newValue) {
      newValue.electronique.forEach((element) => {
        const region = element.region || ''
        if (state.n50.annee.indexOf(element.annee_deces) === -1) {
          state.n50.annee.push(element.annee_deces)
        }
        if (!state.n50.region[region]) {
          Vue.set(state.n50.region, region, { electronique: {}, papier: {} })
        }
        state.n50.region[region].electronique[element.annee_deces] = element.nombre
      })
      newValue.papier.forEach((element) => {
        const region = element.region || ''
        if (state.n50.annee.indexOf(element.annee_deces) === -1) {
          state.n50.annee.push(element.annee_deces)
        }
        if (!state.n50.region[region]) {
          Vue.set(state.n50.region, region, { electronique: {}, papier: {} })
        }
        state.n50.region[region].papier[element.annee_deces] = element.nombre
      })
      state.n50.annee.sort()
    },
    UPDATE_N51 (state, newValue) {
      newValue.electronique.forEach((element) => {
        const departement = element.departement || ''
        if (state.n51.annee.indexOf(element.annee_deces) === -1) {
          state.n51.annee.push(element.annee_deces)
        }
        if (!state.n51.departement[departement]) {
          Vue.set(state.n51.departement, departement, { electronique: {}, papier: {} })
        }
        state.n51.departement[departement].electronique[element.annee_deces] = element.nombre
      })
      newValue.papier.forEach((element) => {
        const departement = element.departement || ''
        if (state.n51.annee.indexOf(element.annee_deces) === -1) {
          state.n51.annee.push(element.annee_deces)
        }
        if (!state.n51.departement[departement]) {
          Vue.set(state.n51.departement, departement, { electronique: {}, papier: {} })
        }
        state.n51.departement[departement].papier[element.annee_deces] = element.nombre
      })
      state.n51.annee.sort()
    },
    UPDATE_N52 (state, newValue) {
      newValue.electronique.forEach((element) => {
        const lieuDeces = element.lieu_deces || ''
        if (state.n52.annee.indexOf(element.annee_deces) === -1) {
          state.n52.annee.push(element.annee_deces)
          state.n52.total[element.annee_deces] = 0
        }
        if (!state.n52.lieu_deces[lieuDeces]) {
          state.n52.lieu_deces[lieuDeces] = {}
        }
        state.n52.lieu_deces[lieuDeces][element.annee_deces] = element.nombre
        state.n52.total[element.annee_deces] += element.nombre
      })
      newValue.papier.forEach((element) => {
        const lieuDeces = element.lieu_deces || ''
        if (state.n52.annee.indexOf(element.annee_deces) === -1) {
          state.n52.annee.push(element.annee_deces)
          state.n52.total[element.annee_deces] = 0
        }
        if (!state.n52.lieu_deces[lieuDeces]) {
          state.n52.lieu_deces[lieuDeces] = {}
        }
        if (!state.n52.lieu_deces[lieuDeces][element.annee_deces]) {
          state.n52.lieu_deces[lieuDeces][element.annee_deces] = element.nombre
        } else {
          state.n52.lieu_deces[lieuDeces][element.annee_deces] += element.nombre
        }
        state.n52.total[element.annee_deces] += element.nombre
      })
      state.n52.annee.sort()
    },
    UPDATE_N53 (state, newValue) {
      newValue.electronique.forEach((element) => {
        const lieuDeces = element.lieu_deces || ''
        if (state.n53.annee.indexOf(element.annee_deces) === -1) {
          state.n53.annee.push(element.annee_deces)
          state.n53.total[element.annee_deces] = 0
        }
        if (!state.n53.lieu_deces[lieuDeces]) {
          state.n53.lieu_deces[lieuDeces] = {}
        }
        state.n53.lieu_deces[lieuDeces][element.annee_deces] = element.nombre
        state.n53.total[element.annee_deces] += element.nombre
      })
      state.n53.annee.sort()
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
      if (!state.n12.annee.length) {
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
      if (!Object.keys(state.n20.annee).length) {
        const data = await http.get('national/n20/')
        if (!data) {
          return false
        }
        commit('UPDATE_N20', data)
      }
    },
    async n21 ({ commit, state }) {
      if (!Object.keys(state.n21.annee).length) {
        const data = await http.get('national/n21/')
        if (!data) {
          return false
        }
        commit('UPDATE_N21', data)
      }
    },
    async n22 ({ commit, state }) {
      if (!Object.keys(state.n22.annee).length) {
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
    },
    async n50 ({ commit, state }) {
      if (!state.n50.annee.length) {
        const data = await http.get('national/n50/')
        if (!data) {
          return false
        }
        commit('UPDATE_N50', data)
      }
    },
    async n51 ({ commit, state }) {
      if (!state.n51.annee.length) {
        const data = await http.get('national/n51/')
        if (!data) {
          return false
        }
        commit('UPDATE_N51', data)
      }
    },
    async n52 ({ commit, state }) {
      if (!state.n52.annee.length) {
        const data = await http.get('national/n52/')
        if (!data) {
          return false
        }
        commit('UPDATE_N52', data)
      }
    },
    async n53 ({ commit, state }) {
      if (!state.n53.annee.length) {
        const data = await http.get('national/n53/')
        if (!data) {
          return false
        }
        commit('UPDATE_N53', data)
      }
    }
  }
}
