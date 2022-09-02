<template>
  <Form
    @submit="onFormSubmit"
    @invalid-submit="onInvalidSubmit"
    class="w-full bg-white rounded-md shadow-2xl p-5 space-y-10"
  >
    <h1 class="text-gray-800 font-bold text-2xl text-center">
      {{ heading }}
    </h1>
    <Field
      v-slot="{ field: fieldOptions, errorMessage, handleChange, meta }"
      v-for="field in fields"
      :key="field.name"
      :rules="field.rules"
      :name="field.name"
    >
      <div class="relative">
        <p
          class="text-sm ml-2.5 mb-1 transition-all"
          :class="[errorMessage ? 'text-red-500' : 'text-gray-600']"
        >
          {{ field.label }}
        </p>
        <div
          class="w-full flex items-center border-2 px-3 rounded-2xl transition-all"
          :class="{ 'border-red-500': errorMessage }"
        >
          <svg
            class="w-5 h-5 transition-all"
            :class="[errorMessage ? 'text-red-500' : 'text-gray-500']"
          >
            <use v-svg-icon="field.icon" />
          </svg>
          <input
            class="pl-2 py-2 w-full outline-none border-none"
            v-bind="fieldOptions"
            @input="
              ($event) => handleChange($event, meta.dirty && meta.touched)
            "
            @blur="($event) => handleChange($event, meta.touched && meta.dirty)"
            :id="field.name"
            :name="field.name"
            :type="field.type"
            :placeholder="field.placeholder"
            :ref="field.name"
          />
        </div>
        <span
          v-if="errorMessage"
          class="mt-1 absolute top-full left-3 text-red-500 text-sm"
          >{{ errorMessage }}</span
        >
      </div>
    </Field>

    <span
      v-if="false"
      class="text-sm text-red-500 font-medium text-center block"
      >Invalid credentials</span
    >

    <button
      type="submit"
      class="block w-full bg-indigo-600 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
    >
      Login
    </button>
    <slot name="footer">
      <div class="flex items-center justify-center">
        <p class="text-sm text-gray-800 text-center">
          Don't have an account yet?
          <router-link
            @click.prevent.stop
            class="block text-center text-blue-500 font-medium underline hover:no-underline"
            :to="{ name: 'signup' }"
            >Sign up</router-link
          >
        </p>
      </div>
    </slot>
  </Form>
</template>

<script>
import { Form, Field, configure } from "vee-validate";

configure({
  validateOnBlur: false,
});

export default {
  name: "AuthForm",
  components: {
    Form,
    Field,
  },
  props: {
    heading: {
      type: String,
    },
    fields: {
      type: Array,
    },
  },
  methods: {
    onFormSubmit(e) {
      console.log(e);
    },
    onInvalidSubmit({ errors }) {
      const firstError = Object.keys(errors)[0];

      const input = this.$refs[firstError];

      if (input[0] && input[0].focus) input[0].focus();
    },
  },
  mounted() {
    // focusing a first input
    const firstField = this.$refs[this.fields[0]?.name];

    if (firstField[0] && firstField[0].focus) firstField[0].focus();
  },
};
</script>
