<template>
    <div>
        <van-cell-group >
            <van-cell :style="{background:'#E1E3E9'}">
                <span style="font-size:17px;color: #666666;">{{(index+1)*10}}.物料编号：{{item.materialNumber}}</span>
            </van-cell>
            <div id="flex-special"><van-cell title="物料名称：" :value="item.mateiralName"/> </div>
            <van-cell title="应收数量：" :value="item.shouldNumber">
            <template #extra><div class="extra">个</div></template>
            </van-cell>
            <van-cell title="实收数量：" :value="item.actualAmount">
            <template #extra><div class="extra">个</div></template>
            </van-cell>
            <div id="flex-special" v-if="compareFlag"><van-cell title="少收原因：" :value="item.reason"/> </div>
        </van-cell-group>
    </div>
</template>
<script>
export default {
    name:'ListDetail',
    data(){
        return{

        }
    },
    props:{

    },
    methods: {
        
    },
    created() {
        
    },
}
</script>

<style lang="less" scoped>

</style>