import { createRouter, createWebHistory } from "vue-router";

export const routes = {
  home: "/",
  login: "/login",
};

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: routes.home,
        component: () => import("./pages/Home.vue"),
    },
    {
        path: routes.login,
        component: () => import("./pages/LogIn.vue"),
    },
  ],
});
