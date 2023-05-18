import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import EditorView from "@/views/EditorView.vue";
import BrowserView from "@/views/BrowserView.vue";
import CanvasView from "@/views/CanvasView.vue";
import LayoutView from "@/views/LayoutView.vue";
import { useUser } from "@/composables/useUser";
import { UserDataCompos } from "@/types/interfaces/composInterfaces";
const user: UserDataCompos = useUser();
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: LayoutView,
    children: [
      {
        path: "",
        name: "home",
        alias: ["/home"],
        component: HomeView,
      },
      {
        path: "editor",
        name: "editor",
        component: EditorView,
      },
      {
        path: "browser",
        name: "browser",
        component: BrowserView,
      },
      {
        path: "canvas/:id/:context/:user/:name",
        name: "canvasDetails",
        props: true,
        component: CanvasView,
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
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && to.name !== "registration" && !user.user.value)
    next({ name: "login" });
  else next();
});

export default router;
