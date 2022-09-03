export function clickOutside(event, trigger, toggle, callback) {
  const target = event.target;
  if (
    target.id === trigger.split("#")[1] ||
    target.id === toggle.split("#")[1] ||
    target.closest(trigger) ||
    target.closest(toggle)
  )
    return;

  callback();
}

export function copyText(text) {
  const input = document.createElement("input");
  input.value = text;
  input.setAttribute("type", "hidden");
  document.body.append(input);
  input.setAttribute("type", "text");
  input.select();
  document.execCommand("copy");
  input.remove();
}
