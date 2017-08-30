import axios from './axios'
import simpleAxios from './simpleAxios'
import { encryptDES } from '../utils/encryptDES'
// import env from '../env'
import store from '../store'

export function signIn ({ username, password }) {
  return axios({
    method: 'POST',
    url: `/Sign/SignIn`,
    data: {
      Phone: username,
      PassWord: encryptDES(password, '8D54E5D0'),
      sourcetype: store.getters.SourceType
    }
  })
}

export function exchangeSignIn ({ username, password }) {
  return simpleAxios({
    method: 'POST',
    url: `/pickupcard/api/${(store.getters.exCity && store.getters.exCity.CityFlag) || 'sz'}/login`,
    data: {
      phone: username,
      passWord: encryptDES(password, '8D54E5D0'),
      sourceType: store.getters.SourceType
    }
  })
}
