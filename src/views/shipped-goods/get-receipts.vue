<template>
  <div class="main">
    <div class="title">
      <van-nav-bar
          title="手动输入"
          left-arrow
          @click-left="onClickLeft"
      />
  </div>
  <div class="content">
      <div class="card"> 
          <van-number-keyboard
                :show="show"
                theme="custom"
                close-button-text="完成"
                @blur="show = false"
                @input="onInput"
                @delete="onDelete"/>         
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'getReceipts',
  data() {
    return {
      show: true
    }
  },
  methods: {
    onClickLeft(){
      console.log('onClickLeft');
      this.$router.go(-1);
    },
    shippedClick(){
      this.$router.push({
        name: 'get-receipts'
      })
    },
    reCheckClick(){
      if(this.badgeNum > 99) {
        this.badgeShowNum = "99+"
      } else this.badgeShowNum = this.badgeNum;
      this.badgeFlag = !this.badgeFlag;
    }
  },
  
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
        margin: 40pt auto;
        width:210pt;
        height:321pt;
        background: #FFFFFF;
        border-radius: 10px;
        border-radius: 10px;
    }
}
</style>