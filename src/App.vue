<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <h1 v-if="error.status">{{ error.message }}</h1>
    <loader
      v-if="isLoading"
      text="拼命加载中"
      background="rgba(0,0,0,.5)"
    ></loader>
    
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">@ 2020 知书达理</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { GlobalDataProps } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalHeader from "./components/GlobalHeader.vue";
import Loader from "./components/Loader.vue";

export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    Loader,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    const token = computed(() => store.state.token);
    const error = computed(() => store.state.error);

    onMounted(() => {
      if (!currentUser.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
        store.dispatch("fetchCurrentUser");
      }
    });
    return {
      currentUser,
      isLoading,
      error
    };
  },
});
</script>

<style>
</style>
