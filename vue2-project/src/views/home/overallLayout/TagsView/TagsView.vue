<template>
  <div class="tag-views">
    <div class="tag-views-tag">
      <div ref="tagViews" class="tag-views-test">
        <div ref="tagViewsScrollbar">
          <!-- TODO 准备 -->
          <el-tag
            @click="routePath(tag.path)"
            :key="tag.path"
            v-for="(tag, index) in cachedViews"
            :closable="tag.name == '首页' ? false : true"
            disable-transitions
            @close="handleClose(index)"
            :effect="activeMenu == tag.path ? 'light' : 'plain'"
          >
            {{ tag.name }}
          </el-tag>
        </div>
      </div>
    </div>
    <!-- <button style="position: absolute" @click="addTagBtn">测试</button> -->
    <!-- 层级 事件穿透 事件不穿透 样式案例 -->
    <transition name="el-fade-in-linear">
      <div class="tag-views-btn" v-if="isShowIcon">
        <i @click="iconBtnFun(true)" class="el-icon-caret-left views-btn-class"></i>
        <i @click="iconBtnFun(false)" class="el-icon-caret-right views-btn-class"></i>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVisible: false,
      inputValue: "",
      tagWidth: 0,
      isShowIcon: false,
      resizeTagWidth: 1000,
      activeMenu: "/",
    };
  },
  computed: {
    classObj() {
      return {
        tagViewsActive: this.isShowIcon,
      };
    },
    cachedViews() {
      return this.$store.state.app.cachedViews;
    },
  },
  watch: {
    $route() {
      this.addTags();
    },
  },
  mounted() {
    this.addTags();
    this.resizeHandler();
  },
  beforeDestroy() {
    // console.log("销毁前");
    // 在组件销毁前，记得移除监听，避免内存泄漏
    const observer = new ResizeObserver(this.resizeHandler);
    observer.unobserve(this.$refs.tagViews);
  },
  methods: {
    routePath(val) {
      this.$router.push({ path: val });
    },
    addTags() {
      const { name, path } = this.$route;
      // console.log("触发this.$route;", this.$route);
      this.activeMenu = path;
      // console.log("this.$route", this.$route);
      if (name) {
        let option = {
          name: name,
          path: path,
        };
        // getCachedViews.push(option);
        // console.log("getCachedViews", getCachedViews);

        this.$store.dispatch("app/addCachedViews", option);
        // this.$store.dispatch('tagsView/addView', this.$route)
        if (this.$route.meta.link) {
          // this.$store.dispatch('tagsView/addIframeView', this.$route)
        }
      }
      return false;
    },
    addTagBtn() {
      this.$nextTick(() => {
        this.refreshTagWidth();
      });
    },
    //DOM操作滑动案例
    iconBtnFun(type) {
      this.$nextTick(() => {
        const element = this.$refs.tagViews;
        // console.log("entries", element.scrollWidth);
        // console.log("entries", element.clientWidth);
        if (type) {
          element.scrollLeft -= 100;
        } else {
          element.scrollLeft += 100;
        }
      });
    },
    async resizeHandler() {
      const element = this.$refs.tagViews;

      await this.refreshTagWidth();

      // console.log("element", element);
      if (element) {
        const observer = await new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            // console.log("Width changed:", entry.contentRect.width);
            // 在这里处理宽度变化的逻辑
            this.handleWidthChange(entry.contentRect.width);
          });
        });

        observer.observe(element);
      }
    },
    handleWidthChange(width) {
      // 这个方法用来处理宽度变化后的业务逻辑
      // console.log("The new width is", width);
      if (this.tagWidth < width) {
        this.isShowIcon = false;
      } else {
        this.isShowIcon = true;
      }

      this.resizeTagWidth = width;
    },

    async handleClose(index) {
      // let getCachedViews = JSON.parse(JSON.stringify(this.$store.state.app.cachedViews));

      // getCachedViews.splice(index, 1);
      // console.log("getCachedViews", getCachedViews);

      const res = await this.$store.dispatch("app/deleteCachedViews", index);

      // console.log("res", res);
      if (res) {
        this.refreshTagWidth();
      }
    },
    refreshTagWidth() {
      const elementSec = this.$refs.tagViewsScrollbar;
      this.tagWidth = elementSec.offsetWidth;
      // console.log("this.tagWidth", this.tagWidth);
      // console.log("this.resizeTagWidth", this.resizeTagWidth);
      this.handleWidthChange(this.resizeTagWidth);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.tag-views {
  // padding: 8px 12px 5px 12px;
  width: 100%;
  // white-space: nowrap;
  position: relative;
  height: 50px;
  min-height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  // overflow: hidden;
  .views-btn-class {
    pointer-events: auto;
    width: 16px;
    height: 30px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    background-color: #f5f6fb;
  }
  .tag-views-tag {
    position: absolute;
    width: 96%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tagViewsActive {
    width: 96%;
  }
  .tag-views-btn {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-scrollbar {
    width: 100%;
  }
  .el-scrollbar__wrap {
    height: 50px !important;
  }
  .tag-views-test {
    width: 100%;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    overflow: auto;
    padding: 8px 0 5px 0;

    /* 自定义滚动条样式，调整为更浅的颜色和较窄的高度 */
    &::-webkit-scrollbar {
      margin-top: 5px;
      height: 6px; /* 减小滚动条宽度 */
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(
        240,
        240,
        240,
        0.5
      ); /* 更改为更浅的轨道颜色，这里使用了半透明的浅灰色 */
      border-radius: 4px; /* 调整边角圆润度以匹配更窄的滚动条 */
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(180, 180, 180, 0.5); /* 滚动条拇指颜色也调整为较浅的灰色 */
      border-radius: 4px; /* 保持边角与滚动条宽度相协调 */
      border: none; /* 保持无边框风格 */
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: rgba(
        120,
        120,
        120,
        0.7
      ); /* 悬停时颜色略深，但仍维持较浅的视觉效果 */
    }
  }

  .el-tag {
    cursor: pointer;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
