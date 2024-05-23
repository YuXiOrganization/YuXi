<template>
  <div>
    <el-form
      v-loading="confirmLoading"
      :label-position="labelPosition"
      :label-width="labelWidth"
      :disabled="formDisabled"
      ref="form"
      :model="formModel"
      :rules="validatorRules"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名：" prop="real_name">
            <el-input v-model="formModel.real_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="formModel.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号：" prop="identity_card">
            <el-input v-model="formModel.identity_card"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="所属银行：" prop="bank_name">
            <el-input v-model="formModel.bank_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户行地址：" prop="open_bank">
            <el-input v-model="formModel.open_bank"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现金券总金额：" prop="cash_vouchers_total">
            <el-input
              type="number"
              v-model.number="formModel.cash_vouchers_total"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="银行卡号：" prop="card_no">
            <el-input v-model="formModel.card_no"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="注册时间：" prop="create_time">
            <el-input v-model="formModel.create_time"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否禁用：" prop="is_valid">
            <el-select size="medium" v-model="formModel.is_valid" placeholder="">
              <el-option
                v-for="(v, i) in formType.is_api"
                :label="v.name"
                :value="v.id"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代理路径：" prop="path">
            <el-input v-model="formModel.path"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="身份证正面：" prop="pic1">
            <customImage v-model="formModel.pic1"> </customImage>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证反面：" prop="pic2">
            <customImage v-model="formModel.pic2"> </customImage>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import customImage from "@/components/addTool/customImage.vue";
import { formMixins } from "@/mixins/formMixins.js";
export default {
  mixins: [formMixins],
  components: {
    customImage,
  },
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
        queryById: "/agent/queryAgentInfoById",
        // queryById: "/application/sysAppMenu/queryById",
      },
      labelWidth: "120px",
      formType: {
        is_valid: [
          {
            id: "",
            name: "全部",
          },
          {
            id: "1",
            name: "开启",
          },
          {
            id: "2",
            name: "禁用",
          },
        ],
      },
    };
  },

  methods: {
    edit(record) {
      this.$refs.form.resetFields();
      // this.formModel = record;
      // console.log("this.formModel",this.formModel)
      this.queryById(record.id);
    },
  },
};
</script>
<style lang="scss" scoped></style>
