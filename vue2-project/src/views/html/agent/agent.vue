<template>
  <CommonPage>
    <el-form
      v-hasPermi="['AU0101', 'AU010105']"
      :model="queryParam"
      ref="queryForm"
      size="small"
      :inline="true"
    >
      <el-form-item label="姓名" prop="real_name">
        <el-input v-model="queryParam.real_name" placeholder="请输入姓名" clearable />
      </el-form-item>

      <el-form-item label="推荐码" prop="id">
        <el-input v-model="queryParam.id" placeholder="请输入推荐码" clearable />
      </el-form-item>

      <el-form-item label="申请时间" prop="id">
        <el-date-picker
          size="medium"
          v-model="queryParam.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          format="yyyy 年 MM 月 dd "
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="状态" prop="check_status">
        <el-select size="medium" v-model="queryParam.check_status" placeholder="状态">
          <el-option
            v-for="(v, i) in formType.check_status"
            :label="v.name"
            :value="v.id"
            :key="i"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否开通api" prop="is_api">
        <el-select size="medium" v-model="queryParam.is_api" placeholder="">
          <el-option
            v-for="(v, i) in formType.is_api"
            :label="v.name"
            :value="v.id"
            :key="i"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['AU0101', 'AU010102']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
    </el-row> -->

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
    <!-- <right-toolbar @selection-change="handleSelectionChange" :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    <div class="table-class">
      <el-table :data="dataSource" stripe border>
        <el-table-column align="center" label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column
          align="center"
          prop="real_name"
          label="姓名"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="id"
          label="推荐码"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="parent_name"
          label="推荐人"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="parent_id"
          label="推荐人推荐码"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column align="center" prop="total" label="总收益" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="center" prop="balance" label="余额" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="withdraw_total1"
          label="已支出金额"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="check_status"
          label="状态"
          :formatter="dictionaryFun"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="is_api"
          label="是否api"
          :formatter="dictionaryFun"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="auth_code"
          label="秘钥"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="is_agent_rate"
          label="子代理费率模板"
          :formatter="dictionaryFun"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="api_zfb"
          label="支付宝大额交易"
          :formatter="dictionaryFun"
          show-overflow-tooltip
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
                    <el-dropdown-item v-hasPermi="['AU0101', 'AU010106']">
                      <el-button
                        :type="scope.row.is_agent_rate != 1 ? 'success' : 'danger'"
                        size="medium"
                        @click="updataSalveInfo(scope.row, 'is_agent_rate')"
                      >
                        {{ scope.row.is_agent_rate != 1 ? "开启" : "关闭" }}费率模板
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item v-hasPermi="['AU0101', 'AU010106']">
                      <el-button
                        :type="scope.row.api_zfb != 1 ? 'success' : 'danger'"
                        size="medium"
                        @click="updataSalveInfo(scope.row, 'api_zfb')"
                      >
                        {{ scope.row.api_zfb != 1 ? "开启" : "关闭" }}支付宝大额交易
                      </el-button>
                    </el-dropdown-item>

                    <el-dropdown-item v-hasPermi="['AU0101', 'AU010102']">
                      <el-button
                        type="primary"
                        size="medium"
                        @click="handleDetail(scope.row)"
                      >
                        查看
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item v-hasPermi="['AU0101', 'AU010101']">
                      <el-button
                        :type="scope.row.check_status == 3 ? 'primary' : 'warning'"
                        size="medium"
                        @click="handleIsDetail(scope.row)"
                      >
                        {{ scope.row.check_status == 3 ? "查看理由" : "驳回" }}
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
      <div>
        总金额：<span style="color: red"> {{ totalList.total || 0 }} </span
        >元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 总余额：
        <span style="color: red"> {{ totalList.balance || 0 }} </span
        >元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 总支出：
        <span style="color: red"> {{ totalList.withdraw_total || 0 }} </span
        >元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
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
    <agentIsModal ref="agentIsModal" @ok="modalFormOk"></agentIsModal>
    <agentModal ref="modalForm" @ok="modalFormOk"></agentModal>
  </CommonPage>
</template>

