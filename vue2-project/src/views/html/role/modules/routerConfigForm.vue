<template>
  <div>
    <el-form
      v-loading="confirmLoading"
      :label-position="labelPosition"
      :disabled="formDisabled"
      ref="form"
      :model="formModel"
      :rules="validatorRules"
      :label-width="labelWidth"
    >
      <el-row>
        <!-- <el-col :span="24">
          <el-form-item label="角色名：" prop="role_name">
            <el-input v-model="formModel.role_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col> -->

        <el-col :span="24">
          <el-form-item
            v-if="isAdd"
            label="上级名称："
            prop="parent_Name"
            label-width="110px"
          >
            <el-input disabled size="medium" v-model="formModel.parent_Name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="权限名称：" prop="auth_name" label-width="110px">
            <el-input size="medium" v-model="formModel.auth_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            v-if="formModel.type == 2"
            label="路径："
            prop="url"
            label-width="110px"
          >
            <el-input size="medium" v-model="formModel.url"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { formMixins } from "@/mixins/formMixins.js";
export default {
  mixins: [formMixins],
  data() {
    return {
      formModel: {
        role_name: "",
      },
      validatorRules: {
        role_name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
      url: {
        add: "/role/addEntity",
        edit: "/role/updateEntity",
        // queryById: "/application/sysAppMenu/queryById",
      },
      isAdd: true,
    };
  },

  methods: {
    add(record) {
      this.$refs.form.resetFields();
      console.log(",record", record);
      if (record) {
        this.isAdd = false;
      } else {
        this.isAdd = true;
      }
    },
    edit(record) {
      this.$refs.form.resetFields();
      // console.log(",record", record)

      this.formModel = record;
      //  Object.assign({}, record);

      this.isAdd = false;
    },
  },
};
</script>
<style lang="scss" scoped></style>
