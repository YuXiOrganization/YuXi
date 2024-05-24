<template>
  <CommonPage>
    <el-row :gutter="10" class="mb20">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['AU0901', 'AU090101']"
          type="success"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd(false)"
          >新增</el-button
        >
      </el-col>
    </el-row>

    <div class="table-class">
      <el-table :data="dataSource" stripe border @selection-change="handleSelectionChange">
        <el-table-column align="center" label="序号" type="index" width="50">
        </el-table-column>

        <el-table-column align="center" prop="username" label="用户名"></el-table-column>
        <!-- :formatter="gettime(scope.row.createTime)" -->
        <el-table-column align="center" prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <p v-if="scope.row.createTime">{{ gettime(scope.row.createTime) }}</p>
            <p v-else>--</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="roleNames" label="角色"></el-table-column>

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
                        type="danger"
                        size="medium"
                        v-hasPermi="['AU0901', 'AU090103']"
                        @click="handleDelete(scope.row.id)"
                        >删除
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button
                        type="warning"
                        size="medium"
                        @click="openResetWin(scope.row)"
                        v-hasPermi="['AU0901', 'AU090102']"
                        >重置密码
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button
                        type="primary"
                        size="medium"
                        @click="setAuth(scope.row)"
                        v-hasPermi="['AU0901', 'AU090104']"
                        >配置角色
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
    <userListAuthModal ref="userListAuthModal" @ok="modalFormOk"></userListAuthModal>
    <userListModal ref="modalForm" @ok="modalFormOk"></userListModal>
  </CommonPage>
</template>

<script>
import { gettime } from "@/utils/collectionMethods/timeMethods.js";
import userListModal from "./modules/userListModal.vue";
import userListAuthModal from "./modules/userListAuthModal.vue";
import { CommonMixin } from "@/mixins/commonMixins.js";
import { postFormAction } from "@/api/currencyApi";
export default {
  name: "RouterConfig",
  mixins: [CommonMixin],
  data() {
    return {
      url: {
        list: "/admin/queryAllUserList",
        delete: "/admin/deleteEntity",
        resetPassword: "admin/resetPassword",
      },
      getResizeObserver: 0,
      tableData: [],
      defaultExpandedKeys: [],
    };
  },

  components: {
    userListModal,
    userListAuthModal,
  },

  methods: {
    openResetWin(val) {
      this.$confirm("您确定重置密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.resetFun(val.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    async resetFun(id) {
      try {
        //加载数据 若传入参数1则加载第一页的内容
        const res = await postFormAction(this.url.resetPassword, {
          id: id,
        });
        if (res.success) {
          //update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
          this.$message.success(res.msg);
          this.loadData();
        } else {
          this.$message.warning(res.msg);
        }
      } catch (error) {
        console.log("err", error);
      }
    },
    setAuth(record) {
      // console.log("handleEdit", record)
      this.$refs.userListAuthModal.edit(record);
      this.$refs.userListAuthModal.title = "配置角色";
      this.$refs.userListAuthModal.disableSubmit = false;
    },
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
