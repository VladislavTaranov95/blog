<template>
  <div class="container">
    <div v-loading="contentLoaded" class="edit">
      <div v-if="post">
        <el-form
          ref="post"
          :model="post"
          status-icon
          :rules="rules"
          class="newpost-form"
        >
          <el-form-item class="profile-item" prop="title">
            <el-input
              maxlength="20"
              placeholder="Enter post title"
              class="newpost-title"
              v-model="post.title"
              show-word-limit
              type="text"
            ></el-input>
          </el-form-item>
          <el-form-item class="newpost-item" prop="description">
            <el-input
              maxlength="60"
              placeholder="Enter post description"
              class="newpost-description"
              v-model="post.description"
              show-word-limit
              type="text"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <quill-editor
              v-if="post.fullText"
              ref="myQuillEditor"
              style="height: 500px; margin-bottom: 20px"
              v-model:content="post.fullText"
              toolbar="minimal"
              content-type="text"
            />
          </el-form-item>
          <el-form-item>
            <el-button class="post-btn-save" round @click="submitForm('post')">
              Save post
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { mapActions } from "vuex";
import { sendMsg } from "@/helpers/message";

export default {
  components: {
    QuillEditor,
  },
  name: "EditPost",
  data() {
    return {
      post: {
        title: "",
        description: "",
        fullText: "",
      },
      contentLoaded: false,
      text: "",
      rules: {
        title: [
          {
            required: true,
            message: "Please, enter new post title",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "Please, enter new post description",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      getPost: "posts/getPostById",
    }),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$refs.myQuillEditor.getText().length > 1) {
            this.savePost();
          } else {
            sendMsg("error", "Post text field is empty.");
          }
        } else {
          sendMsg("error", "Invalid form!");
          return false;
        }
      });
    },
    savePost() {
      this.post.fullText = this.$refs.myQuillEditor.getText();
      this.$store.dispatch("posts/savePost", this.post).then(
        () => {
          this.$router.push(`/post/${this.post._id}`);
          sendMsg("success", "Post updated!");
        },
        (error) => {
          sendMsg("error", error.response.data.error);
        }
      );
    },
  },
  async mounted() {
    this.contentLoaded = true;
    const response = await this.getPost(this.$route.params.id);
    this.post = response.data;
    this.contentLoaded = false;
  },
};
</script>

<style lang="scss" scoped>
.edit {
  min-height: 100vh;
}

.newpost-form {
  margin-top: 30px;

  .newpost-title {
    width: 300px;
  }

  .newpost-description {
    width: 500px;
  }

  .post-btn-save {
    background-color: #303030;
    color: #fff;

    :hover {
      opacity: 0.7;
    }
  }
}

.ql-container {
  height: 500px;
}
</style>
