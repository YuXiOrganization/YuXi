<template>
  <div class="welcome">
    <div>cscscs</div>
    <!-- <welcome></welcome> -->
  </div>
</template>

<script>
export default {
  name:'welcome',
  data() {
    return {
      labelPosition: "top",
      formdata: {
        username: "",
        password: "",
      },
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
