<template>
  <div class="container">
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from "vuex";
import { GlobalDataProps } from "../store";
import ColumnList from "../components/ColumnList.vue";

export default defineComponent({
  components: {
    ColumnList,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const list = computed(() => store.state.columns);
    return {
      list
    }
  }
})
</script>
<style>

</style>