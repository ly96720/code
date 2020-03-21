<template>
  <div class="body"
       v-if="arr">
    <div class="head">
      <i class='iconfont icon-zuo'
         @click='back'></i>
      <span>{{moivename}}</span>
      <i class='iconfont icon-chaxun1'> </i>
    </div>
    <div class="selectDay">
      <div class="swiper-container gallery-thumbs"
           :key='index'>
        <div class="swiper-wrapper">
          <div class="swiper-slide"
               @click="changeIndex(index)"
               v-for="(item,index) in weekday"
               :key='index'>{{time(item.showDate)}}</div>
        </div>
      </div>
      <div class="swiper-button-next swiper-button-white"></div>
      <div class="swiper-button-prev swiper-button-white"></div>
    </div>
    <div class="find">
      <div>全城<i class="iconfont icon-xia"></i></div>
      <div>最近<i class="iconfont icon-xia"></i></div>
    </div>
    <div class="swiper-container gallery-top">
      <div class="swiper-wrapper">
        <div class="dl"
             v-for="(item,index) in arr"
             @click='goBuyMoive(item)'
             :key='index'>
          <dd><span class="name">{{item.name}}</span><i class="price">￥{{item.lowPrice|price}}起</i></dd>
          <dd><span class="area">{{item.address}}</span><i class="dis">距离{{item.Distance|dis}}米</i></dd>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getcinema, getCinema } from '@/utils/index'
import { mapGetters } from 'vuex'
import Swiper from 'swiper'
export default {
  data () {
    return {
      index: 0, // 改变日期的索引
      week: [], // 星期数据存储
      weekday: [],
      filmId: 0, // 电影Id
      moivename: this.$store.state.detail_arr.name,
      arr: [], // 存某电影院的里的一堆电影信息数组
      cinemaId: ''// 某电影院的id ，作为参数，用来请求改电影院拥有的电影
    }
  },
  methods: {
    // 跳转到买票的页面、
    goBuyMoive (item) {
      this.$router.push({ name: 'buymovie', params: { item }, query: { a: Date.now() } })
    },
    // 改变index,为了改变请求的上映的日期
    changeIndex (index) {
      this.getData(index)
    },
    // 初始化轮播图
    init () {
      var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 30,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      })
      // eslint-disable-next-line no-unused-vars
      var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        thumbs: {
          swiper: galleryThumbs
        }
      })
    },
    // 返回
    back () {
      history.go(-1)
    },
    // 请求未来一周上映的电影信息，通过index来改变请求的接口
    async  getData (index) {
      let a = await getCinema(this.filmId, this.cityId)
      this.weekday = a.data.showCinemas
      this.cinemaId = a.data.showCinemas[index].cinemaList.join(',')
      if (a) {
        let res = await getcinema(this.cityId, this.cinemaId)
        if (res) {
          this.arr = res.data.cinemas
        }
      }
    },
    time (p) {
      var times = new Date(p * 1000)
      var day = times.getDate()
      var month = times.getMonth() + 1
      return month + '月' + day + '日'
    }
  },
  filters: {
    price: function (v) {
      // console.log(v)
      return v.toString().substr(0, 2)
      // 处理字符串格式
    },
    dis: function (v) {
      return v.toFixed(2)
      // 保留两位数字
    }
  },

  watch: {
    $route: {
      handler (n) {
        // 获取电影详情页传来的电影ID
        this.filmId = n.query.filmId
        // 请求电影信息  调用
        this.getData(this.index)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    // 获取城市id  作为请求存某电影院的里电影信息的参数
    ...mapGetters(['cityId'])
  },
  created () {
    // 请求电影信息  调用 怕失误，调用两次
    // this.getData(this.index)
  },
  updated () {
    console.log(this.arr)
  },
  mounted () {
    // 初始化轮播图
    // this.dealWeekday()// 处理日期
    this.init()
  }
}
</script>

<style lang='scss' scoped>
.body {
  position: relative;
  .swiper-container {
    width: 100%;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .gallery-top {
    background-color: white;
    margin-top: 2.8rem;
    height: 80%;
    .swiper-wrapper {
      display: flex;
      flex-direction: column;
    }
  }
  .gallery-thumbs {
    padding-right: 0.4rem;
    position: absolute;
    top: 0.88rem;
    background-color: white;
    height: 0.88rem;
    line-height: 0.88rem;
  }
  .gallery-thumbs .swiper-slide {
    height: 100%;
    width: 25%;
  }
  .gallery-thumbs .swiper-slide-thumb-active {
    color: #ff5f16;
    border-bottom: 0.1rem solid #ff5f16;
  }
  .find {
    background-color: white;
    position: absolute;
    top: 1.77rem;
    width: 100%;
    height: 0.98rem;
    line-height: 0.98rem;
    z-index: 99999999;
    div {
      font-size: 0.28rem;
      line-height: 0.98rem;
      text-align: center;
      color: #191a1b;
      float: left;
      width: 50%;
      i {
        vertical-align: middle;
        padding-left: 0.04rem;
      }
    }
  }
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  .head {
    position: fixed;
    background: #fff;
    z-index: 99999;
    .icon-zuo {
      font-size: 0.36rem;
    }
    i {
      display: inline-block;
      width: 1.12rem;
      height: 0.88rem;
      font-size: 0.52rem;
    }
    span {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      color: #191a1b;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      font-size: 0.34rem;
    }
    display: flex;
    line-height: 0.88rem;
    height: 0.88rem;
    width: 100%;
  }
  .dl {
    width: 96%;
    height: 0.9rem;
    padding: 0.4rem 0;
    dd {
      width: 100%;
      height: 0.6rem;
      line-height: 0.3rem;
      .dis {
        font-size: 0.2rem;
      }
      .price {
        color: #ff5f16;
        font-size: 0.3rem;
      }
      .name {
        font-size: 0.3rem;
      }
      .area {
        font-size: 0.26rem;
      }
      span {
        padding-left: 0.2rem;
        text-align: left;
        float: left;
        width: 5rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      i {
        float: right;
      }
    }
  }
}
</style>
