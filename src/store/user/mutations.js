import tokenStorage from './token'
import local from '../local'
import {
  UPDATE_AUTH_TOKEN,
  CLEAR_AUTH_TOKEN,
  UPDATE_CITY,
  UPDATE_OPENID,
  UPDATE_SOURCETYPE,
  UPDATE_EX_AUTH_TOKEN,
  CLEAR_EX_AUTH_TOKEN,
  UPDATE_EX_CITY } from '../mutation-types'

export default {
  [UPDATE_AUTH_TOKEN] (state, token) {
    state.token = tokenStorage.set(token)
  },
  [CLEAR_AUTH_TOKEN] (state, token) {
    state.token = tokenStorage.remove(token)
  },
  [UPDATE_CITY] (state, city) {
    state.city = local.setCity(city)
  },
  [UPDATE_OPENID] (state, openid) {
    state.openid = local.setOpenid(openid)
  },
  [UPDATE_SOURCETYPE] (state, SourceType) {
    state.SourceType = local.setSource(SourceType)
  },
  [UPDATE_EX_AUTH_TOKEN] (state, token) {
    state.token = tokenStorage.set(token)
  },
  [CLEAR_EX_AUTH_TOKEN] (state, token) {
    state.token = tokenStorage.remove(token)
  },
  [UPDATE_EX_CITY] (state, city) {
    state.exCity = local.setExCity(city)
  }
}
