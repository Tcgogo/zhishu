<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
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
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RuleProps } from "../components/ValidateInput.vue";
import { GlobalDataProps, PostProps } from "../store";
export default defineComponent({
  name: "CreatePost",
  components: {
    ValidateForm,
    ValidateInput,
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
        const { columnId } = store.state.user; 
        if (columnId) {
          const newPost: PostProps = {
            _id: new Date().getTime() + "",
            title: titleVal.value,
            content: contentVal.value,
            column: columnId,
            createdAt: new Date().toLocaleString(),
          };

          store.commit("createPost", newPost);
          router.push({
            name: "column",
            params: {
              id: columnId,
            },
          });
        }
      }
    };

    return {
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      formSubmit
    };
  },
});
</script>

<style>
</style>