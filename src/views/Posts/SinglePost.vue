<template>
  <div class="py-6 px-5">
    <Teleport to="#modal">
      <Transition :duration="550" name="fade">
        <AppModal
          heading="Delete post"
          @ok="onPostDelete"
          @cancel="showModal = false"
          v-if="showModal"
        >
          <p class="text-gray-900 p-5 text-center text-xl truncate">
            Are you sure you want to delete "<span class="font-semibold">{{
              post.title
            }}</span
            >" ?
          </p>
        </AppModal>
      </Transition>
    </Teleport>

    <LoadingSpinner
      v-if="isLoading"
      class="w-10 md:w-14 h-10 md:h-14 mx-auto mt-8"
    />
    <div
      class="bg-white w-12/12 md:w-10/12 lg:w-8/12 2xl:w-6/12 p-3 rounded-lg mx-auto shadow-lg"
      v-else-if="post"
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
              class="absolute -right-2 top-full border mt-4"
              id="post-dropdown"
              v-if="dropdownVisible"
              :items="dropItems"
              @share-post="onPostShare"
              @delete-post="
                showModal = true;
                dropdownVisible = false;
              "
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
    <div
      v-else
      class="h-[80vh] flex flex-col items-center justify-center text-gray-600"
    >
      <svg class="w-24 md:w-72"><use v-svg-icon="'error'" /></svg>
      <h3 class="text-2xl md:text-5xl font-medium">{{ error }}</h3>
      <router-link
        :to="{ name: 'home' }"
        class="text-blue-700 text-lg md:text-2xl mt-2 font-medium underline hover:no-underline"
        >go home</router-link
      >
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AppDropdown from "@/components/common/AppDropdown.vue";
import AppModal from "@/components/common/AppModal.vue";
import { TOAST_TYPES } from "@/constants";
import { formatDate } from "@/helpers/formats.js";
import { clickOutside, copyText } from "@/helpers/events.js";
import { getDropList } from "@/helpers";

export default {
  name: "SinglePost",
  data() {
    return {
      post: null,
      error: null,
      isLoading: true,
      dropdownVisible: false,
      showModal: false,
    };
  },
  computed: {
    ...mapGetters("user", ["isAuth", "currentUser"]),
  },
  components: {
    AppDropdown,
    AppModal,
  },
  methods: {
    ...mapActions("toasts", ["addNew"]),
    formatDate,
    onWindowClick(e) {
      clickOutside(
        e,
        "#post-dots",
        "#post-dropdown",
        () => (this.dropdownVisible = false)
      );
    },
    onPostShare() {
      this.dropdownVisible = false;
      const url = `${process.env.VUE_APP_CLIENT_URL}/post/${this.post._id}`;
      copyText(url);
      this.addNew({
        message: "Text is copied to clipboard",
        type: TOAST_TYPES.SUCCESS,
      });
    },
    async onPostDelete() {
      this.showModal = false;
      this.isLoading = true;

      await this.$withAsync(this.$api.delete, `/post/${this.post._id}`);

      this.addNew({
        message: "Post has been removed",
        type: TOAST_TYPES.SUCCESS,
      });

      this.$router.push({ name: "home" });
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
      this.error = errorMessage;
    }

    this.dropItems = getDropList(this.isAuth, this.currentUser, this.post);
  },
  beforeUnmount() {
    window.removeEventListener("click", this.onWindowClick);
  },
};
</script>
