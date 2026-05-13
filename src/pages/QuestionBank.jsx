import { Link, useSearchParams } from "react-router-dom";
import Card from "../components/Card.jsx";
import Tag from "../components/Tag.jsx";
import BookmarkStar from "../components/BookmarkStar.jsx";
import {
  bankQuestionTypes,
  getAllQuestions,
  getBankTypeLabel,
  PRIMARY_BOOK_ID,
  tagForBankType
} from "../data/catalog.js";
import { getChapter } from "../data/catalog.js";
import { getBookById } from "../data/books.js";
import { useUserData } from "../context/UserDataContext.jsx";

export default function QuestionBank() {
  const [params, setParams] = useSearchParams();
  const typeKey = params.get("type") || "all";
  const bookId = params.get("book") || PRIMARY_BOOK_ID;
  const book = getBookById(bookId);
  const { toggleQuestionFav, isQuestionFav } = useUserData();

  const pool = getAllQuestions().filter((q) => q.bookId === bookId);
  const filtered = typeKey === "all" ? pool : pool.filter((q) => q.typeKey === typeKey);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">题库</h1>
        <p className="mt-1 text-xs text-ink-muted">
          {book ? `当前：${book.title}` : ""} · 按题型复习 · 卡片进详情
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => setParams(bookId !== PRIMARY_BOOK_ID ? { book: bookId } : {})}
          className={
            "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium " +
            (typeKey === "all"
              ? "border-brand-600/40 bg-brand-50 text-brand-900"
              : "border-cream-300/90 bg-white/70 text-ink-muted")
          }
        >
          全部
        </button>
        {bankQuestionTypes.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() =>
              setParams({
                ...(bookId !== PRIMARY_BOOK_ID ? { book: bookId } : {}),
                type: t.key
              })
            }
            className={
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium " +
              (typeKey === t.key
                ? "border-brand-600/40 bg-brand-50 text-brand-900"
                : "border-cream-300/90 bg-white/70 text-ink-muted")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((q) => {
          const ch = getChapter(bookId, q.chapterId);
          return (
            <Card key={q.id} className="relative !p-0">
              <div className="flex">
                <Link to={`/bank/${q.id}`} className="min-w-0 flex-1 p-4 pr-2">
                  <div className="flex flex-wrap items-center gap-1">
                    <Tag variant={tagForBankType(q.typeKey)}>{getBankTypeLabel(q.typeKey)}</Tag>
                    {q.isHighFrequency ? <Tag variant="hot">高频</Tag> : null}
                    <Tag variant="neutral">{q.importance}★</Tag>
                  </div>
                  <h2 className="mt-2 text-[15px] font-semibold leading-snug">{q.title}</h2>
                  <p className="mt-1 text-[11px] text-ink-muted">
                    {book?.title} · 第{ch?.chapterNo || "?"}章
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(q.keywords || []).map((k) => (
                      <Tag key={k} variant="neutral">
                        {k}
                      </Tag>
                    ))}
                  </div>
                </Link>
                <div className="flex shrink-0 flex-col items-center justify-start border-l border-cream-200/80 bg-cream-50/50 p-2">
                  <BookmarkStar active={isQuestionFav(q.id)} onClick={() => toggleQuestionFav(q.id)} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
