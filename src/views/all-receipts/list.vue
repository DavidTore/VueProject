<template>
    <div>
        <van-cell-group >
            <div id="flex-special">
                <van-cell title=" " :value="item.deliveryOrder">
                    <template #right-icon>
                        <van-button v-if="reSignButton" :disabled="resignDisabled" class="first-cell" @click="onResign">  </van-button>
                    </template>
                </van-cell>
                <van-cell title=" " :value="item.projectName"></van-cell> 
                <van-cell title=" " :value="item.supplierName"></van-cell> 
                <van-cell title=" " :value="item.signDate "></van-cell> 
                <van-cell title=" " >
                    <a @click="() => pdfPreview(item.pdf)" style="color:#1577FF;text-decoration: none; ">{{item.pdfName}}</a>
                    </van-cell> 
            </div>
        </van-cell-group>
    </div>
</template>
<script>
import API from '@/service/shipped/index.js';
export default {
    name:'allReceiptsDetail',
    data(){
        return{
            reSignButton: false,
            resignDisabled: false,
        }
    },
    props:{
        item:{
            type:Object,
            default: ()=>{}
        },
    },
    methods: {
        pdfPreview(val){
            console.log(val)
            this.$router.push({name:'pdf-preview',params:{pdfId:val,pdfUrl:window.baseUrl+'/h5/dfs/download?objectName='+ val}})
        },
        onResign(){
            console.log(this.item.deliveryOrder);
            this.resignDisabled = true;
            API.reSign({param:{deliveryOrder:this.item.deliveryOrder}}).then(r=>{
                this.reSignButton = false;
                }).catch(e=>{
                    this.resignDisabled = false;
                });
        }
    },
    created() {
        this.reSignButton = this.item.reSignButton;
    },
}
</script>

<style lang="less" scoped>
#flex-special{
    .van-cell__value{
        flex: 1.4;
    }
    .first-cell{
        padding: 0;
        background: #f8425f;
        color:white;
        height: 25px;;
    }
}

</style>