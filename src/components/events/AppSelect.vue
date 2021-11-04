<template>
  <el-select v-model="value" placeholder="Select" @change="selectOption">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.name"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    ...mapMutations({
      sortPosts: "posts/sortPosts",
    }),
    selectOption(option) {
      this.value = option;
      this.sortPosts(this.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
