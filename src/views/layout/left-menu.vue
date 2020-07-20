
<template>
  <div class="hd-left-menu">
    <el-menu
      :default-active="crumbData.title.path"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#000911"
      text-color="#A4A9AF"
      active-text-color="#fff"
      :router="true"
    >
      <el-submenu v-for="item in navData" v-permission="item.permission" :index="item.name">
        <template slot="title">
          <i :class="item.icon + ' hd-icon-size'"></i>
          <span>{{ item.label }}</span>
        </template>
        <template v-for="item2 in item.children">
          <el-menu-item
            v-if="!item2.nobar"
            :index="item2.path"
            v-permission="item2.permission"
            :route="item2"
          >{{ item2.label }}</el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
    <div :class="isCollapse ? 'menu-switch is-collapse' : 'menu-switch'" @click="handleSwitch"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "left-menu",
  data() {
    return {
      isCollapse: false,
      activeLabel: ""
    };
  },
  props: {
    navData: {
      type: Array,
      default: []
    },
    onCollapse: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleSwitch() {
      this.isCollapse = !this.isCollapse;
      this.onCollapse(this.isCollapse);
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    handleSelect(key, keyPath) {
      //this.getSelectLabel(this.navData, key);
    },
    // 递归查 label 值
    getSelectLabel(data, key) {
      data.some(item => {
        if (item.index === key || (item.route && item.route.path === key)) {
          this.activeLabel = item.label;
          return true;
        } else if (item.children && item.children.length) {
          this.getSelectLabel(item.children, key);
        }
      });
    }
  },
  computed: {
    ...mapState(["crumbData"])
  },
  watch: {
    $route: function(val) {}
  },
  created() {
    this.activeIndex = this.$route.path;
  }
};
</script>

<style lang="less">
.hd-left-menu {
  position: relative;
  height: 100%;
  box-shadow: 4px 7px 10px #ccc;

  .el-menu {
    border-right: none;
    width: 180px;
    overflow: hidden;
    .el-submenu {
      .el-submenu__title {
        font-weight: bold;
        background-color: rgba(4, 24, 44, 1) !important;
        padding-left: 18px !important;
        .hd-icon-size {
          padding: 15px;
          background-size: 18px;
        }
        .hd-icon-people-n {
          background: url("~@/assets/icons/icon_people_n.svg") no-repeat center
            left;
        }
        .hd-icon-system-n {
          background: url("~@/assets/icons/icon_system_n.svg") no-repeat center
            left;
        }
        .hd-icon-camera-n {
          background: url("~@/assets/icons/icon_carmera_n.svg") no-repeat center
            left;
        }
        .hd-icon-area-n {
          background: url("~@/assets/icons/icon_area_n.svg") no-repeat center
            left;
        }
        .hd_icon_home_n_copy_2 {
          background: url("~@/assets/icons/icon_home_n.svg") no-repeat center
            left;
        }
      }
      &.is-active {
        .el-submenu__title {
          //color: #D6000F !important;
        }
        .hd-icon-people-n {
          background: url("~@/assets/icons/icon_people_s.svg") no-repeat center
            left;
        }
        .hd-icon-camera-n {
          background: url("~@/assets/icons/icon_carmera_s.svg") no-repeat center
            left;
        }
        .hd_icon_home_n_copy_2 {
          background: url("~@/assets/icons/icon_home_s.svg") no-repeat center
            left;
        }
        .hd-icon-area-n {
          background: url("~@/assets/icons/icon_area_s.svg") no-repeat center
            left;
        }
        .hd-icon-system-n {
          background: url("~@/assets/icons/icon_system_s.svg") no-repeat center
            left;
        }
      }
      .el-submenu__title:focus,
      .el-submenu__title:hover {
        background: #272c3c;
      }
      .el-menu-item {
        min-width: initial !important;
        padding-left: 48px !important;

        .hd-icon-project {
          background: url("~@/assets/icons/icon_project_n.svg") no-repeat center;
          padding: 15px;
          background-size: 18px;
        }

        &.is-active {
          background: #d6000f !important;
          .hd-icon-project {
            background: url("~@/assets/icons/icon_project_s.svg") no-repeat
              center;
            background-size: 18px;
          }
        }
      }
    }
  }
  .el-menu--collapse {
    width: 64px;
    .el-submenu.is-active {
      position: relative;
      background: #e6ecfd !important;
      &::after {
        content: "";
        height: 100%;
        width: 5px;
        background: #d6000f;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
  .menu-switch {
    position: absolute;
    z-index: 9;
    left: 100%;
    top: 50%;
    width: 9px;
    height: 39px;
    background: url("~@/assets/icons/icon_menu_close.svg") no-repeat center;
    &.is-collapse {
      background: url("~@/assets/icons/icon_menu_open.svg") no-repeat center;
    }
  }
}
.el-menu--popup {
  .el-menu-item {
    height: 46px;
    line-height: 46px;
    &.is-active {
      color: #d6000f !important;
    }
    &:not(.is-active):hover {
      color: #fff !important;
    }
  }
}
</style>
