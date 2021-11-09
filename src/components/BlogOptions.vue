<template>
  <div class="blog-options" :class="className">
    <app-select :options="options"></app-select>
  </div>
</template>

<script>
import AppSelect from "@/components/events/AppSelect.vue";

export default {
  name: "BlogOptions",
  components: {
    AppSelect,
  },
  data() {
    return {
      blogOptionsStatus: true,
      options: [
        { value: "title", name: "By title" },
        { value: "description", name: "By description" },
      ],
    };
  },
  methods: {
    blogStatus() {
      this.blogOptionsStatus = !this.blogOptionsStatus;
    },
  },
  computed: {
    className() {
      return {
        "blog-options-content-hide": !this.blogOptionsStatus,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-options {
  height: 50px;
}
</style>
