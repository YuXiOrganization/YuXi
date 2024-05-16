<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <i
          class="right-menu-icon"
          :class="isDark ? 'el-icon-moon' : 'el-icon-sunny'"
          @click="toggleDark"
        />
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <!-- <i class="el-icon-caret-bottom" /> -->
          <div class="avatar-wrapper-text">
            <div class="wrapper-text-name">Admin</div>
            <div class="wrapper-text-auth">[超级管理员]</div>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import logoImg from "@/assets/image/logo/logo.png";
import { mapGetters } from "vuex";
import Hamburger from "@/views/home/overallLayout/Hamburger";

export default {
  components: {
    Hamburger,
  },
  data() {
    return {
      // sidebar: require("@/assets/images/profile.jpg"),
      avatar: logoImg,
      isDark: false,
    };
  },
  computed: {
    ...mapGetters(["sidebar", "device"]),
  },
  mounted() {},
  methods: {
    toggleDark() {
      this.isDark = !this.isDark;
      // 获取html根元素标签
      let html = document.documentElement;
      if (this.isDark) {
        // html添加class="dark"选择器
        html.classList.add("dark");
      } else {
        // html移除class="dark"选择器
        html.classList.remove("dark");
      }
    },

    toggleSideBar() {
      // console.log("$store",this.$store)
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // console.log(" this.$store", this.$store);
          this.$store.dispatch("user/LogOut")
          // .then(() => {
          //   location.href = "/login";
          // });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  min-height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;

    &:focus {
      outline: none;
    }
    .right-menu-icon {
      font-size: 22px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 12px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 12px;
      display: flex;
      align-items: center;

      .avatar-wrapper {
        cursor: pointer;

        display: flex;
        flex-direction: row;

        .avatar-wrapper-text {
          margin-left: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .wrapper-text-name {
            font-size: 14px;
            line-height: 14px;
          }
          .wrapper-text-auth {
            margin-top: 5px;
            font-size: 12px;
            line-height: 14px;
            color: #7f7f7f;
          }
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          // border-radius: 10px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
