import local from './local'
import {
  UPDATE_ADDRESS } from '../mutation-types'

export default {
  [UPDATE_ADDRESS] (state, address) {
    state.address = local.setAddress(address)
  }
}
