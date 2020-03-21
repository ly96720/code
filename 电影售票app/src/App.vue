<template>

  <div id="app"
       v-if="city">
    <div id="container"></div>
    <transition mode='out-in'
                enter-active-class="animated fadeInUp faster"
                leave-active-class="animated fadeOut faster">
      <router-view />
    </transition>
    <Navbar v-show="visible"
            class="navbar" />
  </div>
</template>
<script>
import { showCityInfo } from '@/utils/location'

import Navbar from '@/components/Navbar'
export default {
  created () {
    showCityInfo('container', (res) => {
      if (res.status) {
        this.city = res
        this.$store.commit('pushCityId', res)
        localStorage.setItem('cityInfo', JSON.stringify(res))
      }
    })
  },
  components: {
    Navbar
  },
  data () {
    return {
      city: [],
      visible: true
    }
  },

  watch: {
    $route: {
      // 监测当前路由，如果有变化，则取反
      handler (n) {
        this.visible = !n.meta.flag
      }
    }
  }
}
</script>
<style lang="scss">
@import "~@/assets/css/reset.css";
html {
  background-color: #f4f4f4;
}
.van-tab {
  margin: 0 0.2rem !important;
}
.van-ellipsis {
  overflow: visible !important;
}
.navbar {
  position: fixed;
  bottom: -0.02rem;
  width: 100%;
  height: 1rem;
  z-index: 1111;
}
#app {
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #ff5f16;
}

// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     // color: #2c3e50;
//     &.router-link-exact-active {
//       // color: #42b983;
//     }
//   }
// }
</style>
