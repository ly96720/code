<template>
  <div v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="30">
    <div class="nav">
      <img @click="asc"
           class="up"
           :class="{opcity:isOpcity1}"
           src="@/assets/img/up.png"
           alt="">
      <img @click="desc"
           class="down"
           :class="{opcity:isOpcity2}"
           src="@/assets/img/down.png"
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
import { getSearch } from '@/API/index'
export default {
  data () {
    return {
      arr: [
        { name: '上新', flag: true, sort: 'onShelfTime', order: 'desc' },
        { name: '销量', flag: false, sort: 'sales', order: 'desc' },
        { name: '价格', flag: false, sort: 'price', order: 'asc' }
      ],
      isOpcity1: false,
      isOpcity2: true,
      keyword: 0,
      list: [],
      goods: [],
      loading: false,
      page: 1,
      sort: 'onShelfTime',
      order: 'desc',
      total: 5
    }
  },
  watch: {
    $route: {
      handler (n) {
        this.keyword = encodeURI(n.params.keyword)
        this.get(this.keyword, 'onShelfTime', 'desc', 1)
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
      this.get(this.keyword, this.sort, this.order, this.page)
      this.list.map(ele => {
        ele.flag = false
      })
      item.flag = true
    },
    loadMore () {
      if (this.page >= this.total) {
        return false
      }
      this.get(this.keyword, this.sort, this.order, this.page)
    },
    get (keyword, page, sort, order) {
      this.loading = true
      getSearch(keyword, page, sort, order).then(res => {
        this.goods = this.goods.concat(res.products)
        if (res) {
          this.loading = false
          this.page++
        }
      })
    },
    asc () {
      this.clear()
      this.isOpcity2 = true
      this.isOpcity1 = false
      this.get(this.keyword, 'price', 'asc', this.page)
    },
    desc () {
      this.clear()
      this.isOpcity1 = true
      this.isOpcity2 = false
      this.get(this.keyword, 'price', 'desc', this.page)
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
      this.get(this.keyword, this.sort, this.order, this.page)
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

.active {
  background: rgba(255, 255, 255, 0.2) !important;
  border: 0.02rem solid rgba(255, 255, 255, 1) !important;
}

</style>
