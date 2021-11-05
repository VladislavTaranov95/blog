import service from "@/helpers/api";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
const info =
  user && token
    ? { isAuth: true, userInfo: user }
    : { isAuth: false, userInfo: null };
const BASE_URL = "http://51.158.179.21"

export const auth = {
  namespaced: true,
  state: {
    authInfo: info,
  },
  getters: {
    getUserLogStatus: state => {
      return state.authInfo.isAuth
    },
    getUserEmail: state => {
      return state.authInfo.userInfo.email
    },
    getUserName: state => {
      return state.authInfo.userInfo.name
    },
    getUserInitials: state => {
      return state.authInfo.userInfo.name[0]
    },
    getUserAvatar: state => {
      return BASE_URL + state.authInfo.userInfo.avatar
    },
    getUserId: state => {
      return state.authInfo.userInfo._id
    }
  },
  actions: {
    userLogin({ commit }, user) {
      return service
        .post("auth", {
          email: user.email,
          password: user.password
        })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem("token", JSON.stringify(response.data.token));
          }

          return service.get("auth/user");
        })
        .then(
          user => {
            localStorage.setItem("user", JSON.stringify(user.data));
            commit("loginSuccess", user.data);

            return Promise.resolve(user);
          },
          error => {
            commit("loginFailure");
            return Promise.reject(error);
          }
        );
    },
    userRegister({ commit }, user) {
      return service
        .post("users", {
          email: user.email,
          password: user.password,
          name: user.name
        })
        .then(
          response => {
            commit("registerSuccess");
            return Promise.resolve(response.data);
          },
          error => {
            commit("registerFailure");
            return Promise.reject(error);
          }
        );
    },
    userLogout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      commit("logout");
    },
  },
  mutations: {
    registerSuccess(state) {
      state.authInfo.isAuth = false;
    },
    registerFailure(state) {
      state.authInfo.isAuth = false;
    },
    loginSuccess(state, user) {
      state.authInfo.isAuth = true;
      state.authInfo.userInfo = user;
    },
    loginFailure(state) {
      state.authInfo.isAuth = false;
      state.authInfo.userInfo = null;
    },
    logout(state) {
      state.authInfo.isAuth = false;
      state.authInfo.userInfo = null;
    },
  },
};
