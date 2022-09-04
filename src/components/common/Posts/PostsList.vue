<template>
  <div class="space-y-8">
    <PostItem
      v-for="post in posts"
      @deletePost="$emit('deletePost', $event)"
      :key="post.item"
      :post="post"
    />
  </div>
</template>
<script>
import PostItem from "@/components/common/Posts/PostItem.vue";
export default {
  name: "PostsList",
  emits: ["deletePost"],
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    PostItem,
  },
};
</script>
