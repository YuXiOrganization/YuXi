<template>
  <div class="welcome">
    <transition name="fade" mode="out-in" appear>
      <el-card class="box-card">
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
    </transition>
    <!-- <main class="welcome-card">
      <div>cscscs</div>
      <testView v-for="(item, index) in formdata" :key="index" :item="item"></testView>
    </main> -->
  </div>
</template>

<script>
import testView from "@/views/login/testView";
export default {
  name: "welcome",
  components: {
    testView,
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
  background-color: #f5f6fb;
  display: flex;
  // align-items: center;
  // justify-content: center;
  // background-color: #f5f6fb;
  /* 在CSS中定义与transition name关联的过渡类名 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s;
    // transition: opacity 0.5s;
  }
  .fade-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  /* .fade-leave-active below version 2.1.8 */
  .fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .box-card {
    display: flex;
    flex: auto;
    margin: 12px;
    border-radius: 8px;
    // padding: 5px;
  }
}
</style>
