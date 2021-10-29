<template>
  <div class="page-posts">
    <base-list>
      <div><blog-options></blog-options></div>
      <div class="posts">
        <post-item
          v-for="post in posts"
          :key="post._id"
          class="post"
          :post="post"
        >
        </post-item>
      </div>
    </base-list>
  </div>
</template>

<script>
import BaseList from "@/components/BaseList";
import PostItem from "@/components/PostItem";
import BlogOptions from "@/components/BlogOptions";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PagePosts",
  components: {
    BaseList,
    PostItem,
    BlogOptions,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      fetchPosts: "posts/fetchPosts",
    }),
  },
  computed: {
    ...mapGetters({
      posts: "posts/getPosts",
    }),
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style lang="scss" scoped>
.posts {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
