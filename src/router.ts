import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import ColumnDetail from "./views/ColumnDetail.vue";
import CreatePost from "./views/CreatePost.vue";
import store from "./store";
import axios from "axios";
import SignUp from "./views/SignUp.vue";
import PostDetail from "./views/PostDetail.vue";

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { redirectAlreadyLogin: true },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    {
      path: "/column/:id",
      name: "column",
      component: ColumnDetail,
    },
    {
      path: "/create",
      name: "create",
      component: CreatePost,
      meta: { requiredLogin: true },
    },
    {
      path: "/posts/:id",
      name: "posts",
      component: PostDetail,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { user, token } = store.state;
  const { requiredLogin, redirectAlreadyLogin } = to.meta;

  if (user.isLogin) {
    if (redirectAlreadyLogin) {
      next("/");
    } else {
      next();
    }
  } else {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      store
        .dispatch("fetchCurrentUser")
        .then(() => {
          if (redirectAlreadyLogin) {
            next("/");
          } else {
            next();
          }
        })
        .catch((e) => {
          console.error(e);
          store.commit("logout");
          next("login");
        });
    } else {
      if (requiredLogin) {
        next("login");
      } else {
        next();
      }
    }
  }
});

export default router;
