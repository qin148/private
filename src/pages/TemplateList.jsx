import { useSearchParams } from "react-router-dom";
import TemplateCard from "../components/TemplateCard.jsx";
import { examTemplateCategories, getAllTemplates } from "../data/catalog.js";

export default function TemplateList() {
  const [params] = useSearchParams();
  const bookFilter = params.get("book");

  const templates = getAllTemplates().filter((t) => !bookFilter || t.bookId === bookFilter);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">考试答题模板</h1>
        <p className="mt-1 text-xs text-ink-muted">
          {bookFilter ? "已按当前书籍筛选（如有 bookId 字段）" : "全库模板 · 答题训练重点模块"}
        </p>
      </div>

      {examTemplateCategories.map((cat) => {
        const list = templates.filter((t) => t.categoryKey === cat.key);
        if (!list.length) return null;
        return (
          <section key={cat.key} className="space-y-2">
            <h2 className="text-sm font-semibold text-ink">{cat.label}</h2>
            <div className="space-y-3">
              {list.map((t) => (
                <TemplateCard key={t.id} template={t} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
