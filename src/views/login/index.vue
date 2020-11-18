<template>
  <div>
    <div>
      <van-nav-bar
          title="统供材 "
          left-arrow
          @click-left="onClickLeft"
      />
      <div style="text-align:center;padding-top:50px">
      <van-row style="text-align: center">
  <van-col span="8" @click="shippedClick">
    <van-image width="100" height="100"  :src="require('@/assets/images/shipped.png')"/> <br/>
    <span> </span>
  </van-col>
  <van-col span="8" @click="reCheckClick">
    <div class="alarm">
    <van-image width="100" height="100"  :src="require('@/assets/images/recheck.png')">
          <div class="badge" v-if="badgeNum != 0">{{badgeNum}}</div>
    </van-image>
    </div>
    <span>  </span>
  </van-col>
  <van-col span="8"> 
    <van-image width="100" height="100"  :src="require('@/assets/images/standing.png')" @click="receiptsListClick"/> <br/>
    <span> 单 </span>
  </van-col>
</van-row>
</div>

  </div>
  </div>
</template>

<script>
import API from '@/service/secondSign/index.js';

export default {
  name: 'index',
  data() {
    return {
      // badgeFlag: false,
      badgeNum: 0,
    }
  },
  methods: {
    onClickLeft(){
      console.log('onClickLeft');
      if(window.iOSInfo){
        window.webkit.messageHandlers.closeWebView.postMessage({});
      } else  {window.webViewWindow.closeWebViewWindow();}
    },
    shippedClick(){
      this.$router.push({
        name: 'get-receipts'
      })
    },
    reCheckClick(){
      this.$router.push({name: 'recheck-list'})
    },
    receiptsListClick(){
      this.$router.push({
        name:'receipts-list'
      })
    }
  },
  created(){
    API.recheckCount({}).then(res => {
      if(res.data > 99) {
        this.badgeNum = "99+"
      } else this.badgeNum = res.data
    }).catch(e => {
    });
  },
  beforeCreate(){
    if(window.info == undefined){
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    let jsonData = window.initParamInfos.getAppInfo();
    window.info = JSON.parse(jsonData);
  }
  if (isiOS) {
    let iOSInfos = JSON.parse(JSON.stringify(window.iOSInfo));
    window.info = iOSInfos;
    // window.webViewWindow.closeWebViewWindow = window.webkit.messageHandlers.closeWebView.postMessage;
  }
  }
  }
  
}
</script>
<style lang="less"  scoped>
/deep/ .van-col{
  .van-image{
 .van-image__img{
  display: inline;
  height: 70%;
  width: 70%;
}
}
  span {
    font-family: PingFangSC-Regular;
    color: #666666;
    letter-spacing: 0;
    text-align: center;
    }

}


</style>