// import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import env from '../env'
// import Message from 'vue-human/utils/Message'

export default function (config) {
  return axios({
    ...{
      baseURL: `${env.get('API')}/${(store.getters.city && store.getters.city.CityFlag) || 'sz'}`,
      headers: {
        Accept: 'application/json'
      },
      params: {
        accesstoken: store.getters.token.AccessToken,
        customerguid: store.getters.token.CustomerGuid,
        sourcetype: store.getters.SourceType
      },
      data: {
        CustomerGuid: store.getters.token.CustomerGuid,
        SourceType: store.getters.SourceType
      }
    },
    ...config
  })
}
