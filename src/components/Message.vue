<template>
  <teleport to="#message">
    <div class="alert message-info" :class="[type]" v-if="isVisible">
      <strong>{{ message }}</strong>
      <button type="button" class="btn-close" @click.prevent="hide"></button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import useDOMCreate from "../hooks/useDOMCreate";
export type MessageType = "success" | "error" | "default";
export default defineComponent({
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: "default",
    },
  },
  setup() {
    useDOMCreate("message");

    const isVisible = ref(true);
    const hide = () => {
        isVisible.value = false;
    }
    return {
      isVisible,
      hide
    };
  },
});
</script>

<style>
.message-info {
  font-size: 10px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.success {
  background: rgb(20, 202, 59);
}
.error {
  background: rgb(255, 132, 132);
}
.default {
  background: rgb(47, 178, 230);
}
</style>