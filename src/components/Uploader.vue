<template>
  <div class="file-upload">
    <div @click.prevent="triggerUpload">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary">正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="success" :respData="respData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change.prevent="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from "vue";
import axios from "axios";
type UploadStatus = "ready" | "loading" | "success" | "error";
type CheckFunction = (file: File) => boolean;
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true,
    },
    beforUpload: {
      type: Function as PropType<CheckFunction>,
    },
    uploaded: {
      type: Object
    }
  },
  emits: ['file-upload', 'file-uploaded-error'],
  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<UploadStatus>(props.uploaded ? "success" : "ready");
    const respData = ref(props.uploaded);
    watch(() => props.uploaded, (newValue) => {
      if(newValue) {
        respData.value = newValue;
      }
    })
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        const uploadedFile = files[0];
        const formData = new FormData();
        if (props.beforUpload) {
          const result = props.beforUpload(uploadedFile);
          if (!result) {
            return;
          }
        }
        fileStatus.value = "loading";
        formData.append("file", uploadedFile);
        axios
          .post(props.action, formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((resp: any) => {
            fileStatus.value = "success";
            respData.value = resp.data;
            context.emit('file-upload',resp.data);
          })
          .catch((error) => {
            fileStatus.value = "error";
            context.emit('file-uploaded-error',error);
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = "";
            }
          });
      }
    };

    return {
      fileInput,
      triggerUpload,
      handleFileChange,
      fileStatus,
      respData
    };
  },
});
</script>

<style>
</style>