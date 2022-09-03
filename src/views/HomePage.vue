<template>
  <div class="px-5 w-full max-w-3xl mx-auto pt-6 pb-8 space-y-8">
    <QuickPost @post-created="onPostCreated" v-if="isAuth" />

    <LoadingSpinner v-if="isLoading" class="w-10 h-10 mx-auto mt-8" />
    <PostsList :posts="posts" v-else />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import PostsList from "@/components/common/Posts/PostsList.vue";
import QuickPost from "@/components/common/Posts/QuickPost.vue";
export default {
  name: "HomePage",
  components: {
    PostsList,
    QuickPost,
  },
  data() {
    return {
      posts: [],
      totalCount: 0,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("user", ["isAuth"]),
  },
  methods: {
    async fetchPosts() {
      this.isLoading = true;
      const { response } = await this.$withAsync(this.$api.get, "/post");
      this.isLoading = false;

      if (response) {
        this.posts = response.data.items;
        this.totalCount = response.data.totalCount;
      }
    },
    onPostCreated(post) {
      this.fetchPosts();
    },
  },
  async mounted() {
    this.fetchPosts();
  },
};
</script>
