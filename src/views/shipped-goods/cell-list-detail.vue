<template>
    <div>
        <van-cell-group >
            <van-cell :style="{background:(compareFlag?'#7F8792':'#E1E3E9') , border:(compareFlag?'2px solid #F2584F':'none') }">
                <span v-if="!compareFlag" style="font-size:17px;color: #666666;">{{(index+1)*10}}.物料编号：{{item.materialNumber}}</span>
                <span v-else style="font-size:17px; color:white">{{(index+1)*10}}.物料编号：{{item.materialNumber}}</span>
            </van-cell>
            <div id="flex-special"><van-cell title="物料名称：" :value="item.mateiralName"/> </div>
            <van-cell title="应收数量：" :value="item.shouldNumber">
            <template #extra><div class="extra">个</div></template>
            </van-cell>
            <van-cell title="实收数量：" :value="item.actualAmount">
            <template #extra><div class="extra">个</div></template>
            </van-cell>
            <div id="flex-special" v-if="compareFlag"><van-cell title="少收原因：" :value="item.reason"/> </div>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name:'cellGroupList',
    data() {
        return {
            listAmount: '',
            amountReason: '',
            showReason: false,
        }
    },
    props:{
        item: {
            type: Object,
            default: () => {}
        },
        index: Number,
    },
    methods:{
        onClickReason(){
            this.showReason = true;
        },
        onConfirm(value, index) {
            this.amountReason = value;
            this.showReason = false;
        },
        onChange(picker, value, index) {
            this.$toast.success(`当前值：${value}, 当前索引：${index}`);
        },
        onCancel() {
            this.showReason = false;
        },
        //验证表单
        validateCell(){
            if(!this.listAmount){
                return false;
            } else if(this.compareFlag && !this.amountReason){
                return false;
            } else return true;
        },
        
    },
    computed:{
        compareFlag(){
            return this.item.actualAmount != this.item.shouldNumber
        }
    },
    created() {
    },
    watch: {
        item:{
            deep:true,
            handler(val){
                console.log(val)
            }
        },
    }
}
</script>

<style lang="less" scoped>
/deep/ .van-cell__title{
    &.van-field__label{
        flex: 0.65;
    }
}
#flex-special{
    .van-cell__value{
        flex: 1.4;
    }
}
.extra{
    flex: 0.4;
    text-align: right;
    color:#666666;
}
</style>