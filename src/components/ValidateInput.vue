<template>
  <div class="validata-input-container pb-3">
    <input
      class="form-control"
      v-model="inputRef.val"
      @blur="validateEmail"
      :class="{ 'is-invalid': inputRef.error }"
    />
    <span v-if="inputRef.error" class="invalid-feedback">
      {{ inputRef.errorMessage }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";

interface RuleProp {
  type: "required" | "email";
  errorMessage: string;
}
export type RuleProps = RuleProp[];

export default defineComponent({
  props: {
    rules: {
      type: Array as PropType<RuleProps>,
    },
  },
  setup(props) {
    const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const inputRef = reactive({
      val: "",
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
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        console.log(inputRef.errorMessage )
      }
    };

    return {
      inputRef,
      validateEmail,
    };
  },
});
</script>

<style scoped>
</style>