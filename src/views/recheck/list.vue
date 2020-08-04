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
                <list-detail ></list-detail>
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
            searchInput:''
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
}
</style>