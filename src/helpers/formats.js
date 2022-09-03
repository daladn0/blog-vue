export function formatDate(value) {
  try {
    const date = new Date(value);

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return new Intl.DateTimeFormat("uk-UA", options).format(date);
  } catch (err) {
    console.log("");
  }
}
