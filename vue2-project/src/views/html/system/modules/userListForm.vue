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
        <el-col :span="24">
          <el-form-item label="角色名：" prop="username">
            <el-input v-model="formModel.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="密码：" prop="password">
            <el-input v-model="formModel.password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="确认密码：" prop="password1">
            <el-input v-model="formModel.password1"></el-input>
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
      labelWidth: "120px",
      formModel: {
        username: "",
        password: "",
        password1: "",
      },
      validatorRules: {
        username: [
          { required: true, message: "用户名", trigger: "blur" },
          { min: 5, max: 20, message: "长度在 5 到 20个字符", trigger: "blur" },
        ],
        password: [
          {
            required: true,
            min: 5,
            max: 20,
            message: "长度在 5 到 20个字符",
            trigger: "blur",
          },
        ],
        password1: [
          {
            required: true,
            min: 5,
            max: 20,
            message: "长度在 5 到 20个字符",
            trigger: "blur",
          },
          { validator: this.validatePass2, trigger: "blur" },
        ],
      },
      url: {
        add: "/admin/addEntity",
        // edit: "/role/updateEntity",
        // queryById: "/application/sysAppMenu/queryById",
      },
    };
  },

  methods: {
    validatePass2(rule, value, callback) {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formModel.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
   
  },
};
</script>
<style lang="scss" scoped></style>
