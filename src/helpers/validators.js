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
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

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
