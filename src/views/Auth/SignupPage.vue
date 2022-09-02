<template>
  <div class="w-full max-w-md">
    <AuthForm :fields="signupFormFields" heading="Sign up">
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
import AuthForm from "@/components/common/AppForm.vue";
import { signupFormFields } from "@/constants";
export default {
  name: "SignupPage",
  components: {
    AuthForm,
  },
  data() {
    return {
      signupFormFields,
    };
  },
};
</script>
