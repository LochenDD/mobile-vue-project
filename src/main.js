import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
// 它会根据的手机尺寸来调整rem的基准值：html标签上的font-size。
import 'amfe-flexible'
import '@/styles/index.scss'
import '@/utils/vant-ui'
import '@/utils/date-time'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
