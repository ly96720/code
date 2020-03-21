<template>
  <div v-if="newContent">
    <p v-html="newContent"></p>
  </div>
</template>

<script>
import { getNews } from '@/utils/index'
// import { mapState, mapGetters } from 'vuex'
export default {
  created () {
    this.getData()
  },
  data () {
    return {
      newContent: '',
      a: 0
    }
  },
  updated () {
    this.deal()
  },
  methods: {
    deal () {
      var aa = this.newContent.replace("javascript:(function(AppBridge){AppBridge.redirect('webview',{url:'", '')
      var cc = aa.replace("'});})(AppBridge);", '')
      this.newContent = cc
      this.deal()// 这是一个回调，但是我现在还没找到出口，这是一个死循环，但是我想不到好办法剪切这个字符串了
    },
    async getData () {
      let a = await getNews()
      // 请求资讯页接口
      if (a) {
        this.newContent = a.data.data.content
      }
    }
  }
}
</script>
