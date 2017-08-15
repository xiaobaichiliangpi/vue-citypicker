import tokenStorage from './token'
import local from '../local'
import {
  UPDATE_AUTH_TOKEN,
  CLEAR_AUTH_TOKEN,
  UPDATE_CITY } from '../mutation-types'

export default {
  [UPDATE_AUTH_TOKEN] (state, token) {
    state.token = tokenStorage.set(token)
  },
  [CLEAR_AUTH_TOKEN] (state, token) {
    state.token = tokenStorage.remove(token)
  },
  [UPDATE_CITY] (state, city) {
    state.city = local.setCity(city)
  }
}
