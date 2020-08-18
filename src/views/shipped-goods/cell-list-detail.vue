<template>
    <div>
        <van-cell-group >
            <van-cell :style="{background:(compareFlag?'#7F8792':'#E1E3E9') , border:(compareFlag?'2px solid #F2584F':'none') }">
                <span v-if="!compareFlag" style="font-size:17px;color: #666666;">{{item.deliveryOrderRow}}.物料编号：{{item.materialCode}}</span>
                <span v-else style="font-size:17px; color:white">{{item.deliveryOrderRow}}.物料编号：{{item.materialCode}}</span>
            </van-cell>
            <div id="flex-special"><van-cell title="物料名称：" :value="item.materialDesc"/> </div>
            <van-cell title="应收数量：" :value="item.deliveryQuantity">
            <template #extra><div class="extra">{{item.quantityUnitDesc }}</div></template>
            </van-cell>
            <van-cell title="实收数量：" :value="item.actualQuantity ">
            <template #extra><div class="extra">{{item.quantityUnitDesc }}</div></template>
            </van-cell>
            <div id="flex-special" v-if="compareFlag"><van-cell title="少收原因：" :value="item.lessQuantityReason "/> </div>
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
            compareFlag: false,
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
        
    },
    computed:{
    },
    created() {
        this.compareFlag = this.item.actualQuantity != this.item.deliveryQuantity;
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