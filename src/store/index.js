import { createStore } from "vuex";
import { auth } from "@/store/modules/auth.module";
import { posts } from "@/store/modules/posts.module";

export default createStore({
  modules: {
    auth,
    posts
  }
});