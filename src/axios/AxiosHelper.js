import BaseAxiosHelper from 'vue-human/utils/AxiosHelper'
import env from '../env'
// import router from '../router'
import store from '../store'
import Vue from 'vue'

export default class AxiosHelper extends BaseAxiosHelper {
  config () {
    const token = window.JSON.parse(window.localStorage.getItem('GIFTCARDTOKEN'))
    return {
      baseURL: `${env.get('API')}/${(store.state.user.city && store.state.user.city.CityFlag) || 'sz'}`,
      headers: {
        Accept: 'application/json',
        Authorization: `${store.state.user.token.token_type} ${store.state.user.token.access_token}`
      },
      params: {
        accesstoken: token && token.AccessToken,
        customerguid: token && token.CustomerGuid,
        sourcetype: Vue.env.get('APP_TYPE')
      },
      data: {
        CustomerGuid: token && token.CustomerGuid,
        SourceType: Vue.env.get('APP_TYPE')
      }
    }
  }
}
