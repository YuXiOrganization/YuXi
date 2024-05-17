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
    <div class="table-class">
      <el-table :data="dataSource" border @selection-change="handleSelectionChange">
        <el-table-column align="center" label="序号" type="index" width="50">
        </el-table-column>

        <el-table-column prop="role_name" label="角色名"></el-table-column>
        <el-table-column prop="create_time" label="申请时间">
          <template slot-scope="scope">
            <p v-if="scope.row.create_time">{{ gettime(scope.row.create_time) }}</p>
            <p v-else>--</p>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="140" fixed="right">
          <template slot-scope="scope, record">
            <el-row class="block-col-2">
              <el-col>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    操作菜单<i class="el-icon-arrow-down el-icon--left"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button
                        type="warning"
                        size="medium"
                        @click="handleEdit(scope.row)"
                        >修改
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button
                        type="danger"
                        size="medium"
                        @click="handleDelete(scope.row.id)"
                        >删除
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button type="primary" size="medium" @click="setAuth(scope.row)"
                        >配置权限
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
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
    <roleAuthModal ref="roleAuthModal"></roleAuthModal>
    <roleModal ref="modalForm" @ok="modalFormOk"></roleModal>
  </CommonPage>
</template>

<script>
import { gettime } from "@/utils/collectionMethods/timeMethods.js";
import roleModal from "./modules/roleModal.vue";
import roleAuthModal from "./modules/roleAuthModal.vue";
import { CommonMixin } from "@/mixins/commonMixins.js";

export default {
  name: "Role",
  mixins: [CommonMixin],
  data() {
    return {
      url: {
        list: "/role/queryList",
        delete: "/role/deleteEntity",
      },
      getResizeObserver: 0,
      tableData: [],
    };
  },

  components: {
    roleModal,
    roleAuthModal,
  },

  methods: {
    setAuth(record) {
      this.$refs.roleAuthModal.edit(record);
      this.$refs.roleAuthModal.title = "编辑";
      this.$refs.roleAuthModal.disableSubmit = false;
    },

    gettime(val) {
      return gettime(val);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep(.el-dropdown-menu__item) {
  margin: 5px !important;
}
.table-class {
  width: 100%;
  padding: 20px 0;
  .el-dropdown-link {
    cursor: pointer;
  }
}
</style>
