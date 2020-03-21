var {request} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    film:[],
    isHeight:false,
    img:"/assets/img/xia1.png",
    photos:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request(`https://m.maizuo.com/gateway?filmId=${Number(options.filmId)}&k=9497673`, 'get','mall.film-ticket.film.info').then(res=>{
      this.setData({
        film: res.data.film,
        photos:res.data.film.photos
      })
    })
  },
  change(){
    console.log(1)
    this.setData({
      isHeight:!this.data.isHeight
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
  click(e){
    console.log(e)
    wx.previewImage({
      current: this.data.photos[e.currentTarget.dataset.i], // 当前显示图片的http链接
      urls: this.data.photos // 需要预览的图片http链接列表
    })
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