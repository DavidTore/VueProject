<template>
    <div>
        <div>
        <van-popup v-model="show" position="bottom" :style="{ height: '100%',background:'rgb(245,245,250)' }" >
            <van-nav-bar title="选择签章员" left-arrow
                    @click-left="onClickCancel">
            </van-nav-bar>
            <div>
            <van-search v-model="searchInputValue" show-action 
                        shape="round"  placeholder="输入姓名" @cancel="onClickCancel" 
                        @input="onSignerInput" @search="onSearchSigner" />
             <van-cell v-for="item in searchList" :key="item.receiverId " @click="onClickCell(item)">
                 <template #title>
                     {{item.receiverName }}-{{item.receiverMobile }}
                 </template>
             </van-cell>
            </div>
        </van-popup>
        </div>
    </div>
</template>

<script>
import API from '@/service/shipped/index.js';
export default {
    name:'signerList',
    data() {
        return {
            searchInputValue: '',
            searchList:[],
        }
    },
    props:{
        show: {
            type:Boolean,
            default:false,
        },
        signerList: {
            type: Array,
            default: () => [],
        },
    },
    methods:{
        onClickCancel(){
            this.$emit('onClickCancel')
        },
        onSignerInput(val){
            if(val!=''){
                console.log(val)
                this.searchList = this.signerList.filter(f => { return f.receiverName.search(val) != -1 })
            } else {
                console.log(11)
                this.searchList = this.signerList;
            }
        },
        onSearchSigner(val){
            console.log(val);
        },
        onClickCell(val){
            this.$emit('onClickCell', val);
        }
    },
    computed:{
    },
    created() {
        },
    watch: {
        signerList:{
            immediate: true,
            handler(val){
                this.searchList = val;
            }
        }
    }
}
</script>
   
<style lang="less" scoped>
/deep/ .van-search__content--round{
    background-color: #f0f0f0;
}
</style>