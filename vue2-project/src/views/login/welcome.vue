<template>
  <CommonPage>
    <div class="welcome">欢迎进入后台管理系统</div>
  </CommonPage>
</template>

<script>
import CommonPage from "@/components/common/CommonPage.vue";
import testView from "@/views/login/testView";
export default {
  name: "Welcome",
  components: {
    testView,
    CommonPage,
  },
  data() {
    return {
      labelPosition: "top",
      formdata: [
        {
          hidden: false,
          name: "1",
          children: [
            {
              hidden: false,
              name: "1-2",
            },
          ],
        },
        {
          hidden: false,
          name: "2",
        },
      ],
    };
  },

  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.welcome {
  width: 100%;
  // background-color: #f5f6fb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
}
</style>
