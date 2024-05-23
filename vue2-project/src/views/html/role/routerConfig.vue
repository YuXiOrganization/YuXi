<template>
  <CommonPage>
    <el-row :gutter="10" class="mb20">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['AU0903', 'AU090301']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd(false)"
          >新增</el-button
        >
      </el-col>
    </el-row>
    <div class="table-class">
      <el-tree
        :data="dataSource"
        node-key="id"
        class="category-tree"
        :default-expanded-keys="defaultExpandedKeys"
        accordion
        :expand-on-click-node="false"
        @node-expand="nodeExpand"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span class="tree-node-content">
            <span class="tree-node-label">{{ data.label + "  编号：" + data.id }}</span>
          </span>
          <span class="tree-node-btn-box">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                操作菜单<i class="el-icon-arrow-down el-icon--left"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="btn">
                <el-dropdown-item
                  v-hasPermi="['AU0903', 'AU090301']"
                  v-if="data.id.length != 8"
                >
                  <el-button type="success" size="medium" @click="handleAdd(data)"
                    >添加下级
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item v-hasPermi="['AU0903', 'AU090302']">
                  <el-button type="warning" size="medium" @click="handleEdit(data)"
                    >修改</el-button
                  >
                </el-dropdown-item>
                <el-dropdown-item v-hasPermi="['AU0903', 'AU090303']">
                  <el-button type="danger" size="medium" @click="handleDelete(data.id)"
                    >删除
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </span>
      </el-tree>
    </div>

    <routerConfigModal ref="modalForm" @ok="modalFormOk"></routerConfigModal>
  </CommonPage>
</template>

<script>
import { gettime } from "@/utils/collectionMethods/timeMethods.js";
import routerConfigModal from "./modules/routerConfigModal.vue";

import { CommonMixin } from "@/mixins/commonMixins.js";

export default {
  name: "RouterConfig",
  mixins: [CommonMixin],
  data() {
    return {
      url: {
        list: "/role/queryAllAuth",
        delete: "/role/deleteAuth",
      },
      getResizeObserver: 0,
      tableData: [],
      defaultExpandedKeys: [],
    };
  },

  components: {
    routerConfigModal,
  },

  methods: {
    handleAdd(val) {
      console.log("handleAdd", val);
      this.$refs.modalForm.add(val);
      this.$refs.modalForm.title = val ? "添加下一级" : "新增";
      this.$refs.modalForm.disableSubmit = false;
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
