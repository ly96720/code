<template>
  <div class="body">
    <div class="head">
      <a href="/"><img src="../assets/img/home.png"
             alt=""></a>
      <h3>商品详情</h3>
      <img src="../assets/img/category.png"
           alt="">
    </div>
    <van-swipe class="box"
               :autoplay="3000"
               indicator-color="white">
      <van-swipe-item class="img"
                      v-for="(item,index) in lunbo"
                      :key="index">
        <img :src="item.productImg"
             alt="">
      </van-swipe-item>
    </van-swipe>
    <div class="detail">
      <div class="box1">
        <p class="name">{{lunbo[0].productTitle}}</p>
        <p class="price">¥{{lunbo[0].sellPrice}}</p>
      </div>
      <div class="box2">
        <img src="../assets/img/fullCutTag.png"
             alt="">
        <dl>
          <dd>满300减30；满1000减100；满3000减300</dd>
          <dt>2020.01.11 - 2020.01.31</dt>
        </dl>
      </div>
    </div>
    <div class="sellerInfo">
      <img src="https://img.wowdsgn.com/brand/logo/be6e54cb-5d49-4cb8-a3f4-72148a5331c7_2dimension_300x300.png?imageslim"
           alt="">
      <dl>
        <dt>MRLAZY</dt>
        <dd>Mr. Lazy ，创意生活家居品牌为家庭，办公以及休闲空间提供创意型家居产品。Mr. Lazy 成立于2017年，专注于艺术审美视角，用懒人的生活学，为你的生活增添一份趣味。设计 | 家居 | 艺术，越过艺术与日用的界限，发现生活的更多可能性。</dd>
      </dl>
    </div>
    <div class="tip">
      <img :src="itemNoticeBannerVoList"
           alt="">
    </div>
    <div class="content">
      <img :src="item.content"
           v-for="(item,index) in content"
           :key="index"
           alt="">
    </div>
    <div class="productInfoImgDiv">
      <span>—</span>
      <div>
        <div>产品信息</div>
        <p>INFORMATION</p>
      </div>
      <span>—</span>
    </div>
    <img class="tip"
         :src="itemSizeImgVoList.iconUrl"
         alt="">
    <div class="detailParameterSpecification">
      <div>详细规格参数</div>
      <p v-for="(item,index) in skuAttrPairs"
         :key="index">
        <span>{{item.attributeName}}</span><a>{{item.attributeValueText}}</a>
      </p>
    </div>
    <div class="productInfoImgDiv">
      <span>—</span>
      <div>
        <div>搭配推荐</div>
        <p>MATCH</p>
      </div>
      <span>—</span>
    </div>
    <div class="recommend">
      <img :src="itemRecommendVo.imgSrc"
           alt="">
      <ul>
        <li v-for="(item,index) in itemRecommendVo.recommendSkuList"
            :key="index">
          <img :src="item.productImg"
               alt="">
          <p>{{item.productTitle}}</p>
          <span>￥{{item.sellPrice}}</span><s>￥{{item.originalPrice}}</s>
        </li>
      </ul>
    </div>
    <div class="productInfoImgDiv">
      <span>—</span>
      <div>
        <div>猜你喜欢</div>
        <p>WHAT’S HOT</p>
      </div>
      <span>—</span>
    </div>
    <div class="maybeYouLove">
      <dl v-for="(item,index) in maybeYouLoveList"
          :key="index">
        <img :src="item.productImg"
             alt="">
        <dd>{{item.productTitle}}</dd>
        <dt>
          <span>￥{{item.sellPrice}}</span><s>￥{{item.originalPrice}}</s>
        </dt>
      </dl>
    </div>
    <div class="needHelp">
      <span>需要帮助</span>
      <a>周一至周五 9:00~18:30</a>
      <img src="../assets/img/icon-service.png"
           alt="">
    </div>
    <div class="buy">
      <div>
        <i class="iconfont icon-shoucang2"></i>
        <a href="/car"><i class="iconfont icon-gouwuche1"></i></a>
      </div>
      <div class="joinCar"
           @click.self="add"> 加入购物车
        <span>{{length}}</span>
      </div>
      <div class="immediateBuy">立即购买</div>
    </div>
    <div class="mask"
         ref="mask" v-if="goodAttr&&allGoodAttrs">
      <!-- <transition mode='out-in'
                  enter-active-class="animated slidelnUp"
                  leave-active-class="animated slideOutDown"> -->
      <div class="box">
        <div class="head"
             v-if="goodAttr">
          <i @click="close"
             class="iconfont icon-close"></i>
          <img :src="goodAttr.productImage"
               alt="">
          <dl>
            <dt>{{goodAttr.productTitle}}</dt>
            <b>￥{{goodAttr.sellPrice}}</b>
            <s>￥{{goodAttr.originalPrice}}</s>
            <p>尺寸:{{goodAttr.sizeText}}重量:{{goodAttr.netWeightText}}</p>
            <p>{{goodAttr.supplyInfo}}</p>
          </dl>
        </div>
      </div>
      <div class="main"
           v-if="allGoodAttrs">
        <div v-for="(ele,i) in allGoodAttrs.itemAttrVoList"
             :key="i">
          <p>{{ele.attributeName}}</p>
          <ul>
            <li @click="switchAttr(i,index)"
                v-for="(item,index) in ele.itemAttrValueVoList"
                :key="index"
                :class="{on:item.isOn}">
              {{item.isOn}}
              {{item.attributeValueText}}</li>
          </ul>
        </div>
        <p>数量</p>
        <div>
          <span @click="down">-</span>
          <a>{{num}}</a>
          <span @click="up">+</span>
        </div>
      </div>
      <div class="sure"
           @click="pushCarGood">确定</div>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getDetailList, getDetail, itemDetail, toAddCart, selectGoodAttrs } from '@/API/index'
