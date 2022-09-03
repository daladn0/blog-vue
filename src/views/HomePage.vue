<template>
  <div class="px-5 w-full max-w-3xl mx-auto pt-6 pb-8 space-y-8">
    <QuickPost />
    <PostsList />
  </div>
</template>
<script>
import PostsList from "@/components/common/Posts/PostsList.vue";
import QuickPost from "@/components/common/Posts/QuickPost.vue";
export default {
  name: "HomePage",
  components: {
    PostsList,
    QuickPost,
  },
};
</script>
