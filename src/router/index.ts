import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext,
  RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: function (to, from, next: NavigationGuardNext): void {
      const userStringData: string | null = localStorage.getItem("user");
      if (userStringData === null) next({ name: "login" });
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
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
