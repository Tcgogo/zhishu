<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <uploader
      :action="'/upload'"
      :beforUpload="beforUpload"
      @fileUpload="onFileUpload"
      @fileUploadedError="onFileUploadedError"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4 file-upload-container"
    >
      <h2>点击上传</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #success="slotProps">
        <img :src="slotProps.respData.data.url" alt="" width="500" />
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
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from "../store";
import { beforeUploadCheck } from "../helper";

import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RuleProps } from "../components/ValidateInput.vue";
import Uploader from "../components/Uploader.vue";
import createMessage from "../hooks/useCreateMessage";

export default defineComponent({
  name: "CreatePost",
  components: {
    ValidateForm,
    ValidateInput,
    Uploader,
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
      const result = beforeUploadCheck(file, {
        format: ["image/jpeg", "image/png"],
        size: 1,
      });
      const { passed, error } = result;
      if (error === "format") {
        createMessage("上传图片只能是 JPG/PNG 格式!", "error");
      }
      if (error === "size") {
        createMessage("上传图片大小不能超过 1Mb", "error");
      }
      return passed;
    };
    
    const onFileUpload = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传图片ID: ${rawData.data._id}`, "success");
    };
    const onFileUploadedError = (error: any) => {
      createMessage(`${error.message}`, "error");
    };

    return {
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      formSubmit,
      beforUpload,
      onFileUpload,
      onFileUploadedError,
    };
  },
});
</script>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>