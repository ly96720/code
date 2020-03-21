// pages/sureOrder/sureOrder.js
var { request} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    request(`https://m.maizuo.com/gateway?filmId=${options.filmId}&k=8184966`, 'get','mall.film-ticket.film.info').then(res=>{
      this.setData({
        poster: res.data.film.poster
      })
      console.log(this.data.poster)
    })
    console.log(options.filmId)
    this.setData({
      totalPrice: Number(options.totalPrice+'00'),
      totalPrice1: options.totalPrice,
      price: options.totalPrice+'.00',
      filmName: options.film,
      seats: options.seat,
      num: options.num
    })
  },
  onSubmit(){
    wx.request({
      url: 'http://localhost:4000/users/addOrder',
      data: {
        movieName:this.data.filmName,
        moviePrice:this.data.totalPrice1,
        seat:this.data.seats,
        num:this.data.num,
        img: this.data.poster,
        userphone: '13358826090'
      },
      method: 'post',
      success: (res)=> {
        if (res.data.status===0){
          wx.showToast({
            title: '下单成功',
          })
          wx.navigateTo({
            url: '/pages/order/order',
          })
        }else{
          wx.showToast({
            title: '下单失败',
          })
        }
      },
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