<template>
  <CommonPage>
    <el-form :model="queryParam" ref="queryForm" size="small" :inline="true">
      <el-divider content-position="left">日</el-divider>
      <el-form-item label="创建时间：" prop="id">
        <el-date-picker
          size="medium"
          v-model="pickerTimeDay"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="timeFun"
          value-format="yyyy-MM-dd"
          format="yyyy 年 MM 月 dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-divider content-position="left">月</el-divider>
      <!-- 单月份案例 -->
      <el-form-item label="生效年月：" prop="id">
        <el-date-picker
          size="medium"
          type="month"
          v-model="pickerTime"
          @change="timeFun"
          value-format="yyyy-MM"
          format="yyyy 年 MM"
        >
        </el-date-picker>
      </el-form-item>

      <!-- 开始结束月份案例 - 禁用指定月份 -->
      <el-form-item label="开始/结束月份：" prop="time">
        <el-date-picker
          :picker-options="pickerOptions"
          format="yyyy 年 MM 月"
          value-format="yyyyMM"
          v-model="queryParam.time"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          @change="timeMonthFun"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
  </CommonPage>
</template>

<script>
// /collectionView/timeComponent
import { CommonMixin } from "@/mixins/commonMixins.js";
import { gettime } from "@/utils/collectionMethods/timeMethods.js";
export default {
  name: "TimeComponent",
  mixins: [CommonMixin],
  data() {
    return {
      pickerTimeDay: null,
      pickerTime: null,
      pickerOptions: {
        disabledDate(time) {
          // 限制选择范围在当前日期前后各一年
          const now = new Date(2024, 1, 1);
          return time.getTime() < now.getTime();
        },
      },
    };
  },
  methods: {
    loadData() {},
    gettime(val) {
      return gettime(val);
    },
    timeFun(val) {
      console.log("tvalaram", val);
    },
    timeMonthFun(val) {
      console.log("val", val);
    },
  },
};
</script>
<style lang="scss" scoped></style>
