import { books } from "../data/books.js";
import {
  getAllMindmaps,
  getAllQuestions,
  getAllTemplates,
  getChaptersForBook,
  getTermsByChapter,
  flattenMindmapNodes
} from "../data/catalog.js";
import { normalize } from "./daily.js";

function includes(hay, q) {
  if (!q) return true;
  return normalize(hay).includes(normalize(q));
}

export function runSearch(rawQuery) {
  const q = normalize(rawQuery);
  if (!q) {
    return { books: [], chapters: [], knowledge: [], questions: [], templates: [], mindmaps: [] };
  }

  const bookHits = books.filter((b) => includes(`${b.title} ${b.authors?.join(" ")} ${b.tags?.join(" ")}`, q));

  const chapterHits = [];
  for (const b of books) {
    const chs = getChaptersForBook(b.id);
    for (const c of chs) {
      if (
        includes(
          `${c.title} ${c.summary || ""} ${(c.keywords || []).join(" ")} ${(c.hotspots || []).join(" ")}`,
          q
        )
      ) {
        chapterHits.push({ bookId: b.id, chapter: c });
      }
    }
  }

  const knowledge = [];
  for (const b of books) {
    const chs = getChaptersForBook(b.id);
    for (const ch of chs) {
      for (const t of getTermsByChapter(b.id, ch.id)) {
        if (includes(`${t.title} ${t.shortAnswer} ${t.expandedAnswer} ${(t.keywords || []).join(" ")}`, q)) {
          knowledge.push({ bookId: b.id, term: t });
        }
      }
    }
  }

  const questionHits = getAllQuestions().filter((x) =>
    includes(`${x.title} ${x.compact} ${x.expanded} ${(x.keywords || []).join(" ")}`, q)
  );

  const templateHits = getAllTemplates().filter((t) =>
    includes(`${t.name} ${t.applicableQuestions} ${t.shortAnswer} ${t.longAnswer} ${(t.patterns || []).join(" ")}`, q)
  );

  const mindHits = [];
  for (const m of getAllMindmaps()) {
    const nodes = flattenMindmapNodes(m);
    if (nodes.some((n) => includes(n.label, q)) || includes(m.title + m.subtitle, q)) mindHits.push(m);
  }

  return {
    books: bookHits,
    chapters: chapterHits,
    knowledge,
    questions: questionHits,
    templates: templateHits,
    mindmaps: mindHits
  };
}
