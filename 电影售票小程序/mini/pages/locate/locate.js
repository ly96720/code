var {request} = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cities:[],
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    classifyCities:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request('https://m.maizuo.com/gateway?k=5756273', 'get',"mall.film-ticket.city.list").then(res=>{
      this.data.cities = res.data.cities
      this.data.classifyCities = []
      this.data.letters.forEach(item => {//根据字母给数组分成26组，每组一个letter头部,一个city数组
        this.data.classifyCities.push({
          letter: item,
          city: []
        })
      })
      this.data.classifyCities.forEach(ele => {//按字母对所有城市进行分类
        ele.city = []
        this.data.cities.forEach(item => {
          if (item.pinyin.slice(0, 1).toUpperCase() === ele.letter) {
            ele.city.push(item)
          }
        })
      })
      this.data.hotCity = res.data.cities.filter(item => item.isHot === 1)
      this.setData({
        cities: this.data.cities,
        hotCity: this.data.hotCity,
        classifyCities: this.data.classifyCities
      })
      console.log(this.data)
    })
  },

  jump(e){
    wx.reLaunch({
      url: '/pages/index/index?cityId=' + e.target.dataset.cityid,
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