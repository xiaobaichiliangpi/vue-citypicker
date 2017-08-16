import axios from './simpleAxios'

export function productList () {
  return axios({
    method: 'GET',
    url: `/pickupcard/api/pickupcardmanage/pickupcard`
  })
}

export function submitOrder (data = {}) {
  return axios({
    method: 'POST',
    url: `/pickupcard/api/pickupcardmanage/submitorder`,
    data: data
  })
}
