<template>
  <div class="body">
    <div class="aaa"
         @click="jumpLogin">
      <img :src="headIcon?headIcon:img"
           alt="">
      <span>{{username?username:'立即登录'}}</span>
    </div>
    <div class="box">
      <dl>
        <dt><img src="../assets/img/6.png"
               alt=""></dt>
        <dd>电影订单</dd>
      </dl>
      <dl>
        <dt><img src="../assets/img/7.png"
               alt=""></dt>
        <dd>商品订单</dd>
      </dl>
    </div>
    <div class="main">
      <dl>
        <dd><img src="../assets/img/8.png"
               alt=""></dd>
        <dt>卖座券</dt>
        <i class="iconfont icon-you"></i>
      </dl>
      <dl>
        <dd><img src="../assets/img/9.png"
               alt=""></dd>
        <dt>组合红包</dt>
        <i class="iconfont icon-you"></i>
      </dl>
      <dl>
        <dd><img src="../assets/img/10.png"
               alt=""></dd>
        <dt>余额</dt>
        <span>￥0</span>
        <i class="iconfont icon-you"></i>
      </dl>
      <dl>
        <dd><img src="../assets/img/12.png"
               alt=""></dd>
        <router-link to='/set'>
        <dt>设置</dt>
        </router-link>
        <i class="iconfont icon-you"></i>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      img: require('@/assets/img/header.png'),
      username: '',
      headIcon: ''
    }
  },
  methods: {
    jumpLogin () {
      this.$router.push('/login')
    },
    getUserInfo () {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.username = userInfo.nickName
      this.headIcon = userInfo.headIcon
    }
  }
}
</script>

<style lang='scss' scoped>
.body {
  .main {
    dl {
      a{
        display: block;
        width: 6.375rem;
      }
      span {
        font-size: 0.3rem;
        text-align: right;
        margin-right: 0.17rem;
        color: #797d82;
      }
      .icon-you {
        text-align: right;
        font-size: 0.18rem;
        color: #797d82;
      }
      img {
        width: 0.4rem;
        height: 0.4rem;
      }
      dt {
        margin-left: 0.3rem;
        color: #191a1b;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
      }
      border-bottom: 0.02rem solid #f4f4f4;
      text-align: left;
      font-size: 0.3rem;
      background: #fff;
      padding: 0 0.3rem;
      height: 0.98rem;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
    }
  }
  .aaa {
    img {
      width: 1.26rem;
      height: 1.26rem;
      border-radius: 0.7rem;
      margin-right: 0.4rem;
      border: 0.04rem solid #fff;
    }
    color: white;
    font-size: 0.32rem;
    line-height: 2.72rem;
    text-align: left;
    width: 100%;
    height: 2.72rem;
    background: url("~@/assets/img/bg.png");
    margin-top: -0.88rem;
    padding-left: 0.44rem;
    padding-top: 1.28rem;
  }
  .box {
    img {
      width: 0.52rem;
      height: 0.52rem;
    }
    dl {
      position: relative;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      list-style: none;
      dd {
        line-height: 0.45rem;
      }
    }
    color: #797d82;
    width: 100%;
    margin: 0 auto;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    font-size: 0.26rem;
    padding: 0;
    height: 1.58rem;
    background: white;
    margin-bottom: 0.2rem;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
}
</style>
