import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";

import { svgIconDirective } from "@/directives";

const app = createApp(App);

function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(
  require.context("@/assets/svg", true, /\.svg$|\.png$|\.ico$|\.jpg$|\.jpe?g$/)
);

app.directive("svg-icon", svgIconDirective);

app.use(router).mount("#app");
