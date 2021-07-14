import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import user from '@/store/module/user'
import channels from '@/store/module/channels'

Vue.use(Vuex)

const LocalKey = 'HeadLine'

export default new Vuex.Store({
  modules: {
    user,
    channels
  },
  plugins: [persistedState({
    key: LocalKey,
    reducer (val) {
      return {
        user: val.user
      }
    }
  }
  )]
})
