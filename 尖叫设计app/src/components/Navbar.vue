<template>
  <div class="body">
    <b>{{num}}</b>
    <router-link to='/'>
      <img src="../assets/img/home.png"
           alt=""><span>首页</span>
    </router-link>
    <router-link to='/classify'>
      <img src="../assets/img/category.png"
           alt=""><span>分类</span>
    </router-link>
    <router-link to='/car'>
      <img src="../assets/img/buy.png"
           alt=""><span>购物车</span>
    </router-link>
    <router-link to='/message'>
      <img src="../assets/img/message.png"
           alt=""><span>消息</span>
    </router-link>
    <router-link to='my'>
      <img src="../assets/img/me.png"
           alt=""><span>我的</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      num: 0
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.num = JSON.parse(localStorage.getItem('userCarInfo')) ? JSON.parse(localStorage.getItem('userCarInfo')).length : 0
    }
  }
}
</script>

<style lang='scss' scoped>
.body {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  border-top: 0.01rem solid #ececec;
  font-size: 0.2rem;
  img {
    width: 0.46rem;
    height: 0.46rem;
    margin: 0 auto;
  }
  a {
    text-decoration: none;
    color: #808080;
    justify-content: center;
    grid-template-rows: 50% 50%;
    display: grid;
    line-height: 0.44rem;
    &.router-link-exact-active {
      color: black;
    }
  }
}
b {
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
  top: 0rem;
  left: 3.8rem;
  text-align: center;
}
</style>
