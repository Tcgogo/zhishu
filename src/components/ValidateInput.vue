<template>
  <div class="validata-input-container pb-3">
    <input
      class="form-control"
      :value="inputRef.val"
      @blur="validateEmail"
      @input="updateValue"
      :class="{ 'is-invalid': inputRef.error }"
      :="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">
      {{ inputRef.errorMessage }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";

interface RuleProp {
  type: "required" | "email" | "password";
  errorMessage: string;
}
export type RuleProps = RuleProp[];

export default defineComponent({
  props: {
    rules: {
      type: Array as PropType<RuleProps>,
    },
    modelValue: String,
  },
  inheritAttrs: false,
  setup(props, context) {
    const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const inputRef = reactive({
      val: props.modelValue || "",
      error: false,
      errorMessage: "",
    });

    const validateEmail = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              inputRef.errorMessage = rule.errorMessage;
              break;
            case "email":
              inputRef.errorMessage = rule.errorMessage;
              passed = emailReg.test(inputRef.val);
              break;
            case "password":
              passed = inputRef.val.length > 6;
              inputRef.errorMessage = rule.errorMessage;
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
      }
    };

    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit("update:modelValue", targetValue);
    };

    return {
      inputRef,
      validateEmail,
      updateValue,
    };
  },
});
</script>

<style scoped>
</style>