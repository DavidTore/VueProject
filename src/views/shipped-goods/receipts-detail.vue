<template>
  <div class="main">
    <div class="title">
      <van-nav-bar
          left-arrow
          @click-left="onClickLeft"
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
        <van-cell title="供应商：" :value="supplierCompany" ></van-cell>
        <div id="flex-special">
            <van-cell title="供应商联系人：" :value="supplierName" />
            <van-cell title="使用单位：" :value="userCompany" />
            <van-cell title="使用收货人：" :value="userName" />
            <van-cell title="项目名称：" :value="projectName" />
            <van-cell title="使用位置：" :value="userLocation" />
        </div>
        <van-divider></van-divider>
        <div id="flex-special">
        <van-cell title="到场时间：">
            <span>{{receiveTime}}</span>
        </van-cell>
        </div>
        <div id="flex-special">
        <van-cell title="施工签章员：" :value="signer.name"/>
        <van-cell>
            <template #title><span style="color:red;font-size: 16px;">*</span><span>收货照片：</span></template>
            <van-uploader v-model="photoList" multiple/>
        </van-cell>
        </div>
        
    </van-cell-group>
    <van-form @submit="onReceiptsSubmit">
        <div v-for="(item,index) in materialList" v-bind:key="item.id">
            <cell-list-detail :item="item" :index="index" v-if="sonRefresh" :ref="'cellListItem'"></cell-list-detail>
        </div>
        <div style="margin-top:10px;background: #FFFFFF;height:52pt;width:100%;">
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
import CellListDetail from "./cell-list-detail.vue";
export default {
  components:{CellListDetail},
  name: 'receiptsDetail',
  data() {
    return {
      showKeyboard: true,
      showMoreFlag: false, //展示更多信息
      receiptNumber: '',
      errorFlag: false,
      orderNumber: '',
      signer: {}, //外部收货签章员
      signerName:'', //签章员选择
      goodsStatus: '已收货',
      supplierCompany: '',
      supplierName:'',
      userCompany:'',
      userName: '',
      projectName:'',
      userLocation:'',
      receiveTime: '',  //收货到场时间
      receiveTimeFlag: false,
      photoList: [],    //收货照片
      materialList: [],
      sonRefresh: true,
    }
  },
  methods: {
    onClickLeft(){
      
      this.$router.push({name:'get-receipts'});
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
    },
    //获取内部cell
    onClickSignerName(val){
        console.log(val);
        this.signerFlag = false;
        this.signer = val;
    },
    //表单提交
    onReceiptsSubmit(val){
        // this.validateContent();
        this.validateCellForm()
    },
    //验证前置内容
    validateContent(){
        if(!this.receiveTime){
            this.$toast.fail('请填写到场时间')
        } else if(!this.signer.name){
            this.$toast.fail('请选择施工签章员')
        } else if(this.photoList.length == 0){
            this.$toast.fail('请上传收货照片')
        }
    },
    //验证表单内容
    validateCellForm(){
        let formFlag = true;
        let formList = [];
        for(let i=0;i<this.materialList.length;i++){
            if(!this.$refs.cellListItem[i].validateCell()){
                this.$toast.fail('请填写实收数量或少收 ');
                formFlag = false;
                break;
            }
        }
        if(formFlag){
            for(let i=0;i<this.materialList.length;i++){
            formList.push(this.$refs.cellListItem[i].getCellList());
            }
        }
        console.log(formList);
    },
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
/deep/ .title{
    .van-nav-bar{
        top:0;
        position:fixed;
        width: 100%;
    }
}
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