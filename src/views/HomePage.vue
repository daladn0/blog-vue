<template>
  <div>
    <Teleport to="#modal">
      <Transition :duration="550" name="fade">
        <AppModal
          heading="Delete post"
          @ok="onPostDelete"
          @cancel="
            showModal = false;
            postToRemove = null;
          "
          v-if="showModal"
        >
          <p class="text-gray-900 p-5 text-center text-xl truncate">
            Are you sure you want to delete "<span class="font-semibold">{{
              getPostById(postToRemove)?.title
            }}</span
            >" ?
          </p>
        </AppModal>
      </Transition>
    </Teleport>
    <div class="px-5 w-full max-w-3xl mx-auto pt-6 pb-8 space-y-8">
      <QuickPost @post-created="fetchPosts" v-if="isAuth" />

      <LoadingSpinner v-if="isLoading" class="w-10 h-10 mx-auto mt-8" />
      <PostsList @deletePost="openModal($event)" :posts="posts" v-else />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import PostsList from "@/components/common/Posts/PostsList.vue";
import QuickPost from "@/components/common/Posts/QuickPost.vue";
import AppModal from "@/components/common/AppModal.vue";

export default {
  name: "HomePage",
  components: {
    PostsList,
    QuickPost,
    AppModal,
  },
  data() {
    return {
      posts: [],
      totalCount: 0,
      isLoading: false,
      showModal: false,
      postToRemove: null,
    };
  },
  computed: {
    ...mapGetters("user", ["isAuth"]),
  },
  methods: {
    getPostById(id) {
      return this.posts.find((post) => post._id === id);
    },
    openModal(id) {
      this.postToRemove = id;
      this.showModal = true;
    },
    async fetchPosts() {
      this.isLoading = true;
      const { response } = await this.$withAsync(this.$api.get, "/post");
      this.isLoading = false;

      if (response) {
        this.posts = response.data.items;
        this.totalCount = response.data.totalCount;
      }
    },
    async onPostDelete() {
      this.showModal = false;
      this.isLoading = true;
      const { response } = await this.$withAsync(
        this.$api.delete,
        `/post/${this.postToRemove}`
      );
      this.isLoading = false;

      if (response) {
        this.fetchPosts();
      }
    },
  },
  async mounted() {
    this.fetchPosts();
  },
};
</script>
