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
    <el-tree
      :data="auth_list"
      ref="tree"
      show-checkbox
      node-key="id"
      default-expand-all="true"
      :default-checked-keys="checked_auth_list"
    >
    </el-tree>
  </CommonDialog>
</template>

<script>
import { postFormAction } from "@/api/currencyApi";
import CommonDialog from "@/components/common/CommonDialog/CommonDialog.vue";
export default {
  data() {
    return {
      title: "",
      width: "800",
      visible: false,
      disableSubmit: false,
      auth_list: [],
      checked_auth_list: [],
      url: {
        authByRoleId: "/role/queryAuthByRoleId",
        queryAllAuth: "role/queryAllAuth",
      },
    };
  },
  components: {
    CommonDialog,
  },
  methods: {
    add() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.realForm.add();
      });
    },
    async edit(record) {
      await this.queryAllAuth();
      await this.queryAuthByRoleId(record.id);
      this.visible = true;
      //   this.$nextTick(() => {
      //     this.$refs.realForm.edit(record);
      //   });
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
    async queryAllAuth() {
      try {
        //加载数据 若传入参数1则加载第一页的内容
        const res = await postFormAction(this.url.queryAllAuth);
        if (res.success) {
          //update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
          this.auth_list = res.data;
        } else {
          this.$message.warning(res.msg);
        }
      } catch (error) {
        console.log("err", error);
      }
    },
    async queryAuthByRoleId(roleid) {
      try {
        //加载数据 若传入参数1则加载第一页的内容
        const res = await postFormAction(this.url.authByRoleId, {
          roleId: roleid,
        });
        if (res.success) {
          //update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
          this.checked_auth_list = res.data;
        } else {
          this.$message.warning(res.msg);
        }
      } catch (error) {
        console.log("err", error);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
