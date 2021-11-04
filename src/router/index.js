import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home"
import PagePosts from "@/views/PagePosts";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/posts",
    name: "PagePosts",
    component: PagePosts
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
