<template>
  <div :class="classObj" class="home_wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar
      v-if="!sidebar.hide"
      :transmitRightList="rightList"
      class="sidebar-container"
    ></sidebar>

    <div class="main-container">
      <navbar></navbar>
      <!-- v-model="activeName" @tab-click="handleClick" -->
      <TagsView />
      <!-- <div class="main-container-page"> -->
      <transition name="fade" mode="out-in" appear>
        <!-- :include="cachedViews" -->
        <keep-alive>
          <router-view v-if="!$route.meta.link" :key="key"></router-view>
        </keep-alive>
      </transition>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import TagsView from "@/views/home/overallLayout/TagsView/TagsView";
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
      // cachedViews: ["html/agent/agent"],
    };
  },
  mixins: [ResizeHandler],
  components: {
    sidebar,
    navbar,
    TagsView,
  },
  computed: {
    key() {
      return this.$route.path;
    },
    ...mapGetters(["sidebar", "device", "rightList"]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
    cachedViews() {
      let getCachedViews = this.$store.state.app.cachedViews
        .map((item) => {
          // TODO keep-alive缓存方法
          if (!item.type) {
            let getPath = item.path
              .split("/")
              .pop()
              .replace(/^\w/, (c) => c.toUpperCase());

            return getPath;
          }
        })
        .filter(Boolean);
      // console.log("getCachedViews", getCachedViews);
      return getCachedViews;
    },
  },

  created() {
    this.activePath = window.sessionStorage.getItem("activePath");

    // this.$nextTick(() => {
    //   console.log("this.device", this.device);
    // });
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
.main-container-page {
  display: flex;
  flex-direction: row;
}
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
  .fade-transform--move,
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s;
    // transition: opacity 0.5s;
  }
  .fade-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  /* .fade-leave-active below version 2.1.8 */
  .fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
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
