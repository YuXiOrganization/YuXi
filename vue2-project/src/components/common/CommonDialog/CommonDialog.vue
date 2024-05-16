<template>
  <el-dialog
    :title="title"
    :visible="visible"
    :width="width"
    :fullscreen="fullscreen"
    @close="handleCancel"
  >
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "CommonDialog",
  props: {
    width: {
      type: [String, Number],
      default: "30%",
    },
    title: String,
    // 可使用 .sync 修饰符
    visible: Boolean,
    // 是否全屏弹窗，当全屏时无论如何都会禁止 body 滚动。可使用 .sync 修饰符
    fullscreen: {
      type: Boolean,
      default: false,
    },
    // 是否允许切换全屏（允许后右上角会出现一个按钮）
    switchFullscreen: {
      type: Boolean,
      default: false,
    },
    // 点击确定按钮的时候是否关闭弹窗
    okClose: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    handleOk() {
      this.$emit("ok");
    },
    handleCancel() {
      this.$emit("cancel");
    },
  },
};
</script>
<style lang="" scoped></style>
