<template>
    <div>
        <van-cell-group >
            <van-cell :style="{background:'#E1E3E9'}">
                <span style="font-size:17px;color: #666666;">{{(index+1)*10}}.物料单号：{{item.materialNumber}}</span>
            </van-cell>
            <div id="flex-special">
                <van-cell title="材料类别：" :value="item.mateiralType"/>
                <van-cell title="品牌商：" :value="item.brandName"></van-cell> 
                <van-cell title="施工单位：" :value="item.constructor"></van-cell> 
                <van-cell title="使用位置：" :value="item.useLocation"></van-cell> 
                <van-cell title="作废旧单：" :value="item.cancelOrder"></van-cell> 
                <van-cell title="质检结果：" :value="item.qualityRes"></van-cell> 
                <van-cell title="待签新单:" :value="item.newOrder"></van-cell> 
            </div>
        </van-cell-group>
    </div>
</template>
<script>
export default {
    name:'ListDetail',
    data(){
        return{

        }
    },
    props:{
        item:{
            type:Object,
            default: ()=>{}
        },
        index: Number,
    },
    methods: {
        
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
</style>