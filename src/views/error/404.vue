<template>
  <!-- <div class="error404">
    <div class="error404-body-con">
      <div class="error404-body-con-title">40
        <label class="animation">4</label>
      </div>
      <p class="error404-body-con-message">YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST</p>
      <div class="error404-btn-con">
        <button @click="goHome"
                   size="large"
                   style="width: 200px;">返回首页</button>
        <button @click="backPage"
                   size="large"
                   style="width: 200px;margin-left: 40px;"
                   type="primary">返回上一页</button>
      </div>
    </div>
  </div> -->
  <div>
    <van-empty image="error" description="发生未知错误" class="log">
      <van-button  @click="goHome" round type="danger" style="margin-right:25px;">返回首页</van-button>
      <van-button  @click="backPage" round type="warning">返回上一页</van-button>
    </van-empty>
  </div>
</template>

<script>
export default {
  name: 'error-404',
  methods: {
    backPage() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push({
        name: 'login'
      });
    }
  }
};
</script>
<style lang="less" scoped>
.log {
position:absolute; /*绝对定位*/
top:50%; /*距顶部50%*/
left:50%;
margin:-100px 0 0 -150px; /*设定这个div的margin-top的负值为自身的高度的一半,margin-left的值也是自身的宽度的一半的负值.(感觉在绕口令)*/
width:300px; /*宽为400,那么margin-top为-200px*/
height:200px; /*高为200那么margin-left为-100px;*/
z-index:99; /*浮动在最上层 */
}
@keyframes error404animation {
  0% {
    transform: rotateZ(0deg);
  }
  20% {
    transform: rotateZ(-60deg);
  }
  40% {
    transform: rotateZ(-10deg);
  }
  60% {
    transform: rotateZ(50deg);
  }
  80% {
    transform: rotateZ(-20deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
.animation {
  display: inline-block;
  animation: error404animation 3s ease 0s infinite alternate;
}
.error404 {
  &-body-con {
    width: 700px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    &-title {
      text-align: center;
      font-size: 240px;
      font-weight: 700;
      color: #2d8cf0;
      height: 260px;
      line-height: 260px;
      margin-top: 40px;
    }
    &-message {
      display: block;
      text-align: center;
      font-size: 30px;
      font-weight: 500;
      letter-spacing: 12px;
      color: #dddde2;
    }
  }
  &-btn-con {
    text-align: center;
    padding: 20px 0;
    margin-bottom: 40px;
  }
}
</style>
