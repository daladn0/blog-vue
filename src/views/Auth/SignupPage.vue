<template>
  <div class="w-full max-w-md">
    <AuthForm
      ref="form"
      heading="Sign up"
      @submitted="onSubmit"
      :fields="signupFormFields"
      :isLoading="isLoading"
      :errorMessage="errorMessage"
    >
      <template #footer>
        <div class="flex items-center justify-center">
          <p class="text-sm text-gray-800 text-center">
            Already have an account?
            <router-link
              @click.prevent.stop
              class="block text-center text-blue-500 font-medium underline hover:no-underline"
              :to="{ name: 'login' }"
              >Log in</router-link
            >
          </p>
        </div>
      </template>
    </AuthForm>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import AuthForm from "@/components/common/AppForm.vue";
import { signupFormFields, TOAST_TYPES } from "@/constants";
export default {
  name: "SignupPage",
  components: {
    AuthForm,
  },
  data() {
    return {
      signupFormFields,
      isLoading: false,
      errorMessage: null,
    };
  },
  methods: {
    ...mapActions("toasts", ["addNew"]),
    async onSubmit(model) {
      this.isLoading = true;
      const { response, error, errorMessage } = await this.$withAsync(
        this.$api.post,
        "/user/registration",
        model
      );
      this.isLoading = false;

      if (response) {
        this.addNew({
          type: TOAST_TYPES.SUCCESS,
          message: response.data.message,
        });
        this.$router.push({ name: "login" });
      }

      if (error) {
        this.errorMessage = errorMessage;

        const formInstance = this.$refs.form;

        if (formInstance && formInstance.focusFirstInput)
          formInstance.focusFirstInput();
      }
    },
  },
};
</script>
