<template>
  <div @click="routePath" class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <div class="sidebar-logo-link">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 v-if="sidebar.opened" class="sidebar-title">
          {{ title }}
        </h1>
      </div>
    </transition>
  </div>
</template>

<script>
import logoImg from "@/assets/image/logo/logo.png";
import variables from "@/assets/styles/variables.scss";
import { mapState, mapGetters } from "vuex";
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["sidebar", "device"]),
    variables() {
      return variables;
    },
  },
  created() {
    console.log("process.env.NODE_ENV", process.env.VUE_APP_TITLE);
  },
  data() {
    return {
      title: process.env.VUE_APP_TITLE,
      logo: logoImg,
    };
  },
  methods: {
    routePath() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #ffffff;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    cursor: pointer;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #303133;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
