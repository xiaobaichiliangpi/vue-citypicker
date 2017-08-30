import local from '../local'
import actions from './actions'
import mutations from './mutations'

const state = {
  /**
   * Token 数据结构
   * @property {object} token                  - token 对象
   * @property {string} token.token_type       - token 类型（Bearer）
   * @property {number} token.expires_in       - 有效时间
   * @property {string} token.access_token     - access token
   * @property {string} token.refresh_token    - refresh token
   */
  address: local.getAddress(),
  qualification: local.getQualification(),
  invoices: local.getInvoices(),
  order: local.getOrder(),
  station: {},
  receivetime: {}
}

const getters = {
  address: state => state.address,
  qualification: state => state.qualification,
  invoices: state => state.invoices,
  order: state => state.order,
  station: state => state.station,
  receivetime: state => state.receivetime
}

export default {
  state,
  getters,
  actions,
  mutations
}
