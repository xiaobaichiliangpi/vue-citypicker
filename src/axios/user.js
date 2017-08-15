import axios from './axios'
import { encryptDES } from '../utils/encryptDES'

export function signIn ({ username, password }) {
  return axios({
    method: 'POST',
    url: `/Sign/SignIn`,
    data: {
      Phone: username,
      PassWord: encryptDES(password, '8D54E5D0')
    }
  })
}

export function cityList () {
  return axios({
    method: 'GET',
    url: `Basic/CityRouteRequest`
  })
}

export function uploadImage (data = {}) {
  return axios({
    method: 'POST',
    url: `/Basic/UploadPicture`,
    data: {
      ByteBinary: data.ByteBinary,
      TypeName: data.TypeName
    }
  })
}

export function sendCommission (data = {}) {
  return axios({
    method: 'POST',
    url: `/Invoices/SendPowerOfAttorneyLink`,
    data: {
      ...data
    }
  })
}
