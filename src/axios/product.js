import axios from './simpleAxios'

export function productList (params = {}) {
  return axios({
    method: 'GET',
    url: `/pickupcard/api/pickupcardmanage/pickupcard`,
    params: params
  })
}

export function submitOrder (data = {}) {
  return axios({
    method: 'POST',
    url: `/pickupcard/api/pickupcardmanage/submitorder`,
    data: data
  })
}
