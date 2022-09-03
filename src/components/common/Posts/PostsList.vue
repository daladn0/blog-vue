<template>
  <div>
    <LoadingSpinner v-if="isLoading" class="w-10 h-10 mx-auto mt-8" />
    <div class="space-y-8" v-else>
      <PostItem v-for="post in posts" :key="post.item" :post="post" />
    </div>
  </div>
</template>
<script>
import PostItem from "@/components/common/Posts/PostItem.vue";
export default {
  name: "PostsList",
  components: {
    PostItem,
  },
  data() {
    return {
      posts: [],
      totalCount: 0,
      isLoading: false,
    };
  },
  async mounted() {
    this.isLoading = true;
    const { response, error, errorMessage } = await this.$withAsync(
      this.$api.get,
      "/post"
    );
    this.isLoading = false;

    if (response) {
      this.posts = response.data.items;
      this.totalCount = response.data.totalCount;
    }

    if (error) {
      console.log(errorMessage);
    }
  },
};
</script>
