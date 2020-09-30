<template>
    <div>
        <div class="title">
           <van-nav-bar
               left-arrow @click-left="onClickLeft" >
                <template #title>二次签章列表({{listNum}})</template>
            </van-nav-bar>
            <van-search v-model="searchInput" show-action placeholder="请输入单号">
                <template #action> 
                    <div @click="onSearch">搜索</div> 
                </template>
            </van-search>
        </div>
        <div class="content">
            <van-list v-model="listLoading" :finished="listFinished" :immediate-check=false
                :error.sync="listError" finished-text="没有更多了" error-text="请求失败，点击重新加载" 
                @load="onLoadList" >
            <div>
                <list-detail v-for="item in recheckList" :item="item" v-bind:key="item.id"></list-detail>
            </div>
            </van-list>
        </div>

    </div>
</template>

<script>
import API from '@/service/secondSign/index.js';
import ListDetail from './detail.vue';
export default {
    components:{ListDetail},
    data() {
        return {
            listNum:0,
            searchInput:'',
            recheckList: [], //列表
            listLoading: false,
            listFinished: false,
            listError: false,
            pageNum: 1,
        }
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        onSearch(){
            this.recheckList = [];
            this.pageNum = 1;
             this.onLoadList();
        },
        onLoadList(){
            this.listLoading = true;
            API.getRechcekList({param:{pageNum:this.pageNum,deliveryOrder:this.searchInput}}).then(
                res=>{
                    this.pageNum++;
                    this.listNum = res.data.total;
                    this.recheckList = this.recheckList.concat(res.data.rows);
                    this.listLoading = false;
                    console.log(this.recheckList.length);
                    if(this.recheckList.length >= res.data.total) {
                        this.listFinished = true;
                    } else {
                        this.listFinished = false;
                    }
                }
            ).catch(e => {
                this.listLoading = false;
                this.listError = true;
            })
        }
    },
    created(){
        this.onLoadList();
    }
}
</script>

<style lang="less" scoped>
/deep/ .title{
    height: 120px;
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
    top: 120px;
    background: rgb(245, 245, 250);
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