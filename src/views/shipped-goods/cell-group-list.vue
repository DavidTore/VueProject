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
            <van-cell>
            <template #title><span style="color:red;font-size: 16px">*</span><span>实收数量：</span></template>
            <van-field v-model="listAmount" type="digit" placeholder="填写数量" @blur="checkNum"></van-field>
            <template #extra><div class="extra">个</div></template>
            </van-cell>

            <van-field v-if="compareFlag" v-model="amountReason" label="少收原因：" placeholder="请选择原因" readonly right-icon="arrow" required
                            @click="onClickReason">
            </van-field>
            <van-popup v-model="showReason" position="bottom" :style="{ height: '50%' }" round>
                <van-picker
                        title="少收原因"
                        show-toolbar
                        :columns="reasonColumns"
                        @confirm="onConfirm"
                        @cancel="onCancel"
                        @change="onChange"
                />
            </van-popup>
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
            reasonColumns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
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
        checkNum(){
            if(this.listAmount > this.item.shouldNumber){
                this.listAmount = this.item.shouldNumber
            }
        },
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
        compareFlag(){
            return this.listAmount < this.item.shouldNumber
        }
    },
    created() {
        this.listAmount = this.item.actualAmount;
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