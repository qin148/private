import { Link } from "react-router-dom";
import Tag from "./Tag.jsx";
import HighlightText from "./HighlightText.jsx";

export default function TemplateCard({ template, to }) {
  return (
    <Link
      to={to || `/templates/${template.id}`}
      className="block rounded-2xl border border-cream-200/80 bg-white/90 p-4 shadow-card transition-shadow hover:shadow-card-hover active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[15px] font-semibold leading-snug text-ink">
          <HighlightText text={template.name} />
        </h3>
        <Tag variant="template">模板</Tag>
      </div>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-muted">
        {template.applicableQuestions}
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        {(template.applicableTypes || []).slice(0, 3).map((t) => (
          <Tag key={t} variant="neutral">
            {t}
          </Tag>
        ))}
      </div>
    </Link>
  );
}
