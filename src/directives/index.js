// v-svg-icon
export const svgIconDirective = {
  created: (el, binding) => {
    el.setAttribute("href", `/sprite.svg#${binding.value}`);
  },
};
