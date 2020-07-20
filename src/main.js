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
