import { signIn } from '../../axios/sign'
import { UPDATE_AUTH_TOKEN } from '../mutation-types'

const namespace = 'user'

export default {
  [`${namespace}.signIn`] ({ commit }, params) {
    return signIn(params).then(response => {
      commit(UPDATE_AUTH_TOKEN, response.data.Data)
      return response
    })
  }
}
