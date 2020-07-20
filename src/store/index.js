import Vue from 'vue';
import Vuex from 'vuex';
import { localStorageSet, localStorageGet, sessionStorageSet, sessionStorageGet, cookieUser } from '../utils/index';
import navData from '@/router/navPage';

Vue.use(Vuex);

const state = {
  token: localStorageGet('hdht_token') || '',
  user: localStorageGet('hdht_user_info') || '' || null,
  currentRoute: sessionStorageGet('current_route') || '',
  userPassword: localStorageGet('user_password') || '',
  navData: navData,
  crumbData: {},
  crumbBtnList: [],
  permission: localStorageGet('user_permission') ||  []
};
const getters = {};
const mutations = {
  // 保存token
  saveToken(state, data) {
    state.token = data;
    localStorageSet('hdht_token', data);
  },
  // 保存用户信息
  saveUser(state, data) {
    state.user = data;
    console.log('saveUser');
    localStorageSet('hdht_user_info', data);
  },
  //记住密码
  savePassword(state, data) {
    state.userPassword = data;
    localStorageSet('user_password', data);
  },
  // 清除登录信息
  clearLogin(state) {
    state.token = '';
    state.user = null;
    localStorageSet('hdht_token', '');
    localStorageSet('hdht_user_info', null);
  },
  setCurrentRoute(state, data) {
    state.currentRoute = data;
    sessionStorageSet('current_route', data);
  },
  setCrumbData(state, data) {
    state.crumbData = data;
    sessionStorageSet('crumb_data', data);
  },
  setCrumbBtnList(state, data) {
    state.crumbBtnList = data;
  },
  setPermission(state, data) {
    state.permission = data;
    localStorageSet('user_permission', data);
  }
};

const actions = {};
const modules = {};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
});
