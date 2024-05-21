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
    <agentForm ref="realForm" @ok="submitCallback" :disabled="disableSubmit" />
  </CommonDialog>
</template>

<script>
import agentForm from "./agentForm.vue";
import CommonDialog from "@/components/common/CommonDialog/CommonDialog.vue";
export default {
  data() {
    return {
      title: "",
      width: "1000px",
      visible: false,
      disableSubmit: false,
    };
  },
  components: {
    CommonDialog,
    agentForm,
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
