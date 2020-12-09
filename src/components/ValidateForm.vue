<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import mitt from "mitt";
export const emitter = mitt();
type ValidateFunc = () => boolean;

export default defineComponent({
  emits: ["form-submit"],
  setup(props, context) {
    let funcArr: ValidateFunc[] = [];

    const callback = (func: any) => {
      funcArr.push(func);
    };

    const submitForm = () => {
      const validateResult = funcArr.map((func) => {
        return func();
      }).every(result => result);

      emitter.emit("form-submit", validateResult);
    };

    emitter.on("form-item-created", callback);

    onUnmounted(() => {
      emitter.off("form-item-created", callback);
      funcArr = [];
    });
    return {
      submitForm,
    };
  },
});
</script>

<style>
</style>