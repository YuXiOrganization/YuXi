<template>
  <CommonPage>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
      <el-checkbox label="禁用" disabled></el-checkbox>
      <el-checkbox label="选中且禁用" disabled></el-checkbox>
    </el-checkbox-group>
  </CommonPage>
</template>

<script>
import CommonPage from "@/components/common/CommonPage.vue";
export default {
  data() {
    return {
      checkList: ["选中且禁用", "复选框 A"],
    };
  },
  components: {
    CommonPage,
  },
};
</script>
<style lang="" scoped></style>