export default {
  data () {
    return {
      shuxing: [],
      num: 1,
      allGoodAttrs: [], // 该商品的所有的属性
      goodAttr: {}, // 该商品的选中的某个属性
      lunbo: [], // 轮播图的图片
      content: [],
      itemDetailIntroVoList: [],
      itemRecommendVo: [],
      itemSizeImgVoList: [],
      skuAttrPairs: [],
      maybeYouLoveList: [], // 你可能喜欢的商品列表
      itemNoticeBannerVoList: '',
      id: 0, // 此页商品的Id
      length: 0
    }
  },
  watch: {
    $route: {
      handler (n) {
        this.id = n.params.id
        this.get(n.params.id, n.query.parentProductId, n.params.id)
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    this.getLength()
  },
  methods: {
    getLength () {
      this.length = JSON.parse(localStorage.getItem('userCarInfo')) ? JSON.parse(localStorage.getItem('userCarInfo')).length : 0
    },
    up () {
      this.num++
    },
    down () {
      if (this.num <= 0) {
        return false
      } else {
        this.num--
      }
    },
    pushCarGood () { // 商品加入购物车
      this.getLength()// 更改购物车小原圈
      this.goodAttr.num = this.num
      this.goodAttr.shuxing = this.shuxing
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo) {
        axios({
          'method': 'post',
          'url': 'http://localhost:8090/joinCar',
          'data': {
            'user': userInfo.username,
            'shopInfo': this.goodAttr
          }
        })
        let userCarInfo = JSON.parse(localStorage.getItem('userCarInfo')) || []
        // 商品名字一杨并且ID一样，就+1，否则就新加入一个
        var isHaveP = userCarInfo.some(item => item.productItemId === this.goodAttr.productItemId || item.productTitle === this.goodAttr.productTitle)
        if (isHaveP) {
          userCarInfo.map(item => {
            if (item.productItemId === this.goodAttr.productItemId && item.productTitle === this.goodAttr.productTitle) {
              item.num += this.goodAttr.num// 购物车有该商品，num++
            }
          })
        } else {
          userCarInfo.push(this.goodAttr)// 没有该商品，push进去
        }
        localStorage.setItem('userCarInfo', JSON.stringify(userCarInfo))// 存入本地
      } else {
        this.$router.push('/login')
      }
    },
    switchAttr (i, index) { // 切换商品属性
      if (i === 0) {
        selectGoodAttrs(this.allGoodAttrs.itemSerialAttributeVoList[index].productItemId).then(res => {
          this.goodAttr = res
          this.allGoodAttrs.itemAttrVoList[0].itemAttrValueVoList.map(item => {
            item.isOn = false
          })
          this.allGoodAttrs.itemAttrVoList[0].itemAttrValueVoList[index].isOn = true
        })
      } else if (i === 1) {
        this.allGoodAttrs.itemAttrVoList[1].itemAttrValueVoList.map(item => {
          item.isOn = false
        })
        this.allGoodAttrs.itemAttrVoList[1].itemAttrValueVoList[index].isOn = true
        this.allGoodAttrs = this.allGoodAttrs
      }
    },
    close () {
      // 关闭加如购物页面
      this.$refs.mask.style.display = 'none'
    },
    add () {
      this.$refs.mask.style.display = 'block'
      toAddCart(this.id).then(res => {
        this.allGoodAttrs = res
        this.allGoodAttrs.itemAttrVoList[0].itemAttrValueVoList.forEach(item => {
          this.shuxing.push(item.attributeValueText)
        })
        this.allGoodAttrs.itemAttrVoList[0].itemAttrValueVoList.map(item => {
          item.isOn = false
        })
        this.allGoodAttrs.itemAttrVoList[1].itemAttrValueVoList.map(item => {
          item.isOn = false
        })
        this.allGoodAttrs.itemAttrVoList[0].itemAttrValueVoList[0].isOn = true
        this.allGoodAttrs.itemAttrVoList[1].itemAttrValueVoList[0].isOn = true
      })
      selectGoodAttrs(this.id).then(res => {
        this.goodAttr = res
      })
    },
    get (goodsId, parentProductId, goodId) {
      getDetailList(goodsId).then(res => {
        this.skuAttrPairs = res.skuAttrPairs
        this.itemNoticeBannerVoList = res.itemNoticeBannerVoList[0].imgSrc
      })
      getDetail(parentProductId).then(res => {
        this.content = res.itemDetailIntroVoList
        this.itemRecommendVo = res.itemRecommendVo
        this.itemSizeImgVoList = res.itemSizeImgVoList[0]
      })
      itemDetail(goodId).then(res => {
        this.maybeYouLoveList = res
        this.lunbo = res
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/css/animate.css";
.mask {
  display: none;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  .icon-close {
    position: absolute;
    top: 0;
    right: 0.1rem;
    width: 0.6rem;
    font-size: 0.44rem;
  }
  dl {
    position: absolute;
    left: 2.3rem;
    top: 0.3rem;
    dt {
      width: 4.2rem;
      font-family: PingFangSC-Regular;
      font-size: 0.36rem;
      color: #000000;
      letter-spacing: 0;
      line-height: 0.44rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    s {
      font-size: 0.28rem;
      text-decoration: line-through;
    }
    b {
      font-weight: bold;
      font-size: 0.28rem;
      line-height: 0.44rem;
    }
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.22rem;
      color: #808080;
      letter-spacing: 0;
      line-height: 0.44rem;
    }
  }
  .sure {
    font-size: 0.28rem;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    position: absolute;
    bottom: 0rem;
    width: 7.5rem;
    color: black;
    background-color: rgb(255, 212, 68);
  }
  .main {
    position: absolute;
    top: 4.5rem;
    width: 100%;
    overflow: hidden;
    padding: 0.427rem 0.4rem;
    background: #fff;
    div {
      span {
        color: #ccc;
        text-align: center;
        font-size: 0.28rem;
        float: left;
        line-height: 0.44rem;
        padding: 0.15rem 0.22rem;
        background-color: #f5f5f5;
        margin-bottom: 0.2rem;
        margin-right: 0.2rem;
      }
      a {
        text-align: center;
        font-size: 0.28rem;
        float: left;
        line-height: 0.44rem;
        padding: 0.15rem 0.22rem;
        margin-bottom: 0.2rem;
        margin-right: 0.2rem;
        width: 1.28rem;
        background-color: #fff;
      }
    }
    p {
      color: #707070;
      font-size: 0.26rem;
      line-height: 0.6rem;
    }
    ul {
      width: 100%;
      overflow: hidden;
      li {
        padding: 0.15rem 0.22rem;
        background-color: #f5f5f5;
        margin-bottom: 0.2rem;
        margin-right: 0.2rem;
        text-align: left;
        font-size: 0.28rem;
        float: left;
        line-height: 0.44rem;
      }
      .on {
        background-color: #ffd444;
      }
    }
  }
  .box {
    .head {
      padding: 0.3rem;
    }
    img {
      width: 1.8rem;
      height: 1.8rem;
      border: 1px solid #f2f2f2;
    }
    // top: 13.34rem;
    position: relative;
    left: 0;
    top: 2rem;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    border: none;
    background-color: #fff;
  }
}
.sellerInfo {
  margin-top: 0.2rem;
  width: 100%;
  background: url("~@/assets/img/bg.png") no-repeat left top;
  background-size: 100%;
  height: 1.5rem;
  position: relative;
  padding: 0.26rem 0;
  img {
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 100%;
    position: absolute;
    display: block;
    top: 0.3rem;
    left: 0.5rem;
  }
  dl {
    position: absolute;
    top: 0.5rem;
    left: 2.2rem;
    right: 0.3rem;
    font-family: PingFangSC-Medium;
    dt {
      font-size: 0.32rem;
      color: #ffffff;
      letter-spacing: 0.01rem;
      text-align: left;
      margin-bottom: 0.1rem;
    }
    dd {
      font-size: 0.24rem;
      color: #ffffff;
      line-height: 0.4rem;
      margin-bottom: 0.3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
.tip {
  margin: 0.2rem 0;
}
.buy {
  position: fixed;
  bottom: -0.02rem;
  height: 0.88rem;
  width: 100%;
  background-color: #fff;
  display: grid;
  grid-template-columns: repeat(3, 33.333%);
  line-height: 0.88rem;
  text-align: center;
  font-size: 0.3rem;
  .joinCar {
    background-color: #f5f5f5;
  }
  .immediateBuy {
    background-color: #ffd444;
  }
  span {
    width: 0.35rem;
    height: 0.35rem;
    line-height: 0.35rem;
    background-color: #ffd444;
    font-size: 0.2rem;
    color: #000;
    border-radius: 50%;
    -webkit-border-radius: 100%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    position: absolute;
    top: 0.14rem;
    left: 1.7rem;
  }
  .icon-shoucang2,
  .icon-gouwuche1 {
    font-size: 0.4rem;
    color: black;
    margin: 0.2rem;
  }
}
.body {
  width: 100%;
  overflow: hidden;
  background-color: #f5f5f5;
}
.needHelp {
  margin-bottom: 1rem;
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  background: #fff;
  font-size: 0;
  text-align: left;
  span {
    color: #000;
    margin-right: 0.2rem;
    margin-left: 0.5rem;
    display: inline-block;
    font-size: 0.2rem;
  }
  a {
    font-size: 0.2rem;
    color: #ff7070;
    margin-right: 2.16rem;
  }
  img {
    width: 0.6rem;
  }
}
.maybeYouLove {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  margin-bottom: 0.3rem;
  dl {
    background-color: #fff;
    dd {
      color: #808080;
      font-size: 0.25rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      margin-bottom: 0.05rem;
      margin-left: 0.3rem;
      width: 88%;
      margin-top: 0.5rem;
    }
    dt {
      font-family: PingFangSC-Regular;
      span {
        font-size: 0.26rem;
        color: #000;
        margin-right: 0.1rem;
        margin-left: 0.3rem;
        line-height: 0.4rem;
      }
      s {
        text-decoration: line-through;
        font-size: 0.22rem;
        color: #aaaaaa;
        margin-bottom: 0.05rem;
      }
    }
  }
}
.recommend {
  ul {
    padding: 0 0.3rem 0.3rem;
    background: #fff;
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    overflow: hidden;
    li {
      background-color: white;
      float: left;
      margin-right: 0.2rem;
      text-align: center;
      p {
        width: 100%;
        margin: 0.1rem 0rem 0rem;
        overflow: hidden;
        font-size: 0.32rem;
        line-height: 0.5rem;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-align: center;
      }
      span {
        font-size: 0.24rem;
      }
      s {
        font-size: 0.2rem;
        color: #ccc;
        text-decoration: line-through;
      }
      img {
        width: 1.86rem;
        height: 1.86rem;
        display: block;
        margin: 0 auto;
      }
    }
  }
}
.detailParameterSpecification {
  padding: 0rem 0.5rem 0.4rem;
  background: #fff;
  div {
    display: block;
    height: 1rem;
    line-height: 1rem;
    background-color: white;
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    color: #000000;
    letter-spacing: 0.02rem;
  }
  p {
    color: #707070;
    border-top: 1px solid #eaeaea;
    font-size: 0.26rem;
    width: 100%;
    display: grid;
    grid-template-columns: 30% 70%;
    line-height: 0.64rem;

    a {
      width: 100%;
      height: auto;
      text-align: left;
    }
  }
}
img {
  width: 100%;
}
.box {
  width: 100%;
  height: 6rem;
  padding: 0rem 0rem 0.4rem;
  background: #fff;
  .van-swipe-item {
    display: block;
    background-color: white;
  }
}
.productInfoImgDiv {
  padding: 0.3rem 0;
  width: 100%;
  background-color: rgb(245, 245, 245);
  text-align: center;
  div {
    display: inline-block;
    margin: 0 auto;
    line-height: 0.4rem;
    font-family: PingFangSC-Semibold;
    color: #000000;
    letter-spacing: 0;
    div {
      font-size: 0.32rem;
    }
    p {
      font-size: 0.24rem;
    }
  }
  span {
    padding: 0.2rem;
    position: relative;
    bottom: 0.25rem;
  }
}
.content {
  img {
    width: 100%;
    margin: 0.1rem auto;
  }
}
.detail {
  padding: 0.3rem 0.5rem 0.3rem;
  background: #fff;
  margin-bottom: 0.1rem;
  width: 100%;
  overflow: hidden;
  .box1 {
    margin-right: 0.2rem;
    padding-bottom: 0.28rem;
    .name {
      text-align: initial;
      margin-bottom: 0.2rem;
      font-size: 0.32rem;
    }
    .price {
      font-size: 0.36rem;
      color: #000;
      font-family: PingFangSC-Semibold;
      margin-right: 0.1rem;
      vertical-align: sub;
      font-weight: bold;
    }
  }
  .box2 {
    padding: 0.2rem 0rem;
    border-top: 1px solid #f2f2f2;
    background-color: white;
    img {
      float: left;
      width: 0.64rem;
      margin-top: 0.04rem;
    }
    dl {
      float: left;
      width: 5.5rem;
      position: relative;
      margin-left: 0.3rem;
      margin-right: 0;
      line-height: 0.3rem;
      dd {
        font-size: 0.22rem;
        color: #808080;
      }
      dt {
        width: 4.48rem;
        font-size: 0.22rem;
        color: #808080;
      }
    }
  }
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
</style>
