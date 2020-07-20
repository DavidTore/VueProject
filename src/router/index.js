import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './pages';
import store from '../store';
// import navPages from './navPage';

Vue.use(Router);

const router = new Router({
  routes
});
let crumbData = {};
// 获取面包屑的数据
function getCrumbData(data, path) {

  data.forEach((item1, index, arr) => {

    if(item1.path === path) {

      // 判断当前path 是否是左侧菜单，如果是这无面包屑列表，只有面包屑标题
      if(item1.nobar) {
        // 当前path 不是左侧菜单
        if (!crumbData.list) {
          crumbData.list = []
        }
        crumbData.list.push(item1);
        arr.forEach((item2) => {
          // 查找 面包屑的 title（左侧菜单）
          if (item1.path.indexOf(item2.path) === 0 && item1.path !== item2.path ) {
            crumbData.title = item2;
          }
        })

      } else {
        // 当前path 是左侧菜单
        crumbData.title = item1;
      }

    } else {
      item1.children && item1.children.length && getCrumbData(item1.children, path);
    }
  });

}

// 转换面包屑的数据
function transformCrumbData() {
  if (crumbData.list && crumbData.list.length) {
    let list = [ crumbData.title ];

    // 如果存在自定义的面包屑
    if (crumbData.list[0].meta && crumbData.list[0].meta.bread) {
      crumbData.list = list.concat(crumbData.list[0].meta.bread);
    } else {
      crumbData.list = list.concat(crumbData.list[0]);
    }
  }
}



router.beforeEach((to, from, next) => {

  // 清空面包屑上面的按钮
  store.commit('setCrumbBtnList', []);

  crumbData = {};
  // 设置面包屑
  //  getCrumbData(navPages, to.path);

  // 转换面包屑数据
  transformCrumbData();

  // 设置面包屑的store
  store.commit('setCrumbData', crumbData);

  next();
});

router.afterEach(to => {
});

export default router;
