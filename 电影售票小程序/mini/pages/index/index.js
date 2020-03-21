var { request } = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],//电影列表
    total: 0,//无限加载时使用
    type:1,
    cityId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.cityId,1)
    this.setData({
      cityId: options.cityId
    })
  },
 
  getData(cityId, type){
    request(
      `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=${type}&k=429688`,
      "get",
      "mall.film-ticket.film.list"
    ).then(res => {
      this.setData({
        list: res.data.films,
        total: res.data.total
      })
    })
  },
  buy(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?filmId=' + e.target.dataset.filmid,
    })
  },
  onChange(e){
    this.getData(this.data.cityId, e.detail.index + 1)
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