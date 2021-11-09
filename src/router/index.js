import { createRouter, createWebHistory } from "vue-router";

const Home = () => import('@/views/Home')
const PagePosts = () => import('@/views/PagePosts')
const Login = () => import('@/views/Login')
const Register = () => import('@/views/Register')
const UserProfile = () => import('@/views/UserProfile')
const CreatePost = () => import('@/views/CreatePost')
const PagePost = () => import('@/views/PagePost')
const EditPost = () => import('@/views/EditPost')

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
  },
  {
    path: "/profile",
    name: "UserProfile",
    component: UserProfile,
    meta: {
      title: "Profile"
    }
  },
  {
    path: "/createpost",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "New Post"
    }
  },
  {
    path: "/post/:id",
    name: "PagePost",
    component: PagePost,
    meta: {
      title: "Post"
    }
  },
  {
    path: "/post/:id/edit",
    name: "EditPost",
    component: EditPost,
    meta: {
      title: "Edit"
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
