<template>
  <div class="page-post">
    <div class="container">
      <div v-loading="!contentLoaded" v-if="post" class="page-post__info">
        <h2 class="page-post__title">{{ post.title }}</h2>
        <div class="page-post__description">{{ post.description }}</div>
        <div class="page-post__subtitle">
          <div class="page-post__postedby">Posted by: {{ namePostedBy }}</div>
          <el-button
            v-if="userLogStatus && post.postedBy === userId"
            class="post-page-btn-edit"
            round
            @click="editPost(post)"
          >
            Edit post
          </el-button>
        </div>
        <div
          v-if="post.image"
          class="page-post__image"
          :style="{
            backgroundImage: 'url(' + BASE_URL + post.image + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            width: '1000px',
            height: '500px',
          }"
        ></div>
        <div
          v-else
          class="page-post__image no-photo"
          :style="{
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            width: '1000px',
            height: '500px',
          }"
        ></div>
        <div class="page-post__fulltext">{{ post.fullText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PagePost",
  data() {
    return {
      post: null,
      contentLoaded: false,
      BASE_URL: "http://51.158.179.21",
      namePostedBy: "",
    };
  },
  computed: {
    ...mapGetters({
      userLogStatus: "auth/getUserLogStatus",
      userId: "auth/getUserId",
    }),
  },
  methods: {
    editPost(post) {
      this.$router.push(`/post/${post._id}/edit`);
    },
  },
  async mounted() {
    const response = await this.$store.dispatch(
      "posts/getPostById",
      this.$route.params.id
    );
    this.post = response.data;
    this.contentLoaded = true;

    if (this.post.postedBy) {
      const postedBy = await this.$store.dispatch(
        "posts/getNameById",
        this.post.postedBy
      );
      this.namePostedBy = postedBy.data.name;
    } else {
      this.namePostedBy = "Account deleted";
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;

  .page-post {
    &__title {
      margin-top: 20px;
      font-size: 32px;
      font-weight: 300;
    }

    &__subtitle {
      display: flex;
      justify-content: space-between;

      .post-page-btn-edit {
        background-color: #303030;
        color: #fff;

        :hover {
          opacity: 0.7;
        }
      }
    }

    &__description {
      font-size: 24px;
      font-weight: 300;
    }

    &__postedby {
      margin-top: 20px;
      font-size: 16px;
    }

    &__image {
      margin-top: 30px;
    }

    &__fulltext {
      margin-top: 30px;
      margin-bottom: 20px;
    }
  }
}

.no-photo {
  background-image: url("../assets/no-photo.png");
  opacity: 0.5;
}
</style>
