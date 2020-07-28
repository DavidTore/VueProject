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
    <van-cell-group>

        <van-cell title="采购订单号：" :value='orderNumber' >
            <template #extra>
                <div class="extra">
                    <span style="font-family: PingFangSC-Medium;font-size:17px;color: #F2584F;">{{goodsStatus}}</span>
                </div>
            </template>
        </van-cell>
        <van-cell title="供应商：" :value="supplierCompany" >
            <template #extra>
                <div class="extra">
                    <van-icon name="arrow-down" color="#F2584F" @click="showMoreFlag = true" v-show="!showMoreFlag"/>
                    <van-icon name="arrow-up" color="#F2584F" @click="showMoreFlag = false" v-show="showMoreFlag"/>
                </div>
            </template>
        </van-cell>
        <div id="flex-special" v-show="showMoreFlag">
            <van-cell title="供应商联系人：" :value="supplierName" />
            <van-cell title="使用单位：" :value="userCompany" />
            <van-cell title="使用收货人：" :value="userName" />
            <van-cell title="项目名称：" :value="projectName" />
            <van-cell title="使用位置：" :value="userLocation" />
        </div>
        <van-divider></van-divider>
        <div id="flex-special">
        <van-cell title="到场时间：">
            <van-button type="default" @click="onReceiveTime" v-if="!receiveTimeFlag">到货确认</van-button>
            <span v-else>{{receiveTime}}</span>
        </van-cell>
        <van-cell title="实收数量：">
            <van-button type="default" @click="onSetOriginalAmount">默认为应收数量</van-button>
        </van-cell>
        </div>
        <van-cell title="施工签章员：">
            <template #extra><div class="extra"></div></template>
        </van-cell>
        <div id="flex-special">
        <van-cell>
            <template #title><span style="color:red;font-size: 16px;">*</span><span>收货照片：</span></template>
            <van-uploader v-model="photoList" multiple/>
        </van-cell>
        </div>
        
    </van-cell-group>
    <van-form>
        <div v-for="(item,index) in materialList" v-bind:key="item.id">
            <cell-group-list :item="item" :index="index" v-if="sonRefresh"></cell-group-list>
        </div>
        <div style="margin-top:10px;background: #FFFFFF;height:52pt">
            <div style="text-align:center">
            <van-button style="background: #F2584F; border-radius: 8px; color:white; width:75%; margin-top:9pt">提交及签章</van-button>
            </div>
        </div>
    </van-form>
  </div>
  </div>
</template>

<script>
import API from '@/service/shipped/index.js';
import CellGroupList from "./cell-group-list.vue";
export default {
  components:{CellGroupList},
  name: 'fillInReceipts',
  data() {
    return {
      showKeyboard: true,
      showMoreFlag: false, //展示更多信息
      receiptNumber: '',
      errorFlag: false,
      orderNumber: '',
      goodsStatus: '待收货',
      supplierCompany: '',
      supplierName:'',
      userCompany:'',
      userName: '',
      projectName:'',
      userLocation:'',
      receiveTime: '',  //收货时间
      receiveTimeFlag: false,
      photoList: [],
      materialList: [],
      sonRefresh: true,
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
    },
    //到场时间
    onReceiveTime(){
        this.receiveTime = new Date();
        this.receiveTimeFlag = true;
    },
    //默认为应收数量
    onSetOriginalAmount(){
        this.materialList = this.materialList.map(item => { item.actualAmount = item.shouldNumber; return item;});
        console.log(this.materialList)
        this.sonRefresh= false;
        this.$nextTick(() => {
            this.sonRefresh= true;
        });
        this.$toast.success('修改成功');
    }
  },
  created(){
      this.receiptNumber = "Hello World";
      this.orderNumber = "100568";
      this.supplierName = "供应商A";
      this.materialList = [{'id':1, 'materialNumber':1000536,'mateiralName':"6#水晶灯/19头/H370&1s100mm",'shouldNumber':300},
      {'id':2, 'materialNumber':1000537,'mateiralName':"6#水晶灯/19头/H370&f1100mm",'shouldNumber':320}];
      this.materialList.forEach(i => {i.actualAmount = '';})
  }
  
}
</script>
<style lang="less"  scoped>
/deep/ .content{
    width: 100%;
    position: absolute;
    top: 64px;
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
    .van-cell-group{
            .van-cell{
                &::after{
                    border-bottom: 0
                }
                .van-cell__value{
                    text-align: left;
                    .van-field{
                        padding: 0;
                    }
                }
            }
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
.extra{
    flex: 0.4;
    text-align: right;
    color:#666666;
}
#flex-special{
    .van-cell__value{
        flex: 1.4;
    }
}
.van-divider{
    margin: 3px 0;
}
</style>