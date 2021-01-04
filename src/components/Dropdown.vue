<template>
  <div class="dropdown">
    <button
      class="btn btn-primary dropdown-toggle"
      @click.prevent="btnClick"
    >
      {{ title }}
    </button>
    <ul
      :style="{ display: 'block' }"
      class="btn-item dropdown-menu"
      v-if="isOpen"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

export default defineComponent({
  name: "Dropdown",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const btnClick = () => {
      isOpen.value = !isOpen.value;
    };

    onMounted(() => {
      document.addEventListener("click", () => {
        isOpen.value = false;
      }, true)
    });

    onUnmounted(() => {
      document.removeEventListener("click",() => {
        isOpen.value = false;
      }, true)
    });
  
    return {
      isOpen,
      btnClick,
    };
  },
});
</script>

<style scoped>
</style>