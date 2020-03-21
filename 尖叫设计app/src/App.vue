<template>
  <div id="app"  v-scroll>
    <router-view></router-view>
    <Navbar v-if="visible" />
    <img src="https://img.wowdsgn.com/icons/backTop.png"
         v-backTop
         class="backtop"
         alt="返回顶部">
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
export default {
  data () {
    return {
      visible: true
    }
  },
  watch: {
    $route: {
      handler (n) {
        if (n.meta.flag === false) {
          this.visible = false
        }
        if (n.meta.flag === undefined) {
          this.visible = true // 没设置meta的meta就是undefined，再返回该页面的时候，visible就是false
        }
      },
      deep: true,
      immediate: true
    }
  },
  components: {
    Navbar
  },
  directives: {// 返回顶部
    scroll () { // 按钮显示隐藏
      window.onscroll = function () {
        var sctop = document.documentElement.scrollTop || document.body.scrollTop
        var backtop = document.getElementsByClassName('backtop')[0]
        if (sctop > 600) {
          backtop.style.display = 'block'
        } else {
          backtop.style.display = 'none'
        }
      }
    },
    backTop (el) {
      el.onclick = function () {
        var timer = setInterval(() => {
          var sctop = document.documentElement.scrollTop || document.body.scrollTop
          if (sctop > 0) {
            var step = sctop / 10
            sctop -= step
            document.documentElement.scrollTop = sctop
            document.body.scrollTop = sctop
          } else {
            clearInterval(timer)
          }
        }, 20)
      }
    }
  }
}
</script>
<style>
  @import "~@/assets/css/reset.css";
  .backtop {
    position: fixed;
    display: none;
    bottom: 1rem;
    right: 0.4rem;
    width: 0.75rem;
    margin: 0 auto;
  }
</style>
