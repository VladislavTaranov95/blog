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
import { mapGetters, mapMutations } from "vuex";

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
      selectedSort: "posts/setSelectedSort",
    }),
    selectOption(option) {
      this.value = option;
      this.selectedSort(option);
      this.sortPosts;
    },
  },
  computed: {
    ...mapGetters({
      sortPosts: "posts/sortPosts",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
