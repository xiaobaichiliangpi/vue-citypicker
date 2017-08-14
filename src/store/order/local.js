import Vue from 'vue'

const ADDRESS_NAME = `${Vue.env.get('STORAGE_PREFIX')}ADDRESS`

export default {
  getAddress () {
    return window.JSON.parse(window.localStorage.getItem(ADDRESS_NAME)) || undefined
  },
  setAddress (address) {
    window.localStorage.setItem(ADDRESS_NAME, window.JSON.stringify(address))
    return this.getAddress()
  }
}
