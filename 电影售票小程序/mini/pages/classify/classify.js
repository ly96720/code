var { request } = require('../../utils/util.js')
// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinemas:[],
    showList:[],
    option1: [
      { text: '全城', value: 0 },
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' }
    ],
    value1: 0,
    value2: 'a'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  buy(e){
    wx.navigateTo({
      url: '/pages/buyMovie/buyMoive?cinemaId=' + e.currentTarget.dataset.cinemaid,
    })
  },
  getData() {
    request('https://m.maizuo.com/gateway?cityId=310100&ticketFlag=1&k=4296989',
      'get', "mall.film-ticket.cinema.list").then(res => {
        var arr = [],arr1 = []
        res.data.cinemas.forEach(item => {
          arr1.push(item.districtName)
        })
        arr1 = [...new Set(arr1)]
        arr1.forEach((item,index)=>{
          arr.push({ text: item, value: index+1 })
        })
        this.setData({
          cinemas: res.data.cinemas,
          option1: [ ...this.data.option1, ...arr ]
        })
      })
  },
  change({detail}){
    this.setData({
      value1: detail//detail是个点击的下标
    })
   let district =  this.data.option1[detail].text
    this.setData({
      showList: this.data.cinemas.filter(item => item.districtName === district)
    })
    console.log(this.data.showList)
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