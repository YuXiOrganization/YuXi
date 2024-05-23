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
import { getAction, httpAction } from "@/api/currencyApi";
import { formMixins } from "@/mixins/formMixins.js";
export default {
  mixins: [formMixins],
  data() {
    return {
      formModel: {},
      validatorRules: {
        auth_name: [
          {
            required: true,
            message: "请输入权限名称",
            trigger: "blur",
          },
        ],
        url: [
          {
            required: true,
            message: "请输入路径",
            trigger: "blur",
          },
        ],
      },
      url: {
        add: "/role/addAuth",
        edit: "/role/upDataAuth",
        // queryById: "/application/sysAppMenu/queryById",
      },
      isAdd: true,
      tableData: [],
    };
  },

  methods: {
    async generateCodeFun() {
      let getFormModel = this.formModel;
      //形成auth_code
      let getArray = null;
      if (getFormModel.parent_code) {
        let getObject = await this.findById(getFormModel.parent_code, this.tableData);
        getArray = getObject.children;
      } else {
        getArray = this.tableData;
      }
      console.log("getArray", getArray);
      if (getArray) {
        let getNumArray = [];
        getArray.map((item) => {
          let getNum = null;

          switch (getFormModel.type) {
            case 1:
              getNum = Number(item.id.slice(2, 4));
              break;
            case 2:
              getNum = Number(item.id.slice(4, 6));
              break;
            case 3:
              getNum = Number(item.id.slice(6, 8));
              break;
          }
          getNumArray.push(getNum);
        });
        console.log("getNumArray", getNumArray);
        let getFunNum = await this.findMissingOrNextNumber(getNumArray);
        let getMaxNum = getFunNum ? getFunNum : 1;

        let getNum = getMaxNum > 9 ? getMaxNum : `0${getMaxNum}`;

        let auth_code;
        if (getFormModel.parent_code) {
          auth_code = `${getFormModel.parent_code}${getNum}`;
        } else {
          auth_code = `AU${getNum}`;
        }

        getFormModel.auth_code = auth_code;
      } else {
        getFormModel.auth_code = `${getFormModel.parent_code}01`;
      }

      return getFormModel;
    },
    findById(id, arr) {
      for (let item of arr) {
        if (item.id === id) {
          return item;
        }
        if (item.children && item.children.length > 0) {
          const foundInChildren = this.findById(id, item.children);
          if (foundInChildren) {
            return foundInChildren;
          }
        }
      }
      return null; // 如果没有找到，则返回null或其他默认值
    },
    findMissingOrNextNumber(arr) {
      // 对于有序数组，直接检查每个位置是否为连续数字
      for (let i = 1; i < arr.length + 1; i++) {
        if (!arr.includes(i)) {
          return i;
        }
      }
      // 如果数组是连续的，返回最大数字加1
      return arr.length + 1;
    },
    async request() {
      try {
        let url = this.url.add,
          method = "get",
          getFormModel = null;

        if (!this.isAdd) {
          url = this.url.edit;
          method = "post";
          getFormModel = this.formModel;
        } else {
          getFormModel = await this.generateCodeFun();
        }

        this.confirmLoading = true;
        console.log("getFormModel", getFormModel);
        console.log("url", url);
        // return;
        const { success, msg } = await httpAction(url, getFormModel, method);

        if (success) {
          this.$message.success(msg);
          this.$emit("ok");
          this.close();
        } else {
          this.$message.warning(msg);
        }
        this.confirmLoading = false;
      } catch (error) {
        this.$message.warning(error);
        this.confirmLoading = false;
      }
    },
    add(record, tableData) {
      this.$refs.form.resetFields();
      // console.log(",tableData", tableData);
      this.formModel = record;
      this.tableData = tableData;
      // if (record) {
      //   this.isAdd = false;
      // } else {
      //   this.isAdd = true;
      // }
      this.isAdd = true;
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
