import { createApp } from "vue";

import App from "@/App.vue";
import LoaderApp from "@/LoaderApp.vue";
import api from "@/api/api";

import router from "@/router";
import store from "@/store";
import setupApp from "@/helpers/setupApp";

const app = createApp(App);
setupApp(app);

const loaderApp = createApp(LoaderApp);
loaderApp.mount("#app");

api
  .get("/user/refresh")
  .then(async (res) => {
    store.dispatch("user/login", res.data.user);
    localStorage.setItem("token", res.data.tokens.accessToken);
  })
  .catch((err) => {})
  .finally(() => {
    loaderApp.unmount();
    app.use(router).use(store).mount("#app");
  });
