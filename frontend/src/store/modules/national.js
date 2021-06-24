import Vue from 'vue'
import http from '@/helpers/http.js'

export default {
  namespaced: true,
  state: {
    n1: { alert: !localStorage.getItem('n1.alert') === 'false', loading: true, filter: '', annee: [], electronique: {}, papier: {} },
    n2: { alert: !localStorage.getItem('n2.alert') === 'false', loading: true, filter: '', annee: [], enEtablissement: {}, horsEtablissement: {} },
    n3: { alert: !localStorage.getItem('n3.alert') === 'false', loading: true, filter: '', annee: [], enEtablissement: {} },
    n4: { alert: !localStorage.getItem('n4.alert') === 'false', loading: true, filter: '', annee: [], region: {} },
    n5: { alert: !localStorage.getItem('n5.alert') === 'false', loading: true, filter: '', annee: [], departement: {} }
  },

  getters: {
    n5Departement (state) {
      if (state.n5.filter !== '' && Object.keys(state.n5.departement).length) {
        const filter = Object.keys(state.n5.departement)
          .filter((key) => key.toLowerCase().indexOf(state.n5.filter.toLowerCase()) !== -1)
          .reduce((obj, key) => {
            obj[key] = state.n5.departement[key]
            return obj
          }, {})
        if (filter && Object.keys(filter).length) {
          return filter
        }
      }
      return state.n5.departement
    },
    n4Region (state) {
      if (state.n4.filter !== '' && Object.keys(state.n4.region).length) {
        const filter = Object.keys(state.n4.region)
          .filter((key) => key.toLowerCase().indexOf(state.n4.filter.toLowerCase()) !== -1)
          .reduce((obj, key) => {
            obj[key] = state.n4.region[key]
            return obj
          }, {})
        if (filter && Object.keys(filter).length) {
          return filter
        }
      }
      return state.n4.region
    }
  },
  mutations: {
    UPDATE_PROPERTY (state, data) {
      state[data.n][data.property] = data.value
      localStorage.setItem(data.n + '.' + data.property, data.value)
    },
    UPDATE_N1 (state, newValue) {
      newValue.electronique.forEach((element) => {
        state.n1.electronique[element.annee_deces] = element.nombre
        state.n1.annee.push(element.annee_deces)
      })
      newValue.papier.forEach((element) => {
        state.n1.papier[element.annee_deces] = element.nombre
        if (state.n1.annee.indexOf(element.annee_deces) === -1) {
          state.n1.annee.push(element.annee_deces)
        }
      })
      state.n1.annee.sort()
      state.n1.loading = false
    },
    UPDATE_N2 (state, newValue) {
      newValue.enEtablissement.forEach((element) => {
        // On utilise Vue.set(object, key, value); sinon impossible d utiliser Object.keys
        // state.n2.enEtablissement[element['annee_deces']] = element['nombre'];
        Vue.set(
          state.n2.enEtablissement,
          element.annee_deces,
          element.nombre
        )
        state.n2.annee.push(element.annee_deces)
      })
      newValue.horsEtablissement.forEach((element) => {
        // On utilise Vue.set(object, key, value); sinon impossible d utiliser Object.keys
        // state.n2.horsEtablissement[element['annee_deces']] = element['nombre'];
        Vue.set(
          state.n2.horsEtablissement,
          element.annee_deces,
          element.nombre
        )
        if (state.n2.annee.indexOf(element.annee_deces) === -1) {
          state.n2.annee.push(element.annee_deces)
        }
      })
      state.n2.annee.sort()
      state.n2.loading = false
    },
    UPDATE_N3 (state, newValue) {
      newValue.enEtablissement.forEach((element) => {
        if (state.n3.annee.indexOf(element.annee_deces) === -1) {
          state.n3.annee.push(element.annee_deces)
        }
        if (!state.n3.enEtablissement[element.annee_deces]) {
          state.n3.enEtablissement[element.annee_deces] = {}
        }
        // eslint-disable-next-line
        state.n3.enEtablissement[element['annee_deces']][element['trimestre_deces']] = element['nombre'];
      })
      state.n3.annee.sort()
      state.n3.loading = false
    },
    UPDATE_N4 (state, newValue) {
      /* eslint-disable */
      let region = '';
      newValue.enEtablissement.forEach((element) => {
        region = (element['region_libelle'] || '')
        if (state.n4.annee.indexOf(element['annee_deces']) == -1) {
          state.n4.annee.push(element['annee_deces']);
        }
        if (!state.n4.region[region]) {
          // On utilise Vue.set(object, key, value); sinon impossible d utiliser Object.keys
          //state.n4.region[region] = {};
          Vue.set(state.n4.region, region, {});
        }
        if (!state.n4.region[region][element['annee_deces']]) {
          state.n4.region[region][element['annee_deces']] = {};
        }
        state.n4.region[region][element['annee_deces']][element['trimestre_deces']] = element['nombre'];
      });
      state.n4.annee.sort();
      state.n4.loading = false;
      /* eslint-enable */
    },
    UPDATE_N5 (state, newValue) {
      let departement = ''
      newValue.electronique.forEach((element) => {
        departement =
          (element.departement_id || '') +
          ' - ' +
          (element.departement_libelle || '')
        if (state.n5.annee.indexOf(element.annee_deces) === -1) {
          state.n5.annee.push(element.annee_deces)
        }
        if (!state.n5.departement[departement]) {
          // On utilise Vue.set(object, key, value); sinon impossible d utiliser Object.keys
          // state.n5.departement[departement] = {};
          Vue.set(state.n5.departement, departement, {})
        }
        state.n5.departement[departement][element.annee_deces] = {
          nombre: element.nombre,
          evolution: element.evolution || null
        }
      })
      state.n5.annee.sort()
      state.n5.loading = false
    }
  },
  actions: {
    async property ({ commit }, data) {
      commit('UPDATE_PROPERTY', data)
    },
    async n1 ({ commit, state }) {
      if (!state.n1.annee.length) {
        const data = await http.get('national/n1/')
        if (!data) {
          return false
        }
        commit('UPDATE_N1', data)
      }
    },
    async n2 ({ commit, state }) {
      if (!state.n2.annee.length) {
        const data = await http.get('national/n2/')
        if (!data) {
          return false
        }
        commit('UPDATE_N2', data)
      }
    },
    async n3 ({ commit, state }) {
      if (!state.n3.annee.length) {
        const data = await http.get('national/n3/')
        if (!data) {
          return false
        }
        commit('UPDATE_N3', data)
      }
    },
    async n4 ({ commit, state }) {
      if (!state.n4.region.length) {
        const data = await http.get('national/n4/')
        if (!data) {
          return false
        }
        commit('UPDATE_N4', data)
      }
    },
    async n5 ({ commit, state }) {
      if (!state.n5.annee.length) {
        const data = await http.get('national/n5/')
        if (!data) {
          return false
        }
        commit('UPDATE_N5', data)
      }
    }
  }
}
