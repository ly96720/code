/* eslint-disable no-undef */
// var getCity = function () {
//   return new Promise((resolve, reject) => {
//     // eslint-disable-next-line no-undef
//     var a = new AMap.Map('container', {
//       resizeEnable: true,
//       center: [116.397428, 39.90923],
//       zoom: 13
//     })
//     console.log(a)
//     // eslint-disable-next-line no-undef
//     var citysearch = new AMap.CitySearch()
//     citysearch.getLocalCity(function (status, result) {
//       if (status === 'complete' && result.info === 'OK') {
//         if (result && result.city) {
//           resolve(result)
//         } else {
//           // eslint-disable-next-line prefer-promise-reject-errors
//           reject('error')
//         }
//       }
//     })
//   })
// }
// export default getCity

// 获取用户所在城市信息
export const showCityInfo = function (container, callback) {
  // 实例化城市查询类
  // eslint-disable-next-line no-undef
  var map = new AMap.Map(container, {
    resizeEnable: true,
    center: [116.397428, 39.90923],
    zoom: 13
  })
  console.log(map)
  // eslint-disable-next-line no-undef
  var citysearch = new AMap.CitySearch()
  // 自动获取用户IP，返回当前城市
  citysearch.getLocalCity(function (status, result) {
    if (status === 'complete' && result.info === 'OK') {
      if (result && result.city) {
        callback(result)// 地图显示当前城市
      }
    } else {
      callback(result.info)
    }
  })
}
// eslint-disable-next-line no-unused-vars
export const selectCity = function (city) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-new
    new AMap.Map('container', {
      resizeEnable: true,
      center: [116.30946, 39.937629],
      zoom: 3
    })
    var opts = {
      level: city,
      subdistrict: 1, // 返回下一级行政区
      showbiz: false // 最后一级返回街道信息
    }
    var district = new AMap.DistrictSearch(opts)
    district.search(city, function (status, result) {
      console.log(status)
      if (status === 'complete') {
        resolve(result)
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('error')
      }
    })
  })
}
