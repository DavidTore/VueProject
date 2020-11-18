<template>
  <div class=" -crumbs clearfix">
    <div class="left">
      <!--<div class="til">{{crumbData.title.label}}</div>-->
      <div class="crumbs" v-if="crumbData.list && crumbData.list.length">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
              v-for="item in crumbData.list" :to="item">
            {{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="right">
      <template v-for="item in crumbBtnList">
        <el-button v-if="item.type==='back'" size="small"  @click="goBack">返回</el-button>
        <el-button v-else size="small" type="primary"  @click="item.action">{{item.label}}</el-button>
      </template>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: ' -crumbs',
    data() {
      return {

      }
    },
    computed: {
      ...mapState([ 'crumbBtnList', 'crumbData' ])
    },
    methods: {
      goBack() {
        this.$router.back();
      }
    },
    created() {
    }
  }
</script>

<style lang="less">
  . -crumbs {
    .left {
      float:left;
      .til {
        font-size: 16px;
        font-weight:bold;
        color: #333;
        padding: 20px 0 10px 0;
      }
      .crumbs {
        padding: 20px 0;
        margin-top:-20px;
        padding-left: 25px;
        background:url("~@/assets/icons/home_icon.svg") no-repeat left center;
      }
    }
    .right{
      float:right;
      line-height: 60px;
    }

  }

</style>