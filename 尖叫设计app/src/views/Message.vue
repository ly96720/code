<template>
  <div>
    <div class="header">
      <a href="/">
        <img src="../assets/img/home.png"
             alt=""></a>
      <h3>消息中心</h3>
      <div>
        <a href="/">
          <img src="../assets/img/me.png"
               alt=""></a>
      </div>
    </div>
    <div class="box">
      <div class="content">
        <img src="../assets/img/official_message.png">
        <div class="right">
          <div class="top">
            <span>尖叫精选</span>
            <a href="https://m.wowdsgn.com/topic/1413"><i class="iconfont icon-you"></i></a>
          </div>
          <div class="bottom">
            <p>跨越包豪斯的现代主义，家具选材也经历了一次返璞归真的设计洗礼</p>
            <p> 2019-11-21 19:02</p>
          </div>
        </div>
      </div>
      <div class="content">
        <img src="../assets/img/system_message.png">
        <div class="right">
          <div class="top">
            <span>系统通知</span>
            <a href="https://m.wowdsgn.com/coupon"><i class="iconfont icon-you"></i></a>
          </div>
          <div class="bottom">
            <p>欢迎加入尖叫设计，我们已将9张优惠券送入您的账户中，请查收</p>
            <p>2019-08-05 15:59</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMessage } from '@/API/index'
export default {
  created () {
    // this.get()
  },
  methods: {
    get () {
      getMessage().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.box {
  padding: 0.4rem 0.5rem;
  background-color: #fff;
  margin-bottom: 0.3rem;
  overflow: hidden;
  .content {
    position: relative;
    margin-top: 0.2rem;
    margin-bottom: 0.6rem;
    overflow: hidden;
    img {
      float: left;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 100%;
      border: 1px solid #c1c0c6;
    }
    .right {
      width: 5.7rem;
      float: right;
      overflow: hidden;
      .top {
        border-bottom: 1px solid #eaeaea;
        height: 0.8rem;
        font-size: 0.26rem;
        position: relative;
        span {
          position: absolute;
          left: 0;
          top: 0;
          color: #65686c;
          font-weight: bold;
        }
        i {
          float: right;
          font-size: 0.28rem;
          margin-left: 0.1rem;
        }
      }
      .bottom {
        line-height: 0.34rem;
        p:nth-of-type(1) {
          margin-top: 0.2rem;
          color: #65686c;
          font-size: 0.26rem;
          margin-right: 0.2rem;
        }
        p:nth-of-type(2) {
          margin-top: 0.2rem;
          color: #ccc;
          font-size: 0.26rem;
        }
      }
    }
  }
}
.header {
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
  div {
    display: inline-block;
    position: absolute;
    height: 0.64rem;
    line-height: 0.64rem;
    font-size: 0.3rem;
    right: 0.2rem;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    border-radius: 50%;
    -moz-border-radius: 50%;
  }
  h3 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    font-size: 0.34rem;
    margin: 0;
    padding: 0;
    border: 0;
    font-weight: bold;
  }
  a {
    display: inline-block;
    width: 0.64rem;
    height: 0.64rem;
    line-height: 0.5rem;
    img {
      display: inline-block;
      width: 0.52rem;
      height: 0.52rem;
      margin-top: 0.06rem;
      margin-bottom: 0.06rem;
      vertical-align: middle;
    }
  }
}
</style>
