<template>
  <div v-scale>
    <div class="head">
      <i class="iconfont icon-left"
         @click="back"></i>
      <div class="title">
        {{cinemaInfo.cinema.name}}
      </div>
      <div class="right"></div>
    </div>
    <div class="name">
      <p class="p1">{{cinemaInfo.film.name}}</p>
      <p class="p2">{{time(cinemaInfo.showAt)}}{{cinemaInfo.film.language}}{{cinemaInfo.imagery}}</p>
    </div>
    <!-- {{ele.flag?ele.rowId+'排'+ele.columnId+'座':''}} -->
    <div class="selectSeat">
      <!-- <div class="screen"></div> -->
      <div class="map"
           id="map"
           @touchstart='down'
           @touchmove='move'
           @touchend='end'>
        <div class="axion-middle"></div>
        <div class="seats"
             v-drag
             v-if="seatList">
          <div v-for="(item,index) in width"
               :key='index'>
            <div v-for="(ele,i) in height"
                 :key='i'>
              <span class="seat"
                    v-if="estimate(item,ele)"
                    @click="selectSeat(item,ele)"
                    :class="{pic:ele.isOccupied}"></span>
            </div>
          </div>

          <!-- <div v-for="(item,index) in arr"
               :key='index'>
            <span class="seat"
                  @click="selectSeat(ele)"
                  v-for="(ele,i) in sx(item)"
                  :class="{pic:ele.isOccupied}"
                  :key='i'>{{ele.flag?ele.rowId+'排'+ele.columnId+'座':''}}</span> </div> -->
        </div>
      </div>
    </div>
    <button>请先选座</button>
  </div>
