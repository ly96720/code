var {
  request
} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: "",
    pwd: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  change(e) {
    this.setData({
      [e.target.dataset.type]: e.detail.value
    })
  },
  submit() {
    let {
      user,
      pwd
    } = this.data
    if (user === '' || pwd === '') {
      wx.showLoading({
        title: '账号密码不为空',
      })
      setTimeout(() => {
        wx.hideLoading()
      }, 1000)
      return
    }
    request('http://localhost:4000/login', 'post', '', {
      username: user,
      password: pwd
    }).then(res => {
      if (res.status === 0) {
        wx.setStorageSync("userInfo", JSON.stringify(res))
        wx.reLaunch({
          url: '/pages/my/my',
        })
      } else {
        wx.showLoading({
          title: '账号或密码错误',
        })
        setTimeout(() => {
          wx.hideLoading()
        }, 1000)
      }
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