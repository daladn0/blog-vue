<template>
  <div class="relative min-h-screen">
    <component :is="`${layout}`">
      <router-view />
    </component>
    <div class="fixed left-4 bottom-4 space-y-4 w-full max-w-xs">
      <transition-group name="list">
        <AppToast
          class="w-full"
          v-for="toast in stack"
          @close="deleteFromStackById(toast.id)"
          :key="toast.id"
          :message="toast.message"
          :type="toast.type"
        />
      </transition-group>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import AppToast from "@/components/common/AppToast.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
export default {
  name: "App.vue",
  components: {
    MainLayout,
    EmptyLayout,
    AppToast,
  },
  computed: {
    ...mapGetters("toasts", ["stack"]),
    layout() {
      return this.$route.meta.layout === "MainLayout"
        ? "MainLayout"
        : "EmptyLayout";
    },
  },
  methods: {
    ...mapMutations("toasts", ["deleteFromStackById"]),
  },
};
</script>
<style lang="scss">
@import "vue-select/dist/vue-select.css";
@import "./styles/tailwind.scss";
@import "./styles/app.scss";
</style>
