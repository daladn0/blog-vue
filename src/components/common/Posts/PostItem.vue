<template>
  <div class="bg-white rounded-lg dark:bg-gray-800 overflow-hidden">
    <div class="flex items-center justify-between p-3 border-b">
      <div class="flex items-center max-w-[80%] truncate">
        <img
          class="w-9 h-9 object-cover rounded-full block mr-2 flex-shrink-0"
          :src="post?.author?.avatar"
          :alt="post?.author?.fullName"
        />
        <div class="flex flex-col truncate">
          <span class="text-gray-800 text-xs font-medium truncate">{{
            post?.author?.fullName
          }}</span>
          <span class="text-xs text-gray-500 truncate">
            {{ formatDate(post?.createdAt) }}
          </span>
        </div>
      </div>

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
    <router-link
      :to="{ name: 'home' }"
      class="group w-full aspect-ratio overflow-hidden block"
    >
      <img
        class="w-full h-full object-cover duration-300 ease-linear group-hover:scale-105"
        src="https://www.militarytimes.com/resizer/yNKY50ee_dI8_rEbZVxM0By5jgY=/1024x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/archetype/WGWZBKY4HRG2DBKXSQC57HSPQY.jpg"
        alt="USMC fighter"
      />
    </router-link>
    <div class="p-4">
      <h2
        class="mb-2 md:mb-3 text-xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white line-clamp-2"
      >
        <router-link :to="{ name: 'home' }">
          {{ post.title }}
        </router-link>
      </h2>
      <p
        class="mb-3 text-gray-500 dark:text-gray-400 line-clamp-3 md:line-clamp-4 text-sm md:text-base"
        v-if="post.body"
      >
        {{ post.body }}
      </p>
      <div class="flex items-center justify-between">
        <button
          class="flex-shrink-0 text-sm md:text-base transition-all inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
        >
          Learn more
          <svg class="ml-1 w-4 md:w-6 h-4 md:h-6">
            <use v-svg-icon="'arrow-right'" />
          </svg>
        </button>

        <div class="hidden sm:flex items-center truncate pl-8">
          <ul v-if="post.categories" class="flex items-center space-x-4">
            <li
              v-for="category in post.categories.slice(0, 3)"
              :key="category._id"
            >
              <router-link
                class="text-gray-400 text-sm hover:underline"
                :to="{ name: 'home' }"
              >
                {{ category.title }}
              </router-link>
            </li>
          </ul>
          <span
            v-if="post.categories && post.categories.length > 3"
            class="text-sm text-gray-400 ml-4"
            >+{{ post.categories.length - 3 }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/helpers/formats.js";
import AppDropdown from "@/components/common/AppDropdown.vue";
export default {
  components: { AppDropdown },
  name: "PostItem",
  props: {
    post: {
      type: Object,
    },
  },
  data() {
    return {
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
  methods: {
    formatDate,
    onWindowClick(e) {
      const target = e.target;

      if (
        target.id === "post-dots" ||
        target.id === "post-dropdown" ||
        target.closest("#post-dots") ||
        target.closest("#post-dropdown")
      )
        return;

      this.dropdownVisible = false;
    },
  },
  mounted() {
    window.addEventListener("click", this.onWindowClick);
  },
  beforeUnmount() {
    window.removeEventListener("click", this.onWindowClick);
  },
};
</script>
