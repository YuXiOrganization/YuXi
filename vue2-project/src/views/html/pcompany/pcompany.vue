<template>
  <CommonPage>
    <el-row :gutter="10" class="mb20">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['AU0201', 'AU020102']"
          type="success"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd()"
          >新增</el-button
        >
      </el-col>
    </el-row>

    <div class="table-class">
      <el-table :data="dataSource" stripe border @selection-change="handleSelectionChange">
        <el-table-column align="center" label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column align="center" prop="name" label="渠道名称"></el-table-column>
        <el-table-column
          align="center"
          prop="code_num"
          label="渠道编码"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="nick_name"
          label="渠道昵称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="updated_by"
          label="操作人"
        ></el-table-column>

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
                        v-hasPermi="['AU0201', 'AU020103']"
                        >修改
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
    <div class="pagination-class">
      <div></div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="ipagination.current"
        :page-sizes="ipagination.pageSizeOptions"
        :page-size="ipagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="ipagination.total"
      >
      </el-pagination>
    </div>

    <pcompanyModal ref="modalForm" @ok="modalFormOk"></pcompanyModal>
  </CommonPage>
</template>

<script>
import { gettime } from "@/utils/collectionMethods/timeMethods.js";
import pcompanyModal from "./modules/pcompanyModal.vue";
import { CommonMixin } from "@/mixins/commonMixins.js";
import { postFormAction } from "@/api/currencyApi";
export default {
  name: "Pcompany",
  mixins: [CommonMixin],
  data() {
    return {
      url: {
        list: "/channel/queryList",
      },
      getResizeObserver: 0,
      tableData: [],
      defaultExpandedKeys: [],
    };
  },

  components: {
    pcompanyModal,
  },

  methods: {
    nodeExpand(obj, node) {
      this.defaultExpandedKeys = [obj.id];
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
::v-deep(.el-tree-node__content) {
  height: 36px;
  border: 1px solid #efefef;
  border-top: 0;
}
.mb20 {
  margin-bottom: 20px;
}
.pagination-class {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table-class {
  width: 100%;
  padding: 0 0 20px 0;
  .el-dropdown-link {
    cursor: pointer;
  }

  .category-tree {
    margin: 0 8px 20px;
    border-top: 1px solid #efefef;

    .custom-tree-node {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
