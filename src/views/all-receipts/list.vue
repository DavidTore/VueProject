<template>
    <div>
        <van-cell-group >
            <div id="flex-special">
                <van-cell title="工地收货单：" :value="item.deliveryOrder"/>
                <van-cell title="项目：" :value="item.projectName"></van-cell> 
                <van-cell title="材料供应商" :value="item.supplierName"></van-cell> 
                <van-cell title="签核日期" :value="item.signDate "></van-cell> 
                <van-cell title="附件：" >
                    <a @click="() => pdfPreview(item.pdf)" style="color:#1577FF;text-decoration: none; ">{{item.pdfName}}</a>
                    </van-cell> 
            </div>
        </van-cell-group>
    </div>
</template>
<script>
export default {
    name:'allReceiptsDetail',
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
        pdfPreview(val){
            console.log(val)
            this.$router.push({name:'pdf-preview',params:{pdfId:val,pdfUrl:'https://shgg-test.evergrande.com/h5/dfs/download?objectName='+ val}})
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

</style>