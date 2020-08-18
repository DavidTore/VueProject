<template>
  <div class="main">
    <div class="title">
      <van-nav-bar
          left-arrow
          @click-left="onClickLeft"
      >
      <template #title>{{deliveryOrder }}</template>
      </van-nav-bar>
  </div>
  <div class="content">
    <van-cell-group>
        <van-cell title="采购订单号：" :value='poCode' >
            <template #extra>
                <div class="extra">
                    <span style="font-family: PingFangSC-Medium;font-size:17px;color: #F2584F;">{{status}}</span>
                </div>
            </template>
        </van-cell>
        <div id="flex-special">
            <van-cell title="供应商：" :value="supplierName " ></van-cell>
            <van-cell title="供应商联系人：" :value="supplierContact " />
            <van-cell title="使用单位：" :value="usingDepartment " />
            <van-cell title="使用收货人：" :value="usingReceiver " />
            <van-cell title="项目名称：" :value="projectName" />
            <van-cell title="使用位置：" :value="usingPlace" />
        </div>
        <van-divider></van-divider>
        <div id="flex-special">
        <van-cell title="到场时间：">
            <span>{{inTime}}</span>
        </van-cell>
        </div>
        <div id="flex-special">
        <van-cell title="施工签章员：" :value="jobSiteReceiver"/>
        <van-cell title="附件：">
                        <a :href="pdfId">点击查看</a>
                    </van-cell> 
        </div>
        
    </van-cell-group>
    <van-form >
        <div v-for="(item,index) in materialList" v-bind:key="item.materialCode">
            <cell-list-detail :item="item" :index="index"></cell-list-detail>
        </div>
        <div style="margin-top:10px;background: #FFFFFF;height:52pt;width:100%;" v-if="showDiscardButton">
            <div style="text-align:center">
            <van-button @click="discardReceipt" style="background: #F2584F; border-radius: 8px; color:white; width:75%; margin-top:9pt">作废并重新发起</van-button>
            </div>
        </div>
    </van-form>
  </div>
  </div>
</template>

<script>
import API from '@/service/shipped/index.js';
import CellListDetail from "./cell-list-detail.vue";
export default {
  components:{CellListDetail},
  name: 'receiptsDetail',
  data() {
    return {
      showKeyboard: true,
      showMoreFlag: false, //展示更多信息
      deliveryOrder : '',
      errorFlag: false,
      poCode: '',
      jobSiteReceiver : '', //外部收货签章员
      signerName:'', //签章员选择
      goodsStatus: ['待收货','已收货'],
      status: '', //收货状态
      supplierName : '',
      supplierContact :'',
      usingDepartment :'',
      usingReceiver : '',
      projectName:'',
      usingPlace:'',
      pdfId:'',
      inTime : '',  //收货到场时间
      receiveTimeFlag: false,
      photoList: [],    //收货照片
      materialList: [],
      showDiscardButton: false, //是否显示作废按钮
    }
  },
  methods: {
    onClickLeft(){
      
      this.$router.push({name:'get-receipts'});
    },
    //二次签章按钮
    discardReceipt(){
    this.$dialog.confirm({
          title: '提示',
          message:'确定作废，并重新发起？'
      }).then(() => {
      API.dropCommit({param:{deliveryOrder:this.deliveryOrder}}).then(res =>  {
          this.$router.push({name: 'fill-in-receipts', params:{deliveryOrder:this.deliveryOrder}});
      }).catch(e=>{})
      })
        .catch((e)=>{});
    }
    
  },
  created(){
      this.deliveryOrder  = this.$route.params.deliveryOrder;
      API.submitReceipt({param:{deliveryOrder:this.deliveryOrder }}).then( res => {
          console.log(res);
          Object.assign(this.$data,res.data)
          this.status = this.goodsStatus[res.data.status];
          this.materialList = res.data.doMaterialVos;
      }).catch(e=>{});
  }
  
}
</script>
<style lang="less"  scoped>
/deep/ .title{
    height:70px;
    width:100%;
    position:fixed;
    .van-nav-bar{
        top:0;
        width: 100%;
    }
}
/deep/ .content{
    width: 100%;
    position: fixed;
    bottom:0;
    overflow-y:scroll;
    overflow-x:hidden;
    top: 70px;
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