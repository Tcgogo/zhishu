import { createStore, Commit } from "vuex";
import axios from "axios";

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
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
  author?: string;
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

export interface GlobalDataProps {
  error: GlobalErrorProps;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  token: string;
}

const getAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit
) => {
  const { data } = await axios.get(url);
  commit(mutationName, data);
  return data;
};

const postAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  payload: any
) => {
  const { data } = await axios.post(url, payload);
  commit(mutationName, data);
  return data;
};

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false },
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    createPost(state, newPost) {
      state.posts.push(newPost);
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list;
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data];
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list;
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
    getColumnById: (state) => (id: string) => {
      return state.columns.find((c) => c._id === id);
    },
    getPostsById: (state) => (cid: string) => {
      return state.posts.filter((post) => post.column === cid);
    },
  },
  actions: {
    fetchColumns({ commit }) {
      return getAndCommit("./columns", "fetchColumns", commit);
    },
    fetchColumn({ commit }, cid) {
      return getAndCommit(`/columns/${cid}`, "fetchColumn", commit);
    },
    fetchPosts({ commit }, cid) {
      return getAndCommit(`/columns/${cid}/posts`, "fetchPosts", commit);
    },
    fetchCurrentUser({ commit }) {
      return getAndCommit("/user/current", "fetchCurrentUser", commit);
    },
    login({ commit }, payload) {
      return postAndCommit("/user/login", "login", commit, payload);
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch("login", loginData).then(() => {
        return dispatch("fetchCurrentUser");
      });
    },
    createPost({ commit }, newPost) {
      return postAndCommit("/posts", "createPost", commit, newPost);
    }
  },
});

export default store;
