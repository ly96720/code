<template>
  <div class="body">
    <Carousel />
    <router-link class="location"
                 to='/locate'
                 @click.native='postData'>
      <span class="local">{{cityname|sub}}</span>
      <i class="iconfont icon-xia"></i>
    </router-link>
    <div class="head"
         v-scroll>
      <router-link class="location1"
                   to='/locate'
                   @click.native='postData'>
        <span class="i">{{cityname|sub}}<i class="iconfont icon-xia"></i></span>

      </router-link>
      <span class="zi">电影</span>
    </div>
    <div class="box"
         id="box">
      <router-link @click.native='change'
                   to='/list/list1'>
        <!-- ,{red:isBorder} -->
        <span>正在热映</span>
      </router-link>
      <router-link @click.native='change'
                   to='/list/list2'>
        <span>即将上映</span>
      </router-link>
      <span class="bottom"
            v-slider='a'></span>
      <i class="iconfont icon-fanhuidingbu2"
         v-backTop></i>
    </div>
    <router-view class="list"></router-view>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import { mapGetters, mapState } from 'vuex'

export default {
  filters: {
    sub: function (v) {
      if (v) {
        return v.substr(0, 2)
      } else {
        return ''
      }
    }
  },
  directives: {
    // 滑动黄条
    slider (el, binding) {
      el.style.left = binding.value.route === '/list/list1' ? 1.3 + 'rem' : 5 + 'rem'
    },
    // 返回顶部
    backTop (el, binding) {
      el.onclick = function () {
        var scTop = document.documentElement.scrollTop || document.body.scrollTop
        var timer = setInterval(() => {
          if (scTop > 10) {
            var step = scTop / 10
            scTop = scTop - step
            document.documentElement.scrollTop = scTop
            document.body.scrollTop = scTop
          } else {
            clearInterval(timer)
          }
        }, 20)
      }
    },
    // 滚动出现顶部
    scroll (el, binding) {
      var back
      window.addEventListener('scroll', function () {
        back = document.getElementsByClassName('icon-fanhuidingbu2')[0]
        var scTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scTop > 100) {
          el.style.display = 'block'
          back.style.display = 'block'
        } else {
          el.style.display = 'none'
          back.style.display = 'none'
        }
      })
    }
  },
  watch: {
    $route: {
      handler (n) {
        this.a.route = n.path
        if (n.path === '/' || n.path === '/list') {
          // 如果是首页，则自动跳到list页的list1组件
          this.$router.push('/list/list1')
        }
      },
      deep: true,
      immediate: true
    }
  },
  components: {
    Carousel
  },
  // mounted () {
  //   console.log(this.cityData)
  // },
  data () {
    return {
      type: 1,
      isBorder: true,
      a: {
        route: '/list/list1'
      }
    }
  },
  computed: {
    ...mapState({
      'arr': 'list',
      'cityData': 'city'
    }),
    ...mapGetters({
      'cityname': 'cityName'
    })
  },
  methods: {
    postData () {
      this.$router.push({ name: 'locate', params: { cityname: this.cityname }, query: { a: Date.now() } })
    },
    change (type) {
      this.isBorder = !this.isBorder
    }
  }
}
</script>
<style lang='scss' scoped>
.body {
  position: relative;
  a.router-link-active {
    color: #ff5f16;
  }
  .head {
    transition: 0.3s;
    display: none;
    width: 100%;
    height: 0.88rem;
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99119;
    .i{
      text-align: left;
      position: relative;
      top: 0;
      left: -3rem;
    }
    .zi {
      text-align: center;
      display: inline-block;
      line-height: 0.88rem;
      color: black;
      position: relative;
      z-index: 9999;
    }
    .location1 {
      position: fixed;
      background: white;
      top: 0;
      left: 0;
      font-size: 0.26rem;
      width:100%;
      height: 0.88rem;
      line-height: 0.88rem;
    }
  }
  .location {
    position: absolute;
    top: 0.36rem;
    left: 0.14rem;
    color: #fff;
    z-index: 10;
    font-size: 0.26rem;
    width: 1rem;
    background: rgba(0, 0, 0, 0.2);
    height: 0.6rem;
    line-height: 0.6rem;
    border-radius: 0.3rem;
    text-align: center;
    padding: 0 0.1rem;
  }
  .red {
    color: #ff5f16;
  }
  a {
    background-color: white;
    width: 100%;
    height: 1rem;
    display: inline-block;
    font-size: 0.28rem;
    color: black;
  }
  .box {
    position: sticky;
    left: 0;
    top: 0.84rem;
    z-index: 11111;
    background-color: #fff;
    .icon-fanhuidingbu2 {
      position: fixed;
      right: 0.7rem;
      bottom: 0.8rem;
      font-size: 0.5rem;
      color: black;
      display: none;
    }
    .bottom {
      width: 1.2rem;
      height: 0.04rem;
      position: relative;
      top: -0.05rem;
      left: 1.3rem;
      background-color: #ff5f16;
      transition: 0.5s;
    }
    width: 100%;
    height: 1rem;
    span {
      width: 1.2rem;
      height: 1rem;
      display: inline-block;
    }
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 50%);
    justify-content: center;
  }
  // .border {
  //   border-bottom: 0.04rem solid #ff5f16;
  // }
  .list {
    margin-bottom: 1.5rem;
    background-color: white;
  }
}
</style>
