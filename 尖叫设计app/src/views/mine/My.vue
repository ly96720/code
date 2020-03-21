<template>
  <div class="body">
    <div class="user">
      <img :src="obj.head"
           alt="">
      <div>
        <p class="name">{{obj.username}}</p>
        <p class="tag">请输入个性签名</p>
      </div>
      <i class="iconfont icon-you"></i>
    </div>
    <div class="all_order">
      <p>全部订单</p>
      <ul>
        <a href="/order?0">
          <li><img src="../../assets/img/waite-pay.png" /><span><i class="iconfont icon-you"></i>待付款</span></li>
        </a>
        <a href="/order?1">
          <li><img src="../../assets/img/waite-delivery.png" /><span><i class="iconfont icon-you"></i>待发货</span></li>
        </a>
        <a href="/order?2">
          <li><img src="../../assets/img/waite-goods.png" /><span><i class="iconfont icon-you"></i>待收货</span></li>
        </a>
        <a href="/order?3">
          <li><img src="../../assets/img/finished.png" /><span><i class="iconfont icon-you"></i>待评论</span></li>
        </a>
        <a href="/order?4">
          <li><img src="../../assets/img/returns.png" /><span><i class="iconfont icon-you"></i>退换货</span></li>
        </a>
      </ul>
    </div>
    <div class="bottom">
      <ul>
        <a href="https://m.wowdsgn.com/user/favorite-list"><li>我的收藏<i class="iconfont icon-you"></i></li></a>
        <a href="https://m.wowdsgn.com/coupon">
          <li>我的礼券<i class="iconfont icon-you"></i></li>
        </a>
        <li>客服电话<i class="iconfont icon-you"></i>
          <p>周一至周五 9:00 - 18:30 </p>
        </li>
      </ul>
    </div>
    <button @click="exit">退出登录</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      obj: {}
    }
  },
  watch: {
    $route: {
      handler () {
        this.obj = JSON.parse(localStorage.getItem('userInfo'))
        if (!this.obj) {
          this.$router.push('/login')
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    exit () {
      axios({
        'method': 'post',
        'url': 'http://localhost:8090/quit'
      }).then(res => {
        localStorage.removeItem('userInfo')
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  width: 100%;
}
.user {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  margin: 0.3rem 0rem;
  position: relative;
  .icon-you {
    color: #ccc;
    font-size: 0.36rem;
    position: absolute;
    right: 0.3rem;
    top: 40%;
  }
  div {
    vertical-align: middle;
    display: inline-block;
    width: 5rem;
    .name {
      height: 0.48rem;
      line-height: 0.48rem;
      color: #000;
      font-size: 0.34rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tag {
      height: 0.34rem;
      line-height: 0.34rem;
      color: #808080;
      font-size: 0.24rem;
      overflow: hidden;
    }
  }

  img {
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    -moz-border-radius: 100%;
    -webkit-border-radius: 100%;
    margin: 0.2rem 0.3rem;
  }
}
.all_order {
  width: 100%;
  background-color: #fff;
  padding-left: 0.3rem;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  margin-bottom: 0.3rem;
  p {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.3rem;
    color: #000;
    border-bottom: 1px solid #eaeaea;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
  }
  ul {
    li {
      img {
        width: 0.48rem;
        height: 0.48rem;
        margin-right: 0.1rem;
      }
      span {
        .icon-you {
          color: #ccc;
          font-size: 0.36rem;
          position: absolute;
          right: 0.3rem;
        }
        width: 6.51rem;
        height: 1rem;
        display: inline-block;
        line-height: 1rem;
        font-size: 0.26rem;
        color: #4a4a4a;
        border-bottom: 1px solid #eaeaea;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        position: relative;
      }
      height: 1rem;
      line-height: 1rem;
      font-size: 0.26rem;
    }
  }
}
.bottom {
  ul {
    li {
      height: 1rem;
      line-height: 1rem;
      position: relative;
      background-color: #fff;
      border-top: 1px solid #eaeaea;
      font-size: 0.3rem;
      color: #000;
      padding-left: 0.3rem;
      p {
        // margin-left: 2.4rem;
        position: absolute;
        font-size: 0.2rem;
        right: 2rem;
        top: 0;
        color: #ccc;
      }
      .icon-you {
        color: #ccc;
        font-size: 0.36rem;
        position: absolute;
        right: 0.75rem;
      }
    }
  }
  margin-bottom: 0.3rem;
}
button {
  outline: none;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.3rem;
  color: #ff7070;
  text-align: center;
  background-color: #fff;
  border: 0;
  margin-bottom: 1rem;
  a {
    color: black;
  }
}
</style>
