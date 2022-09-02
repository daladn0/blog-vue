import { v4 } from "uuid";

export default {
  namespaced: true,
  state: () => ({
    stack: [],
  }),
  getters: {
    stack: ({ stack }) => stack,
  },
  mutations: {
    shiftFromStack(state) {
      state.stack.shift();
    },
    pushToStack(state, toast) {
      state.stack.push({ ...toast, id: v4() });
    },
    deleteFromStackById(state, id) {
      state.stack = state.stack.filter((toast) => toast.id !== id);
    },
  },
  actions: {
    addNew({ commit, state }, toast) {
      if (state.stack.length >= 3) {
        commit("shiftFromStack");
      }

      commit("pushToStack", toast);
    },
  },
};
