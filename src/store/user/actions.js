import { signIn, exchangeSignIn } from '../../axios/sign'
import { UPDATE_AUTH_TOKEN, UPDATE_EX_AUTH_TOKEN } from '../mutation-types'
import Message from 'vue-human/utils/Message'

const namespace = 'user'

export default {
  [`${namespace}.signIn`] ({ commit }, params) {
    return signIn(params).then(response => {
      if (response.data.Error === 0) {
        commit(UPDATE_AUTH_TOKEN, response.data.Data)
        return response
      } else {
        this.messageLayer = Message.create({ type: 'error', message: response.data.Message }).show()
        throw response.data
      }
    })
  },
  [`${namespace}.exSignIn`] ({ commit }, params) {
    return exchangeSignIn(params).then(response => {
      console.log(response.data.target)
      commit(UPDATE_EX_AUTH_TOKEN, response.data.target)
      return response
    })
  }
}
