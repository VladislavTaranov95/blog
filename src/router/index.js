import { createRouter, createWebHistory } from "vue-router";
import PagePosts from "@/views/PagePosts";

const routes = [
  {
    path: "/",
    name: "PagePosts",
    component: PagePosts,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
