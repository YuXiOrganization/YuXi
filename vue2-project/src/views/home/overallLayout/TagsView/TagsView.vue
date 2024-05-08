<template>
  <div class="tag-views">
    <el-scrollbar :vertical="false">
      <div class="tag-views-test">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          :closable="tag == '首页' ? false : true"
          :disable-transitions="false"
          @close="handleClose(tag)"
          effect="plain"
        >
          {{ tag }}
        </el-tag>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicTags: ["首页", "标签一", "标签二", "标签三", "标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>
<style lang="scss" scoped>
.tag-views {
  padding: 8px 12px 5px 12px;
  width: 100%;
  // white-space: nowrap;
  // position: relative;
  // overflow: hidden;
  .tag-views-test {
    height: 40px;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
  }

  .el-tag {
    cursor: pointer;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
