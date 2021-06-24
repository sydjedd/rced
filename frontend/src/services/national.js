import http from '@/helpers/http.js'

async function n1 () {
  const response = await http.get('national/n1/')
  return response.data
}

async function n2 () {
  const response = await http.get('national/n2/')
  return response.data
}

async function n3 () {
  const response = await http.get('national/n3/')
  return response.data
}

async function n4 () {
  const response = await http.get('national/n4/')
  return response.data
}

export default {
  n1,
  n2,
  n3,
  n4
}
