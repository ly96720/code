<template>
  <div>
    <div class="head">
      <router-link class="location"
                   to='/locate'
                   @click.native='postData'>
        <span class="local">{{cityName|sub}}</span>
        <i class="iconfont icon-xia"></i>
      </router-link>
      <span class="ciname">影院</span>
      <i class='iconfont icon-chaxun1'> </i>
    </div>
    <div class="tou">
      <div>
        <span @click="toggle"
              :class="{color:!isBlock}">全城
          <div class="selected"
               :class="{block:isBlock}"
               :style="height"
               v-if="district">
            <span class="item1"
                  :class="[{border:!tag},{color:!tag}]"
                  @click="getCinema">全城</span>
            <span class="item"
                  @click="filterCinema(item.name,index)"
                  :class="[{border:item.flag},{color:item.flag}]"
                  v-for="(item,index) in district"
                  :key='index'>{{item.name}}</span>
          </div>
        </span>
        <i @click="toggle"
           class="iconfont icon-xia"
           :class="{color:!isBlock}"></i>
      </div>
      <div><span>APP订票</span><i class="iconfont icon-xia"></i></div>
      <div><span>最近去过</span><i class="iconfont icon-xia"></i></div>
    </div>
    <div class="main"
         v-if="arr">
      <dl v-for="(item,index) in arr"
          :key='index'
          @click='goBuyMoive(item)'>
        <dd><span class="name">{{item.name}}</span><i class="price">￥{{item.lowPrice|price}}起</i></dd>
        <dd><span class="area">{{item.address}}</span><i class="dis">距离{{item.Distance|dis}}千米</i></dd>
      </dl>
    </div>
  </div>
</template>
<script>
import { getCinemaDirect, getCityByDistrict } from '@/utils/index'
import { mapGetters } from 'vuex'
import { selectCity } from '@/utils/location'
export default {
  filters: {
    price: function (v) {
      return v.toString().substr(0, 2)
      // 处理字符串格式
    },
    dis: function (v) {
      return v.toFixed(2)
      // 保留两位数字
    }
  },
  data () {
    return {
      tag: false, // 控制全城的那个按钮的颜色
      isBlock: true,
      arr: [], // 按区筛选的电影院数组
      district: [], // 本市所有区、县
      cinemaList: [] // 本市所有电影院的数组
    }
  },
  computed: {
    ...mapGetters(['cityId', 'cityName']),
    height () {
      return {
        'height': Math.ceil(this.district.length / 4) * 0.9 + 'rem'
      }
    }
  },
  methods: {

    toggle () {
      this.isBlock = !this.isBlock
    },
    async get () {
      var a = await selectCity(this.cityName)
      if (a.info === 'OK') {
        a.districtList[0].districtList.forEach(item => {
          this.district.push({
            name: item.name,
            flag: false
          })
        })
      }
    },
    async  getDistrict () {
      let a = await getCityByDistrict(this.cityId)
      if (a) {
        this.cinemaList = a.data.cinemas
      }
    },
    async  getCinema () {
      let a = await getCinemaDirect(this.cityId)
      if (a) {
        this.arr = a.data.cinemas
      }
      this.district.forEach(item => {
        item.flag = false
      })
      this.tag = false
    },
    filterCinema (area, index) {
      this.arr = this.cinemaList.filter(item =>
        area === item.districtName)
      this.district.forEach(item => {
        item.flag = false
      })
      this.district[index].flag = true
      this.tag = this.district.some(item => item.flag)
    },
    goBuyMoive (item) {
      this.$router.push({ name: 'buymovie', params: { item }, query: { a: Date.now() } })
      localStorage.setItem('buyMovie', JSON.stringify(item))
    },
    postData () {
      this.$router.push('/locate')
    }
  },
  created () {
    this.getDistrict()
    this.get()
    this.$store.dispatch('get8')
    this.getCinema()
  }

}
</script>

<style lang='scss' scoped>
.tou {
  position: fixed;
  height: 1rem;
  width: 100%;
  top: 0.88rem;
  right: 0;
  text-align: center;
  background-color: #fff;
  z-index: 2000;
  display: grid;
  grid-template-columns: repeat(3, 33.333%);
  div {
    height: 1rem;
    float: left;
    line-height: 1rem;
    font-size: 0.28rem;
    color: #191a1b;
  }
}
.border {
  border: 0.02rem solid #ff5f16 !important;
}
.color {
  color: #ff5f16 !important;
}
.block {
  display: none !important;
  overflow: hidden !important;
}
.selected {
  transition: all 0.5s;
  position: absolute;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  z-index: 999;
  height: 0;
  padding-left: 0.1rem;
  .item {
    border: 0.02rem solid rgba(210, 214, 220, 0.5);
    border-radius: 4px;
    width: 1.62rem;
    height: 0.6rem;
    line-height: 0.6erm;
    font-size: 0.24rem;
    line-height: 0.6rem;
    background: #fff;
    margin-bottom: 0.3rem;
    margin-right: 0.2rem;
    overflow: hidden;
  }
  .item1 {
    border: 0.02rem solid rgba(210, 214, 220, 0.5);
    border-radius: 4px;
    width: 1.62rem;
    height: 0.6rem;
    line-height: 0.6erm;
    font-size: 0.24rem;
    line-height: 0.6rem;
    background: #fff;
    margin-bottom: 0.3rem;
    margin-right: 0.2rem;
    overflow: hidden;
  }
}
.head {
  position: fixed;
  top: 0;
  z-index: 112;
  background-color: #fff;
  .ciname {
    padding-left: 1rem;
  }
  .location {
    .local {
      display: inline-block;
      font-size: 0.26rem;
      max-width: 1.16rem;
      height: 0.32rem;
      line-height: 0.32rem;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #191a1b;
    }
    .icon-xia {
      font-size: 0.36rem;
      height: 0.1rem;
      width: 0.1rem;
    }
    position: absolute;
    top: 0.2rem;
    left: 0.14rem;
    z-index: 10;
    font-size: 0.26rem;
    width: 2rem;
    height: 0.6rem;
    line-height: 0.6rem;
    border-radius: 0.3rem;
    text-align: center;
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
.main {
  margin-top: 0.3rem;
  width: 100%;
  overflow: hidden;
  background: #fff;
  dl {
    position: relative;
    z-index: 111;
    top: 1.5rem;
    background-color: rgb(255, 255, 255);
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
