import Vue from 'vue'

const TOKEN_NAME = `${Vue.env.get('STORAGE_PREFIX')}TOKEN`
const EX_TOKEN_NAME = `${Vue.env.get('STORAGE_PREFIX')}EXTOKEN`

export default {
  get () {
    const token = window.JSON.parse(window.localStorage.getItem(TOKEN_NAME))
    const expires = new Date(token ? token.expires : undefined)
    const now = new Date()

    return expires > now && token ? token : this.remove()
  },
  set (token) {
    const now = new Date()
    const expires = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 10)

    window.localStorage.setItem(TOKEN_NAME, window.JSON.stringify({ ...token, expires }))
    return this.get()
  },
  remove () {
    window.localStorage.removeItem(TOKEN_NAME)
    return {}
  },
  getEx () {
    const token = window.JSON.parse(window.localStorage.getItem(EX_TOKEN_NAME))
    const expires = new Date(token ? token.expires : undefined)
    const now = new Date()

    return expires > now && token ? token : this.removeEx()
  },
  setEx (token) {
    const now = new Date()
    const expires = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 10)

    window.localStorage.setItem(EX_TOKEN_NAME, window.JSON.stringify({ ...token, expires }))
    return this.getEx()
  },
  removeEx () {
    window.localStorage.removeItem(EX_TOKEN_NAME)
    return {}
  }
}
