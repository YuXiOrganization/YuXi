<template>
  <el-image :src="url" :preview-src-list="srcList">
    <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
  </el-image>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      srcList: [],
    };
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
      required: false,
    },
  },
  watch: {
    value() {
      this.loadValue();
    },
  },
  methods: {
    loadValue() {
      if (!this.value) {
        return;
      }
      let apiBaseUrl = process.env.VUE_APP_BASE_STATIC;
      this.url = apiBaseUrl + "/" + this.value;
      this.srcList = [this.url];

      console.log("this.url", this.url);
      console.log("this.srcList", this.srcList);
    },
  },
};
</script>
<style lang="" scoped></style>
