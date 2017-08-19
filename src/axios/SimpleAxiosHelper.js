import BaseAxiosHelper from 'vue-human/utils/AxiosHelper'
import env from '../env'
// import Vue from 'vue'

export default class SimpleAxiosHelper extends BaseAxiosHelper {
  config () {
    return {
      baseURL: `${env.get('API')}`,
      headers: {
        Accept: 'application/json'
      }
    }
  }
}
