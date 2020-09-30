<template>
    <div>
        <van-cell-group >
            <van-cell :style="{background:'#E1E3E9'}">
                <span style="font-size:17px;color: #666666;line-height:30px">{{item.deliveryOrder}}</span>
                <template #extra>
                    <van-button class="confirm-button" type="default" @click="onConfirmCheck" v-if="item.type == 1">确认签章</van-button>
                    <van-button class="cancel-button" type="default" @click="onConfirmCancel" v-if="item.type == 2">确认作废</van-button>
                </template>
            </van-cell>
            <div id="flex-special">
                <van-cell title="材料类别：" :value="item.materialType"/>
                <van-cell title="品牌商：" :value="item.brand"></van-cell> 
                <van-cell title="施工单位：" :value="item.usingDepartment "></van-cell> 
                <van-cell title="使用位置：" :value="item.usingPlace "></van-cell> 
                <van-cell title="作废旧单：" >
                    <a @click="() => pdfPreviewOld(item.oldPdf)">{{item.oldPdfName}}</a>
                    </van-cell> 
                <van-cell title="质检结果：">
                        <a @click="getResults">点击查看</a>
                    </van-cell> 
                <van-cell title="待签新单:" >
                    <a @click="() => pdfPreview(item.newPdf)">{{item.newPdfName }}</a>
                    </van-cell> 
            </div>
        </van-cell-group>
    </div>
</template>
<script>
import API from '@/service/secondSign/index.js';
export default {
    name:'ListDetail',
    inject: ['reload'],
    data(){
        return{

        }
    },
    props:{
        item:{
            type:Object,
            default: ()=>{}
        },
    },
    methods: {
        onConfirmCheck(){
            this.$dialog.confirm({title:'提示',message:'确定签章？'})
                    .then(()=>{
                        let loadingDialog = this.$toast.loading({
                                            duration: 0,
                                            forbidClick: true,
                                            message:'信息上传中，请勿离开...'
                                            })
                        API.submitRecheck({param:this.item.deliveryOrder}).then(res=>{ loadingDialog.clear(); this.$toast.success('操作成功'); this.reload(); }).catch(e=>{loadingDialog.clear();});
                        }).catch(()=>{console.log('cancel')})
        },
        onConfirmCancel(){
            this.$dialog.confirm({title:'提示',message:'确定作废？'})
                                        .then(()=>{
                                            let loadingDialog = this.$toast.loading({
                                                                duration: 0,
                                                                forbidClick: true,
                                                                message:'信息上传中，请勿离开...'
                                                                })
                                            API.invalidRecheck({param:this.item.deliveryOrder}).then(res=>{ loadingDialog.clear(); this.$toast.success('操作成功'); this.reload(); }).catch(e=>{loadingDialog.clear();});
                                        })
                                        .catch(()=>{console.log('cancel')})

        },
        getResults(){
            this.$router.push({name:'recheck-result',params:{deliveryOrder: this.item.deliveryOrder}});
        },
        //预览新的单子
        pdfPreview(val){
            console.log(val)
            this.$router.push({name:'pdf-preview',params:{pdfId:val, pdfUrl:'https://shgg-test.evergrande.com/h5/dfs/download?objectName='+ val }})
        },
        //预览旧的单子
        pdfPreviewOld(val) {
            this.$router.push({name:'pdf-preview',params:{pdfId:val, pdfUrl:'https://shgg-test.evergrande.com/h5/ot/download?id='+ val }})
        }
        
    },
    created() {
        
    },
}
</script>

<style lang="less" scoped>
#flex-special{
    .van-cell__value{
        flex: 1.4;
        color: #1577FF;
        a{text-decoration: none;} 
    }
}
.van-button{
    height:30px;
}
.confirm-button{
    background: #F2584F;
    border-radius: 4px;
    color:white;
}
.cancel-button{
    background: #7F8792;
    border-radius: 4px;
    color:white;
}
</style>