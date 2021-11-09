import { createStore } from "vuex";
import { auth } from "@/store/modules/auth.module";
import { posts } from "@/store/modules/posts.module";
import saveToLocalStorage from "@/store/plugins/webStorage";

export default createStore({
  plugins: [saveToLocalStorage],
  modules: {
    auth,
    posts
  }
});