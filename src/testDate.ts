import {ColumnProps} from "./store";

export const testData: ColumnProps[] = [
  {
    _id: "1",
    title: "test1的专栏",
    description: "这是的test1专栏，有一段非常有意思的简介，可以更新一下欧",
  },
];

export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}

export const testPosts: PostProps[] = [
  {
    id: 1,
    title: "这是我的第一篇文章",
    content:
      '"也许你有这样的困扰：所有英语老师都告诉你学英语需要多听多看，为什么看了几年美剧后，眼睛还是得死盯着字幕才能听懂对白呢?说实话，我看日剧也是这个感觉。 我大学二外选择的是日语，日语的基础语法学过一些，词汇也背过一些。我日剧也看了有十几年了吧，…"',
    image:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e913ea8912836262645f30e.png?x-oss-process=image/resize,m_fill,h_110,w_200",
    createdAt: "2020-06-11 10:34:22",
    columnId: 1,
  },
  {
    id: 2,
    title: "这是我的第一篇文章",
    content:
      '"也许你有这样的困扰：所有英语老师都告诉你学英语需要多听多看，为什么看了几年美剧后，眼睛还是得死盯着字幕才能听懂对白呢?说实话，我看日剧也是这个感觉。 我大学二外选择的是日语，日语的基础语法学过一些，词汇也背过一些。我日剧也看了有十几年了吧，…"',
    image:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e913ea8912836262645f30e.png?x-oss-process=image/resize,m_fill,h_110,w_200",
    createdAt: "2020-06-11 10:34:22",
    columnId: 2,
  },
  {
    id: 3,
    title: "这是我的第一篇文章",
    content:
      '"也许你有这样的困扰：所有英语老师都告诉你学英语需要多听多看，为什么看了几年美剧后，眼睛还是得死盯着字幕才能听懂对白呢?说实话，我看日剧也是这个感觉。 我大学二外选择的是日语，日语的基础语法学过一些，词汇也背过一些。我日剧也看了有十几年了吧，…"',
    image:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e913ea8912836262645f30e.png?x-oss-process=image/resize,m_fill,h_110,w_200",
    createdAt: "2020-06-11 10:34:22",
    columnId: 3,
  },
  {
    id: 4,
    title: "这是我的第一篇文章",
    content:
      '"也许你有这样的困扰：所有英语老师都告诉你学英语需要多听多看，为什么看了几年美剧后，眼睛还是得死盯着字幕才能听懂对白呢?说实话，我看日剧也是这个感觉。 我大学二外选择的是日语，日语的基础语法学过一些，词汇也背过一些。我日剧也看了有十几年了吧，…"',
    image:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e913ea8912836262645f30e.png?x-oss-process=image/resize,m_fill,h_110,w_200",
    createdAt: "2020-06-11 10:34:22",
    columnId: 4,
  },
];
