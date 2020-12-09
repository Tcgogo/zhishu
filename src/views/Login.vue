<template>
  <div class="container">
    <validate-form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">账号</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          type="text"
          placeholder="请输入邮箱地址"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <validate-input
          :rules="passwordRules"
          v-model="emailVal"
          type="password"
          placeholder="请输入密码"
        ></validate-input>
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
import { useRouter } from "vue-router";
import ValidateInput, { RuleProps } from "../components/ValidateInput.vue";
import ValidateForm from "../components/ValidateForm.vue";
import { emitter } from "../components/ValidateForm.vue";


export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const emailVal = ref("aaaas");
    const emailRules: RuleProps = [
      { type: "required", errorMessage: "电子邮箱地址不能为空！" },
      { type: "email", errorMessage: "请输入正确的电子邮箱格式！" },
    ];
    const passwordRules: RuleProps = [
      { type: "required", errorMessage: "密码不能为空！" },
      { type: "password", errorMessage: "密码不能小于6位数" },
    ];

    const router = useRouter();
    emitter.on("form-submit", (res) => {
      if(res) {
        router.push({
          name: 'column',
          params: {
            id: 1
          }
        })
      }
    });
    return {
      emailRules,
      emailVal,
      passwordRules,
    };
  },
});
</script>
<style>
</style>