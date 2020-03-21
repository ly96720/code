<template>
  <div class="body">
    <i class="iconfont icon-left"
       @click="back"></i>
    <div class="name">{{cinameInfor.name}}</div>
    <div class="addr">
      <i class="iconfont icon-buoumaotubiao23"></i>
      <span class="address">{{cinameInfor.address}}</span>
      <i class="iconfont icon-tel"></i>
    </div>
    <main class="swiper-container">
      <img class='img1'
           src="../assets/img/sanjiao.png"
           alt="">
      <div class="bg"
           :style="{'background':'url('+buyMovie[imgIndex?imgIndex:0].poster+')'}"></div>
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for="(item,index) in buyMovie"
             :key='index'>
          <img :src="item.poster">
        </div>
      </div>
    </main>
    <div class="mv_name">
      <div>{{m.name}}<i>7</i><span>分</span></div>
      <i class="iconfont icon-you"
         @click="jump_detail"></i>
      <p>{{m.category}} | {{m.runtime}}分钟 | <span v-for="(item,index) in m.actors"
              :key='index'>{{item.name}}</span></p>
    </div>
    <van-tabs v-model="active"
              animated
              v-if="movieShowInfo">
      <van-tab :title="times(item)"
               v-for="(item,index) in movie.showDate"
               :key='index'>
        <div class="showtime">
          <div v-for="(item,index) in movieShowInfo"
               :key='index'
               class="showM">
            <div class="left">
              <div>{{time2(item.showAt)}}</div>
              <div>{{time2(item.endAt)}}散场</div>
            </div>
            <div class="middle">
              <div>{{item.filmLanguage}}{{item.imagery}}</div>
              <div>{{item.hallName}}</div>
            </div>
            <div class="right">

              <div>￥{{item.salePrice|price}}</div>
              <div class="buyc"
                   @click="gotoBuyTiket(item)">购票</div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Swiper from 'swiper'
