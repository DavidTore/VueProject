<template>
  <div class="home" ref="home">
    <div class="mask" :style="{opacity: lightValue*0.4/100, pointerEvents: 'none',}" @click="handleClickMask"/>
    <div class="home-header">
      <div class="logo bgwhite">
        <span :class=" isCollapse ? 'is-collapse' : ''"> {{isCollapse ? '' : '中央融资管理系统'}}</span>
      </div>
      <div class="header-right">
        <div class="operate">

          <div class="hander header__username">
            <el-popover
              placement="bottom"
              width='300'
              trigger="click"
              @show="handleReminderClick"
              @after-leave="handleReminderHide"
              >

              <el-tabs v-model="tabActiveName" @tab-click="handleTabClick">
                <el-tab-pane label="未读消息" name="notRead">
                  <div>
                    <div v-for="(item) in notReadArray" :key="item.id">
                      <p style="margin-left: 13px; font-size: 15px;">{{item.financingType}}</p>
                      <p style="margin: 9px 0 0 40px; color: #959393;">{{item.content}}</p>
                      <p style="margin: 5px 0 18px 13px; font-size: 11px;">{{item.createTime}}</p>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="全部消息" name="allMessage">
                  <div>
                    <div v-for="(item) in allMsgArray" :key="item.id">
                      <p style="margin-left: 13px; font-size: 15px;">{{item.financingType}}</p>
                      <p style="margin: 9px 0 0 40px; color: #959393;">{{item.content}}</p>
                      <p style="margin: 5px 0 18px 13px; font-size: 11px;">{{item.createTime}}</p>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <el-button type="text" style="position: absolute; top: 11px; right: 23px" @click="moreMsg">更多</el-button>


            <el-button size="small" type="text" class="message" slot="reference">
              <el-badge type="primary" class="mark" :value="messageCount">
              </el-badge>
            </el-button>
        </el-popover>
            <span v-if="user && user.userName" style="padding-right:24px">{{ user.userName }}</span>
            <el-button v-else @click="goLogin" type="text">未登录</el-button>
            <template v-if="user">
              <el-button type="text" @click="handleLogout">
                <img src="~@/assets/icons/icon_exit.svg" />
              </el-button>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="home-body">
      <div class="body-left">
        <leftMenu :navData="navData" :onCollapse="onCollapse" @select="menuHandleSelect"></leftMenu>
          <el-popover class="light-slider" trigger="hover">
            <el-slider class="light-slider2" input-size="mini" v-model="lightValue"></el-slider>
            <i class="el-icon-sunrise" style="color: white;" slot="reference"/>
          </el-popover>
      </div>
      <div :class=" isCollapse ? 'body-right is-collapse' : 'body-right' ">
        <div class="content relative" :style="{height: `${heiCon}px`}">
          <hd-crumbs></hd-crumbs>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "./index.less";
import { fullScreen, bindScreenChange, localStorageSet } from "@/utils";
import leftMenu from "./left-menu";
import { mapState } from "vuex";
import API from "@/service/login.js";
import hdCrumbs from "./hd-crumbs.vue";

let timer = null;
let fullScreenFlag = true;
let env = JSON.parse(process.env.VUE_APP_SECRET)

export default {
  data() {
    return {
      isLoading: false,
      isCollapse: false,
      // 导航高度
      hei: 0,
      // 内容高度
      heiCon: 0,
      // 下拉框触发方式
      trigger: "click",
      financeMap: {
          1: '尾款融资'
      },
      //未读消息列表
      notReadArray: [],
      //全部消息列表
      allMsgArray: [],
      dropData: [
        {
          label: "退出登录",
          command: "quit"
        }
      ],
      defaultProps: {
        children: "children",
        label: "label",
        value: "value"
      },
      lightValue: 0,
      messageCount: 0,
      //提醒Tab激活状态
      tabActiveName: 'notRead',
      interval: '' //获取消息定时任务
    };
  },
  components: { leftMenu, hdCrumbs },
  created(){
    this.interval = setInterval(this.getMessageCount, 60000);
  },
  mounted() {
    this.initHei();
    this.bindWindowResize();
    this.bindScreenEvent();
    console.log(this.user);
    this.initLight();
    this.getMessageCount();
  },
  computed: {
    ...mapState(["user", "navData", "crumbData"])
  },
  watch: {
    crumbData() {
      // 通过面包屑的高度动态改变内容高度
      this.initHei();
    }
  },
  methods: {
    initLight(){
      let d = new Date().getHours()
      this.lightValue = Math.abs(d - 12) / 12 * 100
    },
    handleClickMask(e){

    },
    //点击提醒Tab
    handleTabClick(tab, event){
      console.log(tab,event);
    },
    //点击提醒按钮
    handleReminderClick(){
      console.log("reminderClicker");
      API.getMessages({pageIndex:1,pageSize:10,messageStatus:'NOT_READ'}).then(res => {
        for(let item of res.data.items){
          item.createTime = item.createTime.replace(/-/g,"/");
          item.financingType = this.financeMap[item.financingType];
        }
        this.notReadArray = res.data.items;
       console.log(res.data.items)
      });
      API.getMessages({pageIndex:1,pageSize:20}).then(res => {
        for(let item of res.data.items){
          item.createTime = item.createTime.replace(/-/g,"/");
          item.financingType = this.financeMap[item.financingType];
        }
        this.allMsgArray = res.data.items;
        console.log(res.data.items)
      });
    },
    //隐藏提醒按钮
    handleReminderHide(){
      this.tabActiveName = "notRead";
    },

    //获取提醒消息数量
    getMessageCount() {
      API.getMessageCount({messageStatus: 'NOT_READ'}).then(
        res => {
          console.log(res.data);
          this.messageCount = res.data;
        }
      ).catch(err=>{
       clearInterval(this.interval);
      });
    },
    //更多跳转
    moreMsg(){
      this.$router.push({
        name:'message-center-list',
      })
    },
    // 菜单收起、展开事件回调
    onCollapse(isCollapse) {
      this.isCollapse = isCollapse;
    },
    // 选择左边菜单事件回调
    menuHandleSelect() {},
    // 全屏
    fullScreen() {
      fullScreen(fullScreenFlag);
    },
    // 锁屏
    lockSCreen() {
      localStorageSet("last_page_name", this.$route.name);
      localStorageSet("locking", "1");
      this.$router.push({ name: "locking" });
    },
    bindScreenEvent() {
      bindScreenChange(() => {
        fullScreenFlag = !fullScreenFlag;
      });
    },
    bindWindowResize() {
      // resize 防抖
      window.onresize = () => {
        if (timer) {
          window.clearTimeout(timer);
        }
        timer = setTimeout(() => {
          this.initHei();
          timer = null;
        }, 200);
      };
    },
    initHei() {
      this.hei = this.$refs.home.clientHeight - 50;
      const num =
        this.crumbData.list && this.crumbData.list.length > 0 ? 50 : 40;
      this.heiCon = this.$refs.home.clientHeight - num;
    },
    handleLogout() {
      API.logOut().then(res => {
        this.$store.commit("clearLogin");
        this.$store.commit("setCurrentRoute", null);
        /*this.$router.push({
          name: "login"
        });*/
        window.location = env.loginUrl;
      });
    },
    goLogin() {
      //this.$router.push("/login");
      window.location = env.loginUrl;
    }
  }
};
</script>

<style scoped>
.el-tab-pane{
  height: 300px;
  overflow:auto;
}
</style>