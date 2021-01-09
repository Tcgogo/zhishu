<template>
  <nav class="header-nav navbar bg-primary bg-primary justify-content-between">
    <router-link to="/" class="navbar-brand">知书达理</router-link>
    <ul v-if="!user.isLogin" class="navbar-btn list-inline">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2"
          >登录</router-link
        >
      </li>
      <li class="list-inline-item">
        <router-link to="/signup" class="btn btn-outline-light my-2"
          >注册</router-link
        >
      </li>
    </ul>
    <ul v-else class="navbar-btn list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好  ${user.nickName}`">
          <dropdown-item
            ><router-link :to="`/column/${user.column}`" class="dropdown-item"
              >我的专栏</router-link
            ></dropdown-item
          >
          <dropdown-item
            ><router-link to="/create" class="dropdown-item"
              >新建文章</router-link
            ></dropdown-item
          >
          <dropdown-item :disabled="true"
            ><router-link to="/user" class="dropdown-item"
              >编辑资料</router-link
            ></dropdown-item
          >
          <dropdown-item
            ><a href="#" @click="logout" class="dropdown-item"
              >退出登录</a
            ></dropdown-item
          >
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useStore } from "vuex";
import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";
import { UserProps } from "../store";
export default defineComponent({
  name: "GlobalHeader",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  components: {
    Dropdown,
    DropdownItem,
  },
  setup() {
    const store = useStore();
    const logout = () => {
      store.commit("logout");
    };

    return {
      logout,
    };
  },
});
</script>

<style scoped>
.header-nav {
  height: 80px;
}

.navbar-brand {
  margin-left: 200px;
  color: rgb(255, 255, 255);
}
.navbar-btn {
  margin-right: 200px;
}
</style>