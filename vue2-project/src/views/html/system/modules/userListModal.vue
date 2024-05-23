<template>
  <CommonDialog
    ref="modal"
    :title="title"
    :width="width"
    :visible="visible"
    :maskClosable="false"
    switchFullscreen
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <userListForm ref="realForm" @ok="submitCallback" :disabled="disableSubmit" />
  </CommonDialog>
</template>

<script>
import userListForm from "./userListForm.vue";
import CommonDialog from "@/components/common/CommonDialog/CommonDialog.vue";
export default {
  data() {
    return {
      title: "",
      width: "400px",
      visible: false,
      disableSubmit: false,
    };
  },
  components: {
    CommonDialog,
    userListForm,
  },
  methods: {
    add() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.realForm.add();
      });
    },
    edit(record) {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.realForm.edit(record);
      });
    },
    close() {
      this.$emit("close");
      this.visible = false;
    },
    handleOk() {
      this.$refs.realForm.handleOk();
    },
    submitCallback() {
      this.$emit("ok");
      this.visible = false;
    },
    handleCancel() {
      this.close();
    },
  },
};
</script>
<style lang="scss" scoped></style>
