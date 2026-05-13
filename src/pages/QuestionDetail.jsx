import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import Tag from "../components/Tag.jsx";
import BookmarkStar from "../components/BookmarkStar.jsx";
import HighlightText from "../components/HighlightText.jsx";
import { getBankTypeLabel, getQuestionById, getTemplateById, getTerm, tagForBankType } from "../data/catalog.js";
import { useUserData } from "../context/UserDataContext.jsx";

export default function QuestionDetail() {
  const { questionId } = useParams();
  const q = getQuestionById(questionId);
  const [open, setOpen] = useState(false);
  const { pushRecent, markQuestionViewed, toggleQuestionFav, isQuestionFav } = useUserData();

  useEffect(() => {
    if (!q) return;
    markQuestionViewed(q.bookId, q.id);
    pushRecent({
      type: "question",
      id: q.id,
      bookId: q.bookId,
      title: q.title,
      path: `/bank/${q.id}`
    });
  }, [q, markQuestionViewed, pushRecent]);

  if (!q) {
    return (
      <p className="text-sm text-ink-muted">
        未找到题目。
        <Link className="text-brand-700 underline" to="/bank">
          返回题库
        </Link>
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link to="/bank" className="text-xs font-medium text-brand-700">
            ← 题库
          </Link>
          <div className="mt-2 flex flex-wrap gap-1">
            <Tag variant={tagForBankType(q.typeKey)}>{getBankTypeLabel(q.typeKey)}</Tag>
            {q.isHighFrequency ? <Tag variant="hot">高频</Tag> : null}
          </div>
          <h1 className="mt-2 text-lg font-bold leading-snug">{q.title}</h1>
        </div>
        <BookmarkStar active={isQuestionFav(q.id)} onClick={() => toggleQuestionFav(q.id)} />
      </div>

      <section>
        <h2 className="mb-2 text-sm font-semibold">答题关键词</h2>
        <Card>
          <div className="flex flex-wrap gap-1">
            {(q.keywords || []).map((k) => (
              <Tag key={k} variant="neutral">
                {k}
              </Tag>
            ))}
          </div>
        </Card>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold">答题思路</h2>
        <Card>
          <p className="text-sm leading-relaxed text-ink-muted">
            <HighlightText text={q.answerIdea} />
          </p>
        </Card>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold">答题结构</h2>
        <Card>
          <p className="text-sm leading-relaxed text-ink-muted">
            <HighlightText text={q.structure} />
          </p>
        </Card>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold">精简背诵版</h2>
        <Card>
          <p className="text-sm leading-relaxed">
            <HighlightText text={q.compact} />
          </p>
        </Card>
      </section>

      <section>
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold">展开论述版</h2>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-cream-300/90 bg-white/90 px-3 py-1 text-xs font-medium text-ink"
          >
            {open ? "收起" : "展开阅读"}
          </button>
        </div>
        {open ? (
          <Card>
            <p className="text-sm leading-relaxed text-ink-muted">
              <HighlightText text={q.expanded} />
            </p>
          </Card>
        ) : (
          <p className="text-xs text-ink-muted">先背精简版，考前再打开展开版补案例与史观。</p>
        )}
      </section>

      {(q.migratablePhrases || []).length ? (
        <section>
          <h2 className="mb-2 text-sm font-semibold">可迁移句式</h2>
          <Card>
            <ul className="space-y-2 text-sm text-ink-muted">
              {(q.migratablePhrases || []).map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-brand-700">–</span>
                  <HighlightText text={p} />
                </li>
              ))}
            </ul>
          </Card>
        </section>
      ) : null}

      {(q.relatedTermIds || []).length ? (
        <section>
          <h2 className="mb-2 text-sm font-semibold">相关知识点</h2>
          <div className="space-y-2">
            {(q.relatedTermIds || []).map((tid) => {
              const term = getTerm(q.bookId, tid);
              return (
              <Card key={tid} to={`/books/${q.bookId}/terms/${tid}`} hover className="!p-3">
                <p className="text-sm font-semibold">名解：{term?.title || tid}</p>
              </Card>
              );
            })}
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="mb-2 text-sm font-semibold">推荐答题模板</h2>
        <div className="space-y-2">
          {(q.relatedTemplateIds || []).map((tid) => {
            const tpl = getTemplateById(tid);
            if (!tpl) return null;
            return (
              <Card key={tid} to={`/templates/${tid}`} hover className="!p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{tpl.name}</p>
                  <Tag variant="template">模板</Tag>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{tpl.shortAnswer}</p>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
