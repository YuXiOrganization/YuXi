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
    <el-form
      :disabled="disableSubmit"
      ref="form"
      :model="formModel"
      :rules="validatorRules"
    >
      <el-form-item label="理由：" prop="error_check_status">
        <el-input
          size="medium"
          type="textarea"
          placeholder="请输入内容"
          readonly
          v-model="formModel.error_check_status"
          maxlength="30"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
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
        updateAgentStatus: "/agent/updateAgentStatus",
      },
      transferParameter: null,
      formModel: {
        error_check_status: "",
      },
      validatorRules: {
        error_check_status: [
          {
            required: true,
            message: "请输入理由",
            trigger: "blur",
          },
        ],
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
        // this.$refs[formName].validate((valid) => {
        //             if (valid) {
        //                 //   this.request(formData);
        //                 resolve(true);
        //             } else {
        //                 // reject({ error: "报错" });
        //                 // console.log("error submit!!");
        //                 return false;
        //             }
        //         });
        let option = {
          id: this.transferParameter.id,
          error_check_status: this.transferParameter.error_check_status,
        };
        //加载数据 若传入参数1则加载第一页的内容
        const res = await postFormAction(this.url.updateAgentStatus, option);
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
