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
          <el-form-item label="角色名：" prop="role_name">
            <el-input v-model="formModel.role_name" autocomplete="off"></el-input>
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
    };
  },

  methods: {
    edit(record) {
      this.$refs.form.resetFields();
      // console.log(",record", record)
      const { id, role_name } = record;
      let option = {
        id: id,
        role_name: role_name,
      };
      this.formModel = option;
      //  Object.assign({}, record);
    },
  },
};
</script>
<style lang="scss" scoped></style>
