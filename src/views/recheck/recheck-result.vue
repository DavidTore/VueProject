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
    <div style="position: absolute; top: 70px; text-align:center">
    <table style="table-layout: fixed; width:900px; border-color: aliceblue;" border="1" cellspacing="0">
      <tr>
        <th  v-for="(item, index) in option.column" :key="index" >{{ item.label }}</th>
      </tr>
      <tr v-for="(item, index) in tableData" :key="index" :style="Number(item['unQualifiedCount']) > 0 ? {color:'red'}:{color:'black'}">
        <td >{{item['deliveryOrderRow']}}</td>
        <td >{{item['materialCode']}}</td>
        <td @click="() => handleClick(index)" :style="activeIndex == index ? {display:'-webkit-box', '-webkit-box-orient':'vertical',overflow:'hidden','word-break':'break-all'}:{display:'-webkit-box', '-webkit-box-orient':'vertical', '-webkit-line-clamp':2,overflow:'hidden','word-break':'break-all'}">{{item['materialDesc']}}</td>
        <td >{{item['actualSendCount']}}</td>
        <td>{{item['unQualifiedCount']}}</td>
        <td>{{item['qualifiedCount']}}</td>
      </tr>
    </table>
  </div>
        </div>

    </div>
</template>

<script>
import API from '@/service/secondSign/index.js';
export default {
    data() {
        return {
            deliveryOrder:'',
            activeIndex: -1,
            tableData: [],
	//th
	option: {
        column: [
          {
            label: '行号',
            prop: 'deliveryOrderRow '
          },
          {
            label: '物料编码',
            prop: 'materialCode'
          },
          {
            label: '物料描述',
            prop: 'materialDesc ',
            width: '100px'
          },
          {
            label: '实收数量',
            prop: 'actualSendCount '
          },
          {
            label: '不合格数量',
            prop: 'unQualifiedCount '
          },
          {
            label: '合格数量',
            prop: 'qualifiedCount '
          }
        ]
      },
      showFlag: false,
            
        }
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        handleClick(val){
            console.log(val)
            if(val == this.activeIndex){
                this.activeIndex = -1;
            }
            else {
            this.activeIndex = val;
            }
        }
    },
    created(){
        this.deliveryOrder = this.$route.params.deliveryOrder;
        API.getReport({param: this.$route.params.deliveryOrder}).then(res=>{ this.tableData = res.data }).catch(e=>{});
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
    overflow-x:scroll;
    top: 70px;
    background: rgb(245, 245, 250);
    .delivery{
        width: 100%;
        position: fixed;
        .van-cell{
            background: #E1E3E9;
            font-size: 20px;
            .van-cell__title{
                flex: 0.7;
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