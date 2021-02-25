import axios, { AxiosRequestConfig } from "axios";
import store from "../store";

// interceptors 发送请求的拦截器
axios.interceptors.request.use(config => {
  store.commit("setLoading", true);
  store.commit("setError", { status: false, message: "" });
  return config;
});

// interceptors 响应的拦截器
axios.interceptors.response.use(
  resp => {
    store.commit("setLoading", false);
    return resp;
  },
  e => {
    const { error } = e.response.data;
    store.commit("setError", { status: true, message: error });
    store.commit("setLoading", false);
    return Promise.reject(error);
  }
);

export { axios, AxiosRequestConfig };
