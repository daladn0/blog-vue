<template>
  <div class="px-5 pb-5">
    <Form
      @submit="onFormSubmit"
      class="mt-6 w-12/12 md:w-10/12 lg:w-8/12 2xl:w-6/12 mx-auto p-4 bg-white shadow-xl rounded-lg space-y-8"
    >
      <Field
        name="title"
        :rules="validatePostTitle"
        v-slot="{ field, errorMessage }"
      >
        <div class="relative">
          <p class="text-gray-800 mb-1 text-sm">
            Post title <span class="text-sm text-red-400">*</span>:
          </p>
          <AppInput v-bind="field" ref="title" placeholder="Brand new post.." />
          <span v-if="errorMessage" class="text-red-500 text-sm mt-1">{{
            errorMessage
          }}</span>
        </div>
      </Field>
      <Field
        name="body"
        :rules="validatePostBody"
        v-slot="{ field, errorMessage }"
      >
        <div class="relative">
          <p class="text-gray-800 mb-1 text-sm">Post body:</p>
          <textarea
            @input="onAreaInput"
            v-bind="field"
            placeholder="Lorem ipsum dolor set.."
            class="overflow-y-hidden outline-none bg-gray-50 border border-gray-300 hover:border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
            rows="4"
          />
          <span v-if="errorMessage" class="text-red-500 text-sm mt-1">{{
            errorMessage
          }}</span>
        </div>
      </Field>
      <div>
        <p class="text-gray-800 mb-1 text-sm">Post categories:</p>
        <v-select multiple :options="['Canada', 'United States']" />
      </div>
      <div>
        <p class="text-gray-800 mb-1 text-sm">Post image:</p>
        <AppDNDrop @file-changed="onFileSelected" />
      </div>

      <p class="text-red-500 text-center">Invalid parameters</p>

      <button
        type="submit"
        class="block mx-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-12 py-2.5 text-center"
      >
        Create Post
      </button>
    </Form>
  </div>
</template>
<script setup>
import AppDNDrop from "@/components/common/AppDNDrop.vue";
import { ref, onMounted } from "vue";
import { Form, Field } from "vee-validate";
import { validatePostTitle, validatePostBody } from "@/helpers/validators";

const postTitle = ref("");
const postBody = ref("");
const postCategories = ref([]);
const postImage = ref(null);
const title = ref(null);

function onFileSelected(file) {
  postImage.value = file;
}

function onAreaInput(e) {
  const target = e.target;

  // auto resize
  target.style.minHeight = "102px";
  target.style.height = 0;
  target.style.height = target.scrollHeight + "px";
}

function onFormSubmit(e) {
  console.log(e);
}

onMounted(() => title.value.focus());
</script>
