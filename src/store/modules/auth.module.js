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
    },
    getUserSkills: state => {
      return state.authInfo.userInfo.skills
    },
    getUserProfession: state => {
      return state.authInfo.userInfo.profession
    },
    getUserRegDate: state => {
      return state.authInfo.userInfo.dateCreated
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
      commit("logout");
    },
    saveProfile({ commit }, data) {
      return service
        .patch(`users/${data.id}`, {
          name: data.name,
          profession: data.profession,
          skills: data.skills
        })
        .then(
          response => {
            commit("profileSaveSuccess", response.data);
            return Promise.resolve(response.data);
          },
          error => {
            commit("profileSaveFailure");
            return Promise.reject(error);
          }
        );
    },
    async editUserPhoto({ state, commit }, payload) {
      const response = await service.put('/users/upload/' + state.authInfo.userInfo._id, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      commit('updateUser', response.data)
    },
  },
  mutations: {
    registerSuccess(state) {
      state.authInfo.isAuth = false;
    },
    registerFailure(state) {
      state.authInfo.isAuth = false;
    },
    loginSuccess(state, payload) {
      state.authInfo.isAuth = true;
      state.authInfo.userInfo = payload;
    },
    loginFailure(state) {
      state.authInfo.isAuth = false;
      state.authInfo.userInfo = null;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.authInfo.isAuth = false;
      state.authInfo.userInfo = null;
    },
    profileSaveSuccess(state, data) {
      state.authInfo.userInfo = data;
    },
    updateUser(state, user) {
      state.authInfo.userInfo = user;
    },
  },
};
