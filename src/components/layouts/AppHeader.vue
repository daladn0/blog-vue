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
      <div v-else class="relative">
        <button
          class="flex items-center transition-all hover:bg-slate-100 rounded-3xl px-3 py-1"
          type="button"
          id="profile"
          @click="dropdownVisible = !dropdownVisible"
          :class="{
            'bg-slate-100': dropdownVisible,
          }"
        >
          <span
            class="text-sm text-gray-700 mr-2 max-w-[150px] truncate block"
            >{{ currentUser.fullName }}</span
          >
          <img
            class="w-8 h-8 rounded-full object-cover overflow-hidden"
            :src="currentUser.avatar"
            :alt="currentUser.fullName"
          />
        </button>

        <transition name="slide-down">
          <AppDropdown
            v-if="dropdownVisible"
            :items="dropList"
            id="dropdown"
            class="absolute right-0 top-full mt-6"
            @logout="onLogout"
          >
            <template #header>
              <div class="flex items-center max-w-full p-3">
                <img
                  class="flex-shrink-0 w-8 h-8 mr-2 rounded-full object-cover overflow-hidden"
                  :src="currentUser.avatar"
                  :alt="currentUser.fullName"
                />
                <div class="text-sm text-gray-900 dark:text-white truncate">
                  <div class="font-medium truncate">
                    {{ currentUser.fullName }}
                  </div>
                  <div class="truncate">{{ currentUser.email }}</div>
                </div>
              </div>
            </template>
          </AppDropdown>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { clickOutside } from "@/helpers/events.js";
import AppDropdown from "@/components/common/AppDropdown.vue";
export default {
  name: "AppHeader",
  computed: {
    ...mapGetters("user", ["currentUser", "isAuth"]),
  },
  components: {
    AppDropdown,
  },
  data() {
    return {
      dropdownVisible: false,
      dropList: [
        { title: "Dashboard", icon: "lock", emit: "dashboard" },
        { title: "Settings", icon: "lock", emit: "settings" },
        { title: "Earning", icon: "lock", emit: "earning" },
        {
          title: "Log out",
          icon: "out",
          emit: "logout",
          separated: true,
          textCenter: true,
        },
      ],
    };
  },
  methods: {
    ...mapActions("user", ["logout"]),
    onWindowClick(e) {
      clickOutside(
        e,
        "#profile",
        "#dropdown",
        () => (this.dropdownVisible = false)
      );
    },
    onLogout(e) {
      this.$api.get("/user/logout");
      this.logout();
      this.$router.push({ name: "login" });
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
