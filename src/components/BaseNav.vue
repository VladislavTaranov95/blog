<template>
  <div class="base-nav">
    <nav :class="className">
      <slot></slot>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    navHeader: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    className() {
      return {
        "nav-header": this.navHeader,
      };
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.nav-header {
  height: 50px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 5px 19px 0px rgba(34, 60, 80, 0.2);
  &-left {
    display: flex;
  }
}
</style>
