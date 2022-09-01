<template>
  <nav
    class="shadow bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900"
  >
    <div class="container flex justify-between items-center mx-auto">
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
      <div class="flex items-center">
        <router-link
          :to="{ name: 'login' }"
          class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Log in
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>
