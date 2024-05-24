<template>
  <el-dialog
    :title="title"
    :visible="visible"
    :width="width"
    :fullscreen="fullscreen"
    @close="handleCancel"
    :append-to-body="appendToBody"
  >
    <div class="dialog-context">
      <slot></slot>
    </div>
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
    // Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
    appendToBody: {
      type: Boolean,
      default: false,
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
<style lang="scss" scoped>
.dialog-context {
  max-height: 500px;
  overflow-y: auto;
}
</style>
