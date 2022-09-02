<template>
  <nav
    class="shadow bg-white border-gray-200 px-2 sm:px-4 w-full h-16 dark:bg-gray-900"
  >
    <div class="container flex justify-between items-center mx-auto h-full">
      <router-link :to="{ name: 'home' }" class="flex items-center">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="mr-3 h-6 sm:h-9"
          alt="Neet Vue Logo"
        />

        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
          >Neet Vue</span
        >
      </router-link>

      <div class="flex items-center" v-if="!isAuth">
        <router-link
          :to="{ name: 'login' }"
          class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Log in
        </router-link>
      </div>
      <button
        v-else
        class="flex items-center transition-all hover:bg-slate-100 rounded-3xl px-3 py-1"
      >
        <span class="text-sm text-gray-700 mr-2 max-w-[150px] truncate block">{{
          currentUser.fullName || "sadasd"
        }}</span>
        <img
          class="w-8 h-8 rounded-full object-cover overflow-hidden"
          :src="currentUser.avatar || 'asdas'"
          :alt="currentUser.fullName || 'asdas'"
        />
      </button>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AppHeader",
  computed: {
    ...mapGetters("user", ["currentUser", "isAuth"]),
  },
};
</script>
