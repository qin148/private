/**
 * 数据聚合层：页面优先依赖本文件与 books.js；各书内容放在 src/data/designIntro/ 等目录维护。
 */
import { books, getBookById } from "./books.js";
import { designIntroChapters, getAdjacentDesignIntroChapter, getDesignIntroChapter } from "./designIntro/chapters.js";
import { designIntroTerms, getDesignIntroTerm } from "./designIntro/terms.js";
import {
  bankQuestionTypes,
  designIntroQuestions,
  getBankTypeLabel,
  getDesignIntroQuestion,
  tagForBankType
} from "./designIntro/questions.js";
import { designIntroTemplates, examTemplateCategories, getDesignIntroTemplate } from "./designIntro/templates.js";
import { designIntroMindmaps, flattenMindmapNodes, getDesignIntroMindmap } from "./designIntro/mindmaps.js";
import { designIntroTimelines, getDesignIntroTimeline } from "./designIntro/timelines.js";
import { designIntroKeywords } from "./designIntro/keywords.js";
import { designIntroOutlineTree } from "./designIntro/outline.js";

const staticRegistry = {
  "design-introduction-3": {
    chapters: designIntroChapters,
    terms: designIntroTerms,
    questions: designIntroQuestions,
    templates: designIntroTemplates,
    mindmaps: designIntroMindmaps,
    timelines: designIntroTimelines,
    keywords: designIntroKeywords,
    outlineTree: designIntroOutlineTree
  }
};

export function getRegistry(bookId) {
  return staticRegistry[bookId] || null;
}

export function getChaptersForBook(bookId) {
  return getRegistry(bookId)?.chapters || [];
}

export function getChapter(bookId, chapterId) {
  if (bookId === "design-introduction-3") return getDesignIntroChapter(chapterId) || null;
  return getChaptersForBook(bookId).find((c) => c.id === chapterId) || null;
}

export function getAdjacentChapter(bookId, chapterId) {
  if (bookId === "design-introduction-3") return getAdjacentDesignIntroChapter(chapterId);
  const list = getChaptersForBook(bookId);
  const idx = list.findIndex((c) => c.id === chapterId);
  if (idx < 0) return { prev: null, next: null };
  return { prev: idx > 0 ? list[idx - 1] : null, next: idx < list.length - 1 ? list[idx + 1] : null };
}

export function getTerm(bookId, termId) {
  if (bookId === "design-introduction-3") return getDesignIntroTerm(termId);
  return getRegistry(bookId)?.terms?.find((t) => t.id === termId) || null;
}

export function getTermsByChapter(bookId, chapterId) {
  const terms = getRegistry(bookId)?.terms || [];
  return terms.filter((t) => t.chapterId === chapterId);
}

export function getQuestionsForBook(bookId) {
  return getRegistry(bookId)?.questions || [];
}

export function getAllQuestions() {
  return Object.values(staticRegistry).flatMap((r) => r.questions || []);
}

export function getQuestionById(id) {
  return getAllQuestions().find((q) => q.id === id) || getDesignIntroQuestion(id) || null;
}

export function getQuestionsByChapter(bookId, chapterId) {
  return getQuestionsForBook(bookId).filter((q) => q.chapterId === chapterId);
}

export function getTemplatesForBook(bookId) {
  return getRegistry(bookId)?.templates || [];
}

export function getAllTemplates() {
  return Object.values(staticRegistry).flatMap((r) => r.templates || []);
}

export function getTemplateById(id) {
  return getAllTemplates().find((t) => t.id === id) || getDesignIntroTemplate(id) || null;
}

export function getMindmapsForBook(bookId) {
  return getRegistry(bookId)?.mindmaps || [];
}

export function getAllMindmaps() {
  return Object.values(staticRegistry).flatMap((r) => r.mindmaps || []);
}

export function getMindmapById(id) {
  return getAllMindmaps().find((m) => m.id === id) || getDesignIntroMindmap(id) || null;
}

export function getTimelinesForBook(bookId) {
  return getRegistry(bookId)?.timelines || [];
}

export function getAllKeywords() {
  return Object.values(staticRegistry).flatMap((r) => r.keywords || []);
}

export function getOutlineTree(bookId) {
  return getRegistry(bookId)?.outlineTree || null;
}

export function getBookCounts() {
  const counts = {};
  for (const b of books) {
    const r = getRegistry(b.id);
    counts[b.id] = {
      terms: r?.terms?.length ?? 0,
      questions: r?.questions?.length ?? 0,
      chapters: r?.chapters?.length ?? 0
    };
  }
  return counts;
}

export {
  books,
  getBookById,
  bankQuestionTypes,
  examTemplateCategories,
  designIntroOutlineTree,
  flattenMindmapNodes,
  getDesignIntroTimeline,
  getBankTypeLabel,
  tagForBankType
};
export { PRIMARY_BOOK_ID } from "../constants/app.js";
