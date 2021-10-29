<template>
  <div class="base-list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseList",
};
</script>

<style lang="scss" scoped>
.base-list {
  display: flex;
}
</style>
