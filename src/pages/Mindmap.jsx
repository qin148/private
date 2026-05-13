import { Link, useSearchParams } from "react-router-dom";
import Card from "../components/Card.jsx";
import BookmarkStar from "../components/BookmarkStar.jsx";
import { getMindmapsForBook, PRIMARY_BOOK_ID } from "../data/catalog.js";
import { useUserData } from "../context/UserDataContext.jsx";

function resolveLink(link) {
  if (!link) return null;
  if (link.type === "chapter") return `/books/${link.bookId}/chapters/${link.id}`;
  if (link.type === "questionType") return `/bank?type=${encodeURIComponent(link.id)}`;
  if (link.type === "template") return `/templates/${link.id}`;
  if (link.type === "term") return `/books/${link.bookId}/terms/${link.id}`;
  return null;
}

function MindNode({ map, node, depth = 0 }) {
  const href = resolveLink(node.link);
  const { toggleMindmapFav, isMindmapFav } = useUserData();
  const fav = node.link && node.id ? isMindmapFav(map.id, node.id) : false;

  const rowInner = (
    <div
      className={
        "flex min-w-0 flex-1 items-start gap-2 rounded-2xl border px-3 py-2.5 text-sm " +
        (href
          ? "border-brand-200/50 bg-white/90 shadow-sm active:scale-[0.99]"
          : "border-cream-200/80 bg-cream-50/60")
      }
      style={{ marginLeft: depth * 12 }}
    >
      <span className="mt-0.5 shrink-0 text-xs text-brand-800">{depth === 0 ? "◆" : "└"}</span>
      <span className="min-w-0 font-medium leading-snug text-ink">{node.label}</span>
    </div>
  );

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        {href ? (
          <Link to={href} className="min-w-0 flex-1">
            {rowInner}
          </Link>
        ) : (
          <div className="min-w-0 flex-1">{rowInner}</div>
        )}
        {node.id ? (
          <BookmarkStar size="sm" active={fav} onClick={() => toggleMindmapFav(map.id, node.id)} />
        ) : null}
      </div>
      {(node.children || []).map((ch) => (
        <MindNode key={ch.id} map={map} node={ch} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function Mindmap() {
  const [params] = useSearchParams();
  const bookId = params.get("book") || PRIMARY_BOOK_ID;
  const maps = getMindmapsForBook(bookId);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">思维导图</h1>
        <p className="mt-1 text-xs text-ink-muted">可点击知识结构 · 右侧星标收藏节点（本地）</p>
      </div>

      {!maps.length ? (
        <p className="text-sm text-ink-muted">该书暂无导图数据。</p>
      ) : null}

      {maps.map((m, idx) => (
        <section key={m.id}>
          <div className="mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-800">
              {["①", "②", "③", "④", "⑤"][idx] || `${idx + 1}.`}
            </p>
            <h2 className="text-sm font-semibold">{m.title}</h2>
            <p className="text-xs text-ink-muted">{m.subtitle}</p>
          </div>
          <Card className="relative overflow-hidden">
            <div className="pointer-events-none absolute left-[22px] top-10 bottom-8 w-px bg-gradient-to-b from-brand-200/0 via-brand-300/60 to-brand-200/0" />
            <MindNode map={m} node={m.root} depth={0} />
          </Card>
        </section>
      ))}
    </div>
  );
}
