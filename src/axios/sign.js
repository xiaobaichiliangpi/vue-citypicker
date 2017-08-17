import axios from './simpleAxios'
import { encryptDES } from '../utils/encryptDES'
import env from '../env'
import store from '../store'

export function signIn ({ username, password }) {
  return axios({
    method: 'POST',
    url: `${env.get('API')}/${(store.state.user.city && store.state.user.city.CityFlag) || 'sz'}/Sign/SignIn`,
    data: {
      Phone: username,
      PassWord: encryptDES(password, '8D54E5D0'),
      sourcetype: env.get('APP_TYPE')
    }
  })
}
