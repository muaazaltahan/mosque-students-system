import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LogIn from "@/components/LogIn.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LogIn,
  },

  // {
  //   path: "/notifications",
  //   name: "notifications",
  //   component: HomeView,
  // },
  // {
  //   path: "/users",
  //   name: "users",
  //   component: HomeView,
  // },
  // {
  //   path: "/support",
  //   name: "support",
  //   component: HomeView,
  // },

  // stays last thing
  // {
  //   path: "/:catchAll(.*)",
  //   name: "ErrorPage",
  //   component: ErrorPage,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
