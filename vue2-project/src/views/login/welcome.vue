<template>
  <div class="welcome" >
    <div>cscscs</div>
    <testView v-for="(item, index) in formdata" :key="index" :item="item"></testView>
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
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
