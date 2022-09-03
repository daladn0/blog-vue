<template>
  <div class="px-5">
    <PostsList />
  </div>
</template>
<script>
import PostsList from "@/components/common/Posts/PostsList.vue";
export default {
  name: "HomePage",
  components: {
    PostsList,
  },
};
</script>
