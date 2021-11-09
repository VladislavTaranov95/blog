import axios from "axios";
import authHeader from "@/services/auth.service";

const service = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    "Content-Type": "application/json"
  }
});

service.interceptors.request.use(
  config => {
    const AUTH_TOKEN = authHeader();
    if (AUTH_TOKEN) {
      config.headers.Authorization = AUTH_TOKEN;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
