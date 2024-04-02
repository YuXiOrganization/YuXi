<template>
  <el-container class="container">
    <el-header class="header">
      <el-col class="flexadd">
        <el-col :span="1" class="middle flexadd">
          <!-- <img class="imgStyle" src="../../assets/image/logo.png" alt="无法显示图片" /> -->
        </el-col>
        <el-col :span="22" class="middle">
          <h3>管理系统 V1.0.0</h3>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <a href="#" class="loginOut" @click.prevent="handleSignout">退出</a>
          </div>
        </el-col>
      </el-col>
    </el-header>
    <el-container>
      <el-aside class="aside" :width="iscollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          mode="vertical"
          background-color="#515A6E"
          text-color="#fff"
          active-text-color="#2D8CF0"
          :collapse="iscollapse"
          unique-opened
          router
          :collapse-transition="false"
          :default-active="activePath"
        >
          <el-submenu :index="item.path" v-for="item in menuListadd" :key="item.id">
            <template slot="title">
              <i class="el-icon-s-help"></i>
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item
              @click="saveNacState(subItem.path)"
              style="padding: 0"
              :index="subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <div :class="changeclass(subItem.path) ? 'addstyle' : ''">
                <template lot="title">
                  <i class="el-icon-menu addstylei"></i>
                  <span>{{ subItem.meta.title }}</span>
                </template>
              </div>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main" v-if="islook">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
// import { initDynamicRoutes } from "@/router/index.js";
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
  computed: {
    ...mapState(["rightList", "username"]),
  },
  // newVue之前自动触发
  // beforeCreate() {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     this.$router.push({ name: "login" });
  //   }
  // },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
  },

  mounted() {
    const rightList = JSON.parse(localStorage.getItem("rightList") || "[]");
    this.menuListadd = rightList;
  },

  methods: {
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
.toggle-button {
  background-color: #363e4f;
  font-size: 10px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
/* 头部布局 */
.flexadd {
  display: flex;
  align-items: center;
  justify-content: center;
}
.imgStyle {
  display: inline;
  height: 100%;
}
.middle {
  align-items: center;
  height: 100%;
}
.loginOut {
  font-weight: bold;
  line-height: 60px;
  text-decoration: none;
  color: rgb(81, 90, 110);
}
/* 大体布局 */
.container {
  height: 100%;
}
.header {
  background-color: #ffffff;
}
.aside {
  background-color: #515a6e;
  > ul > li {
    width: 200px;
  }
}
.main {
  height: 100%;
  /* background-color: #e9eef3; */
  background-color: #f2f2f2;
}
.addstyle {
  width: 100%;
  background-color: #414858;
  padding: 0;
}
.addstylei {
  margin-left: 45px;
}
</style>
