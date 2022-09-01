import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: import("@/views/HomePage.vue"),
    meta: {
      layout: "MainLayout",
    },
  },
  {
    path: "/login",
    name: "login",
    component: import("@/views/LoginPage.vue"),
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
