<template>
  <div>
   <div class="swiper-container"
         v-if="data2[1].moduleContent.products">
      <div class="swiper-wrapper">
        <div class="swiper-slide swiper">
          <dl v-for="(item,index) in data2[1].moduleContent.products"
              :key="index">
            <img :src="item.productImg"
                 alt="">
            <dt>{{item.productTitle}}</dt>
            <dd>￥{{item.sellPrice}}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import { getData1 } from '@/API/index'
export default {
  data () {
    return {
      data2: []
    }
  },
  created () {
    this.get2(10005, 1)
  },
  mounted () {
    this.init()
  },
  methods: {
    get2 (tabId, currentPage) {
      getData1(tabId, currentPage).then(res => {
        this.data2 = res.modules
      })
    },
    init () {
      // eslint-disable-next-line no-unused-vars
      var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        observer: true,
        observeParents: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    } }
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
</style>
