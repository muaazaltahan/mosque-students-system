import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";
import HomeView from "../views/HomeView.vue";
import NotificationPage from "@/views/NotificationPage.vue";
import UsersPage from "@/views/UsersPage.vue";
import SupportPage from "@/views/SupportPage.vue";
import LogIn from "@/components/LogIn.vue";
import ErrorPage from "@/views/ErrorPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LogIn,
  },
  {
    path: "/notifications",
    name: "notifications",
    component: NotificationPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/users",
    name: "users",
    component: UsersPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/support",
    name: "support",
    component: SupportPage,
    meta: { requiresAuth: true },
  },

  // stays last thing
  {
    path: "/:catchAll(.*)",
    name: "ErrorPage",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name} `;
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && authStore.isAuthenticated) {
    next({ name: "login" });
  } else if (to.name == "login" && !authStore.isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
