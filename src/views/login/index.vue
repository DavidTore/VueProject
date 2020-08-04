<template>
  <div>
    <div>
      <van-nav-bar
          title="统供材收货"
          left-arrow
          @click-left="onClickLeft"
      />
      <div style="text-align:center;padding-top:50px">
      <van-row style="text-align: center">
  <van-col span="8" @click="shippedClick">
    <van-image width="100" height="100"  :src="require('@/assets/images/shipped.png')"/> <br/>
    <span>收货</span>
  </van-col>
  <van-col span="8" @click="reCheckClick">
    <div class="alarm">
    <van-image width="100" height="100"  :src="require('@/assets/images/recheck.png')">
          <div class="badge" v-if="badgeFlag">{{badgeShowNum}}</div>
    </van-image>
    </div>
    <span>二次签章</span>
  </van-col>
  <van-col span="8"> 
    <van-image width="100" height="100"  :src="require('@/assets/images/standing.png')"/> <br/>
    <span>收货单台账</span>
  </van-col>
</van-row>
</div>

  </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      badgeFlag: false,
      badgeNum: 0,
      badgeShowNum:0
    }
  },
  methods: {
    onClickLeft(){
      console.log('onClickLeft');
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
      this.$router.push({name: 'recheck-list'})
    }
  },
  
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