<template>
<global-header :user="currentUser"></global-header>
  <div class="container">
    <loader
      v-if="isLoading"
      text="拼命加载中"
      background="rgba(0,0,0,.5)"
    ></loader>
    
    <router-view></router-view>
    <footer class="main-footer text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">@ 2020 知书达理</li>
          <li class="list-inline-item">github</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalHeader from "./components/GlobalHeader.vue";
import Loader from "./components/Loader.vue";
import createMessage  from "./hooks/useCreateMessage";

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
    const error = computed(() => store.state.error);

    watch(() => error.value.status, () => {
      if(error.value.status && error.value.message){
        createMessage(error.value.message, "error", 2000);
      }
    })
    return {
      currentUser,
      isLoading,
      error
    };
  },
});
</script>

<style>
.main-footer {
  font-size: 20px;
  bottom: 0;
}

</style>
