const request = (url,method,headers,data) => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: 'loading....',
    })
    wx.request({
      url,
      method: method || 'GET',
      data: data || {},
      header: {
        "X-Host": headers
      },
      dataType: 'json',
      responseType: 'text',
      success: function (resp) {
        resolve(resp.data)
      },
      fail: function (err) {
        reject(err)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}
module.exports={
  request
}
