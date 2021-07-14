import { reqGetUserChannels, reqGetAllChannels } from '@/api/channel'
import { differenceWith, isEqual } from 'lodash'

const state = {
  userChannels: [],
  allChannels: []
}
const mutations = {
  setUserChannels (state, userChannels) {
    state.userChannels = userChannels
  },
  setAllChannels (state, allChannels) {
    state.allChannels = allChannels
  },
  removeUserChannel (state, index) {
    state.userChannels.splice(index, 1)
  },
  addUserChannel (state, obj) {
    state.userChannels.push(obj)
  }
}
const actions = {
  async getUserChannels (context) {
    const { data: { channels } } = await reqGetUserChannels()
    context.commit('setUserChannels', channels)
  },
  async getAllChannels (context) {
    const { data: { channels } } = await reqGetAllChannels()
    context.commit('setAllChannels', channels)
  }
}
const getters = {
  otherChannels (state) {
    return differenceWith(state.allChannels, state.userChannels, isEqual)
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
