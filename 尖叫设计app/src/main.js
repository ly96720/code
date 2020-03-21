import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { Tab, Tabs, Swipe, SwipeItem } from 'vant'
import 'vant/lib/index.css'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import '@/assets/flexible.js'
import '@/assets/iconfont/iconfont.css'
import '@/assets/css/animate.css'
Vue.use(Tab)

Vue.use(MintUI)
Vue.use(Tabs)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(Swipe)
Vue.use(SwipeItem)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
