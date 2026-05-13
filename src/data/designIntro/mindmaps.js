import { BOOK_ID } from "./chapters.js";

/** 可点击知识结构图 — 节点 link 指向章节 / 题库类型 / 模板 */

export const designIntroMindmaps = [
  {
    id: "di-mm-book",
    bookId: BOOK_ID,
    title: "全书总框架",
    subtitle: "七章主干 · 点击跳转",
    root: {
      id: "root",
      label: "设计学概论（第三版）",
      children: [
        {
          id: "n1",
          label: "学科基础",
          link: { type: "chapter", bookId: BOOK_ID, id: "ch1" },
          children: [{ id: "n1-1", label: "导论：研究范围及现状", link: { type: "chapter", bookId: BOOK_ID, id: "ch1" } }]
        },
        {
          id: "n2",
          label: "设计本体",
          link: { type: "chapter", bookId: BOOK_ID, id: "ch2" },
          children: [
            { id: "n2-1", label: "多重特征", link: { type: "chapter", bookId: BOOK_ID, id: "ch2" } },
            { id: "n2-2", label: "现代分类", link: { type: "chapter", bookId: BOOK_ID, id: "ch5" } }
          ]
        },
        {
          id: "n3",
          label: "设计史",
          children: [
            { id: "n3-1", label: "中国溯源", link: { type: "chapter", bookId: BOOK_ID, id: "ch3" } },
            { id: "n3-2", label: "西方概观", link: { type: "chapter", bookId: BOOK_ID, id: "ch4" } }
          ]
        },
        {
          id: "n4",
          label: "主体与批评",
          children: [
            { id: "n4-1", label: "设计师", link: { type: "chapter", bookId: BOOK_ID, id: "ch6" } },
            { id: "n4-2", label: "设计批评", link: { type: "chapter", bookId: BOOK_ID, id: "ch7" } }
          ]
        }
      ]
    }
  },
  {
    id: "di-mm-timeline",
    bookId: BOOK_ID,
    title: "中西设计史时间轴",
    subtitle: "纲要入口 · 可接时间线题模板",
    root: {
      id: "tl-root",
      label: "时间轴总览",
      link: { type: "questionType", id: "timeline" },
      children: [
        { id: "tl-1", label: "手工艺与早期现代性", link: { type: "chapter", bookId: BOOK_ID, id: "ch4" } },
        { id: "tl-2", label: "中国工艺高峰线索", link: { type: "chapter", bookId: BOOK_ID, id: "ch3" } },
        { id: "tl-3", label: "现代主义与国际主义", link: { type: "chapter", bookId: BOOK_ID, id: "ch4" } }
      ]
    }
  },
  {
    id: "di-mm-relations",
    bookId: BOOK_ID,
    title: "设计与艺术 / 科技 / 经济",
    subtitle: "关系类论述常用三角",
    root: {
      id: "rel-root",
      label: "关系图",
      children: [
        {
          id: "r1",
          label: "设计与艺术",
          link: { type: "template", id: "tpl-relation" },
          children: [{ id: "r1-1", label: "多重特征·艺术", link: { type: "chapter", bookId: BOOK_ID, id: "ch2" } }]
        },
        {
          id: "r2",
          label: "设计与科学技术",
          link: { type: "template", id: "tpl-relation" },
          children: [{ id: "r2-1", label: "科技性", link: { type: "chapter", bookId: BOOK_ID, id: "ch2" } }]
        },
        {
          id: "r3",
          label: "设计与经济",
          link: { type: "template", id: "tpl-relation" },
          children: [{ id: "r3-1", label: "经济性", link: { type: "chapter", bookId: BOOK_ID, id: "ch2" } }]
        }
      ]
    }
  },
  {
    id: "di-mm-criticism",
    bookId: BOOK_ID,
    title: "设计批评理论结构（纲要）",
    subtitle: "类型—对象—方法",
    root: {
      id: "cr-root",
      label: "设计批评",
      link: { type: "chapter", bookId: BOOK_ID, id: "ch7" },
      children: [
        { id: "cr-1", label: "历史的批评", link: { type: "chapter", bookId: BOOK_ID, id: "ch7" } },
        { id: "cr-2", label: "再创造性批评", link: { type: "chapter", bookId: BOOK_ID, id: "ch7" } },
        { id: "cr-3", label: "批判性设计批评", link: { type: "chapter", bookId: BOOK_ID, id: "ch7" } }
      ]
    }
  },
  {
    id: "di-mm-modern",
    bookId: BOOK_ID,
    title: "现代设计运动关系（纲要）",
    subtitle: "工艺运动—现代主义—后现代",
    root: {
      id: "mo-root",
      label: "西方现代设计",
      link: { type: "chapter", bookId: BOOK_ID, id: "ch4" },
      children: [
        { id: "mo-1", label: "工艺美术运动", link: { type: "questionType", id: "figure" } },
        { id: "mo-2", label: "现代主义", link: { type: "questionType", id: "essay" } },
        { id: "mo-3", label: "包豪斯", link: { type: "term", bookId: BOOK_ID, id: "t-ch4-bauhaus" } },
        { id: "mo-4", label: "后现代主义", link: { type: "questionType", id: "compare" } }
      ]
    }
  }
];

export function getDesignIntroMindmap(id) {
  return designIntroMindmaps.find((m) => m.id === id);
}

export function flattenMindmapNodes(map) {
  const out = [];
  function walk(node, depth = 0) {
    if (!node) return;
    out.push({ ...node, depth, mapId: map.id, mapTitle: map.title, bookId: map.bookId });
    (node.children || []).forEach((c) => walk(c, depth + 1));
  }
  walk(map.root, 0);
  return out;
}
