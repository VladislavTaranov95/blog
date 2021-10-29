<template>
  <div :class="className" @click="selectTab">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    mainNav: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    className() {
      return {
        "blog-nav-item": this.mainNav,
        "blog-nav-item-active": this.active,
      };
    },
  },
  methods: {
    selectTab() {
      this.$emit("updateTab");
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-nav-item {
  width: 80px;
  height: 80px;
  background: #333852;
  border-radius: 10px 0 0 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &-active {
    background: #484f6e;
    color: #404040;
  }
}
</style>
