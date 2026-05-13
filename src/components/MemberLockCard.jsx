import { Link } from "react-router-dom";

/**
 * 温和会员引导（非弹窗、非强迫）
 */
export default function MemberLockCard({ variant = "premium", className = "" }) {
  const isCoaching = variant === "coaching";
  return (
    <div
      className={
        "rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50/95 via-cream-50 to-orange-50/60 p-5 shadow-card " +
        className
      }
    >
      <h3 className="text-[15px] font-semibold text-amber-950">
        {isCoaching ? "这部分属于陪跑专项内容" : "这部分属于完整复习版内容"}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        {isCoaching
          ? "这里包含更系统的训练与批改向内容。若你已准备进入陪跑计划，可在会员中心了解服务方式与节奏安排。"
          : "这里包含精简背诵、展开论述、答题结构和相关模板的完整版。如果你已经进入系统备考阶段，可以考虑解锁完整学习版。"}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to="/membership"
          className="inline-flex items-center justify-center rounded-2xl bg-brand-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-600"
        >
          {isCoaching ? "了解陪跑计划" : "了解高级会员"}
        </Link>
        <Link
          to="/library"
          className="inline-flex items-center justify-center rounded-2xl border border-cream-300/90 bg-white/90 px-4 py-2.5 text-sm font-medium text-ink-muted transition hover:text-ink"
        >
          返回免费内容
        </Link>
      </div>
    </div>
  );
}
