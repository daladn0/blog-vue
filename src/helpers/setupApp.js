import api from "@/api/api";
import withAsync from "@/helpers/withAsync";

import { svgIconDirective } from "@/directives";
import components from "@/components/base";

import vSelect from "vue-select";

export default (app) => {
  function requireAll(r) {
    r.keys().forEach(r);
  }

  requireAll(
    require.context(
      "@/assets/svg",
      true,
      /\.svg$|\.png$|\.ico$|\.jpg$|\.jpe?g$/
    )
  );

  // global variables
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$withAsync = withAsync;

  // custom directives
  app.directive("svg-icon", svgIconDirective);

  // global components
  components.forEach((component) => {
    app.component(component.name, component);
  });

  app.component("v-select", vSelect);
};
