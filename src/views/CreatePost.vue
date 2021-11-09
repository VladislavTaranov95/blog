<template>
  <div class="container">
    <el-form
      ref="newPostModel"
      :model="newPostModel"
      status-icon
      :rules="rules"
      class="newpost-form"
    >
      <el-form-item class="profile-item" prop="title">
        <el-input
          maxlength="20"
          placeholder="Enter post title"
          class="newpost-title"
          v-model="newPostModel.title"
          show-word-limit
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item class="newpost-item" prop="description">
        <el-input
          maxlength="60"
          placeholder="Enter post description"
          class="newpost-description"
          v-model="newPostModel.description"
          show-word-limit
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <quill-editor
          ref="myQuillEditor"
          style="height: 500px; margin-bottom: 20px"
          v-model:content="newPostModel.fullText"
          toolbar="minimal"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="post-btn-save"
          round
          @click="submitForm('newPostModel')"
        >
          Publish post
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { sendMsg } from "@/helpers/message";

export default {
  name: "CreatePost",
  components: {
    QuillEditor,
  },
  data() {
    return {
      options: {
        placeholder: "Compose an epic...",
        readOnly: false,
        theme: "snow",
      },
      newPostModel: {
        title: "",
        description: "",
        fullText: "sdfsdfsd",
      },
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$refs.myQuillEditor.getText().length > 1) {
            this.addPost();
          } else {
            sendMsg("error", "Post text field is empty.");
          }
        } else {
          sendMsg("error", "Invalid form!");
          return false;
        }
      });
    },
    addPost() {
      this.newPostModel.fullText = this.$refs.myQuillEditor.getText();
      this.$store.dispatch("posts/addNewPost", this.newPostModel).then(
        () => {
          this.$router.push("/posts");
          sendMsg("success", "Post added successfully!");
        },
        (error) => {
          sendMsg("error", error.response.data.error);
        }
      );
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
    },
  },
};
</script>

<style lang="scss" scoped>
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
