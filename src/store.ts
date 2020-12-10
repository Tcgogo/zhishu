import { createStore } from "vuex";
import axios from "axios";

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: string;
}

interface ImageProps {
  _id?: string;
  url?: string;
  createAt?: string;
}

export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}


export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: { isLogin: false, columnId: "1", name: "tcgogos"},
  },
  mutations: {
    login(state) {
      state.user = {  isLogin: true, name: "tcgogos" };
    },
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
    }

  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id);
    },
    getPostsById: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid);
    },
  },
  actions: {
    async fetchColumns({commit}) {
      const resp = await axios.get('./columns');
      commit("fetchColumns", resp.data);
    },
    async fetchColumn({commit}, cid) {
      const resp = await axios.get(`/columns/${cid}`);
      commit("fetchColumn", resp.data);
    },
    async fetchPosts({commit}, cid) {
      const resp = await axios.get(`/columns/${cid}/posts`);
      commit("fetchPosts", resp.data);
    }
  }
});

export default store;
