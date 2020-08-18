<template>
    <div>
        <div class="title">
           <van-nav-bar
               left-arrow @click-left="onClickLeft" >
                <template #title>质检结果</template>
            </van-nav-bar>
        </div>
        <div class="content">
            <div class="delivery">
                <van-cell title="送货单号：" :value="deliveryOrder" />
            </div>

        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            deliveryOrder:'',
            tableData: [],
            option: {},
            
        }
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
    },
    created(){
        this.deliveryOrder = '3200010548';
    }
}
</script>

<style lang="less" scoped>
/deep/ .title{
    height: 70px;
    position:fixed;
    width: 100%;
    .van-nav-bar{
        top:0;
        width: 100%;
    }
}

/deep/ .content{
    width: 100%;
    position: fixed;
    bottom:0;
    overflow-y:scroll;
    overflow-x:hidden;
    top: 70px;
    background: rgb(245, 245, 250);
    .card {
        margin: 40pt 30pt;
        // width:210pt;
        height:321pt;
        background: #FFFFFF;
        border-radius: 10px;
        border-radius: 10px;
    }
    .delivery{
        .van-cell{
            background: #E1E3E9;
            font-size: 20px;
            .van-cell__title{
                flex: 0.5;
            }
            .van-cell__value{
                text-align: left;
            }
        }
    }
            .van-cell{
                &::after{
                    border-bottom: 0
                }
                .van-cell__value{
                    text-align: left;
                    .van-field{
                        padding: 0;
                    }
                    a {
                        text-decoration: underline;
                        &:link{
                            color: #1577FF;
                        }
                        &:visited{
                            color: #1577FF;
                        }
                    }
                }
            }
        
}
</style>