import axios from './simpleAxios'
import store from '../store'

export function showProductByCard (data = {}) {
  return axios({
    method: 'POST',
    url: `/pickupcard/api/getproductbycardnumandpassword`,
    data: data
  })
}

export function listCity () {
  return axios({
    method: 'GET',
    url: `/pickupcard/api/cityinfo`
  })
}

export function listUserAddress () {
  return axios({
    method: 'GET',
    url: `/pickupcard/api/${(store.getters.city && store.getters.city.CityFlag) || 'sz'}/address/${store.getters.exToken.customerGuid}`
  })
}

export function createOrUpdateAddress (data = {}) {
  return axios({
    method: 'POST',
    url: `/pickupcard/api/${(store.getters.city && store.getters.city.CityFlag) || 'sz'}/address/${store.getters.exToken.customerGuid}`,
    data: {
      ...data,
      sourceType: store.getters.SourceType,
      customerGuid: store.getters.exToken.customerGuid
    }
  })
}

export function deleteAddress (data = {}) {
  return axios({
    method: 'DELETE',
    url: `/pickupcard/api/${(store.getters.city && store.getters.city.CityFlag) || 'sz'}/address/${store.getters.exToken.customerGuid}`,
    data: {
      ...data,
      sourceType: store.getters.SourceType,
      customerGuid: store.getters.exToken.customerGuid
    }
  })
}

export function listArea () {
  return axios({
    method: 'GET',
    url: `/pickupcard/api/${(store.getters.city && store.getters.city.CityFlag) || 'sz'}/areas/`
  })
}

export function listStation (params = {}) {
  return axios({
    method: 'GET',
    url: `/pickupcard/api/${(store.getters.city && store.getters.city.CityFlag) || 'sz'}/station`,
    params: params
  })
}

export function listUserReceiverTime (params = {}) {
  return axios({
    method: 'GET',
    url: `/pickupcard/api/${(store.getters.city && store.getters.city.CityFlag) || 'sz'}/areas/${store.getters.exToken.customerGuid}`,
    params: params
  })
}
