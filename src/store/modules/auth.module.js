//import service from "@/helpers/api";

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
        getUserName: state => {
            return state.authInfo.userInfo.name
        },
        getUserAvatar: state => {
            return BASE_URL + state.authInfo.userInfo.avatar
        }
    },
    actions: {},
    mutations: {},
};
