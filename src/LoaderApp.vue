<template>
  <div class="w-full h-screen flex items-center justify-center bg-white">
    <LoadingSpinner class="w-14 h-14" />
  </div>
</template>
<script>
import LoadingSpinner from "@/components/base/LoadingSpinner.vue";
export default {
  name: "LoaderApp",
  components: {
    LoadingSpinner,
  },
};
</script>
