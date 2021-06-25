// Service plus utilisé, on passe directement par le helper http.js
import http from '@/helpers/http.js'

async function n10 () {
  const response = await http.get('national/n10/')
  return response.data
}

async function n11 () {
  const response = await http.get('national/n11/')
  return response.data
}

async function n12 () {
  const response = await http.get('national/n12/')
  return response.data
}

async function n13 () {
  const response = await http.get('national/n13/')
  return response.data
}

export default {
  n10,
  n11,
  n12,
  n13
}
