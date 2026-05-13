/**
 * 全站书籍目录 — 后续在此追加新书，并在 src/data/<bookSlug>/ 下建立数据模块后在 catalog 注册。
 */
export const bookCategories = [
  { key: "all", label: "全部" },
  { key: "design-intro", label: "设计概论" },
  { key: "design-history", label: "设计史" },
  { key: "art-theory", label: "艺术理论" },
  { key: "craft", label: "工艺美术" },
  { key: "school", label: "院校专题" }
];

export const books = [
  {
    id: "design-introduction-3",
    title: "设计学概论",
    edition: "第三版",
    authors: ["尹定邦", "邵宏"],
    category: "design-intro",
    description:
      "设计考研理论基础书目之一，适合搭建名词解释、简答与论述题的底层概念框架。本应用内内容为学习整理笔记，请结合教材原文复习。",
    status: "已整理",
    progress: 68,
    tags: ["设计概论", "高频基础书", "名词解释多", "论述题基础"],
    coverColor: "cream",
    chapterCount: 7,
    termCount: 0,
    questionCount: 0,
    dataModule: "designIntro"
  },
  {
    id: "world-modern-design-history",
    title: "世界现代设计史",
    edition: "",
    authors: ["王受之 等"],
    category: "design-history",
    description: "现代设计运动与人物线索梳理。",
    status: "待整理",
    progress: 0,
    tags: ["设计史", "人物流派"],
    coverColor: "cream",
    chapterCount: 0,
    termCount: 0,
    questionCount: 0,
    dataModule: null
  },
  {
    id: "china-craft-history",
    title: "中国工艺美术史",
    edition: "",
    authors: [],
    category: "craft",
    description: "中国工艺与造物传统。",
    status: "待整理",
    progress: 0,
    tags: ["工艺美术"],
    coverColor: "cream",
    chapterCount: 0,
    termCount: 0,
    questionCount: 0,
    dataModule: null
  },
  {
    id: "art-introduction",
    title: "艺术概论",
    edition: "",
    authors: [],
    category: "art-theory",
    description: "艺术理论与美学基础。",
    status: "待整理",
    progress: 0,
    tags: ["艺术理论"],
    coverColor: "cream",
    chapterCount: 0,
    termCount: 0,
    questionCount: 0,
    dataModule: null
  },
  {
    id: "design-history-generic",
    title: "设计史",
    edition: "",
    authors: [],
    category: "design-history",
    description: "通史类教材与专题。",
    status: "待整理",
    progress: 0,
    tags: ["设计史"],
    coverColor: "cream",
    chapterCount: 0,
    termCount: 0,
    questionCount: 0,
    dataModule: null
  },
  {
    id: "foreign-modern-design",
    title: "外国现代设计史",
    edition: "",
    authors: [],
    category: "design-history",
    description: "外国现代设计脉络。",
    status: "待整理",
    progress: 0,
    tags: ["设计史"],
    coverColor: "cream",
    chapterCount: 0,
    termCount: 0,
    questionCount: 0,
    dataModule: null
  }
];

export function getBookById(id) {
  return books.find((b) => b.id === id);
}

export function booksWithCounts(counts) {
  return books.map((b) => ({
    ...b,
    chapterCount: counts?.[b.id]?.chapters ?? b.chapterCount,
    termCount: counts?.[b.id]?.terms ?? b.termCount,
    questionCount: counts?.[b.id]?.questions ?? b.questionCount
  }));
}
