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
      default-expand-all
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
        queryAllAuth: "/role/queryAllAuth",
        updateAuth: "/role/updateAuth",
      },
      transferParameter: null,
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
      this.transferParameter = record;
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
      this.updateAuth();
    },
    submitCallback() {
      this.$emit("ok");
      this.visible = false;
    },
    handleCancel() {
      this.close();
    },
    async updateAuth() {
      try {
        let checkedNodes = this.$refs.tree.getCheckedNodes();

        let handleIds = checkedNodes
          .map((item) => {
            return item.id;
          })
          .join(",");

        let option = {
          handle_ids: handleIds,
          roleId: this.transferParameter.id,
        };
        //加载数据 若传入参数1则加载第一页的内容
        const res = await postFormAction(this.url.updateAuth, option);
        if (res.success) {
          //update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
          this.close();
          this.$message.success(res.msg);
        } else {
          this.$message.warning(res.msg);
        }
      } catch (error) {
        console.log("err", error);
      }
    },
    async queryAllAuth() {
      try {
        //加载数据 若传入参数1则加载第一页的内容
        const res = await postFormAction(this.url.queryAllAuth);
        if (res.success) {
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
          this.checked_auth_list = res.data;
          this.$nextTick(() => {
            // 手动设置已选中的keys
            if (this.$refs.tree) {
              this.$refs.tree.setCheckedKeys(this.checked_auth_list);
            }
          });
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
