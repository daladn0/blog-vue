<template>
  <div>
    <AppHeader />
    <div class="container mx-auto py-2"><slot /></div>
  </div>
</template>
<script>
import AppHeader from "@/components/layouts/AppHeader.vue";
export default {
  name: "MainLayout",
  components: {
    AppHeader,
  },
};
</script>
