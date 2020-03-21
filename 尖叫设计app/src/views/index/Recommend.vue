<template>
  <div v-if="data1"
       class="content1"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="10">
    <van-swipe class="box"
               :autoplay="3000"
               indicator-color="white">
      <van-swipe-item v-for="(item,index) in data1[0].moduleContent.banners"
                      :key="index">
        <img :src="item.bannerImgSrc"
             alt="">
      </van-swipe-item>
    </van-swipe>
    <img class="img1"
         :src="data1[1].moduleContent.bannerImgSrc"
         alt="">
    <div class="new">
      <img :src="item.bannerImgSrc"
           alt=""
           v-for="(item,index) in data1[2].moduleContent.banners"
           :key="index">
    </div>
    <img class="img2"
         :src="data1[3].moduleContent.bannerImgSrc"
         alt="">
    <img class="img3"
         :src="data1[4].moduleContent.bannerImgSrc"
         alt="">
    <img class="img4"
         :src="data1[5].moduleContent.bannerImgSrc"
         alt="">
    <img class="img5"
         :src="data1[6].moduleContent.bannerImgSrc"
         alt="">
    <div class="img6">
      <img :src="data1[7].moduleContent.banners[0].bannerImgSrc"
           alt=""
           class="big">
      <div class="product">
        <dl v-for="(item,index) in data1[7].moduleContent.products"
            :key="index">
          <img :src="item.productImg"
               alt="">
          <dt>{{item.productName}}</dt>
          <dd>￥{{item.sellPrice }}</dd>
        </dl>
      </div>
    </div>
    <div class="lazyload"
         v-if="list">
      <div v-for="(item,index) in list"
           :key="index">
        <div class="img6"
             v-if="item.moduleType===107">
          <img :src="item.moduleContent.banners[0].bannerImgSrc"
               alt=""
               class="big">
          <div class="product">
            <dl v-for="(ele,index) in item.moduleContent.products"
                :key="index">
              <img :src="ele.productImg"
                   alt="">
              <dt>{{ele.productName}}</dt>
              <dd>￥{{ele.sellPrice }}</dd>
            </dl>
          </div>
        </div>
        <img class="ban1"
             :src="item.moduleContent.bannerImgSrc"
             v-if="item.moduleType===201">
        <div class="container"
             v-if="item.moduleType===106">
          <img :src="ele.bannerImgSrc"
               v-for="(ele,i) in item.moduleContent.banners"
               :key="i">
        </div>
        <div class="pro"
             v-if="item.moduleType===104">
          <img :src="ele.bannerImgSrc"
               v-for="(ele,i) in item.moduleContent.banners"
               :key="i">
        </div>
      </div>
    </div>
    <div class="end" v-if="currentPage===9">这已经到底了</div>
  </div>
</template>

<script>
import { getData1 } from '@/API/index'
export default {
  data () {
    return {
      data1: [],
      loading: false,
      list: [],
      currentPage: 2
    }
  },
  created () {
    this.get1(1, 1)
  },
  methods: {
    loadMore () {
      this.get(1, this.currentPage)
    },
    async  get (tabId, currentPage) {
      this.loading = true
      if (this.currentPage === 9) {
        return false
      }
      let res = await getData1(tabId, currentPage)
      if (res.modules) {
        this.list = this.list.concat(res.modules)
        this.currentPage++
        this.loading = false
      }
    },
    get1 (tabId, currentPage) {
      getData1(tabId, currentPage).then(res => {
        this.data1 = res.modules
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.end {
  width: 100%;
  line-height: 1rem;
  text-align: center;
  background-color: white;
  margin-bottom: 0.88rem;
  border-bottom: 0.02rem solid #f5f5f5;
}
.ban1 {
  width: 100%;
  margin-bottom: 0.3rem;
}
.container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  padding: 0.6rem 0 0.3rem;
  background-color: #fff;
  margin-bottom: 0.3rem;
}
img {
  width: 100%;
  display: block;
}
.pro {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  padding: 0.6rem 0.3rem 0.3rem;
  margin-bottom: 0.3rem;
  background-color: #fff;
}
.bigbox {
  width: 100%;
  background-color: white;
  .product {
    display: grid;
    grid-template-columns: repeat(3, 32%);
    margin-bottom: 0.3rem;
    background-color: #fff;
    dl {
      line-height: 0.36rem;
      padding-bottom: 0.3rem;
      dt {
        width: 100%;
        padding: 0 0.2rem;
        margin: 0.1rem 0rem 0rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-align: center;
      }
      dd {
        text-align: center;
      }
    }
  }
}

.swiper-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.swiper-slide {
  text-align: center;
}
.end {
  height: 50px;
  line-height: 50px;
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
  // overflow: auto;
  background-color: #f5f5f5;
  // .content2 {
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
  // }

  .content1 {
    .new {
      background-color: white;
      display: flex;
      justify-content: space-between;
      padding: 0.9rem 0.3rem 0rem;
      margin-bottom: 0.3rem;
      img {
        width: 2.1rem;
        height: 2.86rem;
      }
    }
    .img1 {
      width: 100%;
      height: auto;
      display: block;
      margin-bottom: 0.3rem;
    }
    .img2 {
      width: 100%;
      height: 1.36rem;
    }
    .img3 {
      width: 100%;
      height: 3.4rem;
      margin-bottom: 0.3rem;
    }
    .img4 {
      width: 100%;
      height: 3.4rem;
      margin-bottom: 0.3rem;
    }
    .img5 {
      width: 100%;
      height: 1.36rem;
      margin-bottom: 0.3rem;
    }
    .img6 {
      width: 100%;
      overflow: hidden;
      margin-bottom: 0.3rem;
      .big {
        width: 6.9rem;
        height: 4.22rem;
        background-color: white;
        padding: 0.9rem 0.3rem 0rem;
      }
      .product {
        text-align: center;
        display: flex;
        justify-content: space-between;
        width: 100%;
        background: #fff;
        padding-bottom: 0.3rem;
        img {
          width: 2.16rem;
          height: 2.16rem;
        }
        dd {
          line-height: 0.42rem;
        }
      }
    }
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
  .head {
    height: 0.88rem;
    line-height: 0.88rem;
    background-color: white;
    border-bottom: 0.01rem solid #ccc;
    padding: 0rem 0.2rem 0rem 0.2rem;
    border-bottom: 1px solid #f5f5f5;
    .icon-fangdajing {
      position: absolute;
      font-size: 0.24rem;
      z-index: 99;
      left: 1.74rem;
      top: -0.05rem;
      display: inline-block;
      margin: 0 0.1rem;
      color: black;
    }
    img {
      display: inline-block;
      width: 1.2rem;
      height: 0.3rem;
      margin-top: 0.06rem;
      margin-bottom: 0.06rem;
      vertical-align: middle;
    }
    input {
      font-size: 0.22rem;
      color: rgb(245, 245, 245);
      display: inline-block;
      text-indent: 3em;
      width: 5.4rem;
      height: 0.56rem;
      line-height: 0.56rem;
      vertical-align: middle;
      background-color: #f5f5f5;
      border-radius: 0.3rem;
      margin-left: 0.3rem;
      margin-bottom: 0.1rem;
      border: none;
    }
  }
  .van-tabs__line {
    background-color: black !important;
  }
  .backtop {
    position: fixed;
    display: none;
    bottom: 1rem;
    right: 0.4rem;
    width: 0.75rem;
    margin: 0 auto;
  }
}
</style>
