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
            
            <div>
                <list-detail v-for="(item,index) in recheckList" :item="item" :index="index" v-bind:key="item.id"></list-detail>
            </div>
        </div>

    </div>
</template>

<script>
import ListDetail from './detail.vue';
export default {
    components:{ListDetail},
    data() {
        return {
            listNum:2,
            searchInput:'',
            recheckList: [], //列表
        }
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        onSearch(){
            console.log(this.searchInput)
        }
    },
    created(){
        this.recheckList = [{'id':1, 'materialNumber':1000536,'mateiralType':"6#水晶灯/19头/H370&1s100mm",'brandName':'Evergrande','constructor':'hello','useLocation':'GZ,SZ',"cancelOrder":'guess',"qualityRes":'res','newOrder':12},
      {'id':2, 'materialNumber':1000537,'mateiralType':"6#水晶灯/19头/H370&f1100mm",'shouldNumber':320}];
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
                }
            }
        }
}
</style>