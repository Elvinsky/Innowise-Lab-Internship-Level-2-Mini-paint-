import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import EditorView from "@/views/EditorView.vue";
import BrowserView from "@/views/BrowserView.vue";
import CanvasView from "@/views/CanvasView.vue";
import LayoutView from "@/views/LayoutView.vue";
const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStringData: string | null = localStorage.getItem("user");
  if (userStringData === null) next("/login");
  next();
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: LayoutView,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
        beforeEnter: authGuard,
      },
      {
        path: "editor",
        name: "editor",
        component: EditorView,
        beforeEnter: authGuard,
      },
      {
        path: "browser",
        name: "browser",
        component: BrowserView,
        beforeEnter: authGuard,
      },
      {
        path: "canvas/:id/:url/:user/:name",
        name: "canvasDetails",
        props: true,
        component: CanvasView,
        beforeEnter: authGuard,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    alias: "/signin",
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
// console.log(router.options.routes[0].children);

export const VALID_ROUTES = router.getRoutes().map((el) => el.path);
export default router;
