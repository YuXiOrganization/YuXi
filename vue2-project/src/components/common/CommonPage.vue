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
  }
}
</style>
