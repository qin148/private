/**
 * 从《设计学概论——背诵笔记》等资料整理出的参考片段（不展示在页面上）。
 * 请将 PDF/笔记中的原文或摘录按 termId 粘贴到对应字段的 fragments 数组中，
 * 便于你对照维护 termsCh1.js / terms.js 中的正式条目。
 *
 * 页面组件禁止 import 本文件用于展示。
 *
 * 用法：fragments: ['摘录段落一…', '段落二…']
 */

const empty = () => ({ fragments: [] });

export const pdfSourceNotes = {
  "t-ch1-design": empty(),
  "t-ch1-design-studies": empty(),
  "t-ch1-design-history": empty(),
  "t-ch1-design-theory": empty(),
  "t-ch1-design-criticism": empty(),
  "t-ch1-semper": empty(),
  "t-ch1-riegel": empty(),
  "t-ch1-pevsner": empty(),
  "t-ch1-giedion": empty(),
  "t-ch1-vasari": empty(),
  "t-ch1-hogarth": empty(),
  "t-ch1-analysis-beauty": empty(),
  "t-ch1-de-architectura": empty(),
  "t-ch1-ruskin": empty(),
  "t-ch1-morris": empty(),
  "t-ch1-arts-crafts": empty(),
  "t-ch1-le-corbusier": empty(),
  "t-ch1-gropius": empty(),
  "t-ch1-critic-formalist": empty(),
  "t-ch1-critic-functional": empty(),
  "t-ch1-critic-historicist": empty(),
  "t-ch1-critic-eclectic": empty(),
  "t-ch1-semiotics": empty(),
  "t-ch1-structuralism": empty(),
  "t-ch1-deconstruction": empty(),
  "t-ch1-chaos-theory": empty(),
  "t-ch1-green-design": empty(),
  "t-ch1-it-design": empty()
};

export function getPdfNotesForTerm(termId) {
  const n = pdfSourceNotes[termId];
  if (!n || typeof n !== "object") return [];
  return Array.isArray(n.fragments) ? n.fragments : [];
}
