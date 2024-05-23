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
          <el-form-item label="渠道名称：" prop="name">
            <el-input v-model="formModel.name" :disabled="updateBtn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="渠道编码：" prop="code_num">
            <el-input v-model="formModel.code_num" :disabled="updateBtn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="渠道昵称：" prop="nick_name">
            <el-input v-model="formModel.nick_name"></el-input>
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
        name: "",
        code_num: "",
        nick_name: "",
      },
      validatorRules: {
        name: [
          {
            required: true,
            message: "请输入渠道名称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 50,
            message: "长度在1 到 50个字符",
            trigger: "blur",
          },
        ],
        nick_name: [
          {
            required: true,
            message: "请输入渠道昵称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 20,
            message: "长度在1 到 20个字符",
            trigger: "blur",
          },
        ],
        code_num: [
          {
            required: true,
            message: "请输入渠道编码",
            trigger: "blur",
          },
          {
            min: 1,
            max: 50,
            message: "长度在1 到 50个字符",
            trigger: "blur",
          },
        ],
      },
      url: {
        add: "/channel/addEntity",
        edit: "/channel/updateEntity",
      },
      updateBtn: false,
    };
  },

  methods: {
    add() {
      this.$refs.form.resetFields();
      this.formModel = {};
      this.updateBtn = false;
    },
    edit(record) {
      this.$refs.form.resetFields();
      // console.log(",record", record)
      this.formModel = Object.assign({}, record);
      this.updateBtn = true;
    },
    getFormData() {
      //获取查询条件
      let { id, name, code_num, nick_name } = Object.assign(this.formModel);
      let data = null;
      if (id) {
        data = {
          id: id,
          nick_name: nick_name,
        };
      } else {
        data = {
          name: name,
          code_num: code_num,
          nick_name: nick_name,
        };
      }

      return data;
    },
  },
};
</script>
<style lang="scss" scoped></style>
