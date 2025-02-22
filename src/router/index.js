import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";
import HomeView from "../views/HomeView.vue";
import NotificationPage from "@/views/NotificationPage.vue";
import UserOwner from "@/views/user/UserOwner.vue";
import UserAdmin from "@/views/user/UserAdmin.vue";
import UserStudents from "@/views/user/UserStudents.vue";
import UserTeachers from "@/views/user/UserTeachers.vue";
import SupportPage from "@/views/SupportPage.vue";
import LogIn from "@/components/LogIn.vue";
import ErrorPage from "@/views/ErrorPage.vue";
import ViewIssues from "@/views/ViewIssues.vue";
import ShowNotification from "@/views/ShowNotification.vue";

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
    path: "/users-admin",
    name: "users",
    component: UserAdmin,
    meta: { requiresAuth: true },
  },
  {
    path: "/users-teacher",
    name: "users-teacher",
    component: UserTeachers,
    meta: { requiresAuth: true },
  },
  {
    path: "/users-student",
    name: "users-student",
    component: UserStudents,
    meta: { requiresAuth: true },
  },
  {
    path: "/users-owner",
    name: "users-owner",
    component: UserOwner,
    meta: { requiresAuth: true },
  },

  {
    path: "/support",
    name: "support",
    component: SupportPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/view-issues",
    name: "view-issues",
    component: ViewIssues,
    meta: { requiresAuth: true },
  },
  {
    path: "/show-notification",
    name: "show-notification",
    component: ShowNotification,
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
