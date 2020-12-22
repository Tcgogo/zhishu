<template>
  <div class="container">
    <validate-form @formSubmit="formSubmit">
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
          v-model="passwordVal"
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
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ValidateInput, { RuleProps } from "../components/ValidateInput.vue";
import ValidateForm from "../components/ValidateForm.vue";
import createMessage from "../hooks/useCreateMessage";

export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const emailVal = ref("111@test.com");
    const passwordVal = ref("111111");
    const emailRules: RuleProps = [
      { type: "required", errorMessage: "电子邮箱地址不能为空！" },
      { type: "email", errorMessage: "请输入正确的电子邮箱格式！" },
    ];
    const passwordRules: RuleProps = [
      { type: "required", errorMessage: "密码不能为空！" },
      { type: "password", errorMessage: "密码不能小于6位数" },
    ];

    const router = useRouter();
    const store = useStore();
    const formSubmit = (res: boolean) => {
      if (res) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value,
        };
        store
          .dispatch("loginAndFetch", payload)
          .then(() => {
            createMessage("登录成功，2秒后跳转到首页...", "success", 2000);
            setTimeout(() => {
              router.push("/");
            }, 2000);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };
    return {
      emailRules,
      emailVal,
      passwordRules,
      formSubmit,
      passwordVal,
    };
  },
});
</script>
<style>
</style>