import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
//引入VantUI
import './utils/vantui';
import fetch from '@/utils/fetch';

//导入样式文件
import '@/style/index.less';
//传参添加info
// window.getAppInfo = function(val){
//   let jsonData = JSON.stringify(val);// 转成JSON格式
//   let  result = JSON.parse(jsonData)// 转成JSON对象
//     window.info = result;
//     console.log('---> getAppInfo');
//     console.log(result);
// }

let jsonData = window.initParamInfos.getAppInfo();
console.log('--->getAppInfo');
console.log(jsonData);
console.log(JSON.stringify(jsonData));
window.info = JSON.parse(jsonData);

// window.info = {
//         "token":"QGbu/WTNsLNf+T4cYUMphvCAEVSxv+1/qZmGm5GxhXsZjkGO93S6Uc8vOE4DSd26Mf/ZyZGTsvDCpS2NGo/AnbeBn7ByQ81zT5+LZ4XjOno=",
//         "sysVersion":"STF-AL00@@Android9",
//         "appVersion":"竖屏2.2.7",
//         "imei":"864035030975545",
//         "uid":"500100100",
//         'userName':'str'
// };

console.log(window.info)

Vue.config.productionTip = false;
Vue.prototype.$fetch = fetch;
Vue.prototype.goBack = () => {
  router.go(-1);
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
