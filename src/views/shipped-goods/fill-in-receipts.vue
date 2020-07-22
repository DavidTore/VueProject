<template>
  <div class="main">
    <div class="title">
      <van-nav-bar
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
      >
      <template #title>{{receiptNumber}}</template>
      </van-nav-bar>
  </div>
  <div class="content">
      <div class="card"> 
      </div>
  </div>
  </div>
</template>

<script>
import API from '@/service/shipped/index.js';
export default {
  name: 'fillInReceipts',
  data() {
    return {
      showKeyboard: true,
      receiptNumber: '',
      errorFlag: false,
    }
  },
  methods: {
    onClickLeft(){
      this.$dialog.confirm({
          title: '提示',
          message:'资料未提交，返回后填写的资料会清空，确定返回？'
      }).then(() => {
      this.$router.go(-1);
      })
        .catch(()=>{});
    },
    onClickRight(){
        console.log('onClickRight');
        this.$router.push({name: 'fill-in-receipts'})
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
    background: rgb(245, 245, 250);
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