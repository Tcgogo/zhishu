<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <uploader :action="'/upload'" :beforUpload="beforUpload">
    <h2>点击上传</h2>
    <template #loading>
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>Loading...
      </div>
    </template>
     <template #success="slotProps">
      <img :src="slotProps.respData.data.url" alt="" width="500">
    </template>
    </uploader>
    <validate-form @formSubmit="formSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          :rules="contentRules"
          v-model="contentVal"
          placeholder="请输入文章详情"
          :tag="'textarea'"
          rows="10"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { GlobalDataProps, PostProps } from "../store";

import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RuleProps } from "../components/ValidateInput.vue";
import Uploader from "../components/Uploader.vue";
import createMessage from "../hooks/useCreateMessage";

export default defineComponent({
  name: "CreatePost",
  components: {
    ValidateForm,
    ValidateInput,
    Uploader
  },
  setup() {
    const titleRules: RuleProps = [
      { type: "required", errorMessage: "文章标题不能为空！" },
    ];
    const contentRules: RuleProps = [
      { type: "required", errorMessage: "文章详情不能为空！" },
    ];

    const titleVal = ref("");
    const contentVal = ref("");

    const store = useStore<GlobalDataProps>();
    const router = useRouter();
    const formSubmit = (res: boolean) => {
      if (res) {
        const { column } = store.state.user;
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column: column,
          };

          store.commit("createPost", newPost);
          router.push({
            name: "column",
            params: {
              id: column,
            },
          });
        }
      }
    };

    const beforUpload = (file: File) => {
      const isJPGOrPGN = file.type === "image/jpeg" || file.type === "image/png";
      if(!isJPGOrPGN) {
        createMessage("文件格式只支持JPG或PNG！","error");
      }
      return isJPGOrPGN;
    }

    return {
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      formSubmit,
      beforUpload
    };
  },
});
</script>

<style>
</style>