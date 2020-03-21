var {
  request
} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinema: [],
    show: false,
    price: 0,
    num: 0,
    totalPrice: 0,
    selectSeatinfo: []
  },
  time(t) {
    let arr = ['一', '二', '三', '四', '五', '六', '日']
    var date = new Date(t)
    var week = date.getDay()
    var month = date.getMonth() + 1
    var day = date.getDate() + 1
    var hour = date.getHours()
    var minutes = date.getMinutes()
    arr.forEach((item, index) => {
      if (index + 1 === week) {
        week = arr[index]
      }
    })
    return `星期${week} ${month}月${day}日 ${hour}:${minutes}`
  },

  selectSeat(e) {
    this.data.selectSeatinfo.push(`${e.target.dataset.seat[0]}排${e.target.dataset.seat[1]}座`)
    this.setData({
      selectSeatinfo: this.data.selectSeatinfo,
      num: this.data.num + 1,
      totalPrice: this.data.price * (this.data.num + 1),
    })
  },
  buy() {
    wx.navigateTo({
      url: `/pages/sureOrder/sureOrder?totalPrice=${this.data.totalPrice}&film=${this.data.cinema.film.name}&seat=${this.data.selectSeatinfo}&num=${this.data.num}&filmId=${this.data.cinema.film.filmId}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.scheduleId)
  },
  getData(scheduleId) {
    request(`https://m.maizuo.com/gateway/?scheduleId=${scheduleId}&k=441392`, 'get', 'mall.film-ticket.seat.list').then(res => {
      this.setData({
        seats: res.data.seatingChart.seats,
        height: res.data.seatingChart.height,
        width: res.data.seatingChart.width
      })
      console.log(this.data)
    })
    request(`https://m.maizuo.com/gateway/?scheduleId=${scheduleId}&k=8866859`, 'get', 'mall.film-ticket.schedule.info').then(res => {
      this.setData({
        cinema: res.data.schedule,
        showtime: this.time(res.data.schedule.showAt),
        price: Number(res.data.schedule.price.sale.toString().slice(0, 2)),
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})