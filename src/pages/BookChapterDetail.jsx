import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Card from "../components/Card.jsx";
import Tag from "../components/Tag.jsx";
import BookmarkStar from "../components/BookmarkStar.jsx";
import HighlightText from "../components/HighlightText.jsx";
import {
  getAdjacentChapter,
  getChapter,
  getQuestionsByChapter,
  getTemplateById,
  getTermsByChapter
} from "../data/catalog.js";
import { useUserData } from "../context/UserDataContext.jsx";

export default function BookChapterDetail() {
  const { bookId, chapterId } = useParams();
  const c = getChapter(bookId, chapterId);
  const { prev, next } = getAdjacentChapter(bookId, chapterId);
  const terms = getTermsByChapter(bookId, chapterId);
  const questions = getQuestionsByChapter(bookId, chapterId);
  const { pushRecent, markChapterOpened, toggleChapterFav, isChapterFav } = useUserData();

  useEffect(() => {
    if (!c) return;
    markChapterOpened(bookId, chapterId);
    pushRecent({
      type: "chapter",
      id: chapterId,
      bookId,
      title: `第${c.chapterNo}章 ${c.title}`,
      path: `/books/${bookId}/chapters/${chapterId}`
    });
  }, [bookId, chapterId, c, markChapterOpened, pushRecent]);

  if (!c) {
    return (
      <p className="text-sm text-ink-muted">
        未找到章节。
        <Link className="text-brand-700 underline" to={`/books/${bookId}`}>
          返回书籍
        </Link>
      </p>
    );
  }

  const byType = (k) => questions.filter((q) => q.typeKey === k);

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link to={`/books/${bookId}/chapters`} className="text-xs font-medium text-brand-700">
            ← 章节列表
          </Link>
          <h1 className="mt-1 text-lg font-bold leading-snug">
            第{c.chapterNo}章 {c.title}
          </h1>
        </div>
        <BookmarkStar active={isChapterFav(bookId, chapterId)} onClick={() => toggleChapterFav(bookId, chapterId)} />
      </div>

      <section>
        <h2 className="mb-2 text-sm font-semibold">本章导读</h2>
        <Card>
          <p className="text-sm leading-relaxed text-ink-muted">
            <HighlightText text={c.summary} />
          </p>
        </Card>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold">本章逻辑框架</h2>
        <Card>
          <ol className="list-decimal space-y-2 pl-4 text-sm leading-relaxed text-ink-muted">
            {(c.logicFramework || []).map((line, i) => (
              <li key={i}>
                <HighlightText text={line} />
              </li>
            ))}
          </ol>
        </Card>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold">核心关键词</h2>
        <Card>
          <ul className="space-y-2 text-sm leading-relaxed">
            {(c.keywords || []).map((line, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600/80" />
                <HighlightText text={line} />
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section>
        <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold">
          高频名词解释
          <Tag variant="hot">高频</Tag>
          <Tag variant="term">名解</Tag>
        </h2>
        <div className="space-y-2">
          {terms
            .filter((t) => t.isHighFrequency)
            .map((t) => (
              <Card key={t.id} to={`/books/${bookId}/terms/${t.id}`} hover className="!p-3">
                <p className="text-sm font-semibold">{t.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{t.shortAnswer}</p>
              </Card>
            ))}
          {!terms.filter((t) => t.isHighFrequency).length ? (
            <p className="text-xs text-ink-muted">可在 designIntro/terms.js 为本章补充 isHighFrequency 条目。</p>
          ) : null}
        </div>
      </section>

      <section>
        <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold">
          名词解释（全）
          <Tag variant="term">名解</Tag>
        </h2>
        <div className="space-y-2">
          {terms.map((t) => (
            <Card key={t.id} to={`/books/${bookId}/terms/${t.id}`} hover className="!p-3">
              <div className="flex flex-wrap items-center gap-1">
                {t.isHighFrequency ? <Tag variant="hot">高频</Tag> : null}
                <p className="text-sm font-semibold">{t.title}</p>
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{t.shortAnswer}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold">
          高频简答题
          <Tag variant="short">简答</Tag>
        </h2>
        <div className="space-y-2">
          {byType("short")
            .filter((q) => q.isHighFrequency)
            .map((q) => (
              <Card key={q.id} to={`/bank/${q.id}`} hover className="!p-3">
                <p className="text-sm font-semibold">{q.title}</p>
              </Card>
            ))}
          {!byType("short").filter((q) => q.isHighFrequency).length ? (
            <p className="text-xs text-ink-muted">可在 designIntro/questions.js 增加本章简答题。</p>
          ) : null}
        </div>
      </section>

      <section>
        <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold">
          高频论述题
          <Tag variant="essay">论述</Tag>
        </h2>
        <div className="space-y-2">
          {byType("essay")
            .filter((q) => q.isHighFrequency)
            .map((q) => (
              <Card key={q.id} to={`/bank/${q.id}`} hover className="!p-3">
                <p className="text-sm font-semibold">{q.title}</p>
              </Card>
            ))}
        </div>
      </section>

      {(c.figures || []).length ? (
        <section>
          <h2 className="mb-2 text-sm font-semibold">人物 / 流派 / 作品</h2>
          <div className="space-y-2">
            {(c.figures || []).map((f, i) => (
              <Card key={i} className="!p-3">
                <p className="text-sm font-semibold">{f.name}</p>
                <p className="mt-1 text-xs text-ink-muted">{f.note}</p>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {(c.confusions || []).length ? (
        <section>
          <h2 className="mb-2 text-sm font-semibold">易混概念</h2>
          <div className="space-y-2">
            {(c.confusions || []).map((x, i) => (
              <Card key={i} className="!p-3">
                <p className="text-sm font-semibold">{x.title}</p>
                <p className="mt-1 text-xs text-ink-muted">{x.note}</p>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="mb-2 text-sm font-semibold">背诵口诀</h2>
        <Card className="border-amber-200/70 bg-amber-50/35">
          <p className="text-sm font-medium leading-relaxed">
            <HighlightText text={c.mnemonic} />
          </p>
        </Card>
      </section>

      <section>
        <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold">
          相关答题模板
          <Tag variant="template">模板</Tag>
        </h2>
        <div className="space-y-2">
          {(c.relatedTemplateIds || []).map((tid) => {
            const tpl = getTemplateById(tid);
            if (!tpl) return null;
            return (
              <Card key={tid} to={`/templates/${tid}`} hover className="!p-3">
                <p className="text-sm font-semibold">{tpl.name}</p>
                <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{tpl.shortAnswer}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold">本章思维导图</h2>
        <Card to={`/mindmap?book=${bookId}`} hover className="!p-3">
          <p className="text-sm font-semibold">打开知识结构图</p>
          <p className="mt-1 text-xs text-ink-muted">在导图页可按本书筛选相关图。</p>
        </Card>
      </section>

      <div className="grid grid-cols-2 gap-3">
        {prev ? (
          <Link
            to={`/books/${bookId}/chapters/${prev.id}`}
            className="rounded-3xl border border-cream-300/90 bg-white/80 px-3 py-3 text-center text-sm font-medium shadow-card"
          >
            ← 上一章
            <div className="mt-0.5 text-xs font-normal text-ink-muted">{prev.title}</div>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/books/${bookId}/chapters/${next.id}`}
            className="rounded-3xl border border-cream-300/90 bg-white/80 px-3 py-3 text-center text-sm font-medium shadow-card"
          >
            下一章 →
            <div className="mt-0.5 text-xs font-normal text-ink-muted">{next.title}</div>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
