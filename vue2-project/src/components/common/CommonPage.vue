<template>
  <div class="common-page">
    <el-card body-style="width:100%;" class="common-page-card">
      <slot></slot>
    </el-card>
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
  // height: 100%;
  background-color: #f5f6fb;
  display: flex;
  flex-grow: 1;
  overflow: auto;
  // .el-card__body{
  //   overflow: auto;
  // }
  .common-page-card {
    overflow: auto;
    width: 100%;
    display: flex;

    flex-grow: 1;
    margin: 12px;
    border-radius: 8px;

    /* 滚动条整体样式 */
    &::-webkit-scrollbar {
      width: 8px; /* 纵向滚动条宽度 */
      height: 8px; /* 横向滚动条高度 */
    }

    /* 滚动条轨道 */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 8px;
    }

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      background: #d0d0d0;
      border-radius: 8px;
      &:hover {
        background: #555;
      }
    }
  }
}
</style>
