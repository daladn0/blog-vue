<template>
  <div class="py-6 px-5">
    <LoadingSpinner v-if="isLoading" class="w-14 h-14 mx-auto mt-8" />
    <div
      class="bg-white w-12/12 md:w-10/12 lg:w-8/12 2xl:w-6/12 p-3 rounded-lg mx-auto shadow-lg"
      v-else
    >
      <!-- Heading -->
      <div class="flex items-center justify-between border-b pb-3 mb-3">
        <!-- user -->
        <div class="flex items-center truncate">
          <!-- avatar -->
          <div
            class="flex-shrink-0 w-10 md:w-12 h-10 md:h-12 border-2 border-purple-600 p-0.5 rounded-full mr-2 md:mr-4"
          >
            <img
              :src="post?.author?.avatar"
              :alt="post?.author?.fullName"
              class="rounded-full"
            />
          </div>
          <!-- info -->
          <div class="truncate">
            <p
              class="font-semibold text-sm sm:text-base md:text-lg text-gray-800 truncate"
            >
              By
              <span class="text-purple-600">{{ post?.author?.fullName }}</span>
            </p>
            <time class="text-xs md:text-sm text-gray-500">{{
              formatDate(post?.createdAt)
            }}</time>
          </div>
        </div>

        <!-- settings -->
        <div class="relative">
          <button
            id="post-dots"
            @click="dropdownVisible = !dropdownVisible"
            class="flex items-center justify-center w-8 h-8 rounded-full transition-all hover:bg-gray-100"
            :class="{ 'bg-gray-100': dropdownVisible }"
          >
            <svg class="w-5 h-5 text-gray-500"><use v-svg-icon="'dots'" /></svg>
          </button>

          <transition name="slide-down">
            <AppDropdown
              id="post-dropdown"
              v-if="dropdownVisible"
              :items="dropItems"
              class="absolute -right-2 top-full border mt-4"
            />
          </transition>
        </div>
      </div>

      <!-- Post body -->
      <div>
        <img
          class="rounded-md"
          src="https://www.militarytimes.com/resizer/yNKY50ee_dI8_rEbZVxM0By5jgY=/1024x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/archetype/WGWZBKY4HRG2DBKXSQC57HSPQY.jpg"
          alt="USMC fighter"
        />

        <h1 class="text-2xl md:text-3xl text-gray-800 my-2 md:my-4 font-medium">
          {{ post?.title }}
        </h1>
        <p class="text-sm text-gray-700 leading-relaxed">{{ post?.body }}</p>
      </div>

      <!-- Post footer -->
      <div
        class="pt-2 md:pt-3 mt-2 md:mt-3 border-t"
        v-if="post.categories && post.categories.length"
      >
        <ul class="flex items-center flex-wrap">
          <li
            class="flex items-center before:block before:w-1 before:h-1 before:rounded-full before:bg-gray-400 before:mr-2 mr-4"
            v-for="category in post.categories"
            :key="category._id"
          >
            <router-link
              :to="{ name: 'home' }"
              class="px-2 py-1 text-sm text-gray-500 hover:underline"
            >
              {{ category.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/helpers/formats.js";
import { clickOutside } from "@/helpers/events.js";
import AppDropdown from "@/components/common/AppDropdown.vue";
export default {
  name: "SinglePost",
  data() {
    return {
      post: null,
      isLoading: true,
      dropdownVisible: false,
    };
  },
  created() {
    this.dropItems = [
      { title: "Copy link", icon: "share", emit: "share-post" },
      { title: "Edit post", icon: "edit", emit: "edit-post" },
      { title: "Delete post", icon: "trash", emit: "delete-post" },
    ];
  },
  components: {
    AppDropdown,
  },
  methods: {
    formatDate,
    onWindowClick(e) {
      clickOutside(
        e,
        "#post-dots",
        "#post-dropdown",
        () => (this.dropdownVisible = false)
      );
    },
  },
  async mounted() {
    this.isLoading = true;
    const { response, error, errorMessage } = await this.$withAsync(
      this.$api.get,
      `/post/${this.$route.params.id}`
    );
    this.isLoading = false;

    if (response) {
      this.post = response.data;

      window.addEventListener("click", this.onWindowClick);
    }

    if (error) {
      console.log(errorMessage);
    }
  },
  beforeUnmount() {
    window.removeEventListener("click", this.onWindowClick);
  },
};
</script>
