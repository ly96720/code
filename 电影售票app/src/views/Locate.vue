<template>
  <div class="body">
    <div class="head">
      <i class="iconfont icon-close1"
         @click='close'></i>
      <span>当前城市 -</span>
      <i class="iconfont "></i>
    </div>
    <div class="search">
      <i class="iconfont icon-chaxun1"></i>
      <input type="text"
             placeholder="输入城市名或拼音">
    </div>
    <div class="content">
      <div class="selectCity">
        <p class="GPS">GPS定位你所在的城市</p>
        <div class="fail">{{cityname?cityname:'定位失败'}}</div>
        <p class="GPS">热门城市</p>
        <ul>
          <li @click='deliverCity(item)'
              v-for="(item,index) in hotCity()"
              :key='index'>{{item.name}}</li>
        </ul>
      </div>
      <van-index-bar :index-list="letter"
                     v-if='cities.length'
                     sticky-offset-top='90'>
        <!-- sticky-offset-top 吸顶式与顶部的距离 -->
        <div v-for="item in letter"
             :key='item'>
          <van-index-anchor :index="item">{{item}}
          </van-index-anchor>
          <van-cell :title="ele.name"
                    v-for="(ele,index) in divideCity(item)"
                    :key='index'
                    @click='deliverCity(ele)' />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>

import { getcity } from '@/utils/index'
export default {
  data () {
    return {
      cityname: '',
      cities: [],
      letter: [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ]
    }
  },
  watch: {
    $route: {
      handler (n) {
        this.cityname = n.params.cityname
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    this.$store.dispatch('get1')
    this.init()
  },
  methods: {
    async init () {
      let a = await getcity()
      if (a.data.cities.length > 0) {
        this.cities = a.data.cities
      }
    },
    // 向vuex传递你点击的城市的信息去取代自定位的城市信息
    deliverCity (city) {
      this.$store.commit('pushCityId', city)
      history.go(-1)
    },
    hotCity () {
      return this.cities.filter(item => item.isHot === 1)
    },
    divideCity (zm/* 每个字母 */) {
      return this.cities.filter(item => item.pinyin.substr(0, 1) === zm.toLowerCase())
    },
    close () {
      history.go(-1)
    }
  },
  mounted () {
    console.log(this.divideCity())
  }
}

</script>

<style lang='scss' scoped>
.body {
  // .van-index-anchor{
  //   // .a{
  //     float: left!important;
  //   // }
  // }
  .content {
    .divide {
      width: 100%;
      height: 0.5rem;
      background-color: #f4f4f4;
      text-align: left;
      line-height: 0.5rem;
      padding-left: 0.4rem;
    }
    .main {
      li {
        padding-left: 0.3rem;
        background-color: #fff;
        height: 0.96rem;
        line-height: 0.96rem;
        font-size: 0.28rem;
        text-align: left;
        border-bottom: 0.02rem solid #ececec;
      }
    }
    margin: 1.94rem 0 0 0;
    overflow-y: auto;
    .selectCity {
      padding-left: 0.3rem;
      width: 6.86rem;
      height: 3.8rem;
      background-color: white;
      .GPS {
        margin-top: 0.15rem;
        font-size: 13px;
        color: #797d82;
        margin-bottom: 10px;
        text-align: left;
        line-height: 0.5rem;
      }
      .fail {
        height: 0.6rem;
        background-color: #f4f4f4;
        line-height: 0.6rem;
        border-radius: 0.06rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0 0.15rem;
        width: 1.98rem;
        font-size: 0.28rem;
        color: #191a1b;
      }

      ul {
        display: grid;
        grid-template-columns: 33% 33% 33%;
        li {
          height: 0.6rem;
          background-color: #f4f4f4;
          line-height: 0.6rem;
          border-radius: 0.06rem;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin: 0 0.15rem;
          font-size: 0.28rem;
          color: #191a1b;
          width: 1.98rem;
          text-align: center;
          margin-bottom: 0.3rem;
        }
      }
    }
  }
  .search {
    background-color: #f4f4f4;
    position: fixed;
    padding-top: 0.25rem;
    top: 0.88rem;
    height: 0.8rem;
    width: 100%;
    display: block;
    z-index: 999;
    i {
      position: absolute;
      left: 0.4rem;
      top: 0.35rem;
      font-size: 0.35rem;
    }
    input {
      font-size: 0.24rem;
      height: 0.6rem;
      width: 6.9rem;
      border: 0;
      text-indent: 0.8rem;
      color: #424b55;
    }
  }
  .head {
    i {
      position: fixed;
      left: 0.2rem;
      font-size: 0.5rem;
      padding-left: 0.1rem;
    }
    background-color: white;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.88rem;
    overflow: hidden;
    margin: 0;
    padding: 0;
    z-index: 300;
    line-height: 0.88rem;
    font-size: 0.34rem;
  }
}
</style>
