import { createStore } from "vuex";

import user from "@/store/user";
import toasts from "@/store/toasts";

const store = createStore({
  modules: {
    user,
    toasts,
  },
});

export default store;
