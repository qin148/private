import { Link, useParams } from "react-router-dom";
import { BookMarked, GitBranch, Hash, ListChecks, Map, ScrollText, Shuffle } from "lucide-react";
import Card from "../components/Card.jsx";
import Tag from "../components/Tag.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { getBookById } from "../data/books.js";
import {
  getChaptersForBook,
  getRegistry,
  getTimelinesForBook,
  PRIMARY_BOOK_ID
} from "../data/catalog.js";

const entries = (bookId) => [
  { to: `/books/${bookId}/chapters`, label: "按章节学习", desc: "导读 + 框架 + 名解 + 题型", icon: BookMarked },
  { to: `/bank?book=${bookId}`, label: "按题型学习", desc: "名解 / 简答 / 论述…", icon: ListChecks },
  { to: `/mindmap?book=${bookId}`, label: "思维导图", desc: "可点击知识结构", icon: Map },
  { to: `/books/${bookId}/keywords`, label: "高频关键词", desc: "速背与检索入口", icon: Hash },
  { to: `/books/${bookId}/timelines`, label: "时间线", desc: "中西纲要轴", icon: GitBranch },
  { to: `/templates?book=${bookId}`, label: "考试答题模板", desc: "把知识点写成答案", icon: ScrollText },
  { to: `/random?book=${bookId}`, label: "随机抽题", desc: "碎片刷题", icon: Shuffle }
];

export default function BookDetail() {
  const { bookId } = useParams();
  const book = getBookById(bookId);
  const reg = getRegistry(bookId);
  const chapters = getChaptersForBook(bookId);
  const timelines = getTimelinesForBook(bookId);

  if (!book) {
    return <EmptyState title="未找到该书" description="请从书库重新选择。" action={<Link to="/library" className="text-sm font-semibold text-brand-700">返回书库</Link>} />;
  }

  if (!reg) {
    return (
      <EmptyState
        title={`《${book.title}》待整理`}
        description="数据结构预留中。请先在 src/data 下建立对应书目模块并在 catalog 注册。"
        action={<Link to="/library" className="text-sm font-semibold text-brand-700">返回书库</Link>}
      />
    );
  }

  return (
    <div className="space-y-5">
      <Link to="/library" className="text-xs font-medium text-brand-700">
        ← 书库
      </Link>
      <div className="overflow-hidden rounded-3xl border border-cream-200/80 bg-gradient-to-br from-white via-cream-50 to-brand-50/50 p-5 shadow-card">
        <div className="flex flex-wrap gap-1">
          <Tag variant="neutral">{book.title}</Tag>
          {book.edition ? <Tag variant="neutral">{book.edition}</Tag> : null}
          <Tag variant="short">{book.status}</Tag>
        </div>
        <h1 className="mt-2 text-xl font-bold leading-snug text-ink">{book.title}</h1>
        {book.authors?.length ? <p className="mt-1 text-sm text-ink-muted">作者：{book.authors.join("、")}</p> : null}
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{book.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {(book.tags || []).map((t) => (
            <Tag key={t} variant="template">
              {t}
            </Tag>
          ))}
        </div>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-[11px] text-ink-muted">
            <span>整理进度</span>
            <span>{book.progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-cream-200/90">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-700 to-amber-500"
              style={{ width: `${book.progress}%` }}
            />
          </div>
        </div>
      </div>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-ink">核心入口</h2>
        <div className="grid gap-3">
          {entries(bookId).map((e) => (
            <Link
              key={e.to}
              to={e.to}
              className="flex items-center gap-3 rounded-3xl border border-cream-200/80 bg-white/85 p-4 shadow-card transition hover:shadow-card-hover active:scale-[0.99]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <e.icon className="h-6 w-6" strokeWidth={1.6} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold text-ink">{e.label}</p>
                <p className="text-xs text-ink-muted">{e.desc}</p>
              </div>
              <span className="text-ink-muted">›</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-ink">章节列表</h2>
        <div className="space-y-2">
          {chapters.map((c) => (
            <Card key={c.id} to={`/books/${bookId}/chapters/${c.id}`} hover className="!p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold leading-snug">
                  第{c.chapterNo}章 {c.shortTitle || c.title}
                </p>
                <Tag variant="hot">{c.importance}★</Tag>
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{c.summary}</p>
            </Card>
          ))}
        </div>
      </section>

      {bookId === PRIMARY_BOOK_ID && timelines.length ? (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-ink">时间线纲要</h2>
          <div className="space-y-2">
            {timelines.map((tl) => (
              <Card key={tl.id} to={`/books/${bookId}/timelines#${tl.id}`} hover className="!p-3">
                <p className="text-sm font-semibold">{tl.title}</p>
                <p className="mt-1 text-xs text-ink-muted">{tl.periods?.length || 0} 个阶段节点</p>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
