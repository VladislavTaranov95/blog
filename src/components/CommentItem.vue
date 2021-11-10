<template>
  <div class="comment-item">
    <div>{{ comment.followedCommentID }}</div>
    <div class="comment__header">
      <div class="comment__posted-by">Commented by: {{ commentedBy }}</div>
      <div class="comment__date-created">Date: {{ regDate }}</div>
    </div>
    <div class="comment__content">{{ comment.text }}</div>
    <div>{{ comment }}</div>
    <div class="comment__liked-by">
      Liked by:
      <div class="name" v-for="(name, idx) in likedBy" :key="idx">
        {{ name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CommentItem",
  data() {
    return {
      likedBy: [],
      commentedBy: "",
      regDate: null,
    };
  },
  props: {
    comment: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      getUserName: "auth/getUserName",
    }),
  },
  async mounted() {
    if (this.comment.likes.length) {
      this.comment.likes.forEach(async (item) => {
        try {
          const response = await this.$store.dispatch(
            "posts/getNameById",
            item
          );
          this.likedBy.push(response.data.name);
        } catch (e) {
          this.likedBy.push("'Deleted account'");
        }
      });
    }

    const response = await this.$store.dispatch(
      "posts/getNameById",
      this.comment.commentedBy
    );

    this.commentedBy = response.data.name;
    this.regDate = new Date(this.comment.dateCreated).toLocaleString();
  },
};
</script>

<style lang="scss" scoped>
.comment-item {
  padding: 15px 20px;
  margin-bottom: 20px;
  min-height: 80px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  .comment {
    &__header {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
    }

    &__content {
      margin-top: 10px;
    }

    &__liked-by {
      display: flex;

      .name {
        margin-left: 5px;
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
}
</style>
