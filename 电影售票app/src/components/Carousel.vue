<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
           v-for="item in lunbo"
           :key='item.bannerId'>
        <img :src="item.imgUrl">
      </div>
    </div>
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->
    <!-- <div class="swiper-scrollbar"></div> -->
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  mounted () {
    // eslint-disable-next-line no-unused-vars
    var mySwiper = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      scrollbar: {
        el: '.swiper-scrollbar'
      },
      autoplay: {
        delay: 1000,
        stopOnLastSlide: false,
        disableOnInteraction: true
      }
    })
  },
  computed: {
    lunbo () {
      return this.$store.state.lunbo
    }
  },
  created () {
    this.$store.dispatch('get4')
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/css/swiper.min.css";
.swiper-container {
  img {
    width: 100%;
    height: 3.75rem;
    display: inline-block;
  }
  width: 100%;
  height: 3.75rem;
}
</style>
