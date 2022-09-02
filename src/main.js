import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import setupApp from "@/helpers/setupApp";

const app = createApp(App);

setupApp(app);

app.use(router).use(store).mount("#app");
