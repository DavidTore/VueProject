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
                <van-popup v-model="showPopup" position="right" :style="{width: '80%',height:'calc(100% - 65px)', position:'fixed', transform:'none',top:'auto', bottom:0, transition:'transform .00001s,-webkit-transform .00001s'}">
                   <div style="margin-top:15px;"> <span style="margin-left: 5px;">工地收货单</span> <br>
                    <input type="number" style="margin-top: 20px; margin-left: 5px; height: 50px; width: 90%; border: solid;" v-model="deliveryOrder" placeholder="请输入单号">
                   </div>
                   <div style="margin-top:25px; margin-left:5px;">
                       <span>签字日期</span> <br>
                       <input style="width:40%" @click="showStartPopup = true" readonly v-model="signBeginDate" placeholder="请选择开始日期"> 到
                       <input style="width:40%" @click="showEndPopup = true" readonly v-model="signEndDate" placeholder="请选择结束日期">
                   </div>
                   <div style="position:absolute;bottom:0; width:100%;">
                        <van-button type="warning" style="width:50%" @click="onReset">重置</van-button>
                        <van-button type="danger" style="width:50%;" @click="onSubmit">确定</van-button>
                    </div>
                </van-popup>
            </div>
            <van-list v-model="listLoading" :finished="listFinished" 
                :error.sync="listError" :immediate-check=false finished-text="没有更多了" error-text="请求失败，点击重新加载" 
                @load="onLoadList" >
            <div>
                <detail-list v-for="(item,index) in recheckList" :item="item" :index="index" v-bind:key="item.id"></detail-list>
            </div>
            </van-list>
        </div>
        <div>
            <van-popup v-model="showStartPopup" position="bottom" >
            <van-datetime-picker v-model="startDate" type="date" title="选择开始年月日" @confirm="onClickStartDate" @cancel="showStartPopup=false"/>
            </van-popup>

            <van-popup  v-model="showEndPopup" position="bottom">
            <van-datetime-picker v-model="endDate" type="date" title="选择结束年月日" @confirm="onClickEndDate" @cancel="showEndPopup=false" />
            </van-popup>
        </div>
        

    </div>
</template>

<script>
import API from '@/service/allReceipts/index.js';
import DetailList from './list.vue';
export default {
    components:{DetailList},
    data() {
        return {
            showPopup:false,
            listLoading: false,
            listFinished: false,
            listError: false,
            recheckList: [],
            deliveryOrder:'',
            startDate: new Date(),
            endDate: new Date(),
            signBeginDate:'',
            signEndDate:'',
            showStartPopup: false,
            showEndPopup: false,
            pageNum:1,
            listNum:0,
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
            this.listLoading = true;
            let {deliveryOrder,pageNum,signBeginDate,signEndDate} = {...this.$data};
            API.getList({param:{deliveryOrder,pageNum,signBeginDate,signEndDate}}).then(
                res=>{
                    this.listNum = res.data.total;
                    this.pageNum++;
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
        },
        onClickStartDate(val){
            let m = val.getMonth() + 1;
            let d = val.getDate();
            let res = val.getFullYear() + "-" + m + "-" + d;
            this.signBeginDate = res;
            this.showStartPopup = false;
            console.log(this.startDate)
        },
        onClickEndDate(val){
            let m = val.getMonth() + 1;
            let d = val.getDate();
            let res = val.getFullYear() + "-" + m + "-" + d;
            this.signEndDate = res;
            this.showEndPopup = false;
        },
        onReset(){
            this.deliveryOrder = '';
            this.signBeginDate = '';
            this.signEndDate = '';
        },
        onSubmit(){
            this.showPopup=false;
            this.pageNum = 1;
            this.recheckList = [];
            this.onLoadList();
        },
    },
    created(){
        this.onLoadList();
        // let {deliveryOrder,pageNum,signBeginDate,signEndDate} = {...this.$data};
        // API.getList({param:{deliveryOrder,pageNum,signBeginDate,signEndDate}}).then(res => {
        //     this.listNum = res.data.total;
        // }).catch(e=>{});
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