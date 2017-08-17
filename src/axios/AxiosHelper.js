import BaseAxiosHelper from 'vue-human/utils/AxiosHelper'
import env from '../env'
// import router from '../router'
import store from '../store'
import Vue from 'vue'

export default class AxiosHelper extends BaseAxiosHelper {
  config () {
    // const token = window.JSON.parse(window.localStorage.getItem('GIFTCARDTOKEN'))
    return {
      baseURL: `${env.get('API')}/${(store.getters.city && store.getters.city.CityFlag) || 'sz'}`,
      headers: {
        Accept: 'application/json'
      },
      params: {
        accesstoken: store.getters.token.AccessToken,
        customerguid: store.getters.token.CustomerGuid,
        sourcetype: Vue.env.get('APP_TYPE')
      },
      data: {
        CustomerGuid: store.getters.token.CustomerGuid,
        SourceType: Vue.env.get('APP_TYPE')
      }
    }
  }
}
