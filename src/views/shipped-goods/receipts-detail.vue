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
  <div class="content" :style="{bottom: showButton? '67px' : '0' }">
    <van-cell-group>
        <van-cell title="" :value='poCode' >
            <template #extra>
                <div class="extra">
                    <span style="font-family: PingFangSC-Medium;font-size:17px;color: #F2584F;">{{status}}</span>
                </div>
            </template>
        </van-cell>
        <div id="flex-special">
            <van-cell title="" :value="supplierName " ></van-cell>
            <van-cell title="" :value="supplierContact " />
            <van-cell title="" :value="usingDepartment " />
            <van-cell title=" " :value="usingReceiver " />
            <van-cell title="" :value="projectName" />
            <van-cell title="" :value="usingPlace" />
        </div>
        <van-divider></van-divider>
        <div id="flex-special">
        <van-cell title="">
            <span>{{inTime}}</span>
        </van-cell>
        </div>
        <div id="flex-special">
        <van-cell title=" 员：" :value="jobSiteReceiver"/>
        <van-cell title="">
                        <a @click="showPdfPreview = true" style="color:#1577FF; text-decoration: none;">{{pdfName}}</a>
                    </van-cell> 
        </div>

        <div id="flex-special" v-if="resStatus == 1">
        <van-cell id="photo">
            <template #title><span> </span></template>
            <div v-for="(item,index) in photoList" :key="index" style="width:70px;display:inline-block">
                <img class="photo-img" :src="item" @click="sceneImg(photoList,index)" />
            </div>
        </van-cell>
        </div>
        
    </van-cell-group>
    <van-form >
        <div v-for="(item,index) in materialList" v-bind:key="item.materialCode">
            <cell-list-detail :item="item" :index="index"></cell-list-detail>
        </div>
    </van-form>
  </div>
    <div class="bottom" style="background: #FFFFFF;height:65px;width:100%; bottom:0;position:fixed;" v-if="showButton">
            <div style="text-align:center">
                <van-button v-if="resStatus == 1" @click="discardReceipt" style="background: #F2584F; border-radius: 6px; color:white; width:90%; margin-top:9pt">  </van-button>
                <van-button v-if="resStatus == 2" @click="reloadReceipt" style="background: #F2584F; border-radius: 6px; color:white; width:90%; margin-top:9pt">刷新 结果</van-button>
                <van-button v-if="resStatus == 3" @click="resubmitReceipt" style="background: #F2584F; border-radius: 6px; color:white; width:90%; margin-top:9pt"> </van-button>
            </div>
    </div>
        <div v-if="showPdfPreview">
          <pdf-preview :show="showPdfPreview" @onClickCancel="showPdfPreview = false" :pdfId="pdfId"> </pdf-preview>
        </div>
  </div>
</template>

<script>
// const baseURL = '';
const baseURL = window.baseUrl + '/h5';
import API from '@/service/shipped/index.js';
import CellListDetail from "./cell-list-detail.vue";
import PdfPreview from './pdf.vue';
import { ImagePreview } from 'vant';
import axios from 'axios';
export default {
  inject:['reload'],  
  components:{CellListDetail,PdfPreview},
  name: 'receiptsDetail',
  data() {
    return {
      showKeyboard: true,
      showMoreFlag: false, //展示更多信息
      deliveryOrder : '',
      errorFlag: false,
      poCode: '',
      jobSiteReceiver : '', //外部  员
      signerName:'', // 员选择
      goodsStatus: ['待 ','已 ',' 中',' 失败'],
      status: '', // 状态
      resStatus: 0,
      supplierName : '',
      supplierContact :'',
      usingDepartment :'',
      usingReceiver : '',
      projectName:'',
      usingPlace:'',
      pdfId:'',
      pdfName:'',
      showPdfPreview: false,
      inTime : '',  // 到场时间
      receiveTimeFlag: false,
      photoList: [],    // 照片
      materialList: [],
      showButton: true, //是否显示按钮
      showDiscardButton: false, //是否显示 按钮
    }
  },
  methods: {
    onClickLeft(){
      this.$router.push({name:'get-receipts'});
    },
    //  按钮
    discardReceipt(){
    this.$dialog.confirm({
          title: '提示',
          message:''
      }).then(() => {
          let loadingDialog = this.$toast.loading({
            duration: 0,
            forbidClick: true,
            message:''
        })
      API.dropCommit({param:{deliveryOrder:this.deliveryOrder}}).then(res =>  {
          loadingDialog.clear();
          this.$router.push({name: 'fill-in-receipts', params:{deliveryOrder:this.deliveryOrder}});
      }).catch(e=>{loadingDialog.clear();})
      })
        .catch((e)=>{});
    },
     //查看图片
    sceneImg(images, index){
        ImagePreview({
            images: images,
            showIndex: true,
            loop: false,
            startPosition: index,
        })
    },
    //刷新
    reloadReceipt(){
        console.log('reload')
        this.reload();
            // this.$router.push({name: 'receipts-detail', params:{deliveryOrder:this.deliveryOrder}});
    },
    //重新提交
    resubmitReceipt(){
        let loadingDialog = this.$toast.loading({
            duration: 0,
            forbidClick: true
        })
        API.reSign({param:{deliveryOrder:this.deliveryOrder}}).then(r=>{
           loadingDialog.clear();
            this.reload();
        }).catch(e=>{
           loadingDialog.clear();
        });
    },
    pdfPreview(val){
            console.log(val)
            
        }
    
  },
  created(){
      this.deliveryOrder  = this.$route.params.deliveryOrder;
      API.submitReceipt({param:{deliveryOrder:this.deliveryOrder }}).then( res => {
          console.log(res);
          Object.assign(this.$data,res.data);
          let resStatus;
          switch(res.data.status){
            case 0:
                resStatus = 0;  //待 
                break;
            case 201:
                resStatus = 1;  //已 
                if(!res.data.showDiscardButton){
                    this.showButton = false;
                }
                break;
            case 101:
                resStatus = 2; // 中
                break;
            case 102:
                resStatus = 3; // 失败
                break;
          }
          this.resStatus = resStatus;
          console.log(this.resStatus)
          this.status = this.goodsStatus[resStatus];
          this.materialList = res.data.doMaterialVos;
          if( typeof(res.data.photos) != undefined && res.data.photos.length !== 0 && this.resStatus == 1){
              console.log('hello')
              this.uploadFlag = false;
              let photoAddr = [];
              let url = `${baseURL}/picture/getResource`
              res.data.photos.map(item => {
                  console.log(item)
                  axios.get(url,{params:{'path':item}}).then(r => {if(r.data.success){photoAddr.push(r.data.data)}}).catch(e=>{console.log(e)})
              })
              this.photoList = photoAddr;
          }
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
.photo-img {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    border: 1px solid #E4E6EB;
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
    flex: 0.5;
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