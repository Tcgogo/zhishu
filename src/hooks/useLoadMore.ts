import { useStore } from "vuex";
import { ref, computed, ComputedRef } from "vue";

interface LoadParams {
  currentPage: number;
  pageSize: number;
  cid?: string;
}
const useLoadMore = (
  actionName: string,
  total: ComputedRef<number>,
  params: LoadParams = { currentPage: 2, pageSize: 5 }
) => {
  const store = useStore();
  const currentPage = ref(params.currentPage);
  const requestParams = computed(() => {
    if (params.cid) {
      return {
        currentPage: currentPage.value,
        pageSize: params.pageSize,
        cid: params.cid,
      };
    } else {
      return {
        currentPage: currentPage.value,
        pageSize: params.pageSize,
      };
    }
  });
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value).then(() => {
      currentPage.value++;
    });
  };
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) < currentPage.value;
  });
  return {
    loadMorePage,
    isLastPage,
    currentPage,
  };
};

export default useLoadMore;
