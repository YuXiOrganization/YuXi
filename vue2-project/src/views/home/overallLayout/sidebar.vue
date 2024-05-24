<template>
  <div>
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b" -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <SidebarItem
          v-for="(route, index) in rightList"
          :key="route.meta.id + index"
          :item="route"
        ></SidebarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import logo from "@/views/home/overallLayout/logo";
import { mapGetters } from "vuex";
import SidebarItem from "@/views/home/overallLayout/SidebarItem";
export default {
  components: {
    SidebarItem,
    logo,
  },
  data() {
    return {
      // rightList: [
      //   {
      //     name: "adminSystem",
      //     path: "/adminSystem",
      //     hidden: false,
      //     component: "/system/user/index",
      //     meta: {
      //       title: "用户管理",
      //       icon: "el-icon-s-tools",
      //       noCache: false,
      //       link: null,
      //     },
      //     children: [
      //       {
      //         name: "admin",
      //         path: "/admin",
      //         hidden: false,
      //         component: "adminSystem/admin",
      //         meta: {
      //           title: "管理员列表",
      //           icon: "el-icon-s-tools",
      //           noCache: false,
      //           link: null,
      //         },
      //       },
      //       {
      //         name: "users",
      //         path: "/users",
      //         hidden: false,
      //         component: "adminSystem/user",
      //         meta: {
      //           title: "管理员列表",
      //           icon: "el-icon-s-tools",
      //           noCache: false,
      //           link: null,
      //         },
      //       },
      //     ],
      //   },
      // ],
    };
  },
  props: {
    transmitRightList: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    // ,"rightList"
    ...mapGetters(["sidebar"]),
    rightList() {
      return this.transmitRightList;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // console.log("routepath", route);
      // if set path, the sidebar will highlight the path you set
      if (meta.id) {
        return meta.id;
      }
      // console.log("routepath", path);
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  // created() {
  //   console.log("rightList",this.rightList);
  // },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
