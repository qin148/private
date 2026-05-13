import { Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import { useUserData } from "../context/UserDataContext.jsx";
import {
  bankQuestionTypes,
  getAllQuestions,
  getChaptersForBook,
  getTermsByChapter,
  PRIMARY_BOOK_ID
} from "../data/catalog.js";
import { getBookById } from "../data/books.js";

export default function LearningProgress() {
  const u = useUserData();
  const bookId = PRIMARY_BOOK_ID;
  const book = getBookById(bookId);
  const pb = u.progress?.books?.[bookId] || {};
  const vt = new Set(pb.viewedTerms || []);
  const vq = new Set(pb.viewedQuestions || []);
  const oc = new Set(pb.openedChapters || []);

  const chapters = getChaptersForBook(bookId);
  const totalTerms = chapters.reduce((n, ch) => n + getTermsByChapter(bookId, ch.id).length, 0);
  const qs = getAllQuestions().filter((q) => q.bookId === bookId);

  const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">学习进度</h1>
      <Card>
        <p className="text-sm font-semibold">{book?.title}</p>
        <p className="mt-3 text-xs text-ink-muted">章节打开数</p>
        <div className="mt-1 flex items-center justify-between text-sm">
          <span>
            {oc.size} / {chapters.length}
          </span>
          <span className="font-semibold text-brand-800">{pct(oc.size, chapters.length)}%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-cream-200">
          <div className="h-2 rounded-full bg-brand-600" style={{ width: `${pct(oc.size, chapters.length)}%` }} />
        </div>

        <p className="mt-4 text-xs text-ink-muted">名词解释（已看 / 总数）</p>
        <div className="mt-1 flex items-center justify-between text-sm">
          <span>
            {vt.size} / {totalTerms}
          </span>
          <span className="font-semibold text-brand-800">{pct(vt.size, totalTerms)}%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-cream-200">
          <div className="h-2 rounded-full bg-amber-500" style={{ width: `${pct(vt.size, totalTerms)}%` }} />
        </div>

        {bankQuestionTypes.map((bt) => {
          const total = qs.filter((q) => q.typeKey === bt.key).length;
          const seen = qs.filter((q) => q.typeKey === bt.key && vq.has(q.id)).length;
          return (
            <div key={bt.key} className="mt-4">
              <p className="text-xs text-ink-muted">
                {bt.label}（已看 / 总数）
              </p>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span>
                  {seen} / {total}
                </span>
                <span className="font-semibold text-brand-800">{pct(seen, total)}%</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-cream-200">
                <div className="h-1.5 rounded-full bg-brand-500/80" style={{ width: `${pct(seen, total)}%` }} />
              </div>
            </div>
          );
        })}
      </Card>
      <Link to="/library" className="text-sm font-semibold text-brand-700">
        去书库切换其他书目（待整理）
      </Link>
    </div>
  );
}
