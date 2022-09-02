<template>
  <div class="w-full max-w-md">
    <AuthForm :fields="loginFormFields" heading="Log in" />
  </div>
</template>
<script>
import AuthForm from "@/components/common/AppForm.vue";
import { loginFormFields } from "@/constants";
export default {
  name: "LoginPage",
  components: {
    AuthForm,
  },
  data() {
    return {
      loginFormFields,
    };
  },
};
</script>
