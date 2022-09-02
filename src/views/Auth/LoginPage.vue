<template>
  <div class="w-full max-w-md">
    <AuthForm
      ref="form"
      heading="Log in"
      @submitted="onFormSubmit"
      :fields="loginFormFields"
      :isLoading="isLoading"
      :errorMessage="errorMessage"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import AuthForm from "@/components/common/AppForm.vue";
import { loginFormFields, TOAST_TYPES } from "@/constants";
export default {
  name: "LoginPage",
  components: {
    AuthForm,
  },
  data() {
    return {
      loginFormFields,
      errorMessage: null,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    ...mapActions("toasts", ["addNew"]),
    async onFormSubmit(model) {
      this.isLoading = true;
      const { response, error, errorMessage } = await this.$withAsync(
        this.$api.post,
        `/user/login`,
        model
      );
      this.isLoading = false;

      if (response) {
        const { user, tokens } = response.data;

        this.login(user);
        localStorage.setItem("token", tokens.accessToken);
        this.$router.push({ name: "home" });
        this.addNew({
          message: "You are now logged in",
          type: TOAST_TYPES.SUCCESS,
        });
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
