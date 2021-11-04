<template>
  <div>
    <div v-if="contentLoaded">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>{{ post.title }}</span>
            <el-button class="button" type="text">Edit</el-button>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "List item " + o }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      post: null,
      contentLoaded: false,
    };
  },
  mounted() {
    this.$store.dispatch("posts/getPostById", this.$route.params.id).then(
      (response) => {
        this.post = response.data;
        this.contentLoaded = true;
      },
      (error) => {
        ElMessage.error({
          center: true,
          message: error.response.data.error,
        });
      }
    );
  },
};
</script>

<style lang="scss" scoped></style>
