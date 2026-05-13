import { Link } from "react-router-dom";

/** 免费用户当日随机抽题次数用尽时的温和提示 */
export default function RandomLimitCard({ className = "" }) {
  return (
    <div
      className={
        "rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50/90 via-white to-cream-50 p-5 shadow-card " +
        className
      }
    >
      <h3 className="text-[15px] font-semibold text-amber-950">今天的免费练习已经完成啦</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        复习不在于刷得多，而在于每一道题都能想清楚。想继续系统训练，可以解锁完整题库。
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to="/membership"
          className="inline-flex items-center justify-center rounded-2xl bg-brand-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-600"
        >
          查看完整题库
        </Link>
        <span className="inline-flex items-center rounded-2xl border border-cream-300/90 bg-white/90 px-4 py-2.5 text-sm text-ink-muted">
          稍后再说
        </span>
      </div>
    </div>
  );
}
