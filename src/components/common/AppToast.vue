<template>
  <div
    class="flex items-center p-4 w-full max-w-xs border border-gray-300 text-gray-500 bg-white rounded-lg shadow-md dark:text-gray-400 dark:bg-gray-800"
    role="alert"
  >
    <div
      class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-white rounded-lg"
      :class="{
        'bg-green-500': type === TOAST_TYPES.SUCCESS,
        'bg-blue-500': type === TOAST_TYPES.WARNING,
        'bg-red-500': type === TOAST_TYPES.ERROR,
      }"
    >
      <svg class="w-5 h-5"><use v-svg-icon="icon" /></svg>
      <span class="sr-only">Fire icon</span>
    </div>
    <div class="ml-3 text-sm font-normal truncate pr-2">{{ message }}</div>
    <button
      @click="$emit('close')"
      type="button"
      class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      aria-label="Close"
    >
      <span class="sr-only">Close</span>
      <svg class="w-5 h-5"><use v-svg-icon="'close'" /></svg>
    </button>
  </div>
</template>
<script>
import { TOAST_TYPES } from "@/constants";
export default {
  name: "AppToast",
  emits: ["close"],
  props: {
    message: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  computed: {
    icon() {
      switch (this.type) {
        case TOAST_TYPES.SUCCESS:
          return "success";
          break;

        case TOAST_TYPES.WARNING:
          return "warning";
          break;

        case TOAST_TYPES.ERROR:
          return "error";
          break;

        default:
          break;
      }
    },
  },
  data() {
    return {
      TOAST_TYPES,
    };
  },
};
</script>
