<template>
  <div class="main">
    <div class="title">
      <van-nav-bar
          title="手动输入"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
      >
      <template #right><van-icon name="scan" /></template>
      </van-nav-bar>
  </div>
  <div class="content">
      <div class="card"> 
          <div>
          <van-field class="receipt-number" readonly :value="receiptNumber" type="digit" 
            placeholder="请输入正确的单号" @touchstart.native.stop="showKeyboard = true" 
            :style="{border:(errorFlag?'1px solid red':'1px solid #E4E6EB')}"/>
            </div>
            <div class="info" v-show="errorFlag"> <span>您所输入的单号不正确</span> </div>
          <van-number-keyboard
                v-model="receiptNumber"
                title="输入单号"
                close-button-text="确定"

                :show="showKeyboard"
                :maxlength="16"
                @blur="showKeyboard = false"
                @close="onClose"
                @input="errorFlag = false"
                @delete="errorFlag = false"
                />   
      </div>
  </div>
  </div>
</template>

<script>
import API from '@/service/shipped/index.js';
export default {
  name: 'getReceipts',
  data() {
    return {
      showKeyboard: true,
      receiptNumber: '',
      errorFlag: false,
    }
  },
  methods: {
    onClickLeft(){
      console.log('onClickLeft');
      this.$router.push({name: 'login'});
    },
    onClickRight(){
        console.log('onClickRight');
        var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    window.webViewWindow.scanQRCode();
  }
  if (isiOS) {
    window.webkit.messageHandlers.scanQRCode.postMessage({});
    
  }
    },
    scanComplete(val){
      this.receiptNumber = val.toString();
      this.onClose();
    },
    onClose(){
        console.log("closeKeyboard")
        if(!this.receiptNumber){
            this.errorFlag = true;
            console.log('请传值')
        } else {
          API.submitReceipt({param:{
            deliveryOrder: this.receiptNumber
          }}).then(res => {
            if(res.data.status == 0) {
            this.$router.push({name: 'fill-in-receipts', params:{deliveryOrder:this.receiptNumber}});
            }
             else if(res.data.status == 1) {
            this.$router.push({name: 'receipts-detail', params:{deliveryOrder:this.receiptNumber}});
            }
          }).catch(err => {
            this.errorFlag = true;
          });
        }
    }
  },
  created(){
  },
  mounted(){
    window.scanComplete = this.scanComplete;
  }
  
}
</script>
<style lang="less"  scoped>
/deep/ .van-number-keyboard__close{
  color:#F35950;
  font-size:18px;
}
/deep/ .content{
    width: 100%;
    position: absolute;
    top: 64px;
    bottom: 0px;
    left: 0px;
    background: #354255;
    .card {
        margin: 40pt 16pt;
        // width:210pt;
        height:321pt;
        background: #FFFFFF;
        border-radius: 10px;
        border-radius: 10px;
    }
}
.receipt-number{
    top:100pt;
    background: #F5F5FA;
    border-radius: 6px;
    width: 80%;
    margin: auto;
    height: 40pt;
/deep/ .van-field__control {
        text-align: center;
        font-size:19px;
        height: 27pt;
    }
}
.info{
    top: 100pt;
    position: relative;
    margin-top: 10px;
    text-align: center;
    span {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #F35950;
        letter-spacing: 0;
        text-align: center;
    }
}
</style>