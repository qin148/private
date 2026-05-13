import { Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import { useUser } from "../hooks/useUser.js";
import { USER_ROLE_KEY } from "../data/userMock.js";

const roleLabel = { free: "免费用户", premium: "高级会员", coaching: "陪跑学员" };

export default function SettingsPage() {
  const { role, setRole } = useUser();

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">设置</h1>
      <Card>
        <p className="text-sm font-semibold">会员身份（本地模拟）</p>
        <p className="mt-2 text-xs leading-relaxed text-ink-muted">
          当前为：<span className="font-semibold text-ink">{roleLabel[role] || role}</span>。仅保存在本机浏览器（键名{" "}
          <code className="rounded bg-cream-200/80 px-1">{USER_ROLE_KEY}</code>
          ），不涉及真实支付。若内容仍像免费版，多半是以前选过「免费」，在下方点一次「高级会员」即可。
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setRole("free")}
            className="rounded-2xl border border-cream-300 bg-white px-3 py-2 text-xs font-medium text-ink"
          >
            免费用户
          </button>
          <button
            type="button"
            onClick={() => setRole("premium")}
            className="rounded-2xl border border-brand-300 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-900"
          >
            高级会员
          </button>
          <button
            type="button"
            onClick={() => setRole("coaching")}
            className="rounded-2xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-950"
          >
            陪跑学员
          </button>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
          也可打开 <Link to="/membership" className="font-medium text-brand-800 underline">会员中心</Link>{" "}
          底部「本地预览」切换身份。
        </p>
      </Card>
      <Card>
        <p className="text-sm font-semibold">本地数据</p>
        <p className="mt-2 text-xs leading-relaxed text-ink-muted">
          收藏、最近学习、学习进度与大纲展开状态保存在浏览器 localStorage（键名 dtp_user_v2）。清除站点数据会重置。
        </p>
      </Card>
      <Card>
        <p className="text-sm font-semibold">内容维护</p>
        <p className="mt-2 text-xs leading-relaxed text-ink-muted">
          书籍内容请在 <code className="rounded bg-cream-200/80 px-1">src/data/designIntro/</code> 与{" "}
          <code className="rounded bg-cream-200/80 px-1">catalog.js</code> 中扩展；勿把教材全文粘贴进仓库。
        </p>
      </Card>
      <Link to="/profile" className="text-sm font-semibold text-brand-700">
        ← 返回我的
      </Link>
    </div>
  );
}
