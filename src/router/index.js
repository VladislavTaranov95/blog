import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home"
import PagePosts from "@/views/PagePosts";
import Login from "@/views/Login"
import Register from "@/views/Register"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home"
    }
  },
  {
    path: "/posts",
    name: "PagePosts",
    component: PagePosts,
    meta: {
      title: "Posts"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login"
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register"
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | BlogTitle`
  next()
})

export default router;
