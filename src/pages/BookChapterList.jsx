import { Link, useParams } from "react-router-dom";
import { getChaptersForBook } from "../data/catalog.js";

export default function BookChapterList() {
  const { bookId } = useParams();
  const chapters = getChaptersForBook(bookId);

  return (
    <div className="space-y-3">
      <Link to={`/books/${bookId}`} className="text-xs font-medium text-brand-700">
        ← 书籍主页
      </Link>
      <h1 className="text-lg font-bold">章节学习</h1>
      <div className="space-y-2">
        {chapters.map((c) => (
          <Link
            key={c.id}
            to={`/books/${bookId}/chapters/${c.id}`}
            className="block rounded-3xl border border-cream-200/80 bg-white/85 p-4 shadow-card transition hover:shadow-card-hover"
          >
            <p className="text-sm font-semibold">
              第{c.chapterNo}章 {c.title}
            </p>
            <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{c.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
