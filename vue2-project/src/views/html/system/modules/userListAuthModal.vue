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
    <div class="user_auth_modal"></div>
    <el-checkbox-group v-model="checkList" class="auth_modal_group">
      <el-checkbox
        v-for="(item, index) in checked_auth_list"
        :key="index"
        :label="item.id"
        :checked="item.checked"
        >{{ item.role_name }}</el-checkbox
      >
    </el-checkbox-group>
  </CommonDialog>
</template>

<script>
import { postFormAction } from "@/api/currencyApi";
import CommonDialog from "@/components/common/CommonDialog/CommonDialog.vue";
export default {
  data() {
    return {
      title: "",
      width: "400px",
      visible: false,
      disableSubmit: false,
      auth_list: [],
      checked_auth_list: [],
      url: {
        queryRoleListByUserId: "/role/queryRoleListByUserId",
        updateRoleByUserId: "role/updateRoleByUserId",
      },
      transferParameter: null,
      checkList: [],
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
      this.checkList = [];
      this.checked_auth_list = [];
      this.transferParameter = record;

      await this.queryRoleListByUserId(record.id);
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
        // let handleIds = checkedNodes
        //   .map((item) => {
        //     return item.id;
        //   })
        //   .join(",");
        console.log("checkList", this.checkList.join(","));
        // return;

        let option = {
          id: this.transferParameter.id,
          roleId: this.checkList.join(","),
        };
        //加载数据 若传入参数1则加载第一页的内容
        const res = await postFormAction(this.url.updateRoleByUserId, option);
        if (res.success) {
          //update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
          this.submitCallback();
          this.$message.success(res.msg);
        } else {
          this.$message.warning(res.msg);
        }
      } catch (error) {
        console.log("err", error);
      }
    },

    async queryRoleListByUserId(id) {
      try {
        //加载数据 若传入参数1则加载第一页的内容
        const res = await postFormAction(this.url.queryRoleListByUserId, {
          id: id,
        });
        if (res.success) {
          this.checked_auth_list = res.data;
          console.log("this.checked_auth_list", this.checked_auth_list);
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
<style lang="scss" scoped>
.el-checkbox-group {
  display: flex;
  flex-direction: column;
}

.el-checkbox {
  padding: 10px 50px;
}
.user_auth_modal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .auth_modal_group {
    display: flex;
    flex-direction: column;
  }
}
</style>
