<template>
  <div
    @click.self="$emit('cancel')"
    class="flex items-center justify-center fixed z-20 w-full h-screen bg-black bg-opacity-80"
  >
    <!-- Modal content -->
    <div
      class="modal-content relative w-full max-w-lg bg-white rounded-lg shadow dark:bg-gray-700"
    >
      <!-- Modal header -->
      <div
        class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ heading }}
        </h3>
        <button
          @click="$emit('cancel')"
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg class="w-5 h-5"><use v-svg-icon="'close'" /></svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <!-- Modal body -->
      <slot name="default" />

      <!-- Modal footer -->
      <slot name="footer">
        <div
          class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
        >
          <button
            @click="$emit('ok')"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {{ okBtn }}
          </button>
          <button
            @click="$emit('cancel')"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            {{ declineBtn }}
          </button>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "AppModal",
  emits: ["ok", "cancel"],
  props: {
    heading: {
      type: String,
    },
    okBtn: {
      type: String,
      default: "Ok",
    },
    declineBtn: {
      type: String,
      default: "Cancel",
    },
  },
};
</script>
