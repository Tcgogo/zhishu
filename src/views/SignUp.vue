<template>
  <div class="container">
    <validate-form @formSubmit="formSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          type="text"
          placeholder="请输入邮箱地址"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">昵称</label>
        <validate-input
          :rules="nameRules"
          v-model="nameVal"
          type="text"
          placeholder="请输入昵称"
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
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">重复密码</label>
        <validate-input
          :rules="repeatpasswordRules"
          v-model="repeatPasswordVal"
          type="password"
          placeholder="请重复输入密码"
        ></validate-input>
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
// import { useStore } from "vuex";
import axios from "axios";
import ValidateInput, { RuleProps } from "../components/ValidateInput.vue";
import ValidateForm from "../components/ValidateForm.vue";
import createMessage from "../hooks/useCreateMessage";
export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const router = useRouter();
    const data = reactive({
      emailVal: "",
      nameVal: "",
      passwordVal: "",
      repeatPasswordVal: "",
    });
    const emailRules: RuleProps = [
      { type: "required", errorMessage: "电子邮箱地址不能为空！" },
      { type: "email", errorMessage: "请输入正确的电子邮箱格式！" },
    ];
    const nameRules: RuleProps = [
      { type: "required", errorMessage: "名字不能为空！" },
      { type: "name", errorMessage: "名字不能少于3位！" },
    ];
    const passwordRules: RuleProps = [
      { type: "required", errorMessage: "电子邮箱地址不能为空！" },
      { type: "password", errorMessage: "密码不能小于6位！" },
    ];
    const repeatpasswordRules: RuleProps = [
      { type: "required", errorMessage: "电子邮箱地址不能为空！" },
      { type: "password", errorMessage: "密码不能小于6位！" },
      {
        type: "custom",
        validator: () => data.passwordVal === data.repeatPasswordVal,
        errorMessage: "两次输入密码不一致！",
      },
    ];

    const formSubmit = (res: boolean) => {
      if (res) {
        const payload = {
          email: data.emailVal,
          password: data.passwordVal,
          nickName: data.nameVal,
        };

        axios
          .post("/users", payload)
          .then(() => {
            createMessage("注册成功 正在转跳到登录页面", "success");
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const signUpData = toRefs(data);

    return {
      ...signUpData,
      emailRules,
      nameRules,
      passwordRules,
      repeatpasswordRules,
      formSubmit,
    };
  },
});
</script>

<style>
</style>