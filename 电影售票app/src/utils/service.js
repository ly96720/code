import axios from 'axios'
import { Indicator } from 'mint-ui'
var service = axios.create({
  baseURL: '/jump',
  timeout: 10000
})
service.interceptors.request.use(config => {
  Indicator.open({
    text: 'Loading...',
    spinnerType: 'fading-circle'
  })
  config.headers['X-Client-Info'] = `{"a":"3000","ch":"1002","v":"5.0.4","e":"15785675932160368550269","bc":"310100"}`// 设置请求头
  if (config.data['X-Host']) {
    config.headers['X-Host'] = config.data['X-Host']
  }// 每个接口对应不一样的请求头
  return config
})
service.interceptors.response.use(res => {
  Indicator.close()
  return res.data// 响应拦截器
})
export default service
// 请不要忘记写return！！！！！！！！！！
