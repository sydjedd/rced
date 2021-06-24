import http from '@/helpers/http.js'

async function login (username, password) {
  const response = await http.get('auth/csrf/')
  const data = new FormData()
  data.append('username', username)
  data.append('password', password)
  data.append('csrfmiddlewaretoken', response.csrftoken)
  return await http.post('auth/login/', data)
}

function logout () {
  // Changer de method get to post
  http.get('auth/logout/')
}

async function checkLogged () {
  // Changer de method get to post
  const response = await http.get('auth/check/')
  return response
}

export default {
  login,
  logout,
  checkLogged
}
