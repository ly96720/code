<template>
  <div class="body">
    <div class="head">
      <img src="../assets/img/titleView.png"
           alt="">
      <i class="iconfont icon-fangdajing"
         @click="find"></i>
      <input type="text"
             @keyup.enter="find"
             v-model="val"
             placeholder="搜索我的尖叫好物">
    </div>
    <div class="nav">
      <span :class="{on:item.flag}"
            @click="toggle(item)"
            v-for="(item,index) in arr"
            :key="index">{{item.title}}</span>
    </div>
    <component :is="name"> </component>
  </div>
</template>

<script>
import Recommend from '@/views/index/Recommend.vue'
import Quality from '@/views/index/Quality.vue'
import Living from '@/views/index/Living.vue'

export default {
  components: {
    Quality, Living, Recommend
  },
  data () {
    return {
      val: '',
      arr: [
        { name: 'Recommend', title: '推荐', flag: true },
        { name: 'Quality', title: '品质空间', flag: false },
        { name: 'Living', title: '居家好物', flag: false }
      ],
      name: 'Recommend',
      active: 0,
      loading: false
    }
  },
  methods: {
    toggle (item) {
      this.arr.map(item => { item.flag = false })
      item.flag = true
      this.name = item.name
    },
    find () {
      let a = encodeURI(this.val)
      console.log(a)
      this.$router.push('/search/' + a)
    }
  }
}
</script>
<style lang='scss' scoped>
.nav {
  display: flex;
  justify-content: space-between;
  height: 0.8rem;
  width: 100%;
  background-color: white;
  .on {
    border-bottom: 0.06rem solid #202020;
    color: #000;
    height: 0.74rem;
  }
  span {
    float: left;
    color: #808080;
    margin: 0rem 0.43rem;
    font-size: 0.28rem;
    padding: 0 0.22rem;
    line-height: 0.8rem;
  }
}
.head {
  height: 0.88rem;
  line-height: 0.88rem;
  background-color: white;
  border-bottom: 0.01rem solid #ccc;
  padding: 0rem 0.2rem 0rem 0.2rem;
  border-bottom: 1px solid #f5f5f5;
  .icon-fangdajing {
    position: absolute;
    font-size: 0.24rem;
    z-index: 99;
    left: 1.74rem;
    top: -0.05rem;
    display: inline-block;
    margin: 0 0.1rem;
    color: black;
  }
  img {
    display: inline-block;
    width: 1.2rem;
    height: 0.3rem;
    margin-top: 0.06rem;
    margin-bottom: 0.06rem;
    vertical-align: middle;
  }
  input {
    font-size: 0.22rem;
    color: black;
    display: inline-block;
    text-indent: 3em;
    width: 5.4rem;
    height: 0.56rem;
    line-height: 0.56rem;
    vertical-align: middle;
    background-color: #f5f5f5;
    border-radius: 0.3rem;
    margin-left: 0.3rem;
    margin-bottom: 0.1rem;
    border: none;
  }
}
</style>
