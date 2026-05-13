import { BOOK_ID } from "./chapters.js";

/** 时间线节点 — 可与「时间线题」联动扩展 */
export const designIntroTimelines = [
  {
    id: "tl-west-modern",
    bookId: BOOK_ID,
    title: "西方现代设计（纲要轴）",
    periods: [
      { label: "手工艺与改革", hint: "工艺美术运动等", chapterId: "ch4" },
      { label: "工业化与现代性", hint: "批量化、机器美学", chapterId: "ch4" },
      { label: "现代主义与国际传播", hint: "功能理性、教育制度化", chapterId: "ch4" },
      { label: "多元与反思", hint: "后现代议题、数字时代", chapterId: "ch4" }
    ]
  },
  {
    id: "tl-china-craft",
    bookId: BOOK_ID,
    title: "中国工艺传统（纲要轴）",
    periods: [
      { label: "早期器物与礼制", hint: "彩陶、青铜", chapterId: "ch3" },
      { label: "文人审美与生活方式", hint: "明式家具等", chapterId: "ch3" },
      { label: "与当代转译", hint: "可持续、材料伦理", chapterId: "ch3" }
    ]
  }
];

export function getDesignIntroTimeline(id) {
  return designIntroTimelines.find((t) => t.id === id);
}
