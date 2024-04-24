<template>
  <div :class="classObj" class="home_wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar v-if="!sidebar.hide" class="sidebar-container"></sidebar>

    <div class="main-container">
      <navbar></navbar>
      <router-view class="main-container-view"></router-view>
    </div>
  </div>
</template>

<script>
import ResizeHandler from "@/views/home/mixin/ResizeHandler";
import navbar from "@/views/home/overallLayout/Navbar";
import { mapState, mapGetters } from "vuex";
import sidebar from "@/views/home/overallLayout/sidebar";
export default {
  data() {
    return {
      menuListadd: [],
      // 折叠
      iscollapse: false,
      // 激活链接地址
      activePath: "",
      // isactivePath:flase,
      // 是否可见
      islook: true,
    };
  },
  mixins: [ResizeHandler],
  components: {
    sidebar,
    navbar,
  },
  computed: {
    ...mapGetters(["sidebar", "device"]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },

  created() {
    this.activePath = window.sessionStorage.getItem("activePath");

    this.$nextTick(() => {
      console.log("this.device", this.device);
    });
  },

  // mounted() {
  //   const rightList = JSON.parse(localStorage.getItem("rightList") || "[]");
  //   this.menuListadd = rightList;
  // },

  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    changeclass(key) {
      // console.log("key", key);
      if (this.activePath == key) {
        let obj = true;
        // console.log("obj", obj);
        return obj;
      } else {
        let obj = false;
        // console.log("obj", obj);
        return obj;
      }
    },
    // 保存链接的激活状态
    saveNacState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
      // console.log("  this.activePath", typeof this.activePath);
    },
    // 点击切换菜单折叠
    toggleCollapse() {
      this.iscollapse = !this.iscollapse;
    },
    handleSignout() {
      // 清除token
      sessionStorage.clear();
      localStorage.clear();
      this.$message.success("退出成功");
      this.$router.push({ name: "login" });

      // 刷新页面指令
      window.location.reload();
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped lang="scss">
.test-color {
  color: #5a5e66;
}
// .dark .test-color {
//   color: red !important;
// }
// .toggle-button {
//   background-color: #363e4f;
//   font-size: 10px;
//   line-height: 24px;
//   color: #ffffff;
//   text-align: center;
//   letter-spacing: 0.2em;
//   cursor: pointer;
// }
/* 头部布局 */
.home_wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
