import { createStore } from "vuex";
import { testData, testPosts, ColumnProps, PostProps } from "./testDate";

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false },
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: "tcgogo" };
    },
  },
});

export default store;