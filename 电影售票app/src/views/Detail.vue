<template>
  <div class="body"
       v-if="arr">
    <img :src="arr.poster"
         alt="">
    <img class="back"
         @click='back'
         src="@/assets/img/5.png"
         alt="">
    <div class="box1"
         :class="[{height2:isTranslate},{height1:!isTranslate}]">
      <p class="name">{{arr.name}}<span>{{arr.grade}}</span></p>
      <p>{{arr.category|name}}</p>
      <p>{{arr.premiereAt|time}}上映</p>
      <p>{{arr.nation}} | {{arr.runtime}}分钟</p>
      <p :class="[{introduce:!isTranslate},{overFlow:isTranslate}]">{{arr.synopsis}}</p>
      <img class="xia"
           src="../assets/img/下.png"
           :class='{translate:isTranslate}'
           @click.self='change' />
    </div>
    <p class="actor1">演职人员</p>
    <div class="swiper-container1 boxx">
      <div class="swiper-wrapper">
        <dl class="swiper-slide"
            v-for="(item,index) in arr.actors"
            :key="index">
          <dd>
            <img :src="item.avatarAddress">
          </dd>
          <dt>{{item.name}}</dt>
          <span>{{item.role}}</span>
        </dl>
      </div>
    </div>
    <div>
      <p class="actor2">剧照</p><span></span>
    </div>
    <div class="swiper-container2">
      <div class="swiper-wrapper box2"
           :style='{width:arr.photos.length*+"rem"}'>
        <div class="swiper-slide"
             v-for="(ele,index1) in arr.photos"
             :key="index1">
          <img :src="ele" @click="changeShow(index1)">
        </div>

      </div>
      <van-image-preview v-model="show"
                         :images="arr.photos"
                         @change="onChange">
        <template v-slot:index>第{{ index+1 }}页</template>
      </van-image-preview>
    </div>
    <router-link @click.native='deliver'
                 to='/buylist'
                 class="buy" v-show="!show">
      选座购票
    </router-link>

  </div>
</template>

<script>
// class="iconfont icon-xia"
import Swiper from 'swiper'
export default {
  updated () {
    this.$nextTick(function () {
      this.init()
    })
  },
  filters: {// 过滤器处理数据格式
    time (v) {
      if (v) {
        var date = new Date(v * 1000)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        month = month > 10 ? month : '0' + month
        day = day > 10 ? day : '0' + day
        return year + '-' + month + '-' + day
      }
    },
    name: function (value) {
      if (value) {
        value = value.split('|').join(' | ')
        return value
      } else {
        return ''
      }
    }
  },
  methods: {
    changeShow (index) {
      this.index = index
      this.show = true
    },
    onChange (index) {
      this.index = index
    },
    init () {
      // eslint-disable-next-line no-unused-vars
      var swiper = new Swiper('.swiper-container1', {
        slidesPerView: 4,
        spaceBetween: 15,
        // freeMode: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      })
      // eslint-disable-next-line no-unused-vars
      var swiper1 = new Swiper('.swiper-container2', {
        slidesPerView: 2.5,
        spaceBetween: 15,
        // freeMode: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true

      })
    },
    change () {
      this.isTranslate = !this.isTranslate
    },
    deliver () {
      this.$router.push({ path: '/buylist', query: { filmId: this.arr.filmId } })
    },
    back () {
      this.$router.push('/list')
    }
  },
  data () {
    return {
      show: false,
      index: 0,
      isTranslate: false,
      id: 0
    }
  },
  computed: {
    arr () {
      return this.$store.state.detail_arr
    }
  },
  created () {
    this.$store.dispatch('get2', { id: this.id })
  },
  watch: {
    $route: {
      handler (n) {
        this.id = n.params.id
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss' scoped>
.body {
  .swiper-container2 {
    margin-bottom: 1.5rem;
    height: 2rem;
    width: 100%;
    background: #fff;
    overflow: hidden;
    position: relative;
    .swiper-slide {
      img {
        width: 3rem;
        height: 2rem;
      }
    }
  }
  background-color: #f4f4f4;
  .swiper-container1 {
    width: 100%;
    height: 100%;
    width: 100%;
    height: 2.85rem;
    .swiper-slide {
      text-align: center;
      background: #fff;
    }
  }
  .back {
    width: 0.6rem;
    height: 0.6rem;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
  }
  dl {
    img {
      width: 1.7rem;
      height: 2.34rem;
      display: inline-block;
    }
  }
  .actor1 {
    width: 100%;
    height: 0.45rem;
    padding: 0.3rem;
    background-color: white;
    margin-top: 0.2rem;
    font-size: 0.32rem;
    color: #191a1b;
    text-align: left;
  }

  .actor2 {
    width: 100%;
    height: 0.64rem;
    padding: 0.3rem;
    background-color: white;
    margin-top: 0.2rem;
    font-size: 0.32rem;
    color: #191a1b;
    text-align: left;
  }
  .height2 {
    overflow: hidden !important;
  }
  .height1 {
    height: 3.82rem !important;
  }
  .box1 {
    background-color: white;
    font-family: Microsoft YaHei;
    width: 100%;
    padding: 0.24rem 0.3rem 0.3rem 0.3rem;
    transition: all 0.3s;
    .xia {
      width: 0.16rem;
      height: 0.1rem;
      margin: 0.25rem auto;
    }
    .translate {
      transform: rotate(180deg) !important;
    }
    .introduce {
      margin-top: 0.22rem;
      width: 92%;
      height: 0.76rem;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 0.38rem;
    }
    .overFlow {
      margin-top: 0.22rem;
      width: 92%;
      display: block;
      overflow: hidden;
      line-height: 0.38rem;
    }
    p {
      text-align: left;
      font-size: 0.26rem;
      color: #797d82;
      margin-top: 0.2rem;
    }
    .name {
      margin-top: 0.06rem;
      color: #191a1b;
      font-size: 0.36rem;
      height: 0.48rem;
      line-height: 0.48rem;
      margin-right: 0.14rem;
    }
  }
  img {
    width: 100%;
    height: 4.22rem;
    display: block;
  }
  .boxx {
    padding-left: 0.3rem;
    width: 100%;
    height: 2.85rem;
    background-color: white;
    img {
      width: 1.7rem;
      height: 2.2rem;
      display: inline-block;
    }
    dl {
      display: grid;
    }
    dt {
      padding-top: 0.1rem;
      font-size: 0.24rem;
      color: #191a1b;
      width: 1.7rem;
      display: block;
    }
    span {
      font-size: 0.2rem;
      color: #797d82;
    }
  }

  .buy {
    width: 100%;
    height: 0.98rem;
    display: block;
    background-color: #ff5f16;
    position: fixed;
    z-index: 9999;
    left: 0;
    bottom: 0;
    line-height: 0.98rem;
    text-align: center;
    color: white;
  }
}
</style>
