<template>
  <div v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="10"
       v-if="cityId">
    <van-pull-refresh v-model="isLoading"
                      success-text="刷新成功"
                      @refresh="onRefresh">
      <div class="parent"
           v-for="(item,index) in list_arr"
           :key='index'>
        <div class='box'
             @click="buy(item.filmId)">
          <img :src="item.poster"
               alt="">
          <div class="box2">
            <p class="title">{{item.name}}<span>{{item.item.name}}</span></p>
            <p class="text"
               :class="{a:!item.grade}">观众评分:<span class="grade">{{item.grade}}</span></p>
            <p class="text">主演:{{item.director}}</p>
            <p class="text">{{item.nation}} | {{item.runtime}}分钟</p>
          </div>
        </div>
        <button :class="{display:!(genre ==='list1')}"
                @click='buyTiket(item)'>{{genre ==='list1'?arr[0]:''}}</button>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getData1 } from '@/utils/index'
import { Toast } from 'mint-ui'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isLoading: false,
      total: 1,
      list_arr: [], // 请求的所有的数据的拼接数组
      page: 1,
      arr: ['购票', '预购'],
      type: 1,
      genre: 'list1', // 判断是购票还是预购
      loading: false,
      adcode: 0
    }
  },
  watch: {
    $route: {
      handler (n) {
        this.genre = n.params.genre
        this.resetlist()
        this.type = n.path === '/list/list1' ? 1 : 2
        if (this.cityId) {
          this.getData(this.cityId, this.type, this.page)
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters(['cityId'])
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.getData(this.cityId, this.type, this.page)
        this.isLoading = false
      }, 1000)
    },
    resetlist () {
      this.loading = false
      this.page = 1
      this.type = 1
      this.list_arr = []
    },
    loadMore () {
      this.getData(this.cityId, this.type, this.page)
    },
    async getData (cityId, type, page) {
      if (this.total <= this.list_arr.length) {
        Toast({
          message: '没有更多数据啦',
          position: 'bottom',
          duration: 2000
        })
        return
      }
      var res = await getData1(cityId, type, page)
      this.loading = true
      if (res.status === 0) {
        this.list_arr = this.list_arr.concat(res.data.films)
        this.page++
        this.loading = false
        this.total = res.data.total
      }
    },

    buyTiket (item) {
      this.$router.push({ path: '/buylist', query: { filmId: item.filmId } })
    },
    buy (id) {
      this.$router.push('/detail/' + id)
    }
  }
}
</script>

<style lang='scss' scoped>
.display {
  display: none !important;
}
.parent {
  .a {
    visibility: hidden !important;
  }
  display: grid;
  grid-template-columns: 80% 20%;
  .box {
    width: 100%;
    height: 1.88rem;
    padding: 0.3rem;
    display: grid;
    grid-template-columns: 24% 76%;
    img {
      width: 1.2rem;
      height: 1.8rem;
      display: inline-block;
    }
    .box2 {
      .title {
        span {
          font-size: 0.18rem;
          color: #fff;
          background-color: #d2d6dc;
          height: 0.28rem;
          line-height: 0.28rem;
          padding: 0 0.04rem;
          border-radius: 0.04rem;
          vertical-align: middle;
          margin-left: 0.1rem;
        }
        width: 3rem;
        height: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .text {
        .grade {
          color: #ff5f16;
        }
        font-size: 0.26rem;
        color: #797d82;
        margin-top: 0.08rem;
      }
      display: grid;
      grid-template-rows: repeat(4, 25%);
      text-align: left;
    }
  }
  button {
    border: 1px solid #ff5f16;
    background-color: white;
    line-height: 0.5rem;
    height: 0.52rem;
    width: 1rem;
    color: #ff5f16;
    font-size: 0.26rem;
    text-align: center;
    border-radius: 0.04rem;
    position: relative;
    width: 1rem;
    height: 0.52rem;
    font-size: 0.26rem;
    margin: auto 0;
  }
}
</style>
