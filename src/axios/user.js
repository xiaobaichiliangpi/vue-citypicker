import axios from './axios'
import Vue from 'vue'
import store from '../store'

export function cityList () {
  return axios({
    method: 'GET',
    url: `/Basic/CityRouteRequest`
  })
}

export function uploadImage (data = {}) {
  return axios({
    method: 'POST',
    url: `/Basic/UploadPicture`,
    data: {
      ByteBinary: data.ByteBinary,
      TypeName: data.TypeName,
      CustomerGuid: store.getters.token.CustomerGuid,
      SourceType: Vue.env.get('APP_TYPE')
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
      ...data,
      CustomerGuid: store.getters.token.CustomerGuid,
      SourceType: Vue.env.get('APP_TYPE')
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
      PlatFormType: 9,
      BusinessType: 4,
      CustomerGuid: store.getters.token.CustomerGuid,
      SourceType: Vue.env.get('APP_TYPE'),
      ...data
    }
  })
}

export function aliPay (data = {}) {
  return axios({
    method: 'POST',
    url: `/Pay/PhoneAliWapPay`,
    data: {
      PlatFormType: 9,
      BusinessType: 4,
      CustomerGuid: store.getters.token.CustomerGuid,
      SourceType: Vue.env.get('APP_TYPE'),
      ...data
    }
  })
}
