<template>
  <div>
    <div class="head">
      <i @click="back" class="iconfont icon-zuo"></i>
      <span>设置</span>
    </div>
    <button @click="exit">
      退出登录
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      history.go(-1)
    },
    exit () {
      this.$cookies.remove('token')
      this.$router.push('/login')
      localStorage.removeItem('userInfo')
    }
  }
}
</script>

<style lang='scss' scoped>
.head {
  width: 100%;
  height: 0.88rem;
  position: fixed;
  top: 0;
  left: 0;
  line-height: 0.88rem;
  overflow: hidden;
  margin: 0;
  padding: 0;
  z-index: 3000;
  display: grid;
  grid-template-columns: repeat(2,50%);
  // justify-content: left;
  text-align: left;
  background-color: #fff;
  i{
    padding-left: 0.2rem
  }
}
button {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  color: #ff5f16;
  height: 0.98rem;
  line-height: 0.98rem;
  background: #fff;
  border: none;
}
</style>
