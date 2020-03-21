var {
  request
} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinema: [],
    films: [],
    bgImg: '',
    showDate: [], //上映时间转换为几月几日格式
    showCinema: [],
    showDateCuo: [], //上映时间的时间撮
    cinemaId: '',
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      cinemaId: options.cinemaId
    })
    this.getData(options.cinemaId)
  },
  getData(cinemaId) {
    request(`https://m.maizuo.com/gateway/?cinemaId=${cinemaId}&k=5333471`,
      'get', 'mall.film-ticket.cinema.info').then(res => {
      this.setData({
        cinema: res.data.cinema
      })
    })
    request(`https://m.maizuo.com/gateway/?cinemaId=${8656}&k=3963901`,
      'get', 'mall.film-ticket.film.cinema-show-film').then(res => {
        this.getMoive(res.data.films[0].filmId, cinemaId, res.data.films[0].showDate[0])
      this.setData({
        films: res.data.films,
        bgImg: res.data.films[0].poster,
        showDate: this.time(res.data.films[this.data.index].showDate),
        showDateCuo: res.data.films[this.data.index].showDate
      })
    })
  },
  getMoive(filmId, cinemaId, date) {
    request(`https://m.maizuo.com/gateway/?filmId=${filmId}&cinemaId=${cinemaId}&date=${date}&k=9830262`, 'get', "mall.film-ticket.schedule.list").then(res => {
      res.data.schedules.forEach((item) => {
        item.salePrice= item.salePrice.toString().slice(0, 2)
        item.showAt = this.time2(item.showAt)
        item.endAt = this.time2(item.endAt)
      })
     if(res.status===0){
       this.setData({
         showCinema: res.data.schedules
       })
     }
    })
  },
 time2(t) {
    var date = new Date(t)
    var hour = date.getHours()
    var minutes = date.getMinutes()
    hour = hour < 10 ? '0' + hour : hour
    minutes = minutes < 10 ? '0' + minutes : minutes
    return hour + ':' + minutes
  },
  time(showDate) {
    let list = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    let arr = []
    showDate.forEach(item => { //将时间戳转换成日期
      var now = new Date()
      var time = new Date(item * 1000)
      var mon = time.getMonth() + 1
      var day = time.getDate()
      var xing = list[time.getDay()]
      var index = day - now.getDate()
      if (index === 0) {
        xing = '今天'
      } else if (index === 1) {
        xing = '明天'
      } else if (index === 2) {
        xing = '后天'
      }
      arr.push(xing + mon + '月' + day + '日')
    })
    return arr
  },
  change(e) {
    this.getMoive(this.data.films[e.detail.current].filmId, this.data.cinemaId, this.data.showDateCuo[e.detail.name])
    this.setData({
      index: e.detail.current,
      bgImg: this.data.films[e.detail.current].poster
    })
  },
  onClick(e) {
    console.log(this.data.index)
    this.getMoive(this.data.films[this.data.index].filmId, this.data.cinemaId, this.data.showDateCuo[e.detail.name])
  },
buy(e){
  wx.navigateTo({
    url: '/pages/seats/seats?scheduleId=' + e.target.dataset.scheduleid,
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})