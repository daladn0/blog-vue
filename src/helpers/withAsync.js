export default async function withAsync(fn, ...args) {
  try {
    const response = await fn(...args);

    return {
      response,
      error: null,
    };
  } catch (error) {
    return {
      error,
      response: null,
      errorMessage: error?.response?.data?.message,
    };
  }
}