</template>
<script>
import { getMoInBuyTiket, getSeat } from '@/utils/index'
export default {
  directives: {
    scale (el, binding) {
      var map = document.getElementById('map')
      var seat = document.getElementsByClassName('seat')
      document.onmousewheel = wheelHander// 非火狐
      document.addEventListener('touch', wheelHander, false)// 火狐
      function wheelHander (e) {
        // 事件的兼容性写法
        var oEvent = e || window.event
        if (oEvent.wheelDelta) { // 非火狐
          if (oEvent.wheelDelta > 0) { // 向上滚动
            map.style.height = 6 + 'rem'
            map.style.width = 6 + 'rem'
            seat.forEach(item => {
              item.style.width = 1 + 'rem'
              item.style.height = 1 + 'rem'
            })
          } else { // 向下滚动
            map.style.height = 2 + 'rem'
            map.style.width = 2 + 'rem'
            seat.forEach(item => {
              item.style.width = 0.2 + 'rem'
              item.style.height = 0.2 + 'rem'
            })
          }
        } else if (oEvent.detail) {
          if (oEvent.detail > 0) { // 向下滚动
            map.style.height = 6 + 'rem'
            map.style.width = 6 + 'rem'
            seat.forEach(item => {
              item.style.width = 1 + 'rem'
              item.style.height = 1 + 'rem'
            })
          } else { // 向上滚动
            map.style.height = 2 + 'rem'
            map.style.width = 2 + 'rem'
            seat.forEach(item => {
              item.style.width = 0.2 + 'rem'
              item.style.height = 0.2 + 'rem'
            })
          }
        }
      }
    },
    drag (el) {
      function tuoZ (box) {
        box.onmousedown = function (e) { // 鼠标按下事件
          e = e || window.event // 事件对象
          var x1 = e.clientX // 鼠标按下X的坐标
          var y1 = e.clientY // 鼠标按下Y的坐标
          var leftDown = this.offsetLeft // 获取盒子的初始left值
          var topDown = this.offsetTop // 获取盒子的初始top值
          console.log(box)
          document.onmousemove = function (e) { // 鼠标移动事件
            e = e || window.event
            var x2 = e.clientX // 鼠标移动X的坐标
            var y2 = e.clientY // 鼠标移动Y的坐标
            // 移动的坐标减去按下的坐标 = 移动的距离
            var x3 = x2 - x1
            var y3 = y2 - y1
            // 赋值给left和top
            box.style.top = topDown + y3 + 'px'
            box.style.left = leftDown + x3 + 'px'
          }
          document.onmouseup = function () { // 鼠标抬起事件
            // 清除移动和抬起事件
            this.onmousemove = this.onmouseup = null
          }
          return false // 阻止默认事件
        }
      }
      tuoZ(el)
    }
  },
  created () {
    this.getmovie()
    this.getseat()
  },
  data () {
    return {
      flags: false,
      position: { x: 0, y: 0 },
      nx: '',
      ny: '',
      dx: '',
      dy: '',
      xPum: '',
      yPum: '',

      seatList: [],
      id: 0,
      cinemaInfo: [],
      week: ['一', '二', '三', '四', '五', '六', '日'],
      arr: [],
      locate: '',
      isClick: false,
      height: 0,
      width: 0
    }
  },
  watch: {
    $route: {
      handler (n) {
        this.id = n.params.id
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    selectSeat (item, ele) {
      console.log(item, ele)
      this.seatList.forEach(item => {
        if (Number(item.columnNum) === item && Number(item.rowId) === ele) {
          console.log(11)
          item.flag = !item.flag
          item.isOccupied = !item.isOccupied// 是否有人已选该座
        }
      })
      // ele.flag = !ele.flag
      this.isClick = !this.isClick// 是否点击
      this.locate = ele.columnId + '排' + ele.rowId + '座'
      // ele.isOccupied = !ele.isOccupied// 是否有人已选该座
    },
    estimate (column, row) {
      var a = this.seatList.some(item => Number(item.columnNum) === column && Number(item.rowId) === row)
      return a
    }, // 判断
    filter () {
      this.seatList.map(item => {
        this.arr.push(item.rowId)
        item.flag = false
      })
      let [...arr] = new Set(this.arr)// 选出共有几排
      this.arr = arr
    },
    sx (rowId) {
      let arr = this.seatList.filter(item => item.rowId === rowId)
      return arr
    },
    async  getmovie () {
      var a = await getMoInBuyTiket(this.id)
      if (a) {
        this.cinemaInfo = a.data.schedule
      }
    },
    async getseat () {
      var b = await getSeat(this.id)
      if (b) {
        this.seatList = b.data.seatingChart.seats
        this.width = b.data.seatingChart.width
        this.height = b.data.seatingChart.height
        this.filter()
      }
    },
    time (t) {
      var date = new Date(t)
      var week = date.getDay()
      var month = date.getMonth() + 1
      var day = date.getDate() + 1
      var hour = date.getHours()
      var minutes = date.getMinutes()
      this.week.forEach((item, index) => {
        if (index + 1 === week) {
          week = this.week[index]
        }
      })
      return `星期${week} ${month}月${day}日 ${hour}:${minutes}`
    },
    back () {
      this.$router.push('/')
    },
    // 实现移动端拖拽
    down (e) {
      this.flags = true
      var touch
      if (event.touches) {
        touch = event.touches[0]
      } else {
        touch = event
      }
      this.position.x = touch.clientX
      this.position.y = touch.clientY
      this.dx = e.target.offsetLeft
      this.dy = e.target.offsetTop
    },
    move (e) {
      console.log(e)
      if (this.flags) {
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        this.nx = touch.clientX - this.position.x
        this.ny = touch.clientY - this.position.y
        this.xPum = this.dx + this.nx
        this.yPum = this.dy + this.ny
        e.target.style.left = this.xPum + 'px'
        e.target.style.top = this.yPum + 'px'
        // 阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
        document.addEventListener('touchmove', function () {
          event.preventDefault()
        }, false)
      }
    },
    // 鼠标释放时候的函数
    end () {
      this.flags = false
    }

  }
}
</script>

<style lang='scss' scoped>
.seat {
  position: relative;
  z-index: 9999;
  display: inline-block;
  border: 0.02rem solid black !important;
  width: 0.2rem;
  height: 0.2rem;
  transition: all 0.4s ease;
  margin: 0.02rem;
}
.pic {
  display: inline-block;
  border: 0.02rem solid black !important;
  background-color: #ff5f16;
  width: 0.2rem;
  height: 0.2rem;
  transition: all 0.4s ease;
}
.selectSeat {
  font-size: 0.1rem;
  .screen {
    transform: scale(1.5);
    left: 2.41rem;
    position: relative;
    z-index: 2;
    height: 0.4rem;
    min-width: 3.8rem;
    font-size: 0.22rem;
    line-height: 0.4rem;
    border-radius: 0.02rem 0.02rem 0.16rem 0.16rem;
    text-align: center;
    color: #fff;
    background-color: #dbdbdb;
    transform-origin: 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .seats {
    position: absolute;
    left: 1rem;
    top: 2.5rem;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
  }
  .axion-middle {
    position: absolute;
    left: calc(50% + 1px);
    border-left: 1px dotted #115cdf;
    z-index: 2;
    transform: scaleX(0.5);
  }
}
.head {
  background-color: #fff;
  padding: 0 0.3rem;
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  display: grid;
  grid-template-columns: 0.88rem auto 0.88rem;
  .title {
    text-align: center;
    font-size: 0.34rem;
    color: #191a1b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.name {
  width: 100%;
  padding: 0.3rem;
  background-color: #fff;
  .p1 {
    text-align: left;
    font-size: 0.3rem;
    line-height: 0.42rem;
    color: #191a1b;
  }
  .p2 {
    text-align: left;
    font-size: 0.26rem;
    line-height: 0.38rem;
    margin-top: 0.08rem;
    color: #797d82;
  }
}
button {
  height: 0.9rem;
  width: 100%;
  font-size: 0.3rem;
  line-height: 21px;
  padding: 0.28rem 0;
  text-align: center;
  background-color: #ff5f16;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  color: #fff;
  z-index: 2;
  border: none;
}
</style>
