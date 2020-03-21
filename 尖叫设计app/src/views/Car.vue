<template>
  <div>
    <div class="header">
      <a href="/">
        <img src="../assets/img/home.png"
             alt=""></a>
      <h3>购物车</h3>
      <div>
        <label><input type="checkbox"
                 v-model="isEdit"
                 @change="edit">{{isEdit?"编辑":"完成"}}</label>
      </div>
    </div>
    <div class="shoppingCartContent"
         v-if="data">
      <div class="box"
           v-for="(item,index) in data"
           :key="index">
        <div class="select">
          <label><i class="iconfont"
               :class="[{'icon-weixuanzhong':!item.flag},{'icon-check1':item.flag},{color:item.flag}]">
              <input type="checkbox"
                     @change="changeOne"
                     v-model="item.flag"></i></label>
          <ul class="ul">
            <li @click="down(index)">-</li>
            <li>{{item.num}}</li>
            <li @click="up(index)">+</li>
          </ul>
        </div>
        <div class="content">
          <img :src="item.productImage"
               alt="">
          <ul>
            <li>{{item.productTitle}}</li>
            <li>
              <span v-for="(ele,i) in item.shuxing"
                    :key="i">{{ele}}</span>
            </li>
            <li></li>
            <li>
              <p>¥{{item.sellPrice}}</p>
              <b>x{{item.num}}</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="foot">
      <ul>
        <li>
          <label><i class="iconfont"
               :class="[{'icon-check1':selectAll},{'icon-weixuanzhong':!selectAll},{color:selectAll}]">
              <input type="checkbox"
                     @change="changeAll"
                     v-model="selectAll"></i></label>
          <span>全选</span>
        </li>
        <li v-show="isEdit">
          <span>合计: </span>
          <span v-if="data">￥{{totalPrice}}</span>
        </li>
        <li v-show="isEdit">
          <a>去结算</a>
        </li>
        <li v-show="!isEdit"
            class="del"
            @click="del">
          <a>删除</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      isEdit: true,
      data: [],
      selectAll: false
    }
  },
  created () {
    // this.getData()
    console.log(this.data)
    this.data = JSON.parse(localStorage.getItem('userCarInfo'))
  },
  methods: {
    async getData () {
      var userInfo = JSON.parse(localStorage.getItem('userInfo'))
      let res = await axios({
        'method': 'post',
        'url': 'http://localhost:8090/getCarInfo',
        'data': { 'user': userInfo.username }
      })
      if (res.data.data[0].shopInfo[0]) {
        this.data = res.data.data[0].shopInfo[0]
        console.log(this.data)
      }
    },
    del () {
      this.data = this.data.filter(item => !item.flag)
      this.selectAll = this.data.length ? this.selectAll : false
      localStorage.setItem('userCarInfo', JSON.stringify(this.data))
    },
    edit () {
      if (!this.isEdit) {
        this.data.forEach(item => { item.flag = false })
        this.selectAll = false
      }
    },
    changeOne () { // 当所有的子复选框选中时，全选按钮选中
      this.selectAll = this.data.every(item => item.flag)
    },
    changeAll () { // 全选与全不选
      this.data.map(item => { item.flag = this.selectAll })
    },
    up (index) {
      this.data[index].num++
      localStorage.setItem('userCarInfo', JSON.stringify(this.data))
    },
    down (index) {
      if (this.data[index].num <= 1) {
        return false
      } else {
        this.data[index].num--
        localStorage.setItem('userCarInfo', JSON.stringify(this.data))
      }
    }
  },
  computed: {
    totalPrice () {
      if (this.data) {
        var res = 0
        this.data.filter(item => item.flag).forEach(item => {
          res += item.num * item.sellPrice
        })
      }
      return res
    }
  }
}
</script>

<style lang='scss' scoped>
.color {
  color: #000 !important;
}
.del {
  width: 25%;
  font-size: 0.3rem;
  background-color: #000;
  text-align: center;
  color: #fff;
  position: absolute;
  right: 0;
  top: 0;
}
input {
  display: none;
}
.foot {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 999;
  height: 1.04rem;
  margin: 0 auto;
  background: #fff;
  color: #000;
  border-top: 1px solid #f5f5f5;
  ul {
    position: relative;
    li:nth-of-type(1) {
      position: absolute;
      width: 1.44rem;
      padding: 0rem;
      padding-left: 0.3rem;
      text-align: right;
      font-size: 0.28rem;
      i {
        color: #ccc;
        font-size: 0.4rem;
        margin-right: 0.1rem;
      }
    }
    li {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      line-height: 1.04rem;
    }
    li:nth-of-type(2) {
      font-size: 0.28rem;
      width: 5.25rem;
      background-color: #fff;
      padding-right: 0.3rem;
      text-align: right;
    }
    li:nth-of-type(3) {
      font-size: 0.3rem;
      width: 1.95rem;
      background-color: #ffd444;
      a {
        text-decoration: none;
        color: #2c3030;
      }
    }
  }
}
.shoppingCartContent {
  padding: 0 0.3rem 0.3rem;
  background-color: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid #f5f5f5;
  border-top: 1px solid #f5f5f5;
  margin-bottom: 1.2rem;
  .select {
    border-bottom: 1px solid #f5f5f5;
    padding: 0.2rem 0;
  }
  .content {
    padding: 0.3rem 0.3rem 0.3rem 0rem;
    border-bottom: none;
    position: relative;
    border-bottom: 1px solid #f5f5f5;
    img {
      width: 1.6rem;
      vertical-align: top;
      margin-left: 0.4rem;
    }
    ul {
      display: inline-block;
      li {
        width: 4.5rem;
        margin-bottom: 0.08rem;
        height: 0.44rem;
        line-height: 0.44rem;
        font-size: 0.28rem;
        margin-bottom: 0.04rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
          font-size: 0.2rem;
          color: #808080;
          padding: 0.04rem 0.1rem;
          background: #f5f5f5;
          margin-right: 0.06rem;
        }
        b {
          float: right;
          font-size: 0.2rem;
          color: #808080;
          padding: 0.04rem 0.1rem;
        }
        p {
          display: inline-block;
          font-size: 0.26rem;
        }
      }
    }
  }
  i {
    font-size: 0.4rem;
    color: #ccc;
  }
  .ul {
    display: inline-block;
    height: 0.5rem;
    margin-left: 4.68rem;
    li {
      list-style: none;
      text-align: center;
      font-size: 0.24rem;
      background-color: #f5f5f5;
      float: left;
      margin-right: 0;
      height: 0.5rem;
      line-height: 0.5rem;
      width: 0.5rem;
    }
    li:nth-of-type(2) {
      width: 0.7rem;
      background-color: #fff;
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
