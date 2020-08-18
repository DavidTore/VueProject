<template>
    <div>
        <div class="title">
           <van-nav-bar
               left-arrow @click-left="onClickLeft" @click-right="onClickRight">
                <template #title>已签核</template>
                <template #right>
                    <van-image width="30" height="30"  :src="require('@/assets/images/filter.png')"></van-image>
                </template>
            </van-nav-bar>
        </div>
        <div class="content">
            <div>
                <van-popup v-model="showPopup" position="right" :style="{width: '80%',height:'100%', position:'absolute'}">
                    内容
                </van-popup>
            </div>
            <!-- <van-list v-model="listLoading" :finished="listFinished" 
                :error.sync="listError" finished-text="没有更多了" error-text="请求失败，点击重新加载" 
                @load="onLoadList" >
            <div>
                <list-detail v-for="(item,index) in recheckList" :item="item" :index="index" v-bind:key="item.id"></list-detail>
            </div>
            </van-list> -->
        </div>

    </div>
</template>

<script>
import API from '@/service/secondSign/index.js';
export default {
    components:{},
    data() {
        return {
            showPopup:false,
        }
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        onClickRight(){
            this.showPopup = true;
        },
        onSearch(){
        },
        onLoadList(){
        
        }
    },
    created(){}
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
    top: 64px;
    background: rgb(245, 245, 250);
    .van-overlay{
        top: 64px;
        background-color: rgba(0,0,0,.4);
    }
    .card {
        margin: 40pt 30pt;
        // width:210pt;
        height:321pt;
        background: #FFFFFF;
        border-radius: 10px;
        border-radius: 10px;
    }
    .van-cell-group{
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
}
</style>