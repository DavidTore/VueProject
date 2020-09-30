<template>
    <div>
        <van-cell-group >
            <van-cell :style="{background:(compareFlag?'#7F8792':'#E1E3E9') , border:(compareFlag?'2px solid #F2584F':'none') }">
                <span v-if="!compareFlag" style="font-size:17px;color: #666666;">{{item.poRow}}.物料编号：{{item.materialCode}}</span>
                <span v-else style="font-size:17px; color:white">{{item.poRow}}.物料编号：{{item.materialCode}}</span>
            </van-cell>
            <div id="flex-special"><van-cell title="物料名称：" :value="item.materialDesc"/> </div>
            <div>
                <van-row>
                    <van-col span="10">
                        <div class="delivery" style="display:float">
                <van-cell title="应收:" :value="item.deliveryQuantity">
                    <!-- <template #extra><div class="extra">{{item.quantityUnitDesc }}</div></template> -->
                </van-cell>
            </div>
                    </van-col>
                    <van-col span="14">
                        <div class="actual" style="display:float">
            <van-cell :required="true" id="actual-quantity">
            <template #title>
                <span>实收：</span>
            </template>
            <van-field v-model="listAmount" placeholder="输入" :formatter="formatter" format-trigger="onChange" type="number" @blur="checkNum">
            </van-field>
            <div class="van-field__error-message" v-show="maximumFlag">最大{{maximumQuantity}}</div>
            <template #extra><div class="extra">{{item.quantityUnitDesc }}</div>
            </template>
            </van-cell>
            </div>
                    </van-col>
                </van-row>
            </div>
            
            
            <van-field v-if="compareFlag" v-model="amountReason" label="少收原因：" placeholder="请选择原因" readonly right-icon="arrow" required
                            @click="onClickReason" class="reason">
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
            maximumQuantity:0,
            reasonColumns: ['货损', '少发', '质量问题'],
            maximumFlag: false,
        }
    },
    props:{
        item: {
            type: Object,
            default: () => {}
        },
        index: Number,
        deliveryOrder: String,
    },
    methods:{
        checkNum(){
            if(Number(this.listAmount) > this.maximumQuantity){
                this.maximumFlag = true;
            } else {
                this.maximumFlag = false;
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
            //  this.$toast.success(`当前值：${value.text},${value.id}, 当前索引：${index}`);
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
        //返回表单
        getCellList(){
            if(this.compareFlag){ //如果少发货
                return Object.assign(this.item, {
                    actualQuantity: Number(this.listAmount),
                    lessQuantityReason : this.amountReason,
                })
            } else return  Object.assign(this.item,{
                actualQuantity: Number(this.listAmount),
            })
            
        },
        //格式化输入
        formatter(val) {
            if(val != ''){
                // 选择只有小数点或者正整数的正则，且不能出现以多个0开头的情况
                // /^([1-9]\d*\.\d+|0\.\d+|[1-9]\d*|0)$/g
                let reg = /^([1-9]\d*\.\d*|0\.\d*|[1-9]\d*|0)$/g;
                let res = reg.test(val);
                if(res) { 
                    return val;
                } else {
                    return val.substring(0, val.length - 1);
                }
            } else return val;
        }
    },
    computed:{
        compareFlag(){
            return this.listAmount < this.item.deliveryQuantity
        }
    },
    created() {
        this.listAmount = this.item.actualQuantity || '';
        let maxQuant = (this.item.toleranceRatio + 1) * this.item.deliveryQuantity;
        if(parseInt(maxQuant) == maxQuant)
        {
            this.maximumQuantity = maxQuant;
        } else {
            this.maximumQuantity = maxQuant.toFixed(3);
        }
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
    .delivery { 
        span{
            color:rgb(131,131,131);
        }
        .van-cell{
            padding-right:0;
        }
    }
    .actual {
        span{
            color:rgb(131,131,131);
        }
        .van-cell{
            padding-right:0;
        }
        .van-cell__title { 
            flex: 0.5;
        }
        .van-cell__value{
            flex: 0.8;
        }
     /deep/   .van-field__control{
           color: #9b9b9b;
            text-decoration: underline;
        }
        .extra{
           text-align: left;
           flex:0.6;
           color: #9b9b9b;
        }
    }
/deep/ #actual-quantity{
    &::before{
        position: absolute;
        left: 8px;
        color: #ee0a24;
        font-size: 14px;
        content: '*';
    }
}
/deep/ .van-cell__title{
    &.van-field__label{
        flex: 0.65;
    }
}
/deep/ .reason{
    .van-cell__title{
        flex: 0.5;
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