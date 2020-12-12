<template>
  <teleport to="#loading">
    <div
      class="d-flex justify-content-center align-items-center h-100 loading-container"
      :style="{ backgroundColor: background }"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ text || "loading..." }}</span>
        </div>
        <p v-if="text" class="text-primary samll">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
export default defineComponent({
  props: {
    text: {
      type: String,
    },
    background: {
      type: String,
      default: "rgba(255, 255, 255, 0.5)",
    },
  },
  setup() {
    const node = document.createElement('div');
    node.id = "loading";
    document.body.appendChild(node);
    
    onUnmounted(() => {
      document.body.removeChild(node);
    })
  }
});
</script>

<style scoped>
.loading-container {
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.loading-content {
  text-align: center;
}
</style>