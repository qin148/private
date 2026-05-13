import { Link, useParams } from "react-router-dom";
import Card from "../components/Card.jsx";
import { getAllKeywords } from "../data/catalog.js";

export default function BookKeywords() {
  const { bookId } = useParams();
  const kws = getAllKeywords().filter((k) => k.bookId === bookId);

  return (
    <div className="space-y-3">
      <Link to={`/books/${bookId}`} className="text-xs font-medium text-brand-700">
        ← 书籍主页
      </Link>
      <h1 className="text-lg font-bold">高频关键词</h1>
      <div className="flex flex-wrap gap-2">
        {kws.map((k) => (
          <Link key={k.id} to={k.chapterId ? `/books/${bookId}/chapters/${k.chapterId}` : `/books/${bookId}`}>
            <span className="inline-flex items-center rounded-full border border-cream-300/90 bg-white/90 px-3 py-1.5 text-xs font-medium text-ink shadow-sm">
              {k.word}
            </span>
          </Link>
        ))}
      </div>
      <Card>
        <p className="text-xs leading-relaxed text-ink-muted">
          关键词数据在 <code className="rounded bg-cream-200/80 px-1">src/data/designIntro/keywords.js</code> 维护，可按章节继续扩充。
        </p>
      </Card>
    </div>
  );
}
