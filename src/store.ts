import { createStore, Commit } from "vuex";
import axios, { AxiosRequestConfig } from "axios";
import { objToArr, arrToObj } from "./helper";

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}

export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createAt?: string;
  fitUrl?: string;
}

export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}


export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

interface ListProps<P> {
  [id: string]: P;
}

interface PostsProps<T>{
  [id: string]: T;
}

interface ColumnPageProps {
  columnId: string;
  currentPage: number;
  total: number;
}


export interface GlobalDataProps {
  error: GlobalErrorProps;
  loading: boolean;
  columns: { data: ListProps<ColumnProps>; currentPage: number; total: number };
  posts: { data: ListProps<PostProps>; loadedColumns: PostsProps<ColumnPageProps> };
  user: UserProps;
  token: string;
}

const asyncAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  config: AxiosRequestConfig = { method: "get" },
  extraData?: any
) => {
  const { data } = await axios(url, config);
  if(extraData) {
    commit(mutationName, { data, extraData });
  } else {
    commit(mutationName, data);
  }
  return data;
};

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    loading: false,
    columns: { data: {}, currentPage: 0, total: 0 },
    posts: { data: {}, loadedColumns: {} },
    user: { isLogin: false },
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    //发表文章
    createPost(state, newPost) {
      state.posts.data[newPost._id] = newPost;
    },
    deletePost(state, rawData) {
      delete state.posts.data[rawData.data._id];
    },
    fetchColumns(state, rawData) {
      const { data } = state.columns
      const { list, count, currentPage } = rawData.data
      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: count,
        currentPage: currentPage * 1
      }
    },
    fetchColumn(state, rawData) {
      state.columns.data[rawData.data._id] = rawData.data
    },
    fetchPosts(state, { data: rawData, extraData: columnId }) {
      const { list, count, currentPage } = rawData.data;
      state.posts.data = { ...state.posts.data, ...arrToObj(list) };
      state.posts.loadedColumns[columnId] = {
        currentPage: currentPage * 1,
        total: count,
        columnId: columnId
      };
    },
    fetchPost(state, rawData) {
      state.posts.data[rawData.data._id] = rawData.data;
    },
    updatePost(state, { data }) {
      state.posts.data[data._id] = data;
    },
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data };
    },
    setLoading(state, status) {
      state.loading = status;
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e;
    },
    login(state, rowData) {
      const { token } = rowData.data;
      state.token = token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    logout(state) {
      state.token = "";
      state.user = { isLogin: false };
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
    },
  },
  getters: {
    getColumns: (state) => {
      return objToArr(state.columns.data);
    },
    getColumnById: (state) => (id: string) => {
      return state.columns.data[id];
    },
    getPostsById: (state) => (cid: string) => {
      return objToArr(state.posts.data).filter((post) => post.column === cid);
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.data[id];
    },
  },
  actions: {
    fetchColumns({ state, commit }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params
      if (state.columns.currentPage < currentPage) {
        return asyncAndCommit(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
      }
    },
    fetchColumn({ state, commit }, cid) {
      if (!state.columns.data[cid]) {
        return asyncAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
      }
    },
    fetchPosts({ state, commit }, params) {
      const { currentPage = 1, pageSize = 6, cid } = params;
      console.log(params)
      if(!state.posts.loadedColumns[cid] || state.posts.loadedColumns[cid].currentPage < currentPage) {
         return asyncAndCommit(`/columns/${cid}/posts?currentPage=${currentPage}&pageSize=${pageSize}`, "fetchPosts", commit, { method: "get" }, cid);
      }
    },
    fetchPost({ state, commit }, id) {
      const currentPost = state.posts.data[id];
      if (!currentPost || !currentPost.content) {
        return asyncAndCommit(`/posts/${id}`, "fetchPost", commit);
      } else {
        return Promise.resolve({ data: currentPost });
      }
    },
    updatePost({ commit }, { id, payload }) {
      return asyncAndCommit(`posts/${id}`, "updatePost", commit, {
        method: "patch",
        data: payload,
      });
    },
    fetchCurrentUser({ commit }) {
      return asyncAndCommit("/user/current", "fetchCurrentUser", commit);
    },
    login({ commit }, payload) {
      return asyncAndCommit("/user/login", "login", commit, {
        method: "post",
        data: payload,
      });
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch("login", loginData).then(() => {
        return dispatch("fetchCurrentUser");
      });
    },
    createPost({ commit }, newPost) {
      return asyncAndCommit("/posts", "createPost", commit, {
        method: "post",
        data: newPost,
      });
    },
    deletePost({ commit }, id) {
      return asyncAndCommit(`/posts/${id}`, "deletePost", commit, {
        method: "delete",
      });
    },
  },
});

export default store;
