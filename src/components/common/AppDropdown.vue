<template>
  <div
    class="z-10 w-56 bg-white rounded shadow after:block after:absolute after:w-4 after:h-4"
  >
    <slot name="header" />
    <ul class="text-sm text-gray-700 dark:text-gray-200">
      <li
        v-for="item in items"
        :key="item.emit"
        :class="{ 'border-t': item.separated }"
        class="py-1"
      >
        <button
          @click="$emit(item.emit)"
          class="flex items-center w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white truncate"
          :class="{
            'text-center justify-center': item.textCenter,
          }"
        >
          <svg
            v-if="item.icon"
            class="w-5 h-5 text-gray-500 mr-2 flex-shrink-0"
          >
            <use v-svg-icon="item.icon" />
          </svg>
          <span class="truncate">{{ item.title }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "AppDropdown",
  props: {
    items: {
      type: Array,
    },
  },
};
</script>
