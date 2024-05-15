<template>
  <div class="common-page">
    <transition name="fade" mode="out-in" appear>
      <el-card class="common-page-card">
        <slot></slot>
      </el-card>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped>
.common-page {
  width: 100%;
  height: 100%;
  background-color: #f5f6fb;
  display: flex;
  .common-page-card {
    width: 100%;
    // height: 100%;
    display: flex;
    // flex-direction: column;
    flex: auto;
    margin: 12px;
    border-radius: 8px;
  }
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
</style>
