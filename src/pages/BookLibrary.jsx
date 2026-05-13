import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Card from "../components/Card.jsx";
import Tag from "../components/Tag.jsx";
import { booksWithCounts } from "../data/books.js";
import { getBookCounts, getRegistry } from "../data/catalog.js";

export default function BookLibrary() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const counts = getBookCounts();
  const baseList = useMemo(() => booksWithCounts(counts), [counts]);
  const filtered = useMemo(() => {
    return baseList.filter((b) => {
      if (cat !== "all" && b.category !== cat) return false;
      if (!q.trim()) return true;
      const s = `${b.title} ${b.authors?.join(" ")} ${b.tags?.join(" ")} ${b.description}`.toLowerCase();
      return s.includes(q.trim().toLowerCase());
    });
  }, [baseList, cat, q]);

  const categories = [
    { key: "all", label: "全部" },
    { key: "design-intro", label: "设计概论" },
    { key: "design-history", label: "设计史" },
    { key: "art-theory", label: "艺术理论" },
    { key: "craft", label: "工艺美术" },
    { key: "school", label: "院校专题" }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-ink">书库</h1>
        <p className="mt-1 text-xs text-ink-muted">多书扩展 · 当前以《设计学概论》第三版为主干样例</p>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索书名、作者、标签…"
          className="w-full rounded-2xl border border-cream-300/90 bg-white/90 py-2.5 pl-10 pr-3 text-sm outline-none ring-0 focus:border-brand-600/40 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setCat(c.key)}
            className={
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition " +
              (cat === c.key
                ? "border-brand-600/40 bg-brand-50 text-brand-900"
                : "border-cream-300/90 bg-white/70 text-ink-muted hover:text-ink")
            }
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((b) => {
          const reg = getRegistry(b.id);
          const ready = Boolean(reg) && b.status === "已整理";
          return (
            <Card key={b.id} className="relative overflow-hidden !p-0 shadow-card">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-600/25 via-amber-400/30 to-brand-600/10" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1">
                      {b.edition ? (
                        <Tag variant="neutral">
                          {b.title} · {b.edition}
                        </Tag>
                      ) : (
                        <Tag variant="neutral">{b.title}</Tag>
                      )}
                      <Tag variant={b.status === "已整理" ? "short" : "neutral"}>{b.status}</Tag>
                    </div>
                    <h2 className="mt-2 text-[16px] font-semibold leading-snug text-ink">
                      {b.title}
                      {b.edition ? <span className="text-ink-muted">（{b.edition}）</span> : null}
                    </h2>
                    {b.authors?.length ? (
                      <p className="mt-1 text-xs text-ink-muted">作者：{b.authors.join("、")}</p>
                    ) : null}
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{b.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {(b.tags || []).map((t) => (
                        <Tag key={t} variant="template">
                          {t}
                        </Tag>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-ink-muted">
                      <span>
                        章节 <b className="text-ink">{b.chapterCount || 0}</b>
                      </span>
                      <span>
                        名解 <b className="text-ink">{b.termCount}</b>
                      </span>
                      <span>
                        题目 <b className="text-ink">{b.questionCount}</b>
                      </span>
                      <span>
                        整理进度 <b className="text-ink">{b.progress}%</b>
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream-200/90">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-600 to-amber-500 transition-all"
                        style={{ width: `${Math.min(100, b.progress)}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {ready ? (
                    <Link
                      to={`/books/${b.id}`}
                      className="inline-flex flex-1 items-center justify-center rounded-2xl bg-brand-700 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm active:scale-[0.99]"
                    >
                      进入书籍
                    </Link>
                  ) : (
                    <span className="inline-flex flex-1 items-center justify-center rounded-2xl border border-cream-300/90 bg-cream-50/80 px-4 py-2.5 text-center text-sm font-medium text-ink-muted">
                      待整理
                    </span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
