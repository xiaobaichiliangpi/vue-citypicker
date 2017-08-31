import local from '../local'
import {
  UPDATE_ADDRESS,
  UPDATE_QUALIFICATION,
  UPDATE_INVOICES,
  UPDATE_ORDER,
  UPDATE_ORDER_WORKSTATION,
  UPDATE_ORDER_RECEIVETIME,
  UPDATE_PICK_TYPE } from '../mutation-types'

export default {
  [UPDATE_ADDRESS] (state, address) {
    state.address = local.setAddress(address)
  },
  [UPDATE_QUALIFICATION] (state, qualification) {
    state.qualification = local.setQualification(qualification)
  },
  [UPDATE_INVOICES] (state, invoices) {
    state.invoices = local.setInvoices(invoices)
  },
  [UPDATE_ORDER] (state, order) {
    state.order = local.setOrder(order)
  },
  [UPDATE_ORDER_WORKSTATION] (state, station) {
    state.station = station
  },
  [UPDATE_ORDER_RECEIVETIME] (state, receivetime) {
    state.receivetime = receivetime
  },
  [UPDATE_PICK_TYPE] (state, type) {
    state.activeType = type
  }
}
