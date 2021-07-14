const state = {
  tokenInfo: {}
}
const mutations = {
  setTokenInfo (state, obj) {
    state.tokenInfo = obj
  },
  setToken (state, token) {
    state.tokenInfo.token = token
  },
  emptyToken (state) {
    state.tokenInfo = {}
  }
}
const actions = {}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
