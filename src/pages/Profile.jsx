import { Link } from "react-router-dom";
import { Bookmark, Flame, History, LineChart, Library, Settings2, Target, Crown, HeartHandshake } from "lucide-react";
import { useUserData } from "../context/UserDataContext.jsx";
import { useUser } from "../hooks/useUser.js";
import { getAllQuestions, getChaptersForBook, getTermsByChapter, PRIMARY_BOOK_ID } from "../data/catalog.js";
import WarmQuoteCard from "../components/WarmQuoteCard.jsx";

const roleCopy = {
  free: {
    line: "你正在使用免费版，可以先体验框架、部分笔记和随机抽题。",
    hint: "免费内容已经足够你了解这本书的整体结构。如果觉得这种整理方式适合自己，再考虑解锁完整资料。"
  },
  premium: {
    line: "你已解锁完整学习版，可以系统查看书籍资料、题库和答题模板。",
    hint: "适合已经确定要系统复习设计理论的同学。按自己的节奏把框架搭稳，再逐步填充细节。"
  },
  coaching: {
    line: "你已进入陪跑学习计划，请按照阶段任务完成复习和答题训练。",
    hint: "陪跑的重点不在资料多少，而在节奏与反馈。把每一次练习当成向考场靠近的一小步。"
  }
};

const roleTitle = { free: "免费用户", premium: "高级会员", coaching: "陪跑学员" };

export default function Profile() {
  const u = useUserData();
  const { role } = useUser();
  const copy = roleCopy[role] || roleCopy.free;
  const days = u.meta?.activeDays?.length || 0;
  const favN =
    u.favorites.chapters.length +
    u.favorites.terms.length +
    u.favorites.questions.length +
    u.favorites.templates.length +
    u.favorites.mindmaps.length;
  const bookId = PRIMARY_BOOK_ID;
  const pb = u.progress?.books?.[bookId] || {};
  const viewed = (pb.viewedTerms?.length || 0) + (pb.viewedQuestions?.length || 0);
  const totalTerms = getChaptersForBook(bookId).reduce((n, ch) => n + getTermsByChapter(bookId, ch.id).length, 0);
  const totalQ = getAllQuestions().filter((q) => q.bookId === bookId).length;

  const items = [
    { to: "/favorites", label: "我的收藏", Icon: Bookmark, desc: "章节 / 名解 / 题目 / 模板" },
    { to: "/recent", label: "最近学习", Icon: History, desc: "章节、题目与模板" },
    { to: "/review", label: "错题 / 待复习", Icon: Target, desc: "占位功能，后续可接标记" },
    { to: "/library", label: "我的书库", Icon: Library, desc: "多书切换入口" },
    { to: "/progress", label: "学习进度", Icon: LineChart, desc: "按书籍统计" },
    { to: "/hot", label: "高频考点", Icon: Flame, desc: "快速跳转检索" },
    { to: "/settings", label: "设置", Icon: Settings2, desc: "本地数据说明" }
  ];

  return (
    <div className="space-y-5">
      <WarmQuoteCard seed={7} italic={false} />

      <div className="overflow-hidden rounded-3xl border border-cream-200/80 bg-gradient-to-br from-white via-cream-50 to-brand-50/40 p-5 shadow-card">
        <div className="flex gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-700 text-lg font-bold text-white shadow-inner">
            学
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold">设计理论学习者</p>
            <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-semibold text-brand-900">
              <Crown className="h-3.5 w-3.5" strokeWidth={1.8} />
              当前身份：{roleTitle[role] || "免费用户"}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">{copy.line}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-ink-muted/90">{copy.hint}</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl bg-white/70 py-2">
                <p className="text-lg font-bold text-brand-800">{days}</p>
                <p className="text-[10px] text-ink-muted">学习天数</p>
              </div>
              <div className="rounded-2xl bg-white/70 py-2">
                <p className="text-lg font-bold text-brand-800">{favN}</p>
                <p className="text-[10px] text-ink-muted">收藏</p>
              </div>
              <div className="rounded-2xl bg-white/70 py-2">
                <p className="text-lg font-bold text-brand-800">{viewed}</p>
                <p className="text-[10px] text-ink-muted">已学点</p>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-ink-muted">
              已学点 = 已打开名解 + 已看题目（《设计学概论》样本库：名解 {totalTerms} / 题 {totalQ}）
            </p>
          </div>
        </div>
      </div>

      <Link
        to="/membership"
        className="flex items-center gap-3 rounded-3xl border border-amber-200/80 bg-gradient-to-r from-amber-50/90 to-white p-4 shadow-card transition hover:shadow-card-hover"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-900">
          <HeartHandshake className="h-5 w-5" strokeWidth={1.6} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink">会员中心</p>
          <p className="text-xs text-ink-muted">查看三类复习方式说明与权益对比</p>
        </div>
        <span className="text-ink-muted">›</span>
      </Link>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-ink">功能入口</h2>
        <div className="grid gap-2">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="flex items-center gap-3 rounded-3xl border border-cream-200/80 bg-white/85 p-4 shadow-card transition hover:shadow-card-hover"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <it.Icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{it.label}</p>
                <p className="text-xs text-ink-muted">{it.desc}</p>
              </div>
              <span className="text-ink-muted">›</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
