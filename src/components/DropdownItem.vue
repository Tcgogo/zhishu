<template>
  <li class="dropdown-option isdisabled" :class="{'isdisabled': disabled}">
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
.isdisabled{
  color: rgb(247, 0, 0);
  pointer-events: none;
  background: transparent;
}
</style>