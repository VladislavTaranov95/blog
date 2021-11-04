<template>
  <div>
    <el-card class="post">
      <template #header>
        <h2 class="test">{{ post.title }}</h2>
      </template>
      <div class="post__body">
        <div>{{ post.description }}</div>
        <div class="post__footer">
          <div class="post__likes">
            <div @click="setPostLike">
              <img style="width: 28px; height: 28px" src="@/assets/like.png" />
            </div>
            <div style="margin-right: 10px">
              {{ post.likes.length }}
            </div>
          </div>
          <div class="post-btn">
            <el-button @click="openPost">Open</el-button>
            <div v-if="post.createdBy === userId">
              <el-button type="danger" @click="deletePost">Delete</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { mapGetters } from "vuex";

export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    openPost() {
      this.$router.push(`/post/${this.post._id}`);
    },
    async deletePost() {
      try {
        await this.$store.dispatch("posts/deletePost", this.post._id);
        ElMessage.success({
          center: true,
          message: "Post has been deleted.",
        });
      } catch (error) {
        ElMessage.error({
          center: true,
          message: error,
        });
      }
    },
    async setPostLike() {
      const payload = {
        userId: this.userInfo._id,
        postId: this.post._id,
      };
      try {
        await this.$store.dispatch("posts/addLikeToPost", payload);
      } catch (error) {
        ElMessage.error({
          center: true,
          message: error.error,
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      userId: "auth/getUserId",
    }),
  },
};
</script>

<style lang="scss" scoped>
.post {
  width: 340px;
  height: 420px;
  text-align: left;

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 310px;

    div {
      word-break: break-word;
    }
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
}
</style>
