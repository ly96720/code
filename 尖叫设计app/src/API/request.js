import axios from 'axios'
import { Indicator } from 'mint-ui'

var service = axios.create({
  baseURL: ''
  // timeout: 3000
})
service.interceptors.request.use(config => {
  Indicator.open({
    text: 'Loading...',
    spinnerType: 'fading-circle'
  })
  return config// 请求拦截器
})

service.interceptors.response.use(res => {
  Indicator.close()
  return res.data.data// 响应拦截器
})
export default service
