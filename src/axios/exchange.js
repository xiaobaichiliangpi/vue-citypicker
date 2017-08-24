import axios from './simpleAxios'

export function showProductByCard (data = {}) {
  return axios({
    method: 'POST',
    url: `/pickupcard/api/getproductbycardnumandpassword`,
    data: data
  })
}
