<template>
  <div>
    <el-card class="post">
      <template #header>
        <h2 class="test">{{ post.title }}</h2>
      </template>
      <div class="post__body">
        <div
          v-if="post.image"
          :style="{
            backgroundImage: 'url(' + BASE_URL + post.image + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            height: '150px',
          }"
        ></div>
        <div
          class="post__image"
          v-else
          :style="{
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            height: '150px',
          }"
        ></div>
        <div>{{ post.description }}</div>
        <div class="post__footer">
          <div class="post__likes" v-if="userLogStatus">
            <div @click="setPostLike">
              <img style="width: 28px; height: 28px" src="@/assets/like.png" />
            </div>
            <div style="margin-right: 10px">
              {{ post.likes.length }}
            </div>
          </div>
          <div class="post-btn">
            <el-button @click="openPost"> Open </el-button>
            <div v-if="userLogStatus && post.postedBy === userId">
              <el-button
                style="margin-left: 10px"
                type="danger"
                @click="deletePost"
                >Delete</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { sendMsg } from "@/helpers/message.js";

export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      BASE_URL: "http://51.158.179.21",
    };
  },
  methods: {
    openPost() {
      this.$router.push(`/post/${this.post._id}`);
    },
    async deletePost() {
      try {
        await this.$store.dispatch("posts/deletePost", this.post._id);
        sendMsg("success", "Post has been deleted.");
      } catch (error) {
        sendMsg("error", error);
      }
    },
    async setPostLike() {
      const payload = {
        userId: this.userId,
        postId: this.post._id,
      };
      console.log(this.userId);
      try {
        await this.$store.dispatch("posts/addLikeToPost", payload);
      } catch (error) {
        sendMsg("error", error.error);
      }
    },
  },
  computed: {
    ...mapGetters({
      userId: "auth/getUserId",
      postPhoto: "posts/getPostPhoto",
      userLogStatus: "auth/getUserLogStatus",
    }),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.post {
  width: 340px;
  height: 370px;
  text-align: left;

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 260px;

    div {
      word-break: break-word;
    }
  }

  &__image {
    background-image: url("../assets/no-photo.png");
    opacity: 0.5;
  }

  &__footer {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &__likes {
    display: flex;
    align-items: flex-end;

    & img {
      &:hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }
  }

  h2 {
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }

  &-btn {
    display: flex;
  }
}
</style>
