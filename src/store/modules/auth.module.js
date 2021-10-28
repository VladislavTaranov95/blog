//import service from "@/helpers/api";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
const info =
    user && token
        ? { isAuth: true, userInfo: user }
        : { isAuth: false, userInfo: null };

export const auth = {
    namespaced: true,
    state: {
        authInfo: info,
    },
    getters: {},
    actions: {},
    mutations: {},
};
