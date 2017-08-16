import Vue from 'vue'

const ADDRESS_NAME = `${Vue.env.get('STORAGE_PREFIX')}ADDRESS`
const CITY_NAME = `${Vue.env.get('STORAGE_PREFIX')}CITY`
const QUALIFICATION_NAME = `${Vue.env.get('STORAGE_PREFIX')}QUALIFICATION`
const INVOICES_NAME = `${Vue.env.get('STORAGE_PREFIX')}INVOICES`
const ORDER_NAME = `${Vue.env.get('STORAGE_PREFIX')}ORDER`

export default {
  getAddress () {
    return window.JSON.parse(window.localStorage.getItem(ADDRESS_NAME)) || {}
  },
  setAddress (address) {
    window.localStorage.setItem(ADDRESS_NAME, window.JSON.stringify(address))
    return this.getAddress()
  },
  getCity () {
    return window.JSON.parse(window.localStorage.getItem(CITY_NAME)) || {}
  },
  setCity (city) {
    window.localStorage.setItem(CITY_NAME, window.JSON.stringify(city))
    return this.getCity()
  },
  getQualification () {
    return window.JSON.parse(window.localStorage.getItem(QUALIFICATION_NAME)) || {}
  },
  setQualification (qualification) {
    window.localStorage.setItem(QUALIFICATION_NAME, window.JSON.stringify(qualification))
    return this.getQualification()
  },
  getInvoices () {
    return window.JSON.parse(window.localStorage.getItem(INVOICES_NAME)) || {}
  },
  setInvoices (invoices) {
    window.localStorage.setItem(INVOICES_NAME, window.JSON.stringify(invoices))
    return this.getInvoices()
  },
  getOrder () {
    return window.JSON.parse(window.localStorage.getItem(ORDER_NAME)) || []
  },
  setOrder (order) {
    window.localStorage.setItem(ORDER_NAME, window.JSON.stringify(order))
    return this.getOrder()
  }
}
