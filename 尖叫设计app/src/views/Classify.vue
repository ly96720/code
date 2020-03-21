<template>
  <div class="about">
    <div class="head">
      <i class="iconfont icon-fangdajing"
         @click="find"></i>
      <input type="text"
             @keyup.enter="find"
             v-model="val"
             placeholder="搜索我的尖叫好物">
    </div>
    <div class="box"
         v-if="classify">
      <img :src="classify.data[0].img"
           alt="">
      <ul>
        <li v-for="(item,index) in classify.data[0].list"
            :key="index"
            @click="jump(item,'0')">
          <span v-if="item.id">{{item.name}}</span>
          <i v-if="item.id"
             class="iconfont icon-you"></i>
        </li>
      </ul>
    </div>
    <div class="box"
         v-if="classify">
      <img :src="classify.data[1].img"
           alt="">
      <ul>
        <li v-for="(item,index) in classify.data[1].list"
            :key="index"
            @click="jump(item,'1')">
          <span v-if="item.id">{{item.name}}</span>
          <i v-if="item.id"
             class="iconfont icon-you"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      val: ''
    }
  },
  computed: {
    ...mapState(['classify'])
  },
  created () {
    this.$store.dispatch('getClassify')
    this.get()
  },
  methods: {
    jump (item, type) {
      console.log(type)
      this.$router.push({ name: 'list', params: { id: item.id }, query: { title: item.name, type } })
    },
    find () {
      this.$router.push('/search/' + this.val)
    },
    get () {
      axios({
        method: 'get',
        url: '/data.json'
      }).then(res => {
        localStorage.setItem('classify', JSON.stringify(res))
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.about {
  background: #fff;
}
.box {
  padding: 0 0.3rem;
  img {
    width: 6.9rem;
    height: 2.3rem;
  }
  .whiteBorder {
    border-bottom: 1px solid #eaeaea;
  }
  li {
    line-height: 0.98rem;
    font-size: 0.3rem;
    color: #000;
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-indent: 0.3rem;
    i {
      float: right;
      color: #ccc;
    }
  }
}
.head {
  height: 0.88rem;
  line-height: 0.88rem;
  background-color: white;
  padding: 0rem 0.2rem 0rem 0.2rem;
  position: relative;
  .icon-fangdajing {
    position: absolute;
    font-size: 0.26rem;
    left: 0.6rem;
    color: black;
  }
  input {
    display: inline-block;
    width: 5.4rem;
    height: 0.56rem;
    line-height: 0.56rem;
    vertical-align: middle;
    background-color: #f5f5f5;
    border-radius: 0.3rem;
    margin-left: 0.15rem;
    margin-bottom: 0.05rem;
    text-indent: 2.6em;
    font-size: 0.28rem;
    border: none;
  }
}
</style>
