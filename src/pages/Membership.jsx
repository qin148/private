import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser.js";
import { membershipPlans } from "../data/membershipPlans.js";
import WarmQuoteCard from "../components/WarmQuoteCard.jsx";

function PlanCard({ plan, currentRole }) {
  const isCurrent = plan.id === currentRole;

  return (
    <div
      id={
        plan.id === "premium" ? "premium-plan" : plan.id === "coaching" ? "coaching-plan" : "free-plan"
      }
      className={
        "rounded-3xl border p-5 shadow-card " +
        (isCurrent
          ? "border-brand-300/90 bg-gradient-to-br from-brand-50/80 via-white to-cream-50"
          : "border-cream-200/90 bg-white/85")
      }
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-lg font-bold text-ink">{plan.name}</h2>
        {isCurrent ? (
          <span className="shrink-0 rounded-full bg-brand-700/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand-800">
            当前状态
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{plan.description}</p>
      <p className="mt-2 text-xs font-medium text-ink/80">适合人群</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-muted">{plan.suitableFor}</p>
      <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400/90" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-2xl border border-cream-200/80 bg-cream-50/60 px-3 py-2 text-xs leading-relaxed text-ink-muted">
        {plan.tone}
      </p>
      <div className="mt-4">
        {plan.id === "free" ? (
          <span
            className={
              "inline-flex w-full items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-medium " +
              (isCurrent ? "bg-cream-200/80 text-ink-muted" : "border border-cream-300 bg-white text-ink-muted")
            }
          >
            {isCurrent ? "当前使用" : "面向体验与建立信任"}
          </span>
        ) : plan.id === "premium" ? (
          <a
            href="#unlock-note"
            className="flex w-full items-center justify-center rounded-2xl border border-brand-200/90 bg-brand-50/80 py-2.5 text-sm font-medium text-brand-900 transition hover:bg-brand-50"
          >
            {isCurrent ? "你已使用完整学习版（模拟）" : "了解完整学习版"}
          </a>
        ) : (
          <a
            href="#unlock-note"
            className="flex w-full items-center justify-center rounded-2xl border border-amber-200/90 bg-amber-50/80 py-2.5 text-sm font-medium text-amber-950 transition hover:bg-amber-50"
          >
            {isCurrent ? "你已使用陪跑学员（模拟）" : "了解陪跑计划"}
          </a>
        )}
      </div>
    </div>
  );
}

export default function Membership() {
  const { role, setRole } = useUser();

  return (
    <div className="space-y-6">
      <WarmQuoteCard seed={3} italic={false} />

      <div>
        <h1 className="text-xl font-bold text-ink">选择适合自己的复习方式</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">不用急着做决定，先看清自己现在需要什么。</p>
      </div>

      <div className="space-y-4">
        {membershipPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} currentRole={role} />
        ))}
      </div>

      <div
        id="unlock-note"
        className="rounded-2xl border border-cream-200/80 bg-white/70 px-4 py-3 text-sm leading-relaxed text-ink-muted"
      >
        <p className="font-medium text-ink/90">关于开通与定价</p>
        <p className="mt-2 text-xs leading-relaxed">
          当前 Web 版为学习整理与体验预览，不接入真实支付。后续若开放购买或陪跑服务，会在此页补充说明。你仍可先免费使用框架、目录与部分笔记建立复习节奏。
        </p>
      </div>

      <p className="rounded-2xl border border-cream-200/80 bg-white/70 px-4 py-3 text-center text-xs leading-relaxed text-ink-muted">
        资料只是帮助你搭框架，真正提分还需要持续背诵、理解和答题训练。
      </p>

      <details className="rounded-2xl border border-dashed border-cream-300/90 bg-cream-50/40 px-3 py-2 text-[11px] text-ink-muted">
        <summary className="cursor-pointer font-medium text-ink/80">本地预览：切换模拟身份（仅本机）</summary>
        <p className="mt-2 leading-relaxed">
          用于查看不同身份下的权限与文案，不会发起任何支付。数据写入浏览器本地存储。
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setRole("free")}
            className="rounded-xl border border-cream-300 bg-white px-3 py-1.5 text-[11px] font-medium text-ink"
          >
            免费用户
          </button>
          <button
            type="button"
            onClick={() => setRole("premium")}
            className="rounded-xl border border-brand-200 bg-brand-50 px-3 py-1.5 text-[11px] font-medium text-brand-900"
          >
            高级会员
          </button>
          <button
            type="button"
            onClick={() => setRole("coaching")}
            className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-medium text-amber-950"
          >
            陪跑学员
          </button>
        </div>
      </details>

      <Link to="/profile" className="block text-center text-sm font-medium text-brand-800">
        ← 返回我的
      </Link>
    </div>
  );
}
