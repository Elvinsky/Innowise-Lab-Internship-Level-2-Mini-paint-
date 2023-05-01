import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext,
  RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import EditorView from "@/views/EditorView.vue";
import BrowserView from "@/views/BrowserView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
    beforeEnter: function (to, from, next: NavigationGuardNext): void {
      const userStringData: string | null = localStorage.getItem("user");
      if (userStringData === null) next("/login");
      next();
    },
  },
  {
    path: "/",
    redirect: { name: "home" },
  },
  {
    path: "/editor",
    name: "editor",
    component: EditorView,
    beforeEnter: function (to, from, next: NavigationGuardNext): void {
      const userStringData: string | null = localStorage.getItem("user");
      if (userStringData === null) next("/login");
      next();
    },
  },
  {
    path: "/browser",
    name: "browser",
    component: BrowserView,
    beforeEnter: function (to, from, next: NavigationGuardNext): void {
      const userStringData: string | null = localStorage.getItem("user");
      if (userStringData === null) next("/login");
      next();
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/registration",
    name: "registration",
    alias: ["/register", "/signup"],
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
