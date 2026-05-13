/** 搜索结果高亮：将 query 在 text 中不区分大小写包裹 <mark> */
export default function SearchHitText({ text, query }) {
  if (!text) return null;
  const q = (query || "").trim();
  if (!q) return <span>{text}</span>;
  const esc = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${esc})`, "gi");
  const parts = String(text).split(re);
  return (
    <span>
      {parts.map((p, i) =>
        p.toLowerCase() === q.toLowerCase() ? (
          <mark key={i} className="rounded bg-amber-200/95 px-0.5 text-amber-950">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </span>
  );
}
