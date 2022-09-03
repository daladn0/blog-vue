import constants from "@/constants";

export function validateFullname(value) {
  if (!value) return "Full name is required";

  if (value.trim().length < constants.FULLNAME_MIN_LENGTH) {
    return `Full name should have at least ${constants.FULLNAME_MIN_LENGTH} chars`;
  }

  if (value.trim().length > constants.FULLNAME_MAX_LENGTH) {
    return `Full name can\`t have more than ${constants.FULLNAME_MAX_LENGTH} chars`;
  }

  return true;
}

export function validateEmail(value) {
  if (!value) return "Email is required";

  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!regex.test(value)) {
    return "Invalid email";
  }

  return true;
}

export function validatePassword(value) {
  if (!value) return "Password is required";

  if (value.length < constants.PASSWORD_MIN_LENGTH) {
    return `Password should have at least ${constants.PASSWORD_MIN_LENGTH} chars`;
  }

  if (value.length > constants.PASSWORD_MAX_LENGTH) {
    return `Password can\`t have move than ${constants.PASSWORD_MAX_LENGTH} chars`;
  }

  return true;
}

export function validateConfirmPassword(value, { form }) {
  if (!value) return "Password is required";

  const password = form.password;

  if (!password) return true;

  if (value !== password) return "Passwords don't match";

  return true;
}

export function validateTitle(value) {
  if (!value) return "Title is required";

  if (value.length < constants.POST_TITLE_MIN_LENGTH)
    return `Title should have at least ${constants.POST_TITLE_MIN_LENGTH} chars`;

  if (value.length > constants.POST_TITLE_MAX_LENGTH)
    return `Title can\`t be longer then ${constants.POST_TITLE_MAX_LENGTH} chars`;

  return true;
}
