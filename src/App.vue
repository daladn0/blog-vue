<template>
  <component :is="`${layout}`">
    <router-view />
  </component>
</template>
<script>
import MainLayout from "@/layouts/MainLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
export default {
  name: "App.vue",
  components: {
    MainLayout,
    EmptyLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout === "MainLayout"
        ? "MainLayout"
        : "EmptyLayout";
    },
  },
};
</script>
<style lang="scss">
@import "./styles/tailwind.scss";
@import "./styles/app.scss";
</style>
