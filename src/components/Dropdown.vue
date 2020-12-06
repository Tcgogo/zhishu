<template>
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" @click.prevent="btnClick">{{ title }}</button>
    <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
    <slot></slot>
  </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Dropdown",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false);
    const btnClick = () => {
      isOpen.value = !isOpen.value;
    }

    return {
      isOpen,
      btnClick
    }
  }
});
</script>

<style>
</style>