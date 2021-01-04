<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pd-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar && column.avatar.fitUrl"
          :alt="column.title"
          class="rounded-lg w-100"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list v-if="list" :list="list"></post-list>
    <div class="more-btn">
      <button
        class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
        @click="loadMorePage"
        v-if="!isLastPage"
      >
        加载更多
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import PostList from "../components/PostList.vue";
import { addColumnAvatar } from "../helper";
import { GlobalDataProps, ColumnProps } from "../store";
import useLoadMore from "../hooks/useLoadMore";
import router from "@/router";

export default defineComponent({
  name: "ColumnDetail",
  components: {
    PostList,
  },
  setup() {
    const route = useRoute();
    const store = useStore<GlobalDataProps>();
    const currentId = route.params.id;
    if (!store.state.posts.loadedColumns[currentId as string]) {
      store.state.posts.loadedColumns[currentId as string] = {
        columnId: currentId as string,
        currentPage: 0,
        total: 0,
      };
    }
    const total = computed(() => store.state.posts.loadedColumns[currentId as string].total);
    const currentPage = computed(() => store.state.posts.loadedColumns[currentId as string].currentPage);
    onMounted(() => {
      store.dispatch("fetchColumn", currentId);
      store.dispatch("fetchPosts", {
        cid: currentId,
      });
    });
    const column = computed(() => {
      const selectColumn = store.getters.getColumnById(currentId) as | ColumnProps | undefined;
      if (selectColumn) {
        addColumnAvatar(selectColumn, 100, 100);
      }
      return selectColumn;
    });
    const list = computed(() => store.getters.getPostsById(currentId));

    const { loadMorePage, isLastPage } = useLoadMore("fetchPosts", total, {
      pageSize: 3,
      currentPage: currentPage.value ? currentPage.value + 1 : 2,
      cid: currentId as string
    });

    //解决只有参数改变，组件不刷新问题
    watch(() => route.params.id, ()=> {
      router.go(0);
    })

    return {
      column,
      list,
      loadMorePage,
      isLastPage,
    };
  },
});
</script>

<style>
</style>