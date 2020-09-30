<template>
  <div class="main">
      <div>
          <signer-list :show="signerFlag" :signerList="signerList" @onClickCancel="signerFlag = false" @onClickCell="onClickSignerName"> </signer-list>
      </div>
    <div class="title">
      <van-nav-bar
          left-arrow
          @click-left="onClickLeft"
      >
      <template #title>{{deliveryOrder}}</template>
      </van-nav-bar>
    </div>
  <div class="content">
    <van-cell-group>

        <van-cell title="采购订单号：" :value='poCode ' >
            <template #extra>
                <div class="extra">
                    <span style="font-family: PingFangSC-Medium;font-size:17px;color: #F2584F;">{{status}}</span>
                </div>
            </template>
        </van-cell>
        <van-cell title="供应商：" :value="supplierName" class="supplier">
            <template #extra>
                <div class="extra" style="flex:0.3">
                    <van-icon name="arrow-down" color="#F2584F" @click="showMoreFlag = true" v-show="!showMoreFlag"/>
                    <van-icon name="arrow-up" color="#F2584F" @click="showMoreFlag = false" v-show="showMoreFlag"/>
                </div>
            </template>
        </van-cell>
        <div id="flex-special" v-show="showMoreFlag">
            <van-cell title="供应商联系人：" :value="supplierContact" />
            <van-cell title="使用单位：" :value="usingDepartment" />
            <van-cell title="使用收货人：" :value="usingReceiver" />
            <van-cell title="项目名称：" :value="projectName" />
            <van-cell title="使用位置：" :value="usingPlace" />
        </div>
        <van-divider></van-divider>
        <div id="flex-special">
        <van-cell title="到场时间：">
            <van-button type="default" @click="onReceiveTime" v-if="!receiveTimeFlag">到货确认</van-button>
            <span v-else>{{inTime}}</span>
        </van-cell>
        <van-cell title="实收数量：">
            <van-button type="default" @click="onSetOriginalAmount">默认为应收数量</van-button>
        </van-cell>
        </div>
        <van-cell title="施工签章员：" v-if="needSigner" class="signer">
            <van-field v-model="signer.receiverName" placeholder="请选择签章员" readonly right-icon="arrow"
                            @click="signerFlag = true">
            </van-field>
        </van-cell>
        <div id="flex-special">
        <van-cell id="photo">
            <template #title><span>收货照片：</span></template>
            <van-uploader v-model="photoList" :max-size="20 * 1024 * 1024"  v-if="uploadFlag"
            :before-delete="beforeDelete" :multiple=false :max-count="9"  :after-read="afterRead" :accept="'image/*'" />
            <div v-else v-for="(item,index) in photoList" :key="index" style="width:70px;display:inline-block">
                <img class="photo-img" :src="item" @click="sceneImg(photoList,index)" />
            </div>
        </van-cell>
        </div>
        
    </van-cell-group>
    <van-form>
        <div v-for="(item,index) in materialList" v-bind:key="item.materialCode">
            <cell-group-list :item="item" :index="index" v-if="sonRefresh" :ref="'cellListItem'"
                             :deliveryOrder="deliveryOrder"></cell-group-list>
        </div>
    </van-form>
  </div>
  <div style="background: #FFFFFF;height:65px;width:100%; bottom:0;position:fixed; z-index:-10086;">
        <div style="text-align:center; position:fixed; width:100%;">
            <van-button style="background: #F2584F; position:relative; border-radius: 6px; color:white; width:90%; margin-top:9pt; font-size:15px" @click="onClickSubmit">提交及签章</van-button>
        </div>
    </div>
  </div>
</template>

