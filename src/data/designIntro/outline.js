import { BOOK_ID } from "./chapters.js";

/**
 * 幕布式大纲树 — 仅结构化导航，详细内容在章节/名解页
 * 节点 id 用于 localStorage 展开状态：outline:open:<nodeId>
 */
export const designIntroOutlineTree = {
  id: "ol-book",
  type: "book",
  bookId: BOOK_ID,
  label: "设计学概论（第三版）",
  children: [
    {
      id: "ol-ch1",
      type: "chapter",
      label: "第1章 导论：设计学的研究范围及现状",
      chapterId: "ch1",
      children: [
        { id: "ol-ch1-design", type: "topic", label: "设计的概念", href: `/books/${BOOK_ID}/chapters/ch1` },
        { id: "ol-ch1-studies", type: "topic", label: "设计学", href: `/books/${BOOK_ID}/terms/t-ch1-design-studies` },
        {
          id: "ol-ch1-dhist",
          type: "topic",
          label: "设计史",
          children: [
            { id: "ol-ch1-s", type: "leaf", label: "桑佩尔", href: `/books/${BOOK_ID}/chapters/ch1` },
            { id: "ol-ch1-r", type: "leaf", label: "李格尔", href: `/books/${BOOK_ID}/chapters/ch1` },
            { id: "ol-ch1-p", type: "leaf", label: "佩夫斯纳", href: `/books/${BOOK_ID}/chapters/ch1` },
            { id: "ol-ch1-g", type: "leaf", label: "吉迪恩", href: `/books/${BOOK_ID}/chapters/ch1` }
          ]
        },
        {
          id: "ol-ch1-dtheory",
          type: "topic",
          label: "设计理论",
          children: [
            { id: "ol-ch1-vas", type: "leaf", label: "瓦萨里", href: `/books/${BOOK_ID}/chapters/ch1` },
            { id: "ol-ch1-hog", type: "leaf", label: "荷加斯", href: `/books/${BOOK_ID}/chapters/ch1` },
            { id: "ol-ch1-rus", type: "leaf", label: "拉斯金", href: `/books/${BOOK_ID}/chapters/ch1` },
            { id: "ol-ch1-mor", type: "leaf", label: "莫里斯", href: `/books/${BOOK_ID}/chapters/ch4` }
          ]
        },
        {
          id: "ol-ch1-dcrit",
          type: "topic",
          label: "设计批评",
          children: [
            { id: "ol-ch1-hc", type: "leaf", label: "历史的批评", href: `/books/${BOOK_ID}/chapters/ch7` },
            { id: "ol-ch1-rc", type: "leaf", label: "再创造性批评", href: `/books/${BOOK_ID}/chapters/ch7` },
            { id: "ol-ch1-cc", type: "leaf", label: "批判性设计批评", href: `/books/${BOOK_ID}/chapters/ch7` }
          ]
        }
      ]
    },
    {
      id: "ol-ch2",
      type: "chapter",
      label: "第2章 设计的多重特征",
      chapterId: "ch2",
      children: [
        { id: "ol-ch2-a", type: "topic", label: "艺术特征", href: `/books/${BOOK_ID}/chapters/ch2` },
        { id: "ol-ch2-t", type: "topic", label: "科技特征", href: `/books/${BOOK_ID}/chapters/ch2` },
        { id: "ol-ch2-e", type: "topic", label: "经济特征", href: `/books/${BOOK_ID}/chapters/ch2` }
      ]
    },
    {
      id: "ol-ch3",
      type: "chapter",
      label: "第3章 中国设计溯源",
      chapterId: "ch3",
      children: [{ id: "ol-ch3-m", type: "topic", label: "明式家具（名解入口）", href: `/books/${BOOK_ID}/terms/t-ch3-ming-furniture` }]
    },
    {
      id: "ol-ch4",
      type: "chapter",
      label: "第4章 西方设计概观",
      chapterId: "ch4",
      children: [{ id: "ol-ch4-b", type: "topic", label: "包豪斯（名解入口）", href: `/books/${BOOK_ID}/terms/t-ch4-bauhaus` }]
    },
    {
      id: "ol-ch5",
      type: "chapter",
      label: "第5章 设计的现代分类",
      chapterId: "ch5",
      children: []
    },
    {
      id: "ol-ch6",
      type: "chapter",
      label: "第6章 设计师",
      chapterId: "ch6",
      children: []
    },
    {
      id: "ol-ch7",
      type: "chapter",
      label: "第7章 设计批评",
      chapterId: "ch7",
      children: []
    }
  ]
};