<script>
import { gettime } from "@/utils/collectionMethods/timeMethods.js";
import agentModal from "./modules/agentModal.vue";
import agentIsModal from "./modules/agentIsModal.vue";
import { CommonMixin } from "@/mixins/commonMixins.js";
import { filterObj } from "@/utils/collectionMethods/objectMethods.js";
import { getAction, postFormAction } from "@/api/currencyApi";

export default {
  name: "Agent",
  mixins: [CommonMixin],
  data() {
    return {
      url: {
        list: "/agent/queryAgentList",
        queryAgentTotal: "/agent/queryAgentTotal",
        updateAgentRate: "/agent/updateAgentRate",
        updateApiZfb: "/agent/updateApiZfb",
      },
      getResizeObserver: 0,
      tableData: [],
      formType: {
        api_zfb: [
          {
            id: "",
            name: "全部",
          },
          {
            id: "0",
            name: "关闭",
          },
          {
            id: "1",
            name: "开启",
          },
        ],
        check_status: [
          {
            id: "",
            name: "全部",
          },
          {
            id: "0",
            name: "未认证",
          },
          {
            id: "2",
            name: "已通过",
          },
          {
            id: "3",
            name: "未通过",
          },
        ],
        is_api: [
          {
            id: "",
            name: "全部",
          },
          {
            id: "0",
            name: "否",
          },
          {
            id: "1",
            name: "是",
          },
        ],
        is_agent_rate: [
          {
            id: "",
            name: "全部",
          },
          {
            id: "1",
            name: "开启",
          },
          {
            id: "0",
            name: "关闭",
          },
        ],
      },
      totalList: {},
    };
  },

  components: {
    agentModal,
    agentIsModal,
  },
  mounted() {
    // this.handleQuery();
    this.loadqueryAgentTotal();
  },
  methods: {
    handleIsDetail(record) {
      this.$refs.agentIsModal.edit(record);
      this.$refs.agentIsModal.title = record.check_status == 3 ? "查看理由" : "驳回";
      this.$refs.agentIsModal.disableSubmit = record.check_status == 3 ? true : false;
    },
    updataSalveInfo(val, type) {
      let title = null;
      let url = null;
      let option = null;
      if (type == "is_agent_rate") {
        title = `再次确认${val.is_agent_rate != 1 ? "开启" : "关闭"}费率模板, 是否继续?`;
        url = this.url.updateAgentRate;
        option = {
          id: val.id,
          status: val.is_agent_rate == 1 ? 0 : 1,
        };
      } else {
        title = `再次确认${val.api_zfb != 1 ? "开启" : "关闭"}支付宝大额交易, 是否继续?`;
        url = this.url.updateApiZfb;
        option = {
          id: val.id,
          status: val.api_zfb == 1 ? 0 : 1,
        };
      }

      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.updataSalveInfoTrue(url, option);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async updataSalveInfoTrue(url, option) {
      try {
        //加载数据 若传入参数1则加载第一页的内容
        const res = await postFormAction(url, option);
        if (res.success) {
          this.handleQuery();
          this.$message({
            message: option.status == 1 ? "开启成功" : "关闭成功",
            type: "success",
          });
        } else {
          this.$message({
            message: res.msg,
            type: "info",
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    },

    async loadqueryAgentTotal() {
      try {
        //加载数据 若传入参数1则加载第一页的内容

        let params = this.getQueryParams(); //查询条件
        this.loading = true;
        const res = await getAction(this.url.queryAgentTotal, params);
        if (res.success) {
          this.totalList = res.data;
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    handleQuery() {
      console.log("执行");
      this.loadData(1);
      this.loadqueryAgentTotal();
    },
    setAuth(record) {
      this.$refs.roleAuthModal.edit(record);
      this.$refs.roleAuthModal.title = "编辑";
      this.$refs.roleAuthModal.disableSubmit = false;
    },

    gettime(val) {
      return gettime(val);
    },
    getQueryParams() {
      //获取查询条件
      let param = this.queryParam;
      param.page = this.ipagination.current;
      param.limit = this.ipagination.pageSize;

      param.start_date = this.queryParam.time || null;
      param.end_date = this.queryParam.time || null;
      return filterObj(param);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep(.el-dropdown-menu__item) {
  margin: 5px !important;
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
}
</style>
