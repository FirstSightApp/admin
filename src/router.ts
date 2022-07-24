import { createRouter, createWebHistory } from "vue-router";

const routes = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  users: "/users",
  reports: "/reports",
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: routes.login,
        component: () => import("./pages/LogIn.vue"),
    },
    {
        path: routes.home,
        component: () => import("./pages/Dashboard.vue"),
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

//router.beforeEach((to, from, next) => {
//  console.log("router.beforeEach");
//  console.log(to);
//  next();
//});

export {
  routes,
  router,
};
