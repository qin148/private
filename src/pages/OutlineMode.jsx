import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getOutlineTree, PRIMARY_BOOK_ID } from "../data/catalog.js";
import { useUserData } from "../context/UserDataContext.jsx";

function OutlineNode({ node, depth = 0 }) {
  const { getOutlineOpen, toggleOutlineOpen } = useUserData();
  const hasChildren = (node.children || []).length > 0;
  const open = hasChildren ? getOutlineOpen(node.id) : true;

  const row = (
    <div
      className="flex items-start gap-2 rounded-2xl border border-transparent px-2 py-1.5 transition hover:border-cream-300/80 hover:bg-white/70"
      style={{ paddingLeft: 8 + depth * 14 }}
    >
      {hasChildren ? (
        <button
          type="button"
          className="mt-0.5 text-brand-700"
          aria-expanded={open}
          onClick={() => toggleOutlineOpen(node.id)}
        >
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      ) : (
        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600/70" />
      )}
      <div className="min-w-0 flex-1">
        {node.href ? (
          <Link to={node.href} className="text-sm font-medium text-ink hover:text-brand-800">
            {node.label}
          </Link>
        ) : (
          <span className="text-sm font-medium text-ink">{node.label}</span>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {row}
      {hasChildren && open ? (
        <div className="border-l border-cream-200/90">
          {node.children.map((ch) => (
            <OutlineNode key={ch.id} node={ch} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function OutlineMode() {
  const bookId = PRIMARY_BOOK_ID;
  const tree = getOutlineTree(bookId);

  if (!tree) {
    return <p className="text-sm text-ink-muted">该书暂无大纲数据。</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">大纲模式</h1>
        <p className="mt-1 text-xs text-ink-muted">层级展开 · 状态已保存在本机</p>
      </div>
      <div className="rounded-3xl border border-cream-200/80 bg-white/80 p-3 shadow-card">
        <OutlineNode node={tree} depth={0} />
      </div>
      <p className="text-center text-[11px] text-ink-muted">结构数据：src/data/designIntro/outline.js</p>
    </div>
  );
}
