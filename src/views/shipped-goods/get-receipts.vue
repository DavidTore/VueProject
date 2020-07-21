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
          <van-field class="receipt-number" :value="receiptNumber" type="digit" 
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
      this.$router.go(-1);
    },
    onClickRight(){
        console.log('onClickRight')
    },
    onClose(){
        console.log("closeKeyboard")
        if(!this.receiptNumber){
            this.errorFlag = true;
            console.log('请传值')
        }
    }
  },
  created(){
      API.addRole({s:'s'});
  }
  
}
</script>
<style lang="less"  scoped>
/deep/ .content{
    width: 100%;
    position: absolute;
    top: 64px;
    bottom: 0px;
    left: 0px;
    background: #354255;
    .card {
        margin: 40pt 30pt;
        // width:210pt;
        height:321pt;
        background: #FFFFFF;
        border-radius: 10px;
        border-radius: 10px;
    }
}
.receipt-number{
    top:40pt;
    background: #F5F5FA;
    border-radius: 10px;
    border-radius: 10px;
    width: 70%;
    margin: auto;
    height: 33.33pt;
    border-radius: 10px;
/deep/ .van-field__control {
        text-align: center;
    }
}
.info{
    top: 40pt;
    position: relative;
    margin-top: 10px;
    text-align: center;
    span {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #F35950;
        letter-spacing: 0;
        text-align: center;
    }
}
</style>