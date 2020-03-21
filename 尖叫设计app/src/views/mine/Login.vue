<template>
  <div>
    <div class="head">
      <h3>登录</h3>
      <a href="/register">注册</a>
    </div>
    <div class="form">
      <input type="text"
             placeholder="请输入手机号"
             v-model="username">
      <input type="text"
             placeholder="请输入密码"
             v-model="password">
      <div class="zhuce"
           @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios({
        'method': 'post',
        'url': 'http://localhost:8090/login',
        'data': {
          'username': this.username,
          'password': this.password
        }
      }).then(res => {
        if (res.data.status === 0) {
          localStorage.setItem('userInfo', JSON.stringify({ username: this.username, head: res.data.header }))
          this.$router.push('/my')
        } else {
          alert('没有账号，请先注册')
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.form {
  position: relative;
  width: 6.6rem;
  height: 4.2rem;
  margin: 0 0.3rem;
  .zhuce {
    // margin: 0 0.3rem;
    vertical-align: middle;
    width: 6.9rem;
    height: 0.88rem;
    background-color: #ffd444;
    font-size: 0.28rem;
    position: absolute;
    left: 53%;
    bottom: 0.15rem;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    text-align: center;
    line-height: 0.88rem;
  }
  input {
    padding-left: 0.3rem;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    border: none;
    border-bottom: 1px solid #eaeaea;
    font-size: 0.28rem;
    color: black;
    font-family: "PingFangSC-Regular";
  }
}
.head {
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
    color: #2c3030;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
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
  margin-bottom: 0.3rem;
}
</style>
