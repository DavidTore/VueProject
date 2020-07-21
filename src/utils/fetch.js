import axios from 'axios'
import { Toast } from 'vant'
import store from '../store'
// let env = JSON.parse(process.env.VUE_APP_SECRET)
import router from '@/router';
import { exportFile } from './index';

// 创建实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // 使用代理，不需要这只该项
  //baseURL: 'http://172.24.249.135:9900',
  //baseURL: 'http://172.26.6.154:9900', //余小娟
  //baseURL: 'http://172.26.7.103:9900', //王旭
  baseURL: "https://cfms-web-test.evergrande.com/cfms",
  //  baseURL: env.apiHost,
  timeout: 30000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    // 添加时间戳 阻止ie浏览器缓存
    let url = config.url
    let timeStamp = 'timestamp=' + new Date().getTime().toString()
    if (url.indexOf('?') === -1) {
      url = url + '?' + timeStamp
    } else {
      url = url + '&' + timeStamp
    }
    config.url = url

    // 所有请求带上token
    if (store.state.token !== null && store.state.token !== '') {
      config.headers['Authorization'] = store.state.token
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    let data = response.data;
    if (data.code === 200) {
      return data
    } else if (data instanceof Blob) {
      exportFile(response);
    } else if(data.code === 503014){
      Toast.fail("失败文案")
    }
    else {
      Toast.fail("失败文案")
    }
    return Promise.reject(response)
  },
  error => {
    let errorInfo = {}
    if (error.response) {
      errorInfo.errCode = error.response.status
      errorInfo.msg = error.response.data.msg
      errorInfo.code = error.response.data.code
    }
    return Promise.reject(errorInfo)
  }
)

export default service
