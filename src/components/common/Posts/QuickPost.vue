<template>
  <Form @submit="onSubmit" class="p-2 rounded-lg shadow bg-white">
    <Field name="title" v-slot="{ field, errorMessage }" :rules="validateTitle">
      <div class="flex items-center justify-between space-x-2">
        <button
          class="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-slate-200"
        >
          <svg class="w-5 h-5 text-gray-500">
            <use v-svg-icon="'photo'" />
          </svg>
        </button>

        <div class="relative w-full flex">
          <input
            ref="input"
            v-bind="field"
            class="outline-none block p-2 w-full text-sm text-gray-800 bg-gray-50 rounded-l-lg border-r-0 border border-gray-300 hover:border-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Post title"
          />
          <button
            type="submit"
            class="flex-shrink-0 block h-auto px-2.5 text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 transition-all focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <LoadingSpinner class="w-5 h-5" v-if="isLoading" />
            <svg class="w-5 h-5" v-else>
              <use v-svg-icon="'circled-plus'" />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
      <span
        v-if="errorMessage"
        class="text-xs md:text-sm text-red-400 ml-11 mt-2 block"
        >{{ errorMessage }}</span
      >
    </Field>
  </Form>
</template>

<script>
import { mapActions } from "vuex";
import { Form, Field, configure } from "vee-validate";
import { validateTitle } from "@/helpers/validators.js";
import { TOAST_TYPES } from "@/constants";

configure({
  validateOnBlur: false,
  validateOnChange: false,
});

export default {
  name: "QuickPost",
  emits: ["post-created"],
  components: {
    Form,
    Field,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("toasts", ["addNew"]),
    validateTitle,
    async onSubmit(model, { resetForm, setErrors }) {
      this.isLoading = true;
      const { response, error, errorMessage } = await this.$withAsync(
        this.$api.post,
        "/post",
        model
      );
      this.isLoading = false;

      if (response) {
        this.$emit("post-created", response.data);
        resetForm();
      }

      if (error) {
        const errors = error?.response?.data?.errors;

        if (errors && errors.length) {
          const errorsObj = {};

          errors.forEach((e) => (errorsObj[e.param] = e.msg));

          setErrors(errorsObj);
        } else if (errorMessage) {
          this.addNew({ message: errorMessage, type: TOAST_TYPES.ERROR });
        }
      }
    },
  },
  mounted() {
    this.$refs.input.focus();
  },
};
</script>