<script>
const baseURL = 'https://shgg-test.evergrande.com/h5';
import API from '@/service/shipped/index.js';
import CellGroupList from "./cell-group-list.vue";
import SignerList from "./signer-list.vue";
import axios from 'axios';
import { ImagePreview } from 'vant';
export default {
  components:{CellGroupList,SignerList},
  name: 'fillInReceipts',
  data() {
    return {
      showKeyboard: true,
      showMoreFlag: false, //展示更多信息
      deliveryOrder: '',
      errorFlag: false,
      signerFlag:false, //选择签章员
      poCode : '', //采购订单号
      signer: {}, //外部收货签章员
      signerName:'', //签章员选择
      signerList: [], //签章员列表
      goodsStatus: ['待收货','已收货'],
      status: '', //收货状态
      supplierName : '', //供应商名称
      supplierContact :'', //供应商联系人
      usingDepartment:'',
      usingReceiver: '',
      projectName:'', //项目名称
      usingPlace:'',
      inTime: '',  //收货到场时间
      receiveTimeFlag: false,
      photoList: [],    //收货照片
      successPhotoList: [],
      materialList: [],
      sonRefresh: true,
      needSigner: true,
      uploadFlag: true,
    }
  },
  methods: {
    onClickLeft(){
      this.$dialog.confirm({
          title: '提示',
          message:'资料未提交，返回后填写的资料会清空，确定返回？'
      }).then(() => {
          console.log(this.photoList.length)
           this.$router.push({name:'get-receipts'});
        })
      .catch((e)=>{});
    },
    onClose(){
        console.log("closeKeyboard")
        if(!this.deliveryOrder){
            this.errorFlag = true;
            console.log('请传值')
        }
    },
    //到场时间
    onReceiveTime(){
        API.getReceiptTime({}).then(res => {this.inTime = res.data}).catch(e => {});
        this.receiveTimeFlag = true;
    },
    //默认为应收数量
    onSetOriginalAmount(){
        this.materialList = this.materialList.map(item => { item.actualQuantity = item.deliveryQuantity; return item;});
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
    //
    onClickSubmit(){
        this.$dialog.confirm({title:'提示',message:'确定签章？'}).then(()=>{this.onReceiptsSubmit()}).catch(()=>{});
    },
    //表单提交
    onReceiptsSubmit(){
      let valid = this.validateContent();
       let formData = this.validateCellForm();
       formData.map(item => {
           item.actualArrivedDate = this.inTime;
       });
       console.log(formData);
       let {deliveryOrder,inTime,projectCode} = this.$data;
       let photos = [];
       this.successPhotoList.map(item => {
           photos.push(item.picPath);
       })
       
      if(valid && formData.length!=0) {
        let loadingDialog = this.$toast.loading({
            duration: 0,
            forbidClick: true,
            message:'信息上传中，请勿离开...'
        })
        
           API.submitAllForm({param:{
           deliveryOrder,
           inTime,
           materialReceivingDtos:formData,
           photos,
           projectCode,
           userId: window.info.uid,
           userName:window.info.userName,
           ...this.signer
       }}).then(res => {
           loadingDialog.clear();
           this.$router.push({name: 'receipts-detail', params:{deliveryOrder:this.deliveryOrder}});
        
       }).catch(e=>{
           loadingDialog.clear();
           this.$toast.fail(e.data.message)
       });
      }
    },
    //验证前置内容
    validateContent(){
        let flag = true;
        if(this.uploadFlag && this.successPhotoList.length == 0){
            console.log('photo')
            this.$toast.fail('请上传收货照片');
            flag = false;
        } else if(!this.inTime){
            this.$toast.fail('请填写到场时间');
            flag = false;
        } else if(this.needSigner){
            if(!this.signer.receiverName){
            this.$toast.fail('请选择施工签章员')
            flag = false;
          } 
        }
        return flag;
    },
    //验证表单内容
    validateCellForm(){
        let formFlag = true;
        let formList = [];
        for(let i=0;i<this.materialList.length;i++){
            if(!this.$refs.cellListItem[i].validateCell()){
                this.$toast.fail('请填写实收数量或少收原因');
                formFlag = false;
                break;
            }
        }
        if(formFlag){
            for(let i=0;i<this.materialList.length;i++){
            formList.push(this.$refs.cellListItem[i].getCellList());
            }
        }
        return formList;
        // 
    },
    //上传图片
    afterRead(file){
        file.status = 'uploading';
        file.message = '上传中...';
        let fd = new FormData();
        fd.append('file',file.file);
        fd.append('deliveryOrder', this.deliveryOrder);
        let url = `${baseURL}/picture/simple/upload`;
        // API.uploadPic(this.deliveryOrder,fd).then(r=>{}).catch(e=>{});
        axios.post(url, fd, {headers: { 'Content-Type': 'multipart/form-data' }}).then(r=>{
            console.log(r.data);
            let res = r.data
            if(!res.success){
                file.status = 'failed';
                file.message = '上传失败';
            }
            if(res.success){
                file.status = "done";
                file.timestamp = (new Date()).valueOf();
                console.log(res,'--file-->',file);
                let obj = {};
                obj.timestamp = file.timestamp;
                obj.picPath = res.data;
                console.log(obj);
                this.successPhotoList.push(obj);
            }
        }).catch(e=>{console.log(e); file.status = 'failed'; file.message = '上传失败';});
    },
    //删除前回调函数
    beforeDelete(file) {
      return new Promise((resolve,reject) => {
        if(this.successPhotoList.length != 0) {
            let flag = true; //判断是否为上传失败的图片
            for(let item of this.successPhotoList){
                if(item.timestamp == file.timestamp){
                    flag = false; //上传成功列表里面存在此文件
                    API.deletePhoto({param:{deliveryOrder:this.deliveryOrder,picPath:item.picPath}}).then(r => {
                        if(r.success){
                            console.log('true',this.successPhotoList.length)
                            for(let arr in this.successPhotoList){
                                if(this.successPhotoList[arr].timestamp == item.timestamp) {
                                    this.successPhotoList.splice(arr, 1);
                                }
                            }
                            resolve(file);
                        }
                    }).catch(e => {reject()});
                }
            }
            if(flag){ resolve(file) }
         } 
         else { resolve(file) }
      })
    },

    // async delFunc(file){
    //     console.log('-->beforeDel, ', file);
    //     let flag = false;
    //     for(let item of this.successPhotoList){
    //         if(item.timestamp == file.timestamp){
    //         await API.deletePhoto({param:{deliveryOrder:this.deliveryOrder,picPath:item.picPath}}).then(r => {
    //                 if(r.success){
    //                     console.log('true')
    //                     console.log(this.successPhotoList.length);
    //                     flag = true;
    //                     for(let arr in this.successPhotoList){
    //                         if(this.successPhotoList[arr].timestamp == item.timestamp) {
    //                             this.successPhotoList.splice(arr, 1);
    //                         }
    //                     }
    //                     console.log(this.successPhotoList.length);
    //                 }
    //             }).catch(e => { flag = false;});
    //         break;
    //         }
    //     }
    //     console.log(flag)
    //     return flag;
    // },
    //查看图片
    sceneImg(images, index){
        ImagePreview({
            images: images,
            showIndex: true,
            loop: false,
            startPosition: index,
        })
    },
  },
  created(){
      this.deliveryOrder = this.$route.params.deliveryOrder;
      API.submitReceipt({param:{deliveryOrder:this.deliveryOrder}}).then( res => {
          Object.assign(this.$data, res.data);
          if(res.data.inTime != null) {
              this.receiveTimeFlag = true;
          }
          if(!this.receiveTimeFlag) {
                API.deleteAllPhotos({param:this.deliveryOrder}).then(r=>{}).catch(e=>{});
          }
          this.status = this.goodsStatus[res.data.status];
          res.data.doMaterialVos.forEach(i => {if(i.actualQuantity == undefined){i.actualQuantity = ''}})
          this.materialList = res.data.doMaterialVos;
          API.getSigners({param:res.data.deliveryOrder}).then(result => {
              this.signerList = result.data;
              console.log(this.signerList);
          }).catch(e=>{})
          if( typeof(res.data.photos) != undefined && res.data.photos.length !== 0){
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
/deep/ #photo{
    &::before{
        position: absolute;
        left: 8px;
        color: #ee0a24;
        font-size: 14px;
        content: '*';
    }
}
/deep/ .supplier{
    .van-cell__value{
        flex:1.1;
    }
}
.photo-img {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    border: 1px solid #E4E6EB;
}
/deep/ .signer{
    .van-cell__title{
        flex:0.6;
    }
}
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
    bottom:67px;
    overflow-y:scroll;
    overflow-x:hidden;
    top: 64px;
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