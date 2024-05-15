<template>
  <CommonPage>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          >新增</el-button
        >
      </el-col>
    </el-row>

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

    <!-- <el-table :data="dataSource" border @selection-change="handleSelectionChange">
      <el-table-column align="center" label="序号" type="index" width="50">
      </el-table-column>

      <el-table-column prop="role_name" label="角色名"></el-table-column>
      <el-table-column prop="create_time" label="申请时间">
        <template slot-scope="scope">
          <p v-if="scope.row.create_time">{{ gettime(scope.row.create_time) }}</p>
          <p v-else>--</p>
        </template>
      </el-table-column>
    </el-table> -->
    <div class="table-class" ref="testViews">
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="ipagination.current"
      :page-sizes="[15, 20, 30, 40, 50, 100]"
      :page-size="ipagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="ipagination.total"
    >
    </el-pagination>

    <roleModal ref="modalForm" @ok="modalFormOk"></roleModal>
  </CommonPage>
</template>

<script>
import { gettime } from "@/utils/collectionMethods/timeMethods.js";
import roleModal from "./modules/roleModal.vue";
import { CommonMixin } from "@/mixins/commonMixins.js";

export default {
  name: "Role",
  mixins: [CommonMixin],
  data() {
    return {
      url: {
        list: "/role/queryList",
      },
      getResizeObserver: 0,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },

  components: {
    roleModal,
  },
  mounted() {
    this.resizeHandler();
  },

  methods: {
    gettime(val) {
      return gettime(val);
    },
  },
};
</script>
<style lang="scss" scoped>
.table-class {
  // width: 100%;
  // height: 100%;
  // display: flex;
  // flex: auto;
}
</style>
