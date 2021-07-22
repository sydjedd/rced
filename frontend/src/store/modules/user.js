import store from '@/store'
import userService from '@/services/user'

export default {
  namespaced: true,
  state: {
    first_name: localStorage.getItem('first_name') || null,
    last_name: localStorage.getItem('last_name') || null,
    email: localStorage.getItem('email') || null,
    is_staff: localStorage.getItem('is_staff') || false,
    is_superuser: localStorage.getItem('is_superuser') || false,
    is_logged: localStorage.getItem('is_logged') || false
  },
  mutations: {
    UPDATE_USER (state, newValue) {
      localStorage.setItem('first_name', newValue.first_name)
      localStorage.setItem('last_name', newValue.last_name)
      localStorage.setItem('email', newValue.email)
      localStorage.setItem('is_staff', newValue.is_staff)
      localStorage.setItem('is_superuser', newValue.is_superuser)
      localStorage.setItem('is_logged', true)
      state.first_name = newValue.first_name
      state.last_name = newValue.last_name
      state.email = newValue.email
      state.is_staff = newValue.is_staff
      state.is_superuser = newValue.is_superuser
      state.is_logged = true
      // TODO trouver une meilleur place pour la mise a jour des referentiels
      store.dispatch('referentiel/updateRegion')
      store.dispatch('referentiel/updateDepartement')
      store.dispatch('referentiel/updateLieuDeces')
    },
    REMOVE_USER (state) {
      localStorage.removeItem('first_name')
      localStorage.removeItem('last_name')
      localStorage.removeItem('email')
      localStorage.removeItem('is_staff')
      localStorage.removeItem('is_superuser')
      localStorage.removeItem('is_logged')
      state.first_name = null
      state.last_name = null
      state.email = null
      state.is_staff = false
      state.is_superuser = false
      state.is_logged = false
    }
  },
  actions: {
    async login ({ commit }, { username, password }) {
      const user = await userService.login(username, password)
      if (user) {
        commit('UPDATE_USER', user)
        return true
      }
      return false
    },
    logout ({ commit }) {
      userService.logout()
      commit('REMOVE_USER')
    },
    async checkLogged ({ commit }) {
      const user = await userService.checkLogged()
      if ('username' in user) {
        commit('UPDATE_USER', user)
        return true
      } else {
        commit('REMOVE_USER')
        return false
      }
    }
  }
}
