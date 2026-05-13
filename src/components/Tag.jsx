const styles = {
  hot: "bg-rose-50 text-rose-700 border-rose-200/80",
  term: "bg-sky-50 text-sky-800 border-sky-200/80",
  short: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
  essay: "bg-violet-50 text-violet-800 border-violet-200/80",
  template: "bg-amber-50 text-amber-900 border-amber-200/80",
  compare: "bg-orange-50 text-orange-800 border-orange-200/80",
  timeline: "bg-teal-50 text-teal-800 border-teal-200/80",
  figure: "bg-indigo-50 text-indigo-800 border-indigo-200/80",
  work: "bg-fuchsia-50 text-fuchsia-900 border-fuchsia-200/80",
  neutral: "bg-cream-100 text-ink-muted border-cream-300/80"
};

export default function Tag({ variant = "neutral", children, className = "" }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium leading-tight " +
        (styles[variant] || styles.neutral) +
        " " +
        className
      }
    >
      {children}
    </span>
  );
}
