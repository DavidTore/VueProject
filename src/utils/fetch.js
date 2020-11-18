import axios from 'axios'
import { Toast } from 'vant'
import store from '../store'
// let env = JSON.parse(process.env.VUE_APP_SECRET)
import router from '@/router';
import { exportFile } from './index';
window.baseUrl = "";

// 创建实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // 使用代理，不需要这只该项
  baseURL: window.baseUrl, //测试环境
  //  baseURL: env.apiHost,
  timeout: 1000*60*3, // 请求超时时间
  withCredentials:true, //带上cookie
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
    config.data.info = window.info;
    console.log(config);
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
    if (data.success) {
      return data
    } else if( !data.errCode && typeof(data.errCode)!="undefined" && data.errCode!=0 ){
      Toast.fail({
        message:data.message
      });
    } else {
      Toast.fail({
        message:'服务器忙，请稍后重试',
      });
    }
    return Promise.reject(response)
  },
  error => {
    let errorInfo = {}
    if (error.response) {
      errorInfo.errCode = error.response.data.errCode;
      errorInfo.msg = error.response.data.message;
      Toast.fail({
        message:errorInfo.msg
      });
    }
    return Promise.reject(errorInfo)
  }
)

export default service
