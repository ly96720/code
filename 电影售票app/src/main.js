import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import MintUI from 'mint-ui'
// 暴力引入模式，一下子全引入，不用单独引用内容了
// 也可以用什么引入什么
import 'mint-ui/lib/style.css'
import '@/assets/iconfont/iconfont.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import VueCookies from 'vue-cookies'
import '@/assets/css/animate.css'
Vue.use(VueCookies)

Vue.use(Vant)
Vue.prototype.$axios = axios
Vue.use(MintUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
