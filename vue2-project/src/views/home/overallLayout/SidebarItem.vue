<template>
  <div v-if="!item.hidden">
    <template v-if="changeBoolean(item)">
      <el-menu-item
        @click="routePath(item.path,item)"
        :index="item.meta.id"
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <MenuItem :icon="item.meta.icon" :title="item.meta.title" />
      </el-menu-item>
    </template>

    <el-submenu v-else ref="subMenu" :index="item.meta.id" popper-append-to-body>
      <template slot="title">
        <MenuItem
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="(child, index) in item.children"
        :key="child.meta.id + index"
        :is-nest="true"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import MenuItem from "@/views/home/overallLayout/MenuItem";
export default {
  components: {
    MenuItem,
  },
  name: "SidebarItem",
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    routePath(val,item) {
      // console.log("item",item)
      this.$router.push({ path: val });
    },
    changeBoolean(val) {
      if (val.children) {
        if (val.children.length != 0) {
          return false;
        }
      }
      return true;
    },
  },
  created() {
    // console.log("children", this.item.children.length);
  },
};
</script>
