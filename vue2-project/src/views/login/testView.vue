<template>
  <div v-if="!item.hidden">
    test{{ item.name }}
    <div v-if="item.children && item.children.length > 0">
      <testView
        v-for="(child, index) in item.children"
        :key="child.name + index"
        :item="child"
      ></testView>
    </div>
  </div>
</template>

<script>
export default {
  name: "testView",
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
};
</script>
