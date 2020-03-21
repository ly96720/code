<template>
  <div>
    <div class="header">
      <a href="/my"><i class="iconfont icon-zuo"></i></a>
      <h3>我的订单</h3>
      <div>
        <a href="/">
          <img src="@/assets/img/home.png"
               alt=""></a>
      </div>
    </div>
    <van-tabs v-model="active"
              @click="onClick">
      <van-tab title="待付款">暂无订单</van-tab>
      <van-tab title="待发货">暂无订单</van-tab>
      <van-tab title="待收货">暂无订单</van-tab>
      <van-tab title="待评论">暂无订单</van-tab>
      <van-tab title="退换货">暂无订单</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  watch: {
    $route: {
      handler (n) {
        // 根据路由传过来的参数，确定是哪个头
        this.active = Number(n.fullPath.substr(7, 8))
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onClick () {}
  }
}
</script>

<style lang="scss" scoped>
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
