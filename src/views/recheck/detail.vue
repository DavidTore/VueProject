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
                    <a :href="item.oldPdf ">{{item.oldPdf}}</a>
                    </van-cell> 
                <van-cell title="质检结果：">
                        <a @click="getResults">点击查看</a>
                    </van-cell> 
                <van-cell title="待签新单:" :value="item.newPdf">
                    <a href="">{{item.newPdf }}</a>
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
                        console.log('confirm');
                        API.submitRecheck({param:this.item.deliveryOrder}).then(res=>{ this.reload();}).catch(e=>{});
                        }).catch(()=>{console.log('cancel')})
        },
        onConfirmCancel(){
            this.$dialog.confirm({title:'提示',message:'确定作废？'})
                                        .then(()=>{
                                            console.log('confirm');
                                            API.invalidRecheck({param:this.item.deliveryOrder}).then(res=>{this.reload();}).catch(e=>{});
                                        })
                                        .catch(()=>{console.log('cancel')})

        },
        getResults(){
            this.$router.push({name:'recheck-result'})
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