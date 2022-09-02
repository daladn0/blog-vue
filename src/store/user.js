export default {
  namespaced: true,
  state: () => ({
    currentUser: null,
    isAuth: false,
  }),
  getters: {
    currentUser: ({ currentUser }) => currentUser,
    isAuth: ({ isAuth }) => isAuth,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setIsAuth(state, auth) {
      state.isAuth = auth;
    },
  },
  actions: {
    login({ commit }, user) {
      commit("setCurrentUser", user);
      commit("setIsAuth", true);
    },
    logout({ commit }) {
      commit("setCurrentUser", null);
      commit("setIsAuth", false);
    },
  },
};
