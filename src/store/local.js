import Vue from 'vue'

const ADDRESS_NAME = `${Vue.env.get('STORAGE_PREFIX')}ADDRESS`
const CITY_NAME = `${Vue.env.get('STORAGE_PREFIX')}CITY`

export default {
  getAddress () {
    return window.JSON.parse(window.localStorage.getItem(ADDRESS_NAME)) || undefined
  },
  setAddress (address) {
    window.localStorage.setItem(ADDRESS_NAME, window.JSON.stringify(address))
    return this.getAddress()
  },
  getCity () {
    return window.JSON.parse(window.localStorage.getItem(CITY_NAME)) || undefined
  },
  setCity (city) {
    window.localStorage.setItem(CITY_NAME, window.JSON.stringify(city))
    return this.getCity()
  }
}
