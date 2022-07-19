import { createRouter, createWebHistory } from "vue-router";

export const routes = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  users: "/users",
  reports: "/reports",
};

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: routes.home,
        component: () => import("./pages/Dashboard.vue"),
    },
    {
        path: routes.login,
        component: () => import("./pages/LogIn.vue"),
    },
    {
        path: routes.dashboard,
        component: () => import("./pages/Dashboard.vue"),
    },
    {
        path: routes.users,
        component: () => import("./pages/Users.vue"),
    },
    {
        path: routes.reports,
        component: () => import("./pages/Reports.vue"),
    },
  ],
});