import { getMoive, getDyy } from '@/utils/index'
import { mapState } from 'vuex'
export default {
  filters: {
    price (v) {
      let a = v.toString().substr(0, 2)
      return a
    }
  },
  created () {
    this.getData()
    this.getMoiveTime(0)
  },
  data () {
    return {
      active: 0,
      bgImgUrl: {
        bg: ''
      },
      cinameInfor: [], // 城市以及对应具体某电影信息数组
      cinemaId: 0, // 某城市某电影院Id
      buyMovie: [],
      index: 0,
      m: '',
      i: 0,
      zhuanhuan: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      a: ''
    }
  },
  watch: {
    $route: {
      handler (n) {
        this.getData()
        this.cinameInfor = n.params.item
        this.cinemaId = n.params.item.cinemaId ? n.params.item.cinemaId : JSON.parse(localStorage.getItem('buyMovie')).cinemaId
      },
      deep: true,
      immediate: true
    },
    active (n, o) {
      this.getMoiveTime(n)
    },
    buyMovie: {
      handler (n) {
        if (n.length > 0) {
          this.init()
          this.m = this.buyMovie[0]
          this.bgImgUrl.bg = this.buyMovie[0].poster
          this.sendMovie(this.buyMovie[0])
        }
      },
      deep: true,
      immediate: true
    },
    movie: {
      handler (n) {
        this.m = this.m ? this.movie : this.buyMovie[0]
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    // this.init()
  },
  computed: {
    ...mapState(['movie', 'movieShowInfo', 'imgIndex'])
  },
  methods: {
    gotoBuyTiket (item) {
      let token = this.$cookies.get('token')
      if (!token) {
        this.$router.push('/login')
      } else {
        this.$router.push('/seat/' + item.scheduleId)
      }
    },
    sendMovie (item) {
      this.getMoiveTime(this.i)
      this.$store.commit('getMoive', item)
    },
    jump_detail () {
      this.$router.push({ name: 'detail', params: { id: this.movie.filmId } })
    },
    async getMoiveTime (i) {
      console.log(this.movie.filmId, this.cinameInfor.cinemaId, this.movie.showDate[i])
      let a = await getDyy(this.movie.filmId, this.cinameInfor.cinemaId, this.movie.showDate[i])
      if (a) {
        this.$store.commit('getShowInfo', a.data.schedules)
      }
    },
    times (time) {
      var now = new Date()
      var shijian = new Date(time * 1000)
      var mon = shijian.getMonth() + 1
      var day = shijian.getDate()
      var xing = this.zhuanhuan[shijian.getDay()]
      var index = day - now.getDate()
      if (index === 0) {
        xing = '今天'
      } else if (index === 1) {
        xing = '明天'
      } else if (index === 2) {
        xing = '后天'
      }
      return xing + mon + '月' + day + '日'
    },
    time2 (t) {
      var date = new Date(t)
      var hour = date.getHours()
      var minutes = date.getMinutes()
      hour = hour < 10 ? '0' + hour : hour
      minutes = minutes < 10 ? '0' + minutes : minutes
      return hour + ':' + minutes
    },
    async getData () {
      let res = await getMoive(this.cinemaId)
      if (res) {
        this.buyMovie = res.data.films
      }
    },
    init () {
      var that = this
      // eslint-disable-next-line no-unused-vars
      var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        observer: true,
        z: true,
        observeSlideChildren: true,
        centeredSlides: true,
        loop: false,
        on: {
          slideChangeTransitionEnd: function a () {
            that.bgImgUrl.bg = that.buyMovie[this.activeIndex].poster
            that.sendMovie(that.buyMovie[this.activeIndex])
            that.$store.commit('getIndex', this.activeIndex)
          }
        }
      })
    },
    back () {
      history.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped>
.body {
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  .showM {
    font-family: Microsoft YaHei, Tahoma, Helvetica, Arial, sans-serif;
    line-height: 25px;
    height: 0.9rem;
    padding: 0.3rem;
    position: relative;
    background: #fff;
    .left {
      float: left;
      width: 2rem;
      div:nth-of-type(1) {
        font-size: 0.3rem;
        color: #191a1b;
      }
      div:nth-of-type(2) {
        font-size: 0.26rem;
        color: #797d82;
        margin-top: 0.04rem;
      }
    }
    .middle {
      float: left;
      width: calc(100% - 4.8rem);
      div:nth-of-type(1) {
        font-size: 0.3rem;
        color: #191a1b;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      div:nth-of-type(2) {
        font-size: 0.26rem;
        color: #797d82;
        margin-top: 0.04rem;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      float: right;
      padding: 0.2rem 0;
      line-height: 0.5rem;
      color: #ff5f16 !important;
      float: right;
      div:nth-of-type(1) {
        float: right;
        padding-right: 0.4rem;
        font-size: 0.3rem;
        color: #ff5f16;
      }
      div:nth-of-type(2) {
        height: 0.5rem;
        color: #ff5f16;
        width: 1rem;
        border-radius: 0.04rem;
        position: relative;
        text-align: center;
        font-size: 0.24rem;
      }
      div:nth-of-type(2):after {
        content: " ";
        -webkit-transform: scale(0.5);
        -ms-transform: scale(0.5);
        transform: scale(0.5);
        position: absolute;
        top: -50%;
        right: -50%;
        bottom: -50%;
        left: -50%;
        border: 0.02rem solid #ff5f16;
        border-radius: 0.08rem;
      }
    }
  }
  .swiper-container {
    position: relative;
  }
  .bg {
    filter: blur(15px);
    position: absolute;
    width: 100%;
    height: 3.5rem;
    top: -0.3rem;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    transition: 300ms;
    transform: scale(0.8);
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .swiper-slide-active,
  .swiper-slide-duplicate-active {
    transform: scale(1);
  }

  .icon-left {
    width: 100%;
    height: 0.88rem;
    display: block;
    padding-left: 0.2rem;
    font-size: 0.5rem;
    text-align: left;
    line-height: 0.88rem;
  }
  .name {
    position: relative;
    text-align: center;
    font-size: 0.34rem;
    color: #191a1b;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    // padding: 0 0.3rem;
    background: #fff;
    top: 0;
    height: 0.88rem;
    line-height: 0.88rem;
    z-index: 302;
  }
  .addr {
    padding-left: 0.34rem;
    display: flex;
    height: 1rem;
    line-height: 1rem;
    .address {
      font-size: 0.28rem;
      padding: 0 0.24rem;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icon-buoumaotubiao23 {
      width: 0.28rem;
      height: 0.34rem;
    }
    .icon-tel {
      height: 0.36rem;
      padding: 0 0.5rem;
    }
  }
  main {
    height: 2.6rem;
    padding: 0.3rem 0;
    // background-color: rgb(224, 245, 131);
    position: relative;
    .img1 {
      width: 0.4rem;
      height: 0.2rem;
      position: absolute;
      bottom: 0;
      right: 3.5rem;
      z-index: 11;
    }
  }
  .mv_name {
    width: 100%;
    background: #fff;
    // height: 1.3rem;
    padding: 0.3rem 0;
    position: relative;
    .icon-you {
      position: absolute;
      right: 0.4rem;
      top: 0.6rem;
      font-size: 0.22rem;
      color: #2c3e50;
    }
    div {
      span {
        font-size: 10px;
        color: #ffb232;
      }
      i {
        font-size: 16px;
        font-style: italic;
        color: #ffb232;
      }
      margin-bottom: 0.3rem;
      text-align: center;
      line-height: 0.36rem;
    }
    p {
      text-align: center;
      position: relative;
      z-index: 999;
      height: 0.36rem;
      color: #797d82;
      font-size: 0.26rem;
      padding: 0 12%;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
