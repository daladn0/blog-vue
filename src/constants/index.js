import {
  validateFullname,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "@/helpers/validators.js";

export const loginFormFields = [
  {
    label: "Email: ",
    name: "email",
    placeholder: "example@mail.com",
    icon: "at-sign",
    type: "email",
    rules: validateEmail,
  },
  {
    label: "Password: ",
    name: "password",
    placeholder: "******",
    icon: "lock",
    type: "password",
    rules: validatePassword,
  },
];

export const signupFormFields = [
  {
    label: "Full name: ",
    name: "fullName",
    placeholder: "Johnny Doe",
    icon: "user-icon",
    type: "text",
    rules: validateFullname,
  },
  {
    label: "Email: ",
    name: "email",
    placeholder: "example@mail.com",
    icon: "at-sign",
    type: "email",
    rules: validateEmail,
  },
  {
    label: "Password: ",
    name: "password",
    placeholder: "******",
    icon: "lock",
    type: "password",
    rules: validatePassword,
  },
  {
    label: "Confirm password: ",
    name: "confirmPassword",
    placeholder: "******",
    icon: "lock",
    type: "password",
    rules: validateConfirmPassword,
  },
];

export const TOAST_TYPES = {
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
  ERROR: "ERROR",
};

export default {
  FULLNAME_MIN_LENGTH: 3,
  FULLNAME_MAX_LENGTH: 24,

  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 48,
};
