import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/Auth/LoginPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: {
      layout: "MainLayout",
    },
  },
  {
    path: "/post/:id",
    name: "post",
    component: () => import("@/views/Posts/SinglePost.vue"),
    meta: {
      layout: "MainLayout",
    },
  },
  {
    path: "/create-post",
    name: "create-post",
    component: () => import("@/views/Posts/CreatePost.vue"),
    meta: {
      layout: "MainLayout",
      authRequired: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      layout: "EmptyLayout",
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/Auth/SignupPage.vue"),
    meta: {
      layout: "EmptyLayout",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
