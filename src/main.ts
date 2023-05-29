import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { firebaseInitialized } from "./firebase";

firebaseInitialized.then(() => {
  const app = createApp(App);
  app.use(router);
  app.mount("#app");
});
