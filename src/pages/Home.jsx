import { Link } from "react-router-dom";
import { BookOpen, GitBranch, Library, ListChecks, ScrollText, Shuffle, Sparkles } from "lucide-react";
import Card from "../components/Card.jsx";
import Tag from "../components/Tag.jsx";
import SearchBar from "../components/SearchBar.jsx";
import HighlightText from "../components/HighlightText.jsx";
import { APP_NAME, APP_SUBTITLE } from "../constants/app.js";
import { getAllKeywords, getAllQuestions, getAllTemplates, PRIMARY_BOOK_ID } from "../data/catalog.js";
import { getBookById } from "../data/books.js";
import { pickDaily, pickOneDaily } from "../utils/daily.js";
import WarmQuoteCard from "../components/WarmQuoteCard.jsx";

const shortcuts = [
  { to: "/library", label: "书库", Icon: Library, desc: "多书切换" },
  { to: "/bank", label: "题库", Icon: ListChecks, desc: "按题型复习" },
  { to: "/templates", label: "答题模板", Icon: ScrollText, desc: "写成得分答案" },
  { to: "/outline", label: "大纲模式", Icon: GitBranch, desc: "层级知识结构" },
  { to: "/mindmap", label: "思维导图", Icon: Sparkles, desc: "可点击结构图" },
  { to: "/random", label: "随机抽题", Icon: Shuffle, desc: "碎片快刷" }
];

const hotTags = [
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

export default function Home() {
  const book = getBookById(PRIMARY_BOOK_ID);
  const dailyKw = pickDaily(getAllKeywords(), 5);
  const dailyTpl = pickOneDaily(getAllTemplates());
  const dailyQ = pickOneDaily(getAllQuestions().filter((q) => q.bookId === PRIMARY_BOOK_ID));

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-cream-200/80 bg-gradient-to-br from-white via-cream-50 to-brand-50/45 p-5 shadow-card">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-800/90">
          <BookOpen className="h-4 w-4" />
          设计考研理论知识库
        </div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink">{APP_NAME}</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{APP_SUBTITLE}</p>
        <p className="mt-3 text-sm font-medium text-ink/90">把厚厚的理论书，拆成每天能背的小卡片</p>
        <div className="mt-4">
          <WarmQuoteCard seed={0} italic={false} className="bg-white/80" />
        </div>
      </section>

      <SearchBar placeholder="搜索名词、人物、流派、题目、模板…" />

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">今日学习</h2>
          <Tag variant="hot">日更</Tag>
        </div>
        <div className="space-y-3">
          <Card>
            <p className="text-xs font-semibold text-brand-800">今日速背 · 5 个关键词</p>
            <ul className="mt-2 space-y-2">
              {dailyKw.map((k) => (
                <li key={k.id} className="flex items-start justify-between gap-2 text-sm">
                  <span>
                    <HighlightText text={`**${k.word}**`} />
                    {k.note ? <span className="text-ink-muted"> · {k.note}</span> : null}
                  </span>
                  {k.chapterId ? (
                    <Link
                      to={`/books/${k.bookId || PRIMARY_BOOK_ID}/chapters/${k.chapterId}`}
                      className="shrink-0 text-xs font-semibold text-brand-800"
                    >
                      章节
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </Card>
          {dailyTpl ? (
            <Card to={`/templates/${dailyTpl.id}`} hover>
              <p className="text-xs font-semibold text-amber-900/90">今日推荐 · 答题模板</p>
              <p className="mt-2 text-[15px] font-semibold leading-snug">{dailyTpl.name}</p>
              <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{dailyTpl.shortAnswer}</p>
            </Card>
          ) : null}
          {dailyQ ? (
            <Card to={`/bank/${dailyQ.id}`} hover>
              <p className="text-xs font-semibold text-brand-800">今日随机 · 一题</p>
              <p className="mt-2 text-sm font-semibold leading-snug">{dailyQ.title}</p>
              <p className="mt-1 text-[11px] text-ink-muted">点卡片查看答题结构与模板推荐</p>
            </Card>
          ) : null}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-ink">快捷入口</h2>
        <div className="grid grid-cols-2 gap-3">
          {shortcuts.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="flex flex-col gap-2 rounded-3xl border border-cream-200/80 bg-white/85 p-4 shadow-card transition hover:shadow-card-hover active:scale-[0.99]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <s.Icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <p className="text-sm font-semibold">{s.label}</p>
              <p className="text-[11px] text-ink-muted">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-ink">当前学习书籍</h2>
        {book ? (
          <Card to={`/books/${book.id}`} hover className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">
                {book.title}（{book.edition}）
              </p>
              <p className="mt-1 text-xs text-ink-muted line-clamp-2">{book.description}</p>
            </div>
            <span className="text-ink-muted">›</span>
          </Card>
        ) : null}
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-ink">高频考点</h2>
        <div className="flex flex-wrap gap-2">
          {hotTags.map((t) => (
            <Link
              key={t}
              to={`/search?q=${encodeURIComponent(t)}`}
              className="rounded-full border border-rose-200/80 bg-rose-50/90 px-3 py-1.5 text-xs font-semibold text-rose-900"
            >
              {t}
            </Link>
          ))}
        </div>
      </section>

      <p className="pb-2 text-center text-[11px] text-ink-muted">
        内容维护：<code className="rounded bg-cream-200/80 px-1">src/data/designIntro/</code>
      </p>
    </div>
  );
}
