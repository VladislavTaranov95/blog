<template>
  <div class="container">
    <div v-loading="!contentLoaded">
      <app-list class="list">
        <div class="list__options">
          <blog-options></blog-options>
        </div>
        <div class="list__posts">
          <post-item
            v-for="(post, index) in posts"
            :key="post._id"
            class="list__item"
            :post="post"
          >
            <div>{{ index }}</div>
          </post-item>
        </div>
        <div class="list__pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalPosts"
            @current-change="changePage"
            :page-size="8"
          >
          </el-pagination>
        </div>
      </app-list>
    </div>
  </div>
</template>

<script>
import AppList from "@/components/AppList";
import PostItem from "@/components/PostItem";
import BlogOptions from "@/components/BlogOptions";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "PagePosts",
  components: {
    AppList,
    PostItem,
    BlogOptions,
  },
  data() {
    return {
      contentLoaded: false,
    };
  },
  methods: {
    ...mapActions({
      getPosts: "posts/getPosts",
      getPostsAmount: "posts/getPostsAmount",
    }),
    ...mapMutations({
      setCurrentPage: "posts/setCurrentPage",
    }),
    changePage(value) {
      let path = "",
        page = 0;

      if (value !== 1) {
        path = { path: "/posts/", query: { page: value } };
        page = value - 1;
      } else {
        path = "/posts";
        page = 0;
      }

      this.$router
        .push(path)
        .then(() => {
          this.setCurrentPage(page);
          this.contentLoaded = false;
          return this.$store.dispatch("posts/getPosts");
        })
        .then(() => {
          this.contentLoaded = true;
        });
    },
  },
  computed: {
    ...mapGetters({
      posts: "posts/getPosts",
      totalPosts: "posts/getTotalPosts",
      postsOnPageAmount: "posts/getAmountPostsOnPage",
    }),
  },
  async mounted() {
    if (this.$route.query.page) {
      this.setCurrentPage(this.$route.query.page - 1);
    }
    await this.getPostsAmount();
    await this.getPosts();
    this.contentLoaded = true;
  },
  unmounted() {
    this.setCurrentPage(0);
  },
};
</script>

<style lang="scss" scoped>
.list {
  &__options {
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
  }

  &__item {
    padding: 10px 10px;
  }

  &__posts {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
  }

  &__pagination {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
  }
}
</style>
