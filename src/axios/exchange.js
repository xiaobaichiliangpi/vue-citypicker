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
    url: `/pickupcard/api/${(store.getters.exCity && store.getters.exCity.CityFlag) || 'sz'}/address/${store.getters.exToken.customerGuid}`
  })
}

export function createOrUpdateAddress (data = {}) {
  return axios({
    method: 'POST',
    url: `/pickupcard/api/${(store.getters.exCity && store.getters.exCity.CityFlag) || 'sz'}/address/${store.getters.exToken.customerGuid}`,
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
    url: `/pickupcard/api/${(store.getters.exCity && store.getters.exCity.CityFlag) || 'sz'}/address/${store.getters.exToken.customerGuid}`,
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
    url: `/pickupcard/api/${(store.getters.exCity && store.getters.exCity.CityFlag) || 'sz'}/areas/`
  })
}

export function listStation (params = {}) {
  return axios({
    method: 'GET',
    url: `/pickupcard/api/${(store.getters.exCity && store.getters.exCity.CityFlag) || 'sz'}/station`,
    params: params
  })
}

export function listUserReceiverTime (params = {}) {
  return axios({
    method: 'GET',
    url: `/pickupcard/api/${(store.getters.exCity && store.getters.exCity.CityFlag) || 'sz'}/areas/${store.getters.exToken.customerGuid}`,
    params: params
  })
}

export function getProductByCard (cardNum) {
  return axios({
    method: 'GET',
    url: `/pickupcard/api/getproductbycardnum/${cardNum}`
  })
}

export function validateCard (data = {}) {
  return axios({
    method: 'POST',
    url: `/pickupcard/api/validateproductbycardnumandpassword`,
    data: data
  })
}

export function pickupProduct (data = {}) {
  return axios({
    method: 'POST',
    url: `/pickupcard/api/pickup`,
    data: data
  })
}

export function smsCode (params = {}) {
  return axios({
    method: 'GET',
    url: `/pickupcard/api/getverifycode`,
    params: params
  })
}

export function listByPhone (params = {}) {
  return axios({
    method: 'GET',
    url: `/pickupcard/api/orderlistbyphone`,
    params: params
  })
}

export function listByAccount (params = {}) {
  return axios({
    method: 'GET',
    url: `/pickupcard/api/orderlistshihangaccount`,
    params: params
  })
}

export function pickUpPsw (params = {}) {
  return axios({
    method: 'GET',
    url: `/pickupcard/api/${(store.getters.exCity && store.getters.exCity.CityFlag) || 'sz'}/boxinfos`,
    params: params
  })
}

export function updateImageCode (params = {}) {
  return axios({
    method: 'GET',
    url: `/pickupcard/api/pickupcardmanage/generateverifycode`
  })
}
