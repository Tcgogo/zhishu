<template>
  <li class="dropdown-option" :class="{ isdisabled: disabled }">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DropdownItem",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.isdisabled {
  pointer-events: none;
  background: rgba(221, 219, 219, 0.5);
  color: rgb(138, 4, 4);
}
</style>