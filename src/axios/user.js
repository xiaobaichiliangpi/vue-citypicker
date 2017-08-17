import axios from './axios'
import simpleAxios from './simpleAxios'
import { encryptDES } from '../utils/encryptDES'
import env from '../env'
import store from '../store'

export function signIn ({ username, password }) {
  return simpleAxios({
    method: 'POST',
    url: `${env.get('API')}/${(store.state.user.city && store.state.user.city.CityFlag) || 'sz'}/Sign/SignIn`,
    data: {
      Phone: username,
      PassWord: encryptDES(password, '8D54E5D0'),
      sourcetype: env.get('APP_TYPE')
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

export function applyQualification (data = {}) {
  return axios({
    method: 'POST',
    url: `/Invoices/ApplyQualification`,
    data: {
      ...data
    }
  })
}

export function qualificationList () {
  return axios({
    method: 'GET',
    url: `/Invoices/QualificationRecordsRequest`
  })
}

export function wxPay (data = {}) {
  return axios({
    method: 'POST',
    url: `/Pay/PhoneWxJsPay`,
    data: {
      PlatFormType: 2,
      BusinessType: 2,
      ...data
    }
  })
}

export function aliPay (data = {}) {
  return axios({
    method: 'POST',
    url: `/Pay/PhoneAliWapPay`,
    data: {
      PlatFormType: 2,
      BusinessType: 2,
      ...data
    }
  })
}
