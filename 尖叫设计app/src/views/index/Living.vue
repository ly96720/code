<template>
  <div>
    <van-swipe class="box"
               v-if="data3[0].moduleContent.banners"
               :autoplay="3000"
               indicator-color="white">
      <van-swipe-item v-for="(item,index) in data3[0].moduleContent.banners"
                      :key="index">
        <img :src="item.bannerImgSrc"
             alt="">
      </van-swipe-item>
    </van-swipe>
    <h1 class="h1">{{data3[1].moduleName}}</h1>
    <h3 class="h3">{{data3[1].moduleDescription}}</h3>
    <div class="swiper-container"
         v-if="data3[1].moduleContent.products">
      <div class="swiper-wrapper">
        <div class="swiper-slide swiper">
          <dl v-for="(item,index) in data3[1].moduleContent.products"
              :key="index">
            <img :src="item.productImg"
                 alt="">
            <dt>{{item.productTitle}}</dt>
            <dd>￥{{item.sellPrice}}</dd>
          </dl>
        </div>
      </div>
    </div>
    <div class='LookMore'>查看全部</div>

    <h1 class="h1">{{data3[2].moduleName}}</h1>
    <h3 class="h3">{{data3[2].moduleDescription}}</h3>
    <div class="main">
      <dl v-for="(item,index) in data3[2].moduleContent.products"
          :key="index">
        <img :src="item.productImg"
             alt="">
        <dd>{{item.productTitle}}</dd>
        <dt>￥{{item.sellPrice}}</dt>
      </dl>
    </div>
    <div class='LookMore'>查看全部</div>

    <h1 class="h1">{{data3[3].moduleName}}</h1>
    <h3 class="h3">{{data3[3].moduleDescription}}</h3>
    <div class="main">
      <dl v-for="(item,index) in data3[3].moduleContent.products"
          :key="index">
        <img :src="item.productImg"
             alt="">
        <dd>{{item.productTitle}}</dd>
        <dt>￥{{item.sellPrice}}</dt>
      </dl>
    </div>
    <div class='LookMore'>查看全部</div>
    <div class="end">这已经到底了</div>

  </div>
</template>

<script>
import { getData1 } from '@/API/index'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  data () {
    return {
      data3: []
    }
  },
  updated () {
    this.$nextTick(() => {
      this.init()
    })
  },
  created () {
    this.get3(10006, 1)
  },
  methods: {
    get3 (tabId, currentPage) {
      getData1(tabId, currentPage).then(res => {
        this.data3 = res.modules
      })
    },
    init () {
    // eslint-disable-next-line no-unused-vars
      var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 20,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: false, // 修改swiper的父元素时，自动初始化swiper
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.swiper-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.swiper-slide {
  text-align: center;
  background: #fff;
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
}
.swiper {
  background-color: white;
  dl {
    padding-right: 0.2rem;
    img {
      display: inline-block;
      width: 1.8rem;
      height: 1.8rem;
    }
    dt {
      font-size: 0.24rem;
      color: #808080;
      width: 1.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    dd {
      font-size: 0.24rem;
    }
  }
}
.end {
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background-color: white;
  margin-bottom: 0.88rem;
  margin-top: -0.3rem;
}
.LookMore {
  margin-bottom: 0.3rem;
  text-align: center;
  padding: 0.3rem 0.4rem;
  font-size: 0.24rem;
  color: #4a4a4a;
  background: white url("~@/assets/img/arrow.png") no-repeat 4.3rem center;
  background-size: 2%;
  line-height: 0.32rem;
}
.body {
  background-color: #f5f5f5;
  .hot {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0.3rem;
    img {
      width: 1.5rem;
      height: 1.77rem;
      display: inline-block;
    }
  }
  .main {
    background-color: #fff;
    display: grid;
    grid-template-columns: repeat(2, 50%);
    dl {
      border-bottom: 1px solid #f5f5f5;
      border-right: 1px solid #f5f5f5;
      width: 3.73rem;
      height: 5rem;
      position: relative;
      margin-top: 0.2rem;
      font-size: 0;
      img {
        width: 3.73rem;
        height: 3.73rem;
        display: inline-block;
        background-color: white;
      }
      dt {
        color: black;
        font-weight: 800;
        font-size: 0.32rem;
        padding: 0.1rem 0.32rem;
      }
      dd {
        font-size: 0.28rem;
        padding: 0.1rem 0.32rem;
        color: #808080;
        margin-right: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .h1 {
    background-color: white;
    text-align: center;
    font-weight: bold;
    font-size: 0.36rem;
    color: #333;
    padding: 0.56rem 0 0.3rem 0;
  }
  .h3 {
    font-size: 0.24rem;
    color: #808080;
    padding-bottom: 0.2rem;
    text-align: center;
    background-color: white;
  }

  .box {
    width: 100%;
    height: 4.98rem;
    margin-bottom: 0.3rem;
    position: relative;
    overflow: hidden;
    img {
      display: inline-block;
      position: absolute;
      width: 100%;
    }
  }
}
</style>
