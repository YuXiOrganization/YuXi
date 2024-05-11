<template>
  <CommonPage>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          >新增</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          >导出</el-button
        >
      </el-col> -->
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->

      <roleModal ref="modalForm" @ok="modalFormOk"></roleModal>
    </el-row>
  </CommonPage>
</template>

<script>
import roleModal from "./modules/roleModal.vue";
import { CommonMixin } from "@/mixins/commonMixins.js";

export default {
  name: "Role",
  mixins: [CommonMixin],
  data() {
    return {
      url: {
        list: "/pmPlan/pmPlanNode/list",
      },
    };
  },
  components: {
    roleModal,
  },
};
</script>
<style lang="scss" scoped></style>
