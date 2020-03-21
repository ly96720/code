<template>
  <div class="body">
    <div>
      <img src="../assets/img/logo.png"
           alt="">
    </div>
    <div class="form">
      <div>
        <input v-model='username'
               ref='uname'
               type="text"
               placeholder="手机号">
        <i v-show='flag'
           @click="clear"
           class="iconfont icon-close6"></i>
        <span @click="sendCode"
              v-if="isShow">获取验证码</span>
        <span class="time"
              v-if="!isShow">{{time}}秒</span>
        <input v-model="ckcode"
               class="password"
               type="text"
               placeholder="验证码">
      </div>
      <button @click="checkCode"><b :class="{opacity:isOpcity}">登录</b></button>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant'
import { getSendCode, getCheckCode } from '@/utils/index'
export default {
  data () {
    return {
      time: 60,
      isShow: true,
      flag: false,
      isOpcity: false,
      username: '',
      ckcode: ''
    }
  },
  methods: {
    async checkCode () {
      var a = await getCheckCode(this.$refs.uname.value, this.ckcode)
      if (a.status === 0) {
        this.$router.push('/my')
        localStorage.setItem('userInfo', JSON.stringify(a.data))
        this.$cookies.set('token', a.data.token)
      }
    },
    async sendCode () {
      this.isShow = false
      var that = this
      // eslint-disable-next-line no-unused-vars
      var timer = setInterval(function () {
        that.time--
        if (that.time <= 0) {
          clearInterval(timer)
          that.isShow = true
        }
      }, 1000)
      var a = await getSendCode(this.$refs.uname.value)
      switch (a.status) {
        case 0:
          Toast('手机号输入正确')
          break
        case 2002:
          Toast('手机号格式有误')
          break
        case 6103:
          Toast('请勿重复提交')
          break
      }
    },
    clear () {
      this.username = ''
    }
  },
  created () {
    // console.log(this.$cookies)
  },
  watch: {
    username () {
      this.flag = this.username.length > 0
    },
    ckcode () {
      this.isOpcity = this.ckcode.length > 0 && this.username.length > 0
    }
  }
}
</script>

<style lang='scss' scoped>
.body {
  .opacity {
    opacity: 1 !important;
  }
  .time {
    right: 0.8rem !important;
  }
  .form {
    position: relative;
    span {
      color: #bdc0c5;
      padding-right: 0.4rem;
      font-size: 0.26rem;
      position: absolute;
      top: 0.5rem;
      right: 0;
    }
    i {
      position: absolute;
      right: 2.2rem;
      top: 0.45rem;
    }
    input {
      line-height: 1.1rem;
      margin: 0 0.5rem;
      position: relative;
      height: 0.3rem;
      line-height: 0.3rem;
      padding: 0.4rem 0;
      width: 100%;
      font-size: 0.3rem;
      color: #191a1b;
      border: 0;
      border-bottom: 0.02rem solid #f4f4f4;
    }
    button {
      b {
        opacity: 0.3;
      }
      line-height: 0.9rem;
      border: none;
      font-size: 0.32rem;
      margin: 1.4rem 0.5rem 0;
      border-radius: 0.06rem;
      text-align: center;
      background-color: #ff5f16;
      height: 0.88rem;
      color: #fff;
      border: none;
      width: 6.5rem;
    }
  }
  width: 100%;
  height: 13.3rem;
  background-color: white;
  img {
    margin: 1.48rem auto 0.8rem;
    text-align: center;
    height: 1.2rem;
    line-height: 1.2rem;
    width: 1.2rem;
  }
}
</style>
