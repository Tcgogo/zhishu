<template>
  <div class="validata-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      class="form-control"
      @blur="validateInput"
      v-model="inputRef.val"
      :class="{ 'is-invalid': inputRef.error }"
      :="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      @blur="validateInput"
      v-model="inputRef.val"
      :class="{ 'is-invalid': inputRef.error }"
      :="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">
      {{ inputRef.errorMessage }}
    </span>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
} from "vue";
import { emitter } from "./ValidateForm.vue";

interface RuleProp {
  type: "required" | "email" | "password" | "name" | "custom";
  errorMessage: string;
  validator?: () => boolean;
}
export type RuleProps = RuleProp[];
export type TagType = "input" | "textarea";

export default defineComponent({
  props: {
    rules: {
      type: Array as PropType<RuleProps>,
    },
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: "input",
    },
  },
  inheritAttrs: false,
  setup(props, context) {
    const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || "",
        set: val => {
          context.emit("update:modelValue", val);
        }
      }),
      error: false,
      errorMessage: "",
    });

    const validateInput = (): boolean => {
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
              passed = inputRef.val.length > 5;
              inputRef.errorMessage = rule.errorMessage;
              break;
            case "name":
              passed = inputRef.val.length > 2;
              inputRef.errorMessage = rule.errorMessage;
              break;
            case "custom": 
              passed = rule.validator && rule.validator() || false;
              inputRef.errorMessage = rule.errorMessage;
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };

    onMounted(() => {
      emitter.emit("form-item-created", validateInput);
    });

    return {
      inputRef,
      validateInput,
    };
  },
});
</script>

<style scoped>
</style>