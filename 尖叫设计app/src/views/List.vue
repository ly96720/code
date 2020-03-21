<template>
  <div v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="30">
    <div class="head">
      <a href="/">
        <img src="../assets/img/home.png"
             alt=""></a>
      <h3>{{title}}</h3>
      <a href="/classify">
        <img src="../assets/img/category.png"
             alt=""></a>
    </div>
    <div class="category-swiper"
         v-if="bgimg"
         :style="{backgroundImage:'url('+bgimg+')'}">
      <div class="swiper-container"
           v-if="list">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
               :class="{active:item.flag}"
               @click="Myswitch(item)"
               v-for='(item,index) in list'
               :key='index'>{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="nav">
      <img @click="asc"
           class="up"
           :class="{opcity:isOpcity1}"
           src="../assets/img/up.png"
           alt="">
      <img @click="desc"
           class="down"
           :class="{opcity:isOpcity2}"
           src="../assets/img/down.png"
           alt="">
      <span @click="change(index)"
            v-for="(item,index) in arr"
            :class="{on:item.flag}"
            :key="index">{{item.name}}</span>
    </div>
    <div class="main"
         v-if="goods">
      <dl v-for="(item,index) in goods"
          @click="jumpDetail(item)"
          :key="index">
        <img :src="item.productImg"
             alt="">
        <dt>
          <p>{{item.productTitle}}</p>
          <span>￥{{item.sellPrice}}</span>
          <s>￥{{item.originalPrice}}</s>
        </dt>
      </dl>
    </div>
    <div class="end">这已经到底了</div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import { getClassify } from '@/API/index'
// import { mapState } from 'vuex'
export default {
  mounted () {
    this.init()
  },
  data () {
    return {
      arr: [
        { name: '上新', flag: true, sort: 'onShelfTime', order: 'desc' },
        { name: '销量', flag: false, sort: 'sales', order: 'desc' },
        { name: '价格', flag: false, sort: 'price', order: 'asc' }
      ],
      isOpcity1: false,
      isOpcity2: true,
      id: 0,
      title: '',
      type: 0,
      list: [],
      bgimg: '',
      goods: [],
      classify: [],
      loading: false,
      page: 1,
      sort: 'onShelfTime',
      order: 'desc',
      total: 4
    }
  },
  watch: {
    $route: {
      handler (n) {
        this.classify = JSON.parse(localStorage.getItem('classify'))
        this.id = Number(n.params.id)
        this.get(Number(n.params.id), 1, 'onShelfTime', 'desc')
        this.title = n.query.title
        this.type = n.query.type
        this.list = this.type === '0' ? this.classify.data[0].list : this.classify.data[1].list
        this.bgimg = this.type === '0' ? this.classify.data[0].bgimg : this.classify.data[1].bgimg
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    jumpDetail (item) {
      this.$router.push({ name: 'detail', params: { id: item.productId }, query: { parentProductId: item.parentProductId } })
    },
    Myswitch (item) {
      this.clear()
      this.id = item.id ? item.id : this.id
      this.get(this.id, 1, this.sort, this.order)
      this.list.map(ele => {
        ele.flag = false
      })
      item.flag = true
    },
    loadMore () {
      if (this.page >= this.total) {
        return false
      }
      this.get(this.id, this.page, this.sort, this.order)
    },
    get (id, page, sort, order) {
      this.loading = true
      getClassify(id, page, sort, order).then(res => {
        this.goods = this.goods.concat(res)
        console.log(this.goods)

        if (res) {
          this.loading = false
          this.page++
        }
      })
    },
    init () {
      // eslint-disable-next-line no-unused-vars
      var swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: false, // 修改swiper的父元素时，自动初始化swiper
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    },
    asc () {
      this.clear()
      this.isOpcity2 = true
      this.isOpcity1 = false
      this.get(this.id, this.page, 'price', 'asc')
    },
    desc () {
      this.clear()
      this.isOpcity1 = true
      this.isOpcity2 = false
      this.get(this.id, this.page, 'price', 'desc')
    },
    clear () {
      this.goods = []
      this.page = 1
    },
    change (index) {
      this.clear()
      this.isOpcity2 = true
      this.isOpcity1 = false
      this.sort = this.arr[index].sort
      this.order = this.arr[index].order
      this.get(this.id, this.page, this.sort, this.order)
      this.arr.map(item => {
        item.flag = false
      })
      this.arr[index].flag = !this.arr[index].flag
    }
  }
}
</script>

<style lang="scss" scoped>
.end {
  width: 100%;
  line-height: 1rem;
  text-align: center;
  background-color: white;
  margin-bottom: 0.88rem;
  border-bottom: 0.02rem solid #f5f5f5;
}
.main {
  dl {
    display: block;
    background-color: white;
    float: left;
    width: 49.8%;
    border-right: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    font-size: 0;
    padding-bottom: 0.1rem;
    height: 5.6rem;
    img {
      width: 100%;
    }
    dt {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      margin-bottom: 0.05rem;
      margin-left: 0.3rem;
      width: 88%;
      margin-top: 0.5rem;
      p {
        color: #808080;
        font-size: 0.25rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        line-height: 0.5rem;
      }
      span {
        font-family: PingFangSC-Regular;
        font-size: 0.26rem;
        color: #000;
        margin-right: 0.1rem;
      }
      s {
        text-decoration: line-through;
        font-family: PingFangSC-Regular;
        font-size: 0.22rem;
        color: #aaaaaa;
        margin-bottom: 0.05rem;
      }
    }
  }
}
.nav {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.02rem solid #f5f5f5;
  position: relative;
  .opcity {
    opacity: 0.6;
  }
  .up {
    position: absolute;
    right: 0.8rem;
    top: 0.32rem;
    width: 0.16rem;
    height: 0.1rem;
  }
  .down {
    position: absolute;
    right: 0.8rem;
    top: 0.42rem;
    width: 0.16rem;
    height: 0.1rem;
  }
  .on {
    border-bottom: 0.06rem solid #202020;
    color: #000;
    height: 0.8rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  span {
    color: #808080;
    margin: 0rem 0.75rem;
    font-size: 0.26rem;
    width: 1rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
  }
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.active {
  background: rgba(255, 255, 255, 0.2) !important;
  border: 0.02rem solid rgba(255, 255, 255, 1) !important;
}
.swiper-slide {
  align-items: center;
  width: 1.6rem;
  height: 1.6rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
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
  font-size: 0.26rem;
  font-weight: 700;
  color: #fff;
  margin-left: 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.head {
  display: flex;
  justify-content: space-between;
  h3 {
    font-size: 0.34rem;
    line-height: 0.88rem;
    font-weight: bold;
  }
  img {
    display: inline-block;
    width: 0.52rem;
    height: 0.52rem;
    margin-top: 0.06rem;
    margin-bottom: 0.06rem;
    margin: auto 0;
  }
  background: #fff;
  height: 0.88rem;
  line-height: 0.88rem;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  position: relative;
  padding: 0rem 0.2rem 0rem 0.2rem;
  border-bottom: 1px solid #f5f5f5;
}
.category-swiper {
  background-size: 7.5rem;
  position: relative;
  height: 1.6rem;
  padding: 0.3rem 0rem;
}
</style>
