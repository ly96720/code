var {request} = require('../../utils/util.js')
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
    let {user,pwd} = this.data
    //数字、大、小写字母不少于两种
    let reg = /^(?![a-z]+$)(?![A-Z]+$)(?![0-9]+$)[0-9a-zA-Z\W]\S{7,20}$/
    //电话号验证
    let reg2 = /^1[3456789]\d{9}$/
    if (reg2.test(user) && reg.test(pwd)) {
      request('http://localhost:4000/register','post','', {
        username: user,
        password: pwd
      }).then(res => {
        if (res.status === -1) {
          wx.showModal({
            title: '该手机号已注册，请直接登录',
          })
        } else {
         wx.navigateTo({
           url: '/pages/login/login',
         })
        }
      })
    } else {
      wx.showModal({
        title: '手机号或者密码格式不正确,密码应为数字，大小写字母至少有两种',
      })
    }
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