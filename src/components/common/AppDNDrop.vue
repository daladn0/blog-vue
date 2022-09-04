<template>
  <div
    class="flex justify-center items-center w-full"
    @dragover.stop.prevent="onDragOver"
    @dragleave.stop.prevent="onDragLeave"
    @drop.stop.prevent="onDrop"
  >
    <label
      for="dropzone-file"
      class="relative flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all"
      :class="[dragging ? 'border-green-400' : 'border-gray-300']"
    >
      <template v-if="preview">
        <img :src="preview" class="max-w-full max-h-full object-contain" />
        <button
          @click.stop.prevent="clearFile"
          type="button"
          class="absolute right-3 top-3 flex items-center justify-center w-8 h-8 bg-red-500 rounded-full"
        >
          <svg class="w-6 h-6 text-white">
            <use v-svg-icon="'close'" />
          </svg>
        </button>
      </template>
      <div
        v-else
        class="flex flex-col justify-center items-center pt-5 pb-6"
        :class="[dragging ? 'text-green-400' : 'text-gray-500']"
      >
        <svg class="mb-3 w-10 h-10 transition-all">
          <use v-svg-icon="'upload'" />
        </svg>
        <p class="mb-2 text-sm transition-all">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs transition-all">
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
      </div>
      <input
        @change="onFileSelected"
        id="dropzone-file"
        type="file"
        class="hidden"
      />
    </label>
  </div>
</template>
<script setup>
import { ref } from "vue";
const emit = defineEmits(["file-changed"]);

const file = ref(null);
const preview = ref(null);
const dragging = ref(false);

function clearFile() {
  file.value = null;
  preview.value = null;
  emit("file-changed", null);
}

function onFileSelected(e) {
  file.value = e.target.files[0];
  emit("file-changed", file.value);

  const reader = new FileReader();
  reader.onload = () => {
    preview.value = reader.result;
  };
  reader.readAsDataURL(file.value);
}

function onDragLeave() {
  dragging.value = false;
}

function onDragOver(e) {
  dragging.value = true;
}

function onDrop(e) {
  file.value = e.dataTransfer.files[0];
  dragging.value = false;
  onFileSelected({ target: { files: e.dataTransfer.files } });
}
</script>
