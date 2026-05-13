import { Link } from "react-router-dom";
import { designIntroKeywords } from "../data/designIntro/keywords.js";
import { PRIMARY_BOOK_ID } from "../data/catalog.js";

const hot = [
  "设计学",
  "设计史",
  "设计理论",
  "设计批评",
  "功能主义",
  "现代主义",
  "工艺美术运动",
  "包豪斯",
  "后现代主义"
];

export default function HotTopics() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">高频考点</h1>
      <p className="text-xs text-ink-muted">点击即带关键词进入搜索（可继续扩展）。</p>
      <div className="flex flex-wrap gap-2">
        {hot.map((w) => (
          <Link key={w} to={`/search?q=${encodeURIComponent(w)}`} className="rounded-full border border-rose-200/80 bg-rose-50/90 px-3 py-1.5 text-xs font-semibold text-rose-900">
            {w}
          </Link>
        ))}
      </div>
      <p className="text-sm font-semibold text-ink">本书关键词池（节选）</p>
      <div className="flex flex-wrap gap-2">
        {designIntroKeywords.filter((k) => k.bookId === PRIMARY_BOOK_ID).map((k) => (
          <Link
            key={k.id}
            to={k.chapterId ? `/books/${PRIMARY_BOOK_ID}/chapters/${k.chapterId}` : `/search?q=${encodeURIComponent(k.word)}`}
            className="rounded-full border border-cream-300/90 bg-white/90 px-3 py-1.5 text-xs text-ink"
          >
            {k.word}
          </Link>
        ))}
      </div>
    </div>
  );
}
