import { FileQuestion } from "lucide-react";

export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-cream-300/90 bg-white/60 px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-200/80 text-brand-700">
        <FileQuestion className="h-7 w-7" strokeWidth={1.6} />
      </div>
      <p className="mt-4 text-sm font-semibold text-ink">{title}</p>
      {description ? <p className="mt-2 max-w-xs text-xs leading-relaxed text-ink-muted">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
