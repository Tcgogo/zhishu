import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/";
axios.interceptors.request.use((config) => {
  store.commit("setLoading", true);
  return config;
});
axios.interceptors.response.use((config) => {
  setTimeout(() => {
    store.commit("setLoading", false);
  }, 2000);
  return config;
}, (e) => {
  const { error } = e.response.data;
  store.commit("setError", {status: true, message: error});
  store.commit("setLoading", false);
  return Promise.reject(error);
});
const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
