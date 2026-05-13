import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card.jsx";
import Tag from "../components/Tag.jsx";
import BookmarkStar from "../components/BookmarkStar.jsx";
import HighlightText from "../components/HighlightText.jsx";
import MemberLockCard from "../components/MemberLockCard.jsx";
import WarmQuoteCard from "../components/WarmQuoteCard.jsx";
import { getBookById } from "../data/books.js";
import { getChapter, getTemplateById, getTerm } from "../data/catalog.js";
import { useUserData } from "../context/UserDataContext.jsx";
import { useUser } from "../hooks/useUser.js";
import { canViewFull, needsMemberLock, previewText } from "../utils/permission.js";

const typeTagVariant = {
  名词解释: "term",
  简答题: "short",
  论述题: "essay",
  人物流派: "figure",
  设计运动: "timeline",
  设计批评: "essay"
};

function quoteSeedFromId(id) {
  let s = 0;
  for (let i = 0; i < id.length; i++) s += id.charCodeAt(i);
  return s % 997;
}

export default function TermDetail() {
  const { bookId, termId } = useParams();
  const t = getTerm(bookId, termId);
  const { role } = useUser();
  const { pushRecent, markTermViewed, toggleTermFav, isTermFav } = useUserData();
  const [expandedOpen, setExpandedOpen] = useState(false);

  const book = bookId ? getBookById(bookId) : null;
  const chapter = bookId && t?.chapterId ? getChapter(bookId, t.chapterId) : null;

  const locked = t ? needsMemberLock(role, t.accessLevel) : false;
  const full = t ? canViewFull(role, t.accessLevel) : false;

  const shortBody = useMemo(() => {
    if (!t?.shortAnswer) return "";
    if (full) return t.shortAnswer;
    return previewText(t.shortAnswer, 0.28);
  }, [t, full]);

  const expandedPlainLen = useMemo(
    () => (t?.expandedAnswer || "").replace(/\*\*/g, "").length,
    [t]
  );
  const showExpandToggle = full && expandedPlainLen > 200;

  const expandedDisplay = useMemo(() => {
    if (!t?.expandedAnswer) return "";
    if (!full) return previewText(t.expandedAnswer, 0.24);
    if (showExpandToggle && !expandedOpen) return previewText(t.expandedAnswer, 0.32);
    return t.expandedAnswer;
  }, [t, full, showExpandToggle, expandedOpen]);

  const hotKw = useMemo(() => {
    if (!t?.keywords?.length) return new Set();
    if (!t.isHighFrequency) return new Set();
    return new Set(t.keywords.slice(0, 3));
  }, [t]);

  const tplIds = t?.relatedTemplateIds || t?.relatedTemplates || [];

  useEffect(() => {
    if (!t) return;
    markTermViewed(bookId, termId);
    pushRecent({
      type: "term",
      id: termId,
      bookId,
      title: t.title,
      path: `/books/${bookId}/terms/${termId}`
    });
  }, [bookId, termId, t, markTermViewed, pushRecent]);

  useEffect(() => {
    setExpandedOpen(false);
  }, [termId]);

  if (!t) {
    return (
      <p className="text-sm text-ink-muted">
        未找到该名词解释。
        <Link className="text-brand-700 underline" to={`/books/${bookId}`}>
          返回书籍
        </Link>
      </p>
    );
  }

  const typeVariant = typeTagVariant[t.type] || "neutral";

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link to={`/books/${bookId}/chapters/${t.chapterId}`} className="text-xs font-medium text-brand-700">
            ← 返回章节
          </Link>
          {book ? <p className="mt-1 text-[11px] text-ink-muted">{book.title}</p> : null}
          {chapter ? (
            <p className="mt-0.5 text-[11px] text-ink-muted">
              {chapter.title}
              {chapter.chapterNo != null ? ` · 第 ${chapter.chapterNo} 章` : ""}
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Tag variant={typeVariant}>{t.type}</Tag>
            {t.isHighFrequency ? <Tag variant="hot">高频</Tag> : null}
          </div>
          <h1 className="mt-2 text-xl font-bold leading-snug">{t.title}</h1>
        </div>
        <BookmarkStar active={isTermFav(bookId, termId)} onClick={() => toggleTermFav(bookId, termId)} />
      </div>

      {t.keywords?.length ? (
        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">关键词</h2>
          <div className="flex flex-wrap gap-2">
            {t.keywords.map((kw) => (
              <span
                key={kw}
                className={
                  "rounded-full border px-3 py-1 text-xs font-medium " +
                  (hotKw.has(kw)
                    ? "border-rose-200/90 bg-rose-50/95 text-rose-900"
                    : "border-cream-300/90 bg-white/90 text-ink-muted")
                }
              >
                {kw}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <section className="rounded-3xl border border-sky-200/70 bg-gradient-to-br from-sky-50/80 via-white to-white p-4 shadow-card">
        <h2 className="text-sm font-semibold text-sky-950">精简背诵版</h2>
        <p className="mt-1 text-[11px] text-sky-900/70">适合碎片时间快速背诵</p>
        <div className="mt-3 text-sm leading-relaxed text-ink">
          <HighlightText text={shortBody} />
        </div>
      </section>

      <section className="rounded-3xl border border-violet-200/70 bg-gradient-to-br from-violet-50/50 via-white to-amber-50/30 p-4 shadow-card">
        <h2 className="text-sm font-semibold text-violet-950">展开论述版</h2>
        <p className="mt-1 text-[11px] text-violet-900/70">适合简答题、论述题展开写作</p>
        <div className="mt-3 text-sm leading-relaxed text-ink">
          <HighlightText text={expandedDisplay} />
        </div>
        {showExpandToggle ? (
          <button
            type="button"
            onClick={() => setExpandedOpen((o) => !o)}
            className="mt-3 text-xs font-semibold text-brand-800 underline-offset-2 hover:underline"
          >
            {expandedOpen ? "收起部分" : "展开全文"}
          </button>
        ) : null}
      </section>

      {locked ? (
        <MemberLockCard variant={t.accessLevel === "coaching" ? "coaching" : "premium"} />
      ) : null}

      {!locked ? (
        <>
          <section>
            <h2 className="mb-2 text-sm font-semibold text-ink">答题结构</h2>
            <div className="grid gap-2">
              {(t.answerStructure || []).map((s, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-2xl border border-cream-200/90 bg-white/90 px-3 py-2.5 shadow-sm"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xs font-bold text-brand-800">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-ink-muted">{s}</p>
                </div>
              ))}
            </div>
          </section>

          {t.memoryTip ? (
            <Card className="border-amber-200/70 bg-amber-50/35">
              <p className="text-xs font-semibold text-ink-muted">记忆提示</p>
              <p className="mt-1 text-sm leading-relaxed">
                <HighlightText text={t.memoryTip} />
              </p>
            </Card>
          ) : null}

          {t.relatedQuestions?.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-ink">相关题目</h2>
              <ul className="space-y-2">
                {t.relatedQuestions.map((q, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-cream-200/90 bg-white/85 px-3 py-2 text-sm text-ink-muted"
                  >
                    {q}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {tplIds.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-ink">推荐模板</h2>
              <div className="space-y-2">
                {tplIds.map((tid) => {
                  const tpl = getTemplateById(tid);
                  if (!tpl) return null;
                  return (
                    <Card key={tid} to={`/templates/${tid}`} hover className="!p-3">
                      <p className="text-sm font-semibold">{tpl.name}</p>
                    </Card>
                  );
                })}
              </div>
            </section>
          ) : null}
        </>
      ) : null}

      <WarmQuoteCard seed={quoteSeedFromId(termId)} />
    </div>
  );
}
