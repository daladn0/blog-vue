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
