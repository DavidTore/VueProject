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
             <van-cell v-for="item in searchList" :key="item.id" @click="onClickCell(item)">
                 <template #title>
                     {{item.name}}-{{item.id}}
                 </template>
             </van-cell>
            </div>
        </van-popup>
        </div>
    </div>
</template>

<script>
export default {
    name:'signerList',
    data() {
        return {
            searchInputValue: '',
            searchList:[]
        }
    },
    props:{
        show: {
            type:Boolean,
            default:false,
        }
    },
    methods:{
        onClickCancel(){
            this.$emit('onClickCancel')
        },
        onSignerInput(val){
            console.log(val);
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
        for (let i = 0; i < 10; i++) {
          this.searchList.push({name: this.searchList.length + 1, id: i});
        }
    },
    watch: {
    }
}
</script>
   
<style lang="less" scoped>

</style>