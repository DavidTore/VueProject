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
  // baseURL: "http://10.100.173.86:8080/",
  baseURL: "https://shgg-test.evergrande.com/", //测试环境
  //  baseURL: env.apiHost,
  timeout: 1000*60*3 // 请求超时时间
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
