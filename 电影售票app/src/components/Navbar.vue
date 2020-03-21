<template>
  <div>
    <div class="nav">
      <router-link class="navList"
                   v-for="item in arr"
                   :key="item.path"
                   :to='item.path'>
        <dl @click='change(item)'>
          <dt><img :src="item.flag?item.img1:item.img2"
                 alt=""></dt>
          <dd :class="{color:!item.flag}">{{item.name}}</dd>
        </dl>
      </router-link>

    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    change (item) {
      this.arr.forEach(item => {
        item.flag = true
      })
      item.flag = false
    }
  },
  data () {
    return {
      arr: [
        {
          path: '/',
          name: '首页',
          img1: require('@/assets/img/11.png'),
          img2: require('@/assets/img/1.png'),
          flag: false
        },
        {
          path: '/cinema',
          name: '影院',
          img1: require('@/assets/img/22.png'),
          img2: require('@/assets/img/2.png'),
          flag: true

        }, {
          path: '/new',
          name: '资讯',
          img1: require('@/assets/img/33.png'),
          img2: require('@/assets/img/1.png'),
          flag: true

        }, {
          path: '/my',
          name: '我的',
          img1: require('@/assets/img/44.png'),
          img2: require('@/assets/img/4.png'),
          flag: true
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.color {
  color: #ff5f16;
}
a.router-link-active {
  color: #ff5f16;
}
.nav {
  position: relative;
  z-index: 999;
  padding-top: 0.1rem;
  width: 100.5%;
  height: 1rem;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  align-items: center;
  font-size: 0.2rem;
  .navList {
    color: black;
    dl {
      img {
        width: 0.42rem;
        height: 0.42rem;
        display: inline-block;
      }
      dd {
        line-height: 0.56rem;
      }
    }
  }
}
a {
  &.router-link-active {
    color: red;
  }
}
</style>
